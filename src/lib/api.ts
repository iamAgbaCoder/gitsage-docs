import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Use the production API base URL
const API_BASE_URL = "https://gitsage-api.up.railway.app/v1";

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
    // If it's a CLI-like request (to intelligence/usage), we might use X-API-Key
    // But for the portal, we mostly use JWT
    const token = localStorage.getItem("gitsage_access_token");
    const apiKey = localStorage.getItem("gitsage_api_key");

    if (token && !config.url?.includes("/intelligence") && !config.url?.includes("/usage")) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (apiKey && (config.url?.includes("/intelligence") || config.url?.includes("/usage"))) {
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
    const { success, message, data } = response.data;
    
    if (success === false) {
      toast.error(message || "Operation failed");
      return Promise.reject(new Error(message || "Operation failed"));
    }
    
    return data; // Return only the data payload to the caller
  },
  (error: AxiosError) => {
    let errorMessage = "An unexpected error occurred.";
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      errorMessage = data?.message || data?.error || errorMessage;

      if (status === 401) {
        toast.error("Session expired. Please log in again.");
        if (typeof window !== "undefined") {
          localStorage.removeItem("gitsage_access_token");
        }
      } else if (status === 429) {
        toast.error("Rate limit exceeded. Slow down, sage.");
      } else if (status >= 500) {
        toast.error("GitSage engine is currently under heavy load.");
      } else {
        toast.error(errorMessage);
      }
    } else if (error.request) {
      toast.error("Unable to connect to GitSage Engine.");
    } else {
      toast.error("Network configuration error.");
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
    const data = await apiClient.post("/auth/login", payload) as any;
    if (data?.token) {
      localStorage.setItem("gitsage_access_token", data.token);
    }
    return data;
  },

  signup: async (payload: AuthPayload) => {
    const data = await apiClient.post("/auth/signup", payload) as any;
    if (data?.token) {
      localStorage.setItem("gitsage_access_token", data.token);
    }
    return data;
  },

  getGitHubAuthUrl: () => `${API_BASE_URL}/auth/github`,

  /**
   * API KEY MANAGEMENT
   */
  generateApiKey: async (name: string = "Default Key") => {
    return await apiClient.post("/api-keys/generate", { name });
  },

  /**
   * CORE INTELLIGENCE (CLI Endpoints)
   */
  analyzeDiff: async (payload: AnalyzePayload) => {
    return await apiClient.post("/intelligence/analyze", payload);
  },

  /**
   * USAGE & QUOTAS
   */
  getUsageStats: async () => {
    return await apiClient.get("/usage/stats");
  },

  /**
   * PROFILE (If needed, though not in spec, usually exists)
   */
  getProfile: async () => {
    return await apiClient.get("/auth/me");
  },
};

export default apiClient;
