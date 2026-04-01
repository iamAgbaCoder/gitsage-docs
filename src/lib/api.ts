import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// Ensure this environment variable is set in your .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gitsage.dev/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds default timeout
});

// Request Interceptor: Inject Auth Token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("gitsage_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the range of 2xx
      const status = error.response.status;
      const data = error.response.data as any;
      const message = data?.message || data?.error || "An unexpected error occurred.";

      if (status === 401) {
        toast.error("Session expired or invalid token. Please log in again.");
        if (typeof window !== "undefined") {
          localStorage.removeItem("gitsage_access_token");
          // Optionally redirect to login, but avoid full reloads aggressively
        }
      } else if (status === 403) {
        toast.error("Not authorized to perform this action.");
      } else if (status >= 500) {
        toast.error("GitSage intelligence engine is temporarily unavailable.");
      } else {
        toast.error(message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("Unable to connect to GitSage Engine. Check your connection.");
    } else {
      // Something happened in setting up the request
      toast.error("Request configuration error.");
    }
    return Promise.reject(error);
  }
);

// --- API Service Models ---

export interface CommitPayload {
  diff: string;
  provider?: "gitsage" | "local";
  model?: string;
}

export interface AuthPayload {
  email: string;
  password?: string;
}

// --- Intelligence API Methods ---

export const GitSageAPI = {
  /**
   * Generates an intelligent commit message and analysis from a raw git diff.
   */
  generateCommit: async (payload: CommitPayload) => {
    return await apiClient.post("/intelligence/commit", payload);
  },

  /**
   * Explains the logical intent and scope of a given commit diff.
   */
  explainCommit: async (payload: CommitPayload) => {
    return await apiClient.post("/intelligence/explain", payload);
  },

  /**
   * Authenticate a user and retrieve a session token.
   */
  login: async (payload: AuthPayload) => {
    const response: any = await apiClient.post("/auth/login", payload);
    // Automatically store token on successful login
    if (response?.token && typeof window !== "undefined") {
      localStorage.setItem("gitsage_access_token", response.token);
    }
    return response;
  },

  /**
   * Register a new developer account.
   */
  signup: async (payload: AuthPayload) => {
    const response: any = await apiClient.post("/auth/signup", payload);
    if (response?.token && typeof window !== "undefined") {
      localStorage.setItem("gitsage_access_token", response.token);
    }
    return response;
  },

  /**
   * Verify current session and retrieve profile data.
   */
  getProfile: async () => {
    return await apiClient.get("/auth/me");
  },
};

export default apiClient;
