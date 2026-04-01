"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Settings, Cpu, ChevronRight, Share2, Layers, Menu, X } from "lucide-react";

interface SidebarSection {
  title: string;
  icon: any;
  color: string;
  bg: string;
  links: { href: string; label: string }[];
}

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Getting Started",
    icon: Zap,
    color: "text-sage",
    bg: "bg-sage/10",
    links: [
      { href: "/docs/getting-started", label: "Installation" },
      { href: "/docs/quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Engine Report",
    icon: Cpu,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    links: [
      { href: "/docs/engine-report", label: "The Three Pillars" },
      { href: "/docs/confidence-score", label: "Confidence Score" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    links: [
      { href: "/docs/configuration", label: "Config Reference" },
      { href: "/docs/providers", label: "AI Providers" },
    ],
  },
  {
    title: "Guides",
    icon: BookOpen,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    links: [
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-sage shadow-2xl text-obsidian md:hidden flex items-center justify-center sage-glow transition-transform active:scale-95"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <nav className={`
        fixed inset-y-0 left-0 z-40 w-72 h-full bg-[#030712] border-r border-white/5 transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:bg-transparent md:border-none md:sticky md:top-24 md:max-h-[calc(100vh-120px)] md:overflow-y-auto md:pr-4 custom-scrollbar
      `}>
        {/* Version & Focus controls */}
        <div className="flex items-center gap-2 mb-8 px-6 md:px-2 pt-10 md:pt-0">
          <div className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
             <div className="flex items-center gap-2">
               <Layers size={12} className="text-sage" />
               v1.2.x
             </div>
             <ChevronRight size={10} />
          </div>
          <div className="p-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-sage transition-colors cursor-pointer">
             <Share2 size={12} />
          </div>
        </div>

        <div className="space-y-8 px-6 md:px-0 pb-20 md:pb-0">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 md:px-3 mb-3">
                <div className={`p-1 rounded-md ${section.bg}`}>
                  <section.icon size={12} className={section.color} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{section.title}</span>
              </div>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className={`
                          group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200
                          ${isActive 
                             ? "bg-sage/10 text-sage border border-sage/10" 
                             : "text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent"}
                        `}
                      >
                        <span className="relative">
                          {link.label}
                          {isActive && (
                            <motion.div 
                              layoutId="sidebar-active"
                              className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-3 bg-sage rounded-full"
                            />
                          )}
                        </span>
                        <ChevronRight 
                          size={12} 
                          className={`transition-all duration-200 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"}`} 
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
