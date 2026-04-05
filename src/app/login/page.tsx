"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ChevronRight } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { GitSageAPI } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      // Error handled by AuthContext/Interceptor
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card variant="glow">
          <CardHeader className="text-center pt-8">
            <h1 className="text-2xl font-bold font-outfit tracking-tight text-white mb-1">Welcome Back</h1>
            <p className="text-sm text-slate-500">Access your GitSage intelligence dashboard.</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                placeholder="commander@gitsage.dev"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={16} />}
                required
              />
              <div className="space-y-1.5">
                <div className="flex justify-between px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                  <Link href="/forgot-password" title="Recover account" className="text-[10px] font-bold text-sage hover:underline">Forgot password?</Link>
                </div>
                <Input
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock size={16} />}
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                <LogIn size={16} /> Login to Portal
              </Button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="bg-[#030712] px-3 font-outfit">or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" className="w-full text-xs">
                <FaGoogle className="text-red-400" /> Google
              </Button>
              <Button 
                variant="secondary" 
                className="w-full text-xs" 
                onClick={() => window.location.href = GitSageAPI.getGitHubAuthUrl()}
              >
                <FaGithub /> GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="text-center text-xs text-slate-500 py-6">
            {"Don't have an account?"}{" "}
            <Link href="/signup" className="text-sage font-bold hover:underline">Request access</Link>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
           <Link href="/" className="hover:text-sage transition-colors flex items-center gap-1.5 underline-offset-4 hover:underline"><ChevronRight size={12} /> Return Home</Link>
           <Link href="/docs" className="hover:text-sage transition-colors underline-offset-4 hover:underline">Intelligence Portal Docs</Link>
        </div>
      </motion.div>
    </div>
  );
}
