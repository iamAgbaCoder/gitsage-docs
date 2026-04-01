import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gitsage.dev/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor for Auth Headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("gitsage_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || "An unexpected error occurred. Please try again.";
    
    // Global error notifications
    if (error.response?.status !== 401) {
      toast.error(message);
    } else {
      // Handle unauthorized (e.g. redirect to login)
      if (typeof window !== "undefined") {
        localStorage.removeItem("gitsage_token");
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
