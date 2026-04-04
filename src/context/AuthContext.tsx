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

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const profile = await GitSageAPI.getProfile() as any;
      setUser(profile);
      if (profile.apiKey) {
        localStorage.setItem("gitsage_api_key", profile.apiKey);
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("gitsage_access_token");
      localStorage.removeItem("gitsage_api_key");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const data = await GitSageAPI.login(credentials);
      setUser(data.user);
      if (data.user.apiKey) {
        localStorage.setItem("gitsage_api_key", data.user.apiKey);
      }
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}.`);
    } catch (error) {
      // Errors are handled by axios interceptor toast
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      const data = await GitSageAPI.signup(userData);
      setUser(data.user);
      if (data.user.apiKey) {
        localStorage.setItem("gitsage_api_key", data.user.apiKey);
      }
      toast.success("Account created successfully!");
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
