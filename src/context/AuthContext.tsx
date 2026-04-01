"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
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
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial check for user sesión
    const token = localStorage.getItem("gitsage_token");
    if (token) {
      // Mocked user profile fetch
      setIsLoading(true);
      setTimeout(() => {
        setUser({
          id: "666",
          email: "dev@gitsage.dev",
          name: "Sébastien Sage",
          apiKey: "gs_7f23x90kLmA1",
          avatarUrl: "https://avatar.vercel.sh/gitsage",
        });
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Mocked API call
      // const response = await api.post("/auth/login", credentials);
      // const { token, user } = response.data;
      
      const mockResult = { token: "fake_jwt", user: { id: "666", email: credentials.email, name: "User" } };
      localStorage.setItem("gitsage_token", mockResult.token);
      setUser(mockResult.user as User);
      toast.success("Welcome back, Commander.");
    } catch (error) {
      // Handled by axios interceptor
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      // await api.post("/auth/signup", userData);
      toast.success("Verification email sent. Please check your inbox.");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("gitsage_token");
    setUser(null);
    toast.success("Disconnected successfully.");
  };

  const verifyEmail = async (token: string) => {
    try {
      // await api.post("/auth/verify", { token });
      toast.success("Email verified. You can now login.");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, verifyEmail }}>
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
