import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Use the production API base URL - Domain only for clearer path merging
const API_BASE_URL = "https://gitsage-backend-api.onrender.com";
// const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, 
});

// --- Persistent Cache System (Hybrid Memory + SessionStorage) ---
let apiCache: Record<string, { data: any; timestamp: number }> = {};

if (typeof window !== "undefined") {
  try {
    const persisted = sessionStorage.getItem("gitsage_cache");
    if (persisted) apiCache = JSON.parse(persisted);
  } catch (e) {
    apiCache = {};
  }
}

const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes default

const saveCacheToDisk = () => {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("gitsage_cache", JSON.stringify(apiCache));
    } catch (e) {
      console.warn("[Cache] Storage limit reached, continuing in memory.");
    }
  }
};

const clearCache = (url?: string) => {
  if (url) {
    delete apiCache[url];
  } else {
    apiCache = {};
  }
  
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("gitsage_cache");
    if (url) saveCacheToDisk(); // Update disk if only one key removed
  }
};

// Request Interceptor: Inject Auth Token or API Key + Cache Busting
apiClient.interceptors.request.use((config) => {
  // 1. Cache Busting (Force browser to bypass its memory of old results)
  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() };
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("gitsage_access_token");
    const apiKey = localStorage.getItem("gitsage_api_key");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    if (apiKey && (config.url?.includes("/intelligence") || config.url?.includes("/usage"))) {
      config.headers["X-API-Key"] = apiKey;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Handle the standardized { success, message, data } wrapper
apiClient.interceptors.response.use(
  (response) => {
    // If the server returns { success, message, data }
    const resData = response.data;
    
    // Some endpoints return the wrapper directly
    if (resData && typeof resData === 'object' && 'success' in resData) {
      const { success, message, data } = resData;
      
      if (success === false) {
        toast.error(message || "Operation failed");
        return Promise.reject(new Error(message || "Operation failed"));
      }
      
      return data;
    }
    
    // Fallback for direct data returns
    return resData;
  },
  (error: AxiosError) => {
    let errorMessage = "An unexpected error occurred.";
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      
      // Prioritize backend provided message
      errorMessage = data?.message || data?.error || data?.detail || errorMessage;

      if (status === 401) {
        // We no longer clear localStorage here. 
        // AuthContext.refreshUser() handles the retry and cleanup logic.
        console.warn("[API] 401 Unauthorized detected.");
      } else if (status === 429) {
        toast.error("Rate limit exceeded. Slow down, sage.");
      } else if (status >= 500) {
        toast.error("GitSage engine is currently under heavy load.");
      } else {
        toast.error(errorMessage);
      }
    } else if (axios.isCancel(error)) {
      // Completely silent for cancellations (expected during route changes)
      console.log("[API] Request aborted safely.");
    } else if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      // Network errors during redirects or rapid transitions should not toast.
      // We only toast if it's likely a persistent connection issue.
      console.error("[API] Network Connectivity Error:", error);
      
      // Heuristic: If we have a token but no user yet, we might be in a redirect.
      // In that case, we silence the potential "Network Error" caused by the browser canceling the fetch.
      const isTransitional = typeof window !== "undefined" && 
        (window.location.pathname.includes("/auth/callback") || 
         window.location.pathname.includes("/login") || 
         window.location.pathname.includes("/signup"));

      if (!isTransitional) {
        toast.error("The GitSage portal is having trouble reaching the API. Please check your connection.");
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error("GitSage Engine Timeout: The request took too long.");
    } else {
      // Fallback for other errors (only toast if not a cancellation)
      const msg = error.message || "Unknown API Error";
      toast.error(msg);
    }
    
    return Promise.reject(error);
  }
);

// --- Key Vault (Local Obfuscation) ---
const VAULT_KEY = "gitsage_vault";

const Vault = {
  saveKey: (id: string, secret: string) => {
    try {
      const currentVault = JSON.parse(localStorage.getItem(VAULT_KEY) || "{}");
      // Basic obfuscation as requested (Base64 is NOT encryption, but prevents plain-text visibility in dev tools)
      currentVault[id] = btoa(secret);
      localStorage.setItem(VAULT_KEY, JSON.stringify(currentVault));
    } catch (e) {}
  },
  getKey: (id: string) => {
    try {
      const currentVault = JSON.parse(localStorage.getItem(VAULT_KEY) || "{}");
      const secret = currentVault[id];
      if (!secret && id === "master") return "no_key_found";
      return secret ? atob(secret) : null;
    } catch (e) {
      return id === "master" ? "no_key_found" : null;
    }
  }
};

// --- API Service Methods ---

export interface AnalyzePayload {
  diff: string;
  context?: string;
  style?: "conventional" | "detailed" | "minimal";
}

export interface AuthPayload {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export const GitSageAPI = {
  /**
   * CACHE UTILITIES
   */
  fetchWithCache: async (url: string, ttl: number = DEFAULT_CACHE_TTL) => {
    const cached = apiCache[url];
    const now = Date.now();
    
    if (cached && (now - cached.timestamp < ttl)) {
       return cached.data;
    }
    
    const data = await apiClient.get(url);
    apiCache[url] = { data, timestamp: now };
    saveCacheToDisk();
    return data;
  },

  invalidateCache: (url?: string) => clearCache(url),

  /**
   * VAULT UTILITIES
   */
  vault: Vault,

  /**
   * AUTHENTICATION
   */
  login: async (payload: AuthPayload) => {
    const data = await apiClient.post("/v1/auth/login", payload) as any;
    const token = data?.access_token || data?.token;
    if (token) {
      localStorage.setItem("gitsage_access_token", token);
      clearCache(); 
    }
    return data;
  },

  signup: async (payload: AuthPayload) => {
    const data = await apiClient.post("/v1/auth/signup", payload) as any;
    const token = data?.access_token || data?.token;
    if (token) {
      localStorage.setItem("gitsage_access_token", token);
      clearCache();
    }
    return data;
  },

  forgotPassword: async (email: string) => {
    return await apiClient.post("/v1/auth/forgot-password", { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return await apiClient.post("/v1/auth/reset-password", { 
      token, 
      new_password: newPassword 
    });
  },

  githubCallback: async (code: string) => {
    const data: any = await apiClient.get(`/v1/auth/github/callback?code=${code}`);
    const token = data?.access_token || data?.token;
    if (token) {
      localStorage.setItem("gitsage_access_token", token);
      clearCache();
    }
    return data;
  },

  getGitHubAuthUrl: () => `${API_BASE_URL}/v1/auth/github`,

  /**
   * API KEY MANAGEMENT
   */
  listApiKeys: async () => {
    // We don't cache keys to ensure revocation visibility
    const keys: any = await apiClient.get("/v1/api-keys/");
    
    // Enrich with vault if possible
    if (Array.isArray(keys)) {
       return keys.map((k: any) => {
          // If the key is masked (dots) or missing, try vault
          const isMasked = k.key?.includes("•") || !k.key;
          const vaultSecret = Vault.getKey(k.id);
          
          return {
            ...k,
            key: (!isMasked && k.key) ? k.key : vaultSecret 
          };
       });
    }
    return keys;
  },

  generateApiKey: async (name: string = "Default Key") => {
    const res: any = await apiClient.post("/v1/api-keys/", { name });
    
    // Aligned with backend: { data: { raw_key: "gs_...", id: "..." } }
    // Interceptor returns 'data' part.
    const secret = res?.raw_key || res?.key || res?.api_key || res?.secret;
    const id = res?.id || res?.key_id;
    
    if (secret && id) {
      Vault.saveKey(id, secret);
    }
    
    // Clear ALL caches to ensure profile and stats are fresh
    clearCache();
    return res;
  },

  revokeApiKey: async (id: string) => {
    const res = await apiClient.delete(`/v1/api-keys/${id}`);
    clearCache(); // Ensure fresh state
    return res;
  },

  /**
   * CORE INTELLIGENCE (CLI Endpoints)
   */
  analyzeDiff: async (payload: AnalyzePayload) => {
    return await apiClient.post("/v1/intelligence/analyze", payload);
  },

  /**
   * USAGE & QUOTAS
   */
  getUsageStats: async (forceRefresh = false) => {
    if (forceRefresh) clearCache("/v1/usage/stats");
    return await GitSageAPI.fetchWithCache("/v1/usage/stats");
  },

  /**
   * PROFILE
   */
  getProfile: async () => {
    return await apiClient.get("/v1/auth/me");
  },

  updateProfile: async (payload: { first_name?: string; last_name?: string; avatar_url?: string; }) => {
    const data = await apiClient.put("/v1/auth/me", payload);
    GitSageAPI.invalidateCache("/v1/auth/me");
    return data;
  },

  /**
   * TELEMETRY & ADMIN
   */
  trackEvent: async (eventType: string, source: string = "web", metadata: any = {}, userId?: string) => {
    try {
      const payload: any = {
        event_type: eventType,
        source: source,
        metadata: metadata
      };
      if (userId) payload.user_id = userId;

      // Use fire-and-forget for telemetry to avoid slowing down UI
      return await apiClient.post("/v1/telemetry/track", payload);
    } catch (err) {
      console.warn("[Telemetry] Event capture failed:", err);
    }
  },

  getTelemetryMetrics: async () => {
    return await GitSageAPI.fetchWithCache("/v1/telemetry/metrics");
  },

  getAdminDashboard: async () => {
    return await apiClient.get("/v1/admin/dashboard");
  },
};

export default apiClient;
