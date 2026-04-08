"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Key, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu, 
  X,
  User,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/usage", label: "Usage Stats", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Authentication Redirect - Hardened Guard
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("gitsage_access_token");
      if (!isLoading && !user && !token) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#020617]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-sage/20 border border-sage/40 flex items-center justify-center animate-pulse">
              <LayoutDashboard size={24} className="text-sage" />
           </div>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Initializing Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isDesktop && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative flex flex-col h-full bg-[#030712] border-r border-white/5 z-50 transition-all duration-300 ease-in-out",
          // Mobile classes
          !isDesktop && (isSidebarOpen ? "translate-x-0 w-[240px] sm:w-[280px]" : "-translate-x-full w-[240px] sm:w-[280px]"),
          // Desktop classes
          isDesktop && (isSidebarOpen ? "translate-x-0 w-[280px]" : "translate-x-0 w-20")
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5 mb-6 overflow-hidden shrink-0">
          <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center shrink-0">
             <LayoutDashboard size={18} className="text-obsidian" />
          </div>
          {isSidebarOpen && (
            <span className="font-outfit font-bold text-lg tracking-tight gradient-sage whitespace-nowrap">
              GitSage Central
            </span>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {DASHBOARD_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => { if (!isDesktop) setIsSidebarOpen(false); }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-sage/10 text-sage border border-sage/10" 
                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon size={20} className={cn(isActive ? "text-sage" : "text-slate-600 group-hover:text-slate-400")} />
                {isSidebarOpen && <span className="whitespace-nowrap">{link.label}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div layoutId="dashboard-link-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-white/5 mt-auto overflow-hidden shrink-0">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all text-left",
            !isSidebarOpen && "p-2 justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center shrink-0">
              <User size={18} className="text-slate-400" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate text-white uppercase tracking-tighter">{user?.name || "Member"}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || "loading..."}</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={logout}
            className={cn(
              "w-full mt-3 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Disconnect</span>}
          </button>
        </div>

        {/* Toggle Sidebar Button (Desktop Only) */}
        {isDesktop && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-slate-500 hover:text-sage transition-colors z-50 shadow-xl"
          >
            {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 custom-scrollbar relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
         
         {/* Top Bar for Dashboard */}
         <div className="flex justify-between items-center mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-white/5 gap-4">
            <div className="flex items-center gap-4">
               {!isDesktop && (
                 <button 
                   onClick={() => setIsSidebarOpen(true)} 
                   className="p-2 -ml-2 text-slate-400 hover:text-white"
                 >
                   <Menu size={24} />
                 </button>
               )}
               <div>
                  <h1 className="text-lg sm:text-xl font-bold font-outfit text-white">Dashboard Portal</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Status: Operational</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/docs" className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-sage transition-all">
                  <span className="hidden sm:inline">Documentation</span> <ExternalLink size={12} />
               </Link>
            </div>
         </div>
         
         <div className="max-w-6xl mx-auto">
            {children}
         </div>
      </main>
    </div>
  );
}
