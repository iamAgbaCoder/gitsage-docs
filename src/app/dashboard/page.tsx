"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, Check, BarChart3, Zap, Activity, Info, ShieldCheck, Database, Globe, RefreshCw, Shield } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { GitSageAPI } from "@/lib/api";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user, refreshUser } = useAuth();
  const [usage, setUsage] = useState<any>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newKey, setNewKey] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleSSO = async () => {
      const params = new URLSearchParams(window.location.search);
      const ssoToken = params.get("token");
      if (ssoToken) {
        localStorage.setItem("gitsage_access_token", ssoToken);
        window.history.replaceState({}, document.title, window.location.pathname);
        await refreshUser();
        toast.success("Identity synchronized via GitHub.");
      }
      
      fetchStats();
      fetchKeys();
    };

    handleSSO();
    
    const interval = setInterval(() => {
       fetchStats();
       fetchKeys();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const stats = await GitSageAPI.getUsageStats();
      setUsage(stats);
    } catch (err) {}
  };

  const fetchKeys = async () => {
    try {
      const data: any = await GitSageAPI.listApiKeys();
      setKeys(Array.isArray(data) ? data : (data?.keys || []));
    } catch (err) {}
  };

  const copyToClipboard = (text: string, id: string, type: "secret" | "id" = "secret") => {
    if (!text || text.includes("undefined")) {
      if (type === "secret") {
        toast.error("Secret is masked for security. Create a new key to view full secret.");
        return;
      }
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${type === "secret" ? "Full Secret" : "Key ID"} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyKey = () => {
    const activeKey = keys.find(k => k.status === "active" || k.is_active);
    const masterKey = user?.apiKey || (user as any)?.api_key || (user as any)?.raw_key || GitSageAPI.vault.getKey("master") || GitSageAPI.vault.getKey(activeKey?.id);
    
    if (masterKey && masterKey !== "no_key_found" && !masterKey.includes("•")) {
       copyToClipboard(masterKey, "master", "secret");
    } else if (activeKey?.id) {
       copyToClipboard(activeKey.id, activeKey.id, "id");
    } else {
       toast.error("No active key found.");
    }
  };

  const handleGenerateKey = async () => {
    try {
      setIsGenerating(true);
      const res: any = await GitSageAPI.generateApiKey("Main Portal Key");
      
      // Backend pattern: { data: { raw_key: "gs_...", id: "...", ... } }
      const secret = res?.raw_key || res?.key || res?.api_key || res?.secret;
      const id = res?.id || res?.key_id;

      if (secret) {
        const keyData = { ...res, key: secret, id: id || "master" };
        setNewKey(keyData);
        if (id) GitSageAPI.vault.saveKey(id, secret);
        GitSageAPI.vault.saveKey("master", secret);
      }
      
      await refreshUser(); // Refresh user state
      toast.success("Master Intelligence Key Rotated");
    } catch (err) {
      console.error("[Dashboard] Key rotation failed:", err);
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
    { label: "Token Usage", value: usage?.total_tokens || "0", icon: Database, color: "text-sky-400", bg: "bg-sky-400/10" },
    { label: "Analyses", value: usage?.total_requests || "0", icon: Activity, color: "text-sage", bg: "bg-sage/10" },
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
      {/* Newly Generated Key Modal Overlay */}
      <AnimatePresence>
        {newKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 9999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-xl"
            >
              <Card variant="glow" className="p-8 border-sage/30 bg-[#0A0C10] relative overflow-hidden shadow-2xl shadow-sage/10">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-sage rotate-12"><Shield size={120} /></div>
                
                <div className="space-y-8 relative z-10">
                   <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center text-sage">
                         <div className="relative">
                            <Shield size={32} />
                            <motion.div 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               transition={{ delay: 0.3 }}
                               className="absolute -top-1 -right-1 w-5 h-5 bg-sage rounded-full flex items-center justify-center text-black"
                            >
                               <Check size={12} strokeWidth={3} />
                            </motion.div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-bold text-white font-outfit">Master Security Signature</h3>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">This is a one-time cryptographic reveal</p>
                      </div>
                   </div>

                   <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{newKey.name || "Master Key"}</span>
                         <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[9px] font-bold uppercase border border-sage/10">Root Access</span>
                      </div>
                      
                      <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-sage/20 to-sky-400/20 blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                         <code className="relative flex items-center justify-center min-h-[60px] w-full px-4 py-4 bg-black rounded-xl text-sage font-mono text-sm break-all text-center border border-white/10 select-all">
                            {newKey.key}
                         </code>
                      </div>
                      
                      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                         <p className="text-[10px] text-amber-500/80 font-medium leading-relaxed">
                            <span className="font-bold">IMPORTANT:</span> This key will not be shown again. Save it immediately to your secure secrets manager.
                         </p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <Button 
                        onClick={() => copyToClipboard(newKey.key, newKey.id || "new", "secret")}
                        className="flex-1 py-6 shadow-lg shadow-sage/20 font-bold uppercase tracking-widest text-[11px]"
                      >
                         <Copy size={16} className="mr-2" /> Copy Master Key
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setNewKey(null)}
                        className="px-8 bg-white/5 border border-white/10 hover:bg-white/10"
                      >
                         Close
                      </Button>
                   </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                          {(() => {
                             const activeKey = keys.find(k => k.status === "active" || k.is_active);
                             const raw = user?.apiKey || (user as any)?.api_key || (user as any)?.raw_key || GitSageAPI.vault.getKey("master") || GitSageAPI.vault.getKey(activeKey?.id);
                             
                             const isMasked = raw?.includes("•");
                             const masterKey = isMasked ? GitSageAPI.vault.getKey("master") : raw;

                             if (masterKey && masterKey !== "no_key_found") {
                               return `gs_live_${masterKey.substring(0, 4)}••••${masterKey.substring(masterKey.length - 4)}`;
                             }
                             
                             if (activeKey?.prefix) {
                                return `${activeKey.prefix}••••••••`;
                             }
                             
                             return <span className="text-slate-600 italic">No master key located in vault...</span>;
                          })()}
                        </span>
                        <button 
                          onClick={handleCopyKey}
                          disabled={!user?.apiKey || user.apiKey === "no_key_found"}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-sage transition-all border border-white/5 shrink-0 disabled:opacity-20"
                        >
                          {copiedId === "master" ? <Check size={16} className="text-sage" /> : <Copy size={16} />}
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
                         {usage?.total_requests ? Math.round((usage.total_requests / 100) * 100) : 0}%
                       </span>
                    </div>
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                       <div 
                         className="h-full bg-gradient-to-r from-sage to-sky-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-1000" 
                         style={{ width: usage ? `${(usage.total_requests / 100) * 100}%` : '0%' }}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-8 sm:pt-10 border-t border-white/5">
                    <div className="space-y-1 px-2 sm:px-4 border-r border-white/5 text-center">
                       <p className="text-xl sm:text-2xl font-bold text-white font-outfit">{usage?.total_requests || 0}</p>
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
