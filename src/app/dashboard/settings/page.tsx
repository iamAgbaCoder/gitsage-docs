"use client";

import React, { useState } from "react";
import { Settings, User, Bell, Shield, X, Save, Edit3, Image } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { GitSageAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  
  // Profile Form State
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await GitSageAPI.updateProfile({
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl
      });
      toast.success("Profile updated successfully!");
      // Immediately update local state
      await refreshUser();
      setEditModalOpen(false);
    } catch (error) {
      // Error handles its own toasts in the interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl space-y-8 sm:space-y-12"
      >
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-purple-400 uppercase tracking-[0.2em] text-[10px] font-bold">
            <Settings size={12} />
            Preferences Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-outfit text-white">Identity Settings</h1>
          <p className="text-slate-400 text-sm sm:text-base">Configure your GitSage experience and manage your security protocols.</p>
        </section>

        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-purple-400 -rotate-12 pointer-events-none">
                <User size={120} />
              </div>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-slate-400"><User size={18} /></div>
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-tight">Profile Information</h3>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Manage your public profile and developer identity.</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="sm:flex"
                  onClick={() => {
                    setFirstName(user?.name?.split(" ")[0] || "");
                    setLastName(user?.name?.split(" ").slice(1).join(" ") || "");
                    setAvatarUrl(user?.avatarUrl || "");
                    setEditModalOpen(true);
                  }}
                >
                  <Edit3 size={14} className="mr-2" /> Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 px-8 py-8 relative z-10">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                  <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-white/10 flex flex-shrink-0 items-center justify-center overflow-hidden">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white font-outfit">{user?.name || "Developer Member"}</p>
                    <p className="text-xs font-mono text-slate-500 mt-1">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">First Name</label>
                    <div className="px-4 py-3 bg-black/40 border border-white/5 rounded-xl text-sm text-slate-300 font-outfit">
                      {user?.name?.split(" ")[0] || "—"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                    <div className="px-4 py-3 bg-black/40 border border-white/5 rounded-xl text-sm text-slate-300 font-outfit">
                      {user?.name?.split(" ").slice(1).join(" ") || "—"}
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                    <div className="px-4 py-3 bg-black/40 border border-white/5 rounded-xl text-sm text-slate-300 font-outfit">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card variant="glass" className="overflow-hidden">
              <CardHeader className="flex flex-col gap-4 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-slate-400"><Shield size={18} /></div>
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-tight">Security & Access</h3>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Configure your session preferences.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 py-8">
                <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Advanced security preferences coming soon to v1.3.0</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Edit Profile Modal / Slide-over */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-end sm:justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6"
          >
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl sm:max-w-md bg-[#0A0C10] border-l sm:border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-lg font-bold font-outfit text-white">Edit Profile</h2>
                <button 
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleProfileUpdate} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Linus"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-sage/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors font-outfit"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Torvalds"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-sage/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors font-outfit"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                      Avatar URL <Image size={10} />
                    </label>
                    <input 
                      type="url" 
                      placeholder="https://example.com/avatar.png"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-sage/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full py-6">
                    {isSubmitting ? "Updating Engine..." : (
                      <span className="flex items-center">
                        Save Profile Details <Save size={16} className="ml-2" />
                      </span>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setEditModalOpen(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
