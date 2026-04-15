"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitSageAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
  apiKey?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: any) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: (retry?: boolean) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // Initialize loading as true if we have a token to fetch, otherwise false
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("gitsage_access_token");
    }
    return true;
  });

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("gitsage_access_token") : null;
    if (token) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Friendly Error Mapping Utility
  const getFriendlyError = (error: any) => {
    const data = error.response?.data;
    const detail = data?.detail || data?.message || data?.error;
    
    // Technical to User-Friendly mapping
    if (typeof detail === 'string') {
      if (detail.includes("invalid-credentials") || detail.toLowerCase().includes("credentials")) 
        return "Incorrect email or password. Please try again.";
      if (detail.includes("user-not-found")) 
        return "We couldn't find an account with that email.";
      if (detail.includes("already-exists") || detail.toLowerCase().includes("already registered")) 
        return "This email is already linked to a GitSage account.";
      if (detail.includes("invalid-token") || detail.includes("expired")) 
        return "Your session has expired. Please sign in again.";
      return detail;
    }
    
    // Handle Pydantic/FastAPI list of errors
    if (Array.isArray(detail) && detail[0]?.msg) {
      return detail[0].msg;
    }

    return "Identity verification failed. Please check your connection.";
  };

  const refreshUser = async (retry = true) => {
    try {
      setIsLoading(true);
      const data = await GitSageAPI.getProfile() as any;
      
      const mappedUser: User = {
        ...data,
        id: data.id || data.usr_id,
        email: data.email,
        name: data.name || `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Member",
        apiKey: data.api_key || data.raw_key || GitSageAPI.vault.getKey("master"),
      };

      console.log("[Auth] User Profile Refreshed:", { id: mappedUser.id });
      setUser(mappedUser);
      return mappedUser;
    } catch (error: any) {
      if (retry && error.response?.status === 401) {
        console.warn("[Auth] 401 on profile refresh, retrying in 1.5s...");
        await new Promise(r => setTimeout(r, 1500));
        return refreshUser(false);
      }

      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("gitsage_access_token");
        localStorage.removeItem("gitsage_api_key");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const data: any = await GitSageAPI.login(credentials);
      const token = data?.access_token || data?.token;
      if (token) localStorage.setItem("gitsage_access_token", token);

      if (data?.user) {
        setUser(data.user);
        toast.success(`Welcome back, ${(data.user?.name || "Member").split(' ')[0]}.`);
      } else {
        await refreshUser();
        toast.success("Identity verified successfully.");
      }
    } catch (error: any) {
      toast.error(getFriendlyError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      const data: any = await GitSageAPI.signup(userData);
      const token = data?.access_token || data?.token;
      if (token) localStorage.setItem("gitsage_access_token", token);

      if (data?.user) {
        setUser(data.user);
        toast.success("Account created successfully!");
      } else {
        await refreshUser();
        toast.success("Portal access granted.");
      }
    } catch (error: any) {
      toast.error(getFriendlyError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("gitsage_access_token");
    localStorage.removeItem("gitsage_api_key");
    GitSageAPI.invalidateCache();
    setUser(null);
    toast.success("Safely disconnected.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
