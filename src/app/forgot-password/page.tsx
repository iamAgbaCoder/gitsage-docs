"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { GitSageAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await GitSageAPI.forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Recovery instructions dispatched.");
    } catch (err) {
      // Handled by Interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card variant="glow">
          <CardHeader className="text-center pt-8">
            <h1 className="text-2xl font-bold font-outfit tracking-tight text-white mb-1">Identity Recovery</h1>
            <p className="text-sm text-slate-500">We will send instructions to your encrypted identity signature (email).</p>
          </CardHeader>
          
          <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <Input
                  label="Registered Email"
                  placeholder="commander@gitsage.dev"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail size={16} />}
                  required
                />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  <Send size={16} className="mr-2" /> Dispatch Recovery Link
                </Button>
                
                <Link href="/login" className="flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-sage transition-colors">
                   <ArrowLeft size={14} /> Return to Connection Portal
                </Link>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center text-sage mx-auto border border-sage/20">
                   <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                   <h2 className="text-xl font-bold text-white font-outfit">Check your inbox</h2>
                   <p className="text-sm text-slate-400">If an account exists for <span className="text-sage font-mono">{email}</span>, you will receive a reset link shortly.</p>
                </div>
                <Link href="/login">
                  <Button variant="secondary" className="w-full border-sage/20 text-sage hover:bg-sage/5">
                     Return to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
