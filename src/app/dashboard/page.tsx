"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, Check, BarChart3, Zap, Activity, Info, ShieldCheck, Database, Globe, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { GitSageAPI } from "@/lib/api";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user, refreshUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [usage, setUsage] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const stats = await GitSageAPI.getUsageStats();
      setUsage(stats);
    } catch (err) {
      console.error("Failed to fetch usage stats");
    }
  };

  const handleCopyKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      toast.success("API key copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("No API key available to copy.");
    }
  };

  const handleGenerateKey = async () => {
    try {
      setIsGenerating(true);
      await GitSageAPI.generateApiKey("Main Portal Key");
      await refreshUser(); // Refresh user state to get the new key
      toast.success("New API key generated successfully.");
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setIsGenerating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const stats = [
    { label: "Token Usage", value: usage?.tokens_total || "0", icon: Database, color: "text-sky-400", bg: "bg-sky-400/10" },
    { label: "Analyses", value: usage?.requests_count || "0", icon: Activity, color: "text-sage", bg: "bg-sage/10" },
    { label: "Daily Limit", value: "100", icon: Globe, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Engine Status", value: "Active", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-12"
    >
      {/* Welcome Banner */}
      <motion.section variants={itemVariants} className="relative p-6 sm:p-10 glass-strong border border-sage/20 rounded-3xl overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sage/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
         <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 bg-sage/10 border border-sage/20 rounded-full w-fit">
               <Zap size={14} className="text-sage" />
               <span className="text-[10px] font-bold text-sage uppercase tracking-widest">GitSage Intelligence Active</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-outfit text-white tracking-tight">Salutations, {(user?.name || "Member").split(" ")[0]}</h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-lg leading-relaxed font-outfit">Your GitSage intelligence engine is fully operational. You can now manage your keys and view real-time analysis reports.</p>
         </div>
      </motion.section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {stats.map((stat) => (
           <motion.div key={stat.label} variants={itemVariants}>
             <Card variant="glass" className="p-6 transition-transform hover:-translate-y-1 h-full">
                <div className="flex items-center justify-between mb-4">
                   <div className={stat.bg + " p-2 rounded-lg"}>
                      <stat.icon size={20} className={stat.color} />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer">
                      <Info size={12} />
                   </div>
                </div>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-white tracking-tight">{stat.value}</h3>
             </Card>
           </motion.div>
         ))}
      </section>

      {/* API Keys and Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* API Key Manager Panel */}
         <motion.div variants={itemVariants} className="h-full">
           <Card variant="glow" className="overflow-hidden flex flex-col h-full">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-sage/10 rounded-lg"><Key size={18} className="text-sage" /></div>
                    <h4 className="font-bold text-white uppercase tracking-tighter text-sm sm:text-base">Identity Management</h4>
                 </div>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={handleGenerateKey}
                   disabled={isGenerating}
                   className="w-full sm:w-auto"
                 >
                   {isGenerating ? <RefreshCw size={14} className="animate-spin mr-2" /> : <RefreshCw size={14} className="mr-2" />}
                   Rotate Master Key
                 </Button>
              </CardHeader>
              <CardContent className="flex-1 space-y-6 pt-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Master Production Key</label>
                     <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5 font-fira text-xs sm:text-sm text-slate-400 shadow-inner">
                        <span className="flex-1 px-3 py-1 font-mono truncate">
                          {(!user?.apiKey || user.apiKey === "no_key_found") ? (
                            <span className="text-slate-600 italic">No master key located...</span>
                          ) : (
                            `gs_live_${user.apiKey.substring(0, 4)}••••${user.apiKey.substring(user.apiKey.length - 4)}`
                          )}
                        </span>
                        <button 
                          onClick={handleCopyKey}
                          disabled={!user?.apiKey || user.apiKey === "no_key_found"}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-sage transition-all border border-white/5 shrink-0 disabled:opacity-20"
                        >
                          {copied ? <Check size={16} className="text-sage" /> : <Copy size={16} />}
                        </button>
                     </div>
                     <p className="text-[10px] text-slate-500 italic px-1">
                        {(!user?.apiKey || user.apiKey === "no_key_found") 
                          ? "**Action Required**: Generate your master signature to enable the engine."
                          : "**Security Notice**: Never expose your master key publicly. Rotate immediately if compromised."}
                     </p>
                 </div>
              </CardContent>
              <div className="p-6 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                     Key Status: {user?.apiKey ? "Active" : "Inactive"}
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest p-0 h-auto hover:bg-transparent hover:text-white">View SDK Reference</Button>
              </div>
           </Card>
         </motion.div>

         {/* Usage Graph / Progress */}
         <motion.div variants={itemVariants} className="h-full">
           <Card variant="glass" className="flex flex-col h-full">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-400/10 rounded-lg"><BarChart3 size={18} className="text-sky-400" /></div>
                    <h4 className="font-bold text-white uppercase tracking-tighter text-sm sm:text-base">Quota Consumption</h4>
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reset in 24 hours</span>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center space-y-8 sm:space-y-10 py-6 sm:py-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-1">Inference Power</p>
                          <p className="text-[10px] text-slate-500">Tier: Developer (Flash Engine)</p>
                       </div>
                       <span className="text-xl sm:text-2xl font-bold font-fira text-sage">
                         {usage?.requests_count ? Math.round((usage.requests_count / 100) * 100) : 0}%
                       </span>
                    </div>
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                       <div 
                         className="h-full bg-gradient-to-r from-sage to-sky-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-1000" 
                         style={{ width: usage ? `${(usage.requests_count / 100) * 100}%` : '0%' }}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-8 sm:pt-10 border-t border-white/5">
                    <div className="space-y-1 px-2 sm:px-4 border-r border-white/5 text-center">
                       <p className="text-xl sm:text-2xl font-bold text-white font-outfit">{usage?.requests_count || 0}</p>
                       <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Requests Sent</p>
                    </div>
                    <div className="space-y-1 px-2 sm:px-4 text-center">
                       <p className="text-xl sm:text-2xl font-bold font-outfit gradient-sage">100</p>
                       <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Daily Soft Limit</p>
                    </div>
                 </div>
              </CardContent>
           </Card>
         </motion.div>
      </section>
    </motion.div>
  );
}
