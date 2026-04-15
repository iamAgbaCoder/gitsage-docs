"use client";

import React from "react";
import useSWR from "swr";
import { BarChart3, TrendingUp, RefreshCw, Activity, ArrowUpRight, ArrowDownRight, Zap, Database, Clock, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GitSageAPI } from "@/lib/api";
import { motion } from "framer-motion";

const fetcher = () => GitSageAPI.getUsageStats();

export default function UsageStatsPage() {
  const { user } = useAuth();
  
  // SWR: Cache for 5 minutes (dedupingInterval: 300000), revalidate on focus, poll every 60s
  const { data: stats, error, isLoading: isValidating, mutate } = useSWR("/v1/usage/stats", fetcher, {
    dedupingInterval: 300000,
    refreshInterval: 60000,
  });

  const isLoading = !stats && isValidating;

  const currentUsage = stats?.total_requests || 0;
  const limit = 100;
  const percentage = Math.min((currentUsage / limit) * 100, 100);

  const formatLatency = (ms: number) => {
    if (!ms) return "0ms";
    return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-20 bg-white/5 rounded-2xl w-[60%] border border-white/5"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 h-80 bg-white/5 rounded-3xl border border-white/5"></div>
           <div className="space-y-6">
              <div className="h-[150px] bg-white/5 rounded-3xl border border-white/5"></div>
              <div className="h-[150px] bg-white/5 rounded-3xl border border-white/5"></div>
           </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="h-24 bg-white/5 rounded-2xl"></div>
           <div className="h-24 bg-white/5 rounded-2xl"></div>
           <div className="h-24 bg-white/5 rounded-2xl"></div>
           <div className="h-24 bg-white/5 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-12"
    >
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-sky-400 uppercase tracking-[0.2em] text-[10px] font-bold">
              <Activity size={12} />
              Telemetry Engine
           </div>
           <h1 className="text-3xl sm:text-4xl font-bold font-outfit text-white">Resource Intelligence</h1>
           <p className="text-slate-400 max-w-lg text-sm sm:text-base">Real-time analysis of your engine consumption, token distribution, and inference frequency across your active keys.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            GitSageAPI.invalidateCache("/v1/usage/stats");
            mutate();
          }}
          disabled={isValidating}
          className="w-full sm:w-auto"
        >
          {isValidating ? <RefreshCw size={14} className="animate-spin mr-2" /> : <RefreshCw size={14} className="mr-2" />}
          Refresh Metrics
        </Button>
      </section>

      {/* Usage Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Main Consumption Gauge */}
         <motion.div variants={itemVariants} className="md:col-span-2">
           <Card variant="glow" className="h-full flex flex-col p-8 bg-gradient-to-br from-sage/5 to-transparent">
              <div className="flex items-center justify-between mb-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inference Quota Status</p>
                    <h3 className="text-2xl font-bold text-white font-outfit uppercase tracking-tighter">Usage Pressure</h3>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-4xl font-bold text-sage font-fira">{percentage}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Limit: 100/day</span>
                 </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-8">
                 <div className="relative h-4 w-full bg-white/5 rounded-full border border-white/5 p-0.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-sage via-sky-400 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    />
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
                    {[
                      { label: "Queries", value: currentUsage, suffix: "Total" },
                      { label: "Avg Latency", value: formatLatency(stats?.avg_response_time), suffix: "Intelligence" },
                      { label: "Token Pulse", value: stats?.total_tokens || "0", suffix: "Total Consumed" },
                    ].map((m) => (
                       <div key={m.label} className="space-y-1">
                          <p className="text-2xl font-bold text-white font-outfit">{m.value}</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">{m.label}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </Card>
         </motion.div>

         {/* Health Metric Sidebar */}
         <motion.div variants={itemVariants} className="space-y-6">
            <Card variant="glass" className="p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700"><TrendingUp size={80} /></div>
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest"><TrendingUp size={14} /> Peak Performance</div>
                  <div className="space-y-1">
                     <h4 className="text-2xl font-bold text-white font-outfit leading-none">99.4%</h4>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Confidence Consistency</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-sage">
                     <ArrowUpRight size={12} />
                     +2.4% vs Previous Cycle
                  </div>
               </div>
            </Card>

            <Card variant="glass" className="p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700"><RefreshCw size={80} /></div>
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest"><RefreshCw size={14} /> Inference Frequency</div>
                  <div className="space-y-1">
                     <h4 className="text-2xl font-bold text-white font-outfit leading-none">1.2s</h4>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Avg Analysis Speed</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                     <Activity size={12} />
                     Stabilized: Edge Processing Enabled
                  </div>
               </div>
            </Card>
         </motion.div>
      </section>

      {/* Metrics Row Section */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: "Token Density", value: "24.5k", icon: Database, color: "text-sky-400", bg: "bg-sky-400/10" },
           { label: "Peak Load", value: "14:20 UTC", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
           { label: "Engine Uptime", value: "99.99%", icon: Zap, color: "text-sage", bg: "bg-sage/10" },
           { label: "Nodes Connected", value: "12 Global", icon: Globe, color: "text-purple-400", bg: "bg-purple-400/10" },
         ].map((stat) => (
           <motion.div key={stat.label} variants={itemVariants}>
             <Card variant="glass" className="p-6 h-full transition-transform hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-4">
                   <div className={stat.bg + " p-2 rounded-lg group-hover:scale-110 transition-transform"}>
                      <stat.icon size={20} className={stat.color} />
                   </div>
                   <Activity size={12} className="text-slate-700" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h4 className="text-xl font-bold text-white font-outfit tracking-tight leading-none">{stat.value}</h4>
             </Card>
           </motion.div>
         ))}
      </section>

      {/* Empty State / Bottom Notice */}
      <motion.section variants={itemVariants} className="p-12 text-center space-y-6 glass border-white/5 rounded-3xl">
         <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-600"><Zap size={24} /></div>
         <div className="space-y-2">
            <h3 className="font-bold text-white uppercase tracking-tighter">Intelligence Telemetry</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">Usage metrics are aggregated and displayed here after each successful GitSage analysis. Real-time updates may take up to 2 minutes to finalize.</p>
         </div>
      </motion.section>
    </motion.div>
  );
}
