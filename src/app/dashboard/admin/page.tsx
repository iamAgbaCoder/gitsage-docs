"use client";

import React from "react";
import useSWR from "swr";
import { GitSageAPI } from "@/lib/api";
import { 
  BarChart3, Globe, Shield, Activity, Users, Database, Server, Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

// Fetchers for SWR
const fetcherAdmin = () => GitSageAPI.getAdminDashboard();
const fetcherTelemetry = () => GitSageAPI.getTelemetryMetrics();

export default function AdminDashboardPage() {
  const { data: adminData, error: adminError, isLoading: loadingAdmin } = useSWR("/v1/admin/dashboard", fetcherAdmin, { refreshInterval: 60000 });
  const { data: telemetryData, error: telemetryError, isLoading: loadingTelemetry } = useSWR("/v1/telemetry/metrics", fetcherTelemetry, { refreshInterval: 60000 });

  const isLoading = loadingAdmin || loadingTelemetry;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (adminError?.response?.status === 403) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
        <Shield size={64} className="text-red-500 opacity-50" />
        <h2 className="text-2xl font-bold text-white font-outfit uppercase">Access Denied</h2>
        <p className="text-slate-400">You must be the designated Creator to view global telemetry.</p>
      </div>
    );
  }

  if (isLoading && !adminData) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-20 bg-white/5 rounded-2xl w-2/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="h-32 bg-white/5 rounded-xl"></div>
           <div className="h-32 bg-white/5 rounded-xl"></div>
           <div className="h-32 bg-white/5 rounded-xl"></div>
           <div className="h-32 bg-white/5 rounded-xl"></div>
        </div>
        <div className="h-96 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  // Safe Fallbacks
  const stats: any = adminData || {};
  const metrics: any = telemetryData || {};
  
  const requestsOverTime = stats.requests_over_time || [];
  const events30Days = metrics.events_last_30_days || [];
  const topProviders = stats.top_providers || [];
  const topEndpoints = stats.top_endpoints || [];
  const topCountries = metrics.top_countries || [];
  const topCommits = metrics.top_commits || [];

  const COLORS = ['#22c55e', '#38bdf8', '#f59e0b', '#a855f7', '#ec4899'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-12"
    >
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-rose-400 uppercase tracking-[0.2em] text-[10px] font-bold">
           <Shield size={12} />
           Creator Command Center
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-outfit text-white">Global Telemetry</h1>
        <p className="text-slate-400 text-sm sm:text-base">Real-time overview of entire GitSage API traffic, node health, and user metrics.</p>
      </section>

      {/* Primary KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Requests", value: stats.total_api_requests || 0, icon: Activity, color: "text-sky-400", bg: "bg-sky-400/10" },
           { label: "LLM Tokens", value: stats.total_llm_tokens_consumed || 0, icon: Database, color: "text-sage", bg: "bg-sage/10" },
           { label: "CLI Users", value: metrics.total_cli_users || 0, icon: Server, color: "text-sage", bg: "bg-sage/10" },
           { label: "Registered Users", value: stats.total_registered_users || 0, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
           { label: "Total Page Views", value: metrics.total_page_views || 0, icon: Globe, color: "text-amber-400", bg: "bg-amber-400/10" },
         ].map((stat) => (
           <motion.div key={stat.label} variants={itemVariants}>
             <Card variant="glass" className="p-6 h-full transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                   <div className={stat.bg + " p-2 rounded-lg"}>
                      <stat.icon size={20} className={stat.color} />
                   </div>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-white font-outfit tracking-tight leading-none">{stat.value.toLocaleString()}</h4>
             </Card>
           </motion.div>
         ))}
      </section>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Traffic */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-[400px] flex flex-col p-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">API Requests Pulse</h3>
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={requestsOverTime}>
                   <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#fff', fontSize: '12px' }}
                     itemStyle={{ color: '#22c55e' }}
                   />
                   <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-[400px] flex flex-col p-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">CLI Events (30 Days)</h3>
            <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={events30Days}>
                   <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#fff', fontSize: '12px' }}
                     itemStyle={{ color: '#22c55e' }}
                   />
                   <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.div variants={itemVariants}>
            <Card variant="glass" className="p-6 h-full flex flex-col">
               <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Top Endpoint Volume</h3>
               <div className="flex-1 space-y-4">
                  {topEndpoints.slice(0, 5).map((ep: any) => (
                    <div key={ep.endpoint} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="font-outfit text-white text-sm truncate max-w-[200px]">{ep.endpoint}</span>
                       <span className="text-slate-400 text-sm font-bold">{ep.count.toLocaleString()}</span>
                    </div>
                  ))}
                  {topEndpoints.length === 0 && <p className="text-slate-500 text-sm italic">No endpoint data available.</p>}
               </div>
            </Card>
         </motion.div>

         <motion.div variants={itemVariants}>
            <Card variant="glass" className="p-6 h-full flex flex-col">
               <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Top Commit Intelligence</h3>
               <div className="flex-1 space-y-4">
                  {topCommits.slice(0, 5).map((commit: any) => (
                    <div key={commit.commit_message} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="font-outfit text-white text-sm truncate max-w-[200px]">{commit.commit_message}</span>
                       <span className="text-sage text-sm font-bold">{commit.count.toLocaleString()} hits</span>
                    </div>
                  ))}
                  {topCommits.length === 0 && <p className="text-slate-500 text-sm italic">No commit telemetry found.</p>}
               </div>
            </Card>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="p-6">
             <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Provider Distribution</h3>
             <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={topProviders}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="count"
                     nameKey="provider"
                   >
                     {topProviders.map((entry: any, index: number) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#fff', fontSize: '12px' }} />
                   <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
           <Card variant="glass" className="p-6 h-full flex flex-col">
              <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Regional Reach (Top Countries)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {topCountries.map((c: any) => (
                   <div key={c.country} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-white">{c.country}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{c.count} Views</span>
                   </div>
                 ))}
                 {topCountries.length === 0 && <p className="text-slate-500 text-sm italic col-span-full text-center py-10">Waiting for global signals...</p>}
              </div>
           </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
