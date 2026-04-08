"use client";

import React, { useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw, GitBranch } from "lucide-react";
import { GitSageAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    
    if (code && !processedRef.current) {
      processedRef.current = true;
      
      const handleSSO = async () => {
        try {
          // 1. Exchange the temporary GitHub code for a JWT via our backend
          await GitSageAPI.githubCallback(code);
          
          // 2. The API method already saves the token to localStorage. 
          // Now we sync the user state and profile.
          await refreshUser();
          
          toast.success("GitHub identity authenticated.");
          
          // 3. Landing at the intelligence operations center
          router.replace("/dashboard");
        } catch (err) {
          console.error("SSO Callback Error:", err);
          toast.error("Failed to verify GitHub signature.");
          router.replace("/login");
        }
      };
      
      handleSSO();
    } else if (!code && !processedRef.current) {
      // No code in URL, redirect home
      router.replace("/login");
    }
  }, [searchParams, router, refreshUser]);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-sage/5 to-transparent blur-[120px]" />
      
      <div className="z-10 text-center space-y-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-2 border-sage/20 border-t-sage flex items-center justify-center mx-auto"
        >
           <GitBranch className="text-sage w-10 h-10" />
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="text-2xl font-bold font-outfit text-white tracking-tight flex items-center justify-center gap-3">
             <RefreshCw className="w-5 h-5 animate-spin text-sage" /> Synchronizing Intelligence
          </h1>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
             Securely connecting your GitHub identity to the GitSage intelligence layer...
          </p>
        </div>

        <div className="flex gap-1 justify-center">
           {[...Array(3)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
               className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
             />
           ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em] font-outfit">
         Encrypted Connection Protocol v2.4
      </div>
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-sage" />
      </div>
    }>
      <GitHubCallbackContent />
    </Suspense>
  );
}
