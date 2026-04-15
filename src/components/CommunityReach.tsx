"use client";

import React, { useState, useEffect } from "react";
import { Globe, Users, TrendingUp, Search } from "lucide-react";
import { GitSageAPI } from "@/lib/api";
import { motion } from "framer-motion";

export default function CommunityReach() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await GitSageAPI.getTelemetryMetrics();
        setMetrics(res);
      } catch (err) {
        console.warn("Failed to fetch community metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const stats = [
    { 
      label: "Global Reach", 
      value: metrics?.top_countries?.length ? `${metrics.top_countries.length}+ Countries` : "Global", 
      icon: Globe, 
      color: "text-sky-400" 
    },
    { 
      label: "Active Nodes", 
      value: metrics?.total_cli_users ? `${metrics.total_cli_users}` : "Connected", 
      icon: Users, 
      color: "text-sage" 
    },
    { 
      label: "Intelligence Page Views", 
      value: metrics?.total_page_views ? `${(metrics.total_page_views / 1000).toFixed(1)}k+` : "Growing", 
      icon: TrendingUp, 
      color: "text-purple-400" 
    }
  ];

  if (loading) return (
    <div className="flex justify-center gap-12 animate-pulse opacity-50">
       {[1, 2, 3].map(i => <div key={i} className="h-12 w-32 bg-white/5 rounded-xl border border-white/5" />)}
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
      {stats.map((s, i) => (
        <motion.div 
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center text-center gap-2 group"
        >
          <div className={`p-3 rounded-full bg-white/5 border border-white/5 ${s.color} transition-transform group-hover:scale-110`}>
             <s.icon size={20} />
          </div>
          <div className="space-y-0.5">
             <div className="text-xl md:text-2xl font-bold text-white font-outfit">{s.value}</div>
             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
