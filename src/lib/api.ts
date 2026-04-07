import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Use the production API base URL - Domain only for clearer path merging
const API_BASE_URL = "https://gitsage-api.up.railway.app";
// const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, 
});

// --- Simple Cache System ---
const apiCache: Record<string, { data: any; timestamp: number }> = {};
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes default

const clearCache = (url?: string) => {
  if (url) {
    delete apiCache[url];
  } else {
    Object.keys(apiCache).forEach(key => delete apiCache[key]);
  }
};

// Request Interceptor: Inject Auth Token or API Key
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("gitsage_access_token");
    const apiKey = localStorage.getItem("gitsage_api_key");

    // Always provide Authorization if we have it (for portal sessions)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Also provide API Key for intelligence/usage calls specifically
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
        // Use backend message but ensure session is cleared locally
        toast.error(errorMessage);
        if (typeof window !== "undefined") {
          localStorage.removeItem("gitsage_access_token");
          localStorage.removeItem("gitsage_api_key");
        }
      } else if (status === 429) {
        toast.error("Rate limit exceeded. Slow down, sage.");
      } else if (status >= 500) {
        toast.error("GitSage engine is currently under heavy load.");
      } else {
        toast.error(errorMessage);
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error("Request timed out. The engine is taking longer than expected.");
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      toast.error("Network Error: Could not reach GitSage API. Check your connection or CORS settings.");
    } else {
      toast.error("API Error: " + error.message);
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
      return secret ? atob(secret) : null;
    } catch (e) {
      return null;
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
      clearCache(); // Clear cache on login
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
    const res = await apiClient.delete(`/v1/api-keys/${id}/`);
    clearCache(); // Ensure fresh state
    return res;
  },

  /**
   * CORE INTELLIGENCE (CLI Endpoints)
   */
  analyzeDiff: async (payload: AnalyzePayload) => {
    return await apiClient.post("/v1/intelligence/analyze/", payload);
  },

  /**
   * USAGE & QUOTAS
   */
  getUsageStats: async (forceRefresh = false) => {
    if (forceRefresh) clearCache("/v1/usage/stats/");
    return await GitSageAPI.fetchWithCache("/v1/usage/stats/");
  },

  /**
   * PROFILE
   */
  getProfile: async () => {
    return await GitSageAPI.fetchWithCache("/v1/auth/me/", 10 * 60 * 1000); // 10 min cache for profile
  },
};

export default apiClient;
