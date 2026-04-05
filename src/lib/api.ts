import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Use the production API base URL - Domain only for clearer path merging
// const API_BASE_URL = "https://gitsage-api.up.railway.app";
const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, 
});

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
    const { success, message, data } = response.data;
    
    if (success === false) {
      toast.error(message || "Operation failed");
      return Promise.reject(new Error(message || "Operation failed"));
    }
    
    // Some legacy or other endpoints might not have the wrapper
    // If data is missing but user/token is there (from BACKEND_API_SPEC), return full body
    if (success === undefined) {
      return response.data;
    }
    
    return data;
  },
  (error: AxiosError) => {
    let errorMessage = "An unexpected error occurred.";
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      
      // Prioritize backend provided message
      errorMessage = data?.message || data?.error || errorMessage;

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
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      toast.error("Network Error: Could not reach GitSage API. Check your connection or CORS settings.");
    } else {
      toast.error("API Error: " + error.message);
    }
    
    return Promise.reject(error);
  }
);

// --- API Service Methods ---

export interface AnalyzePayload {
  diff: string;
  context?: string;
  style?: "conventional" | "detailed" | "minimal";
}

export interface AuthPayload {
  email: string;
  password?: string;
}

export const GitSageAPI = {
  /**
   * AUTHENTICATION
   */
  login: async (payload: AuthPayload) => {
    const data = await apiClient.post("/v1/auth/login", payload) as any;
    const token = data?.access_token || data?.token;
    if (token) {
      localStorage.setItem("gitsage_access_token", token);
    }
    return data;
  },

  signup: async (payload: AuthPayload) => {
    const data = await apiClient.post("/v1/auth/signup", payload) as any;
    const token = data?.access_token || data?.token;
    if (token) {
      localStorage.setItem("gitsage_access_token", token);
    }
    return data;
  },

  getGitHubAuthUrl: () => `${API_BASE_URL}/v1/auth/github`,

  /**
   * API KEY MANAGEMENT
   */
  listApiKeys: async () => {
    return await apiClient.get("/v1/api-keys");
  },

  generateApiKey: async (name: string = "Default Key") => {
    return await apiClient.post("/v1/api-keys", { name }); // The v1.0 spec was split on the URL here
  },

  revokeApiKey: async (id: string) => {
    return await apiClient.delete(`/v1/api-keys/${id}`);
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
  getUsageStats: async () => {
    return await apiClient.get("/v1/usage/stats");
  },

  /**
   * PROFILE
   */
  getProfile: async () => {
    return await apiClient.get("/v1/auth/me");
  },
};

export default apiClient;
