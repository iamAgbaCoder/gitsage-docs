"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, ChevronRight } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card variant="glow">
          <CardHeader className="text-center pt-8">
            <h1 className="text-2xl font-bold font-outfit tracking-tight text-white mb-1">Create Access</h1>
            <p className="text-sm text-slate-500">Join the intelligence layer for Git developers.</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Sébastien Sage"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                leftIcon={<User size={16} />}
                required
              />
              <Input
                label="Work Email"
                placeholder="commander@gitsage.dev"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail size={16} />}
                required
              />
              <Input
                label="Secret Key (Password)"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                leftIcon={<Lock size={16} />}
                required
              />

              <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                <UserPlus size={16} /> Request Account Access
              </Button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="bg-[#030712] px-3 font-outfit">join using sso</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" className="w-full text-xs">
                <FaGoogle className="text-red-400" /> Google
              </Button>
              <Button variant="secondary" className="w-full text-xs">
                <FaGithub /> GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="text-center text-xs text-slate-500 py-6">
            Already have a key?{" "}
            <Link href="/login" className="text-sage font-bold hover:underline">Connect identity</Link>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
           <Link href="/terms" className="hover:text-sage transition-colors underline-offset-4 hover:underline">Terms of Service</Link>
           <Link href="/privacy" className="hover:text-sage transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
        </div>
      </motion.div>
    </div>
  );
}
