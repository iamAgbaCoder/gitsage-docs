"use client";

import React, { useState } from "react";
import { Key, Copy, Check, BarChart3, Zap, Activity, Info, ShieldCheck, Database, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { toast } from "react-hot-toast";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      toast.success("API key copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stats = [
    { label: "Token Usage", value: "24.5k", icon: Database, color: "text-sky-400", bg: "bg-sky-400/10" },
    { label: "Analyses", value: "152", icon: Activity, color: "text-sage", bg: "bg-sage/10" },
    { label: "Global Presence", value: "99.9%", icon: Globe, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "AI Fidelity", value: "Premium", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <section className="relative p-10 glass-strong border border-sage/20 rounded-3xl overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sage/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
         <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 px-3 py-1 bg-sage/10 border border-sage/20 rounded-full w-fit">
               <Zap size={14} className="text-sage" />
               <span className="text-[10px] font-bold text-sage uppercase tracking-widest">Early Access Active</span>
            </div>
            <h2 className="text-4xl font-bold font-outfit text-white">Salutations, {user?.name.split(" ")[0]}</h2>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed font-outfit">Your GitSage intelligence engine is fully operational. You can now manage your keys and view real-time analysis reports.</p>
         </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {stats.map((stat) => (
           <Card key={stat.label} variant="glass" className="p-6 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                 <div className={stat.bg + " p-2 rounded-lg"}>
                    <stat.icon size={20} className={stat.color} />
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer">
                    <Info size={12} />
                 </div>
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold font-outfit text-white tracking-tight">{stat.value}</h3>
           </Card>
         ))}
      </section>

      {/* API Keys and Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* API Key Manager Panel */}
         <Card variant="glow" className="overflow-hidden flex flex-col">
            <CardHeader className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-sage/10 rounded-lg"><Key size={18} className="text-sage" /></div>
                  <h4 className="font-bold text-white uppercase tracking-tighter">API Keys Management</h4>
               </div>
               <Button variant="outline" size="sm">Rotate Master Key</Button>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 pt-10">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Master Production Key</label>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5 font-fira text-sm text-slate-400 shadow-inner">
                     <span className="flex-1 px-3 py-1 font-mono">{user?.apiKey ? "gs_••••••••••••••••••••" : "no_key_found"}</span>
                     <button 
                       onClick={handleCopyKey}
                       className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-sage transition-all border border-white/5"
                     >
                       {copied ? <Check size={16} className="text-sage" /> : <Copy size={16} />}
                     </button>
                  </div>
                  <p className="text-[10px] text-slate-500 italic px-1">**Security Notice**: Never expose your master key publicly. Rotate immediately if compromised.</p>
               </div>
            </CardContent>
            <div className="p-6 bg-black/20 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                   Key Status: Active
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">View SDK Reference</Button>
            </div>
         </Card>

         {/* Mock Usage Graph / Progress */}
         <Card variant="glass" className="flex flex-col">
            <CardHeader className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-400/10 rounded-lg"><BarChart3 size={18} className="text-sky-400" /></div>
                  <h4 className="font-bold text-white uppercase tracking-tighter">Quota Usage Overview</h4>
               </div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cycle ends in 12 days</span>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center space-y-10">
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-sm font-bold text-white uppercase tracking-widest mb-1">Inference Power</p>
                        <p className="text-[10px] text-slate-500">Gemini 1.5 Flash - Analysis Speed: Fast</p>
                     </div>
                     <span className="text-2xl font-bold font-fira text-sage">74%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                     <div className="h-full bg-gradient-to-r from-sage to-sky-500 rounded-full w-[74%] shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-1000" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/5">
                  <div className="space-y-1 px-4 border-r border-white/5 text-center">
                     <p className="text-2xl font-bold text-white font-outfit">1,894</p>
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Requests Sent</p>
                  </div>
                  <div className="space-y-1 px-4 text-center">
                     <p className="text-2xl font-bold font-outfit gradient-sage">50k</p>
                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Daily Soft Limit</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </section>
    </div>
  );
}
