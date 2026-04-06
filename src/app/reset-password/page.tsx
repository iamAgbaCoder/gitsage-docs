"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Save, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { GitSageAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing identity token.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    try {
      setIsLoading(true);
      await GitSageAPI.resetPassword(token, newPassword);
      setIsReset(true);
      toast.success("Security signature successfully updated.");
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
            <h1 className="text-2xl font-bold font-outfit tracking-tight text-white mb-1">Rotate Secret Key</h1>
            <p className="text-sm text-slate-500">Update your access signature to restore portal connectivity.</p>
          </CardHeader>
          
          <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
            {!isReset ? (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                {!token && (
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center mb-4">
                      Invalid or expired token. Please request a new link.
                   </div>
                )}
                
                <Input
                  label="New Secret Key (Password)"
                  placeholder="••••••••"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  leftIcon={<Lock size={16} />}
                  required
                  disabled={!token}
                />

                <Input
                  label="Confirm Secret Key"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  leftIcon={<Lock size={16} />}
                  required
                  disabled={!token}
                />

                <Button type="submit" className="w-full" isLoading={isLoading} disabled={!token}>
                  <Save size={16} className="mr-2" /> Update Access Signature
                </Button>
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
                   <h2 className="text-xl font-bold text-white font-outfit">Signature Rotated</h2>
                   <p className="text-sm text-slate-400">Your portal access has been restored with your new secret key.</p>
                </div>
                <Button onClick={() => router.push("/login")} className="w-full">
                  Connect to Portal <ChevronRight size={16} className="ml-1" />
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
