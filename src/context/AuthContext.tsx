"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("gitsage_access_token") : null;
    if (token) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = async (retry = true) => {
    try {
      setIsLoading(true);
      const data = await GitSageAPI.getProfile() as any;
      
      // Map backend fields to frontend User interface
      const mappedUser: User = {
        ...data,
        id: data.id || data.usr_id,
        email: data.email,
        name: data.name || `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Member",
        apiKey: data.api_key || data.raw_key || GitSageAPI.vault.getKey("master"),
      };

      console.log("[Auth] User Profile Refreshed:", { id: mappedUser.id });
      setUser(mappedUser);
      
      if (mappedUser.apiKey) {
        localStorage.setItem("gitsage_api_key", mappedUser.apiKey);
        GitSageAPI.vault.saveKey("master", mappedUser.apiKey);
      }
    } catch (error: any) {
      // If 401, retry once after a small delay to handle session propagation race conditions in prod
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
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const data: any = await GitSageAPI.login(credentials);
      
      // Handle different token naming conventions (standard OAuth vs spec)
      const token = data?.access_token || data?.token;
      if (token) {
        localStorage.setItem("gitsage_access_token", token);
      }

      // If user profile is included in login response, use it. 
      // Otherwise, trigger refreshUser to fetch it from /me
      if (data?.user) {
        setUser(data.user);
        if (data.user.apiKey) {
          localStorage.setItem("gitsage_api_key", data.user.apiKey);
        }
        toast.success(`Welcome back, ${(data.user?.name || "Member").split(' ')[0]}.`);
      } else {
        await refreshUser();
        toast.success("Identity verified successfully.");
      }
    } catch (error) {
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
      if (token) {
        localStorage.setItem("gitsage_access_token", token);
      }

      if (data?.user) {
        setUser(data.user);
        if (data.user.apiKey) {
          localStorage.setItem("gitsage_api_key", data.user.apiKey);
        }
        toast.success("Account created successfully!");
      } else {
        await refreshUser();
        toast.success("Portal access granted.");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("gitsage_access_token");
    localStorage.removeItem("gitsage_api_key");
    setUser(null);
    toast.success("Safely disconnected.");
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
