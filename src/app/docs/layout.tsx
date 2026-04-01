"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X, ArrowLeft, Terminal, GitBranch, Github } from "lucide-react";
import DocsSidebar from "@/components/DocsSidebar";
import ScrollSpyTOC from "@/components/ScrollSpyTOC";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex w-full max-w-8xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* Toggle Button for Mobile Only */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-[120] p-4 rounded-full bg-sage shadow-2xl text-obsidian sage-glow transform active:scale-95 lg:hidden"
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>

        {/* Dynamic Sidebar Container */}
        <div className="flex flex-col lg:flex-row w-full gap-12 relative h-full">
           <DocsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
           
           {/* Content Wrapper Section */}
           <div className="flex-1 w-full flex flex-col lg:flex-row gap-16 relative">
              {/* Main Content Area */}
              <main className="flex-1 max-w-4xl w-full min-h-[calc(100vh-16rem)]">
                 <AnimatePresence mode="wait">
                    <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                       {children}
                    </motion.div>
                 </AnimatePresence>

                 {/* Footer Support Callout in Content Area */}
                 <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Terminal size={14} className="text-sage" /> Next.js 14.2 // stable
                    </p>
                    <Link href="https://github.com" target="_blank" className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-sage transition-all">
                       View on GitHub <ChevronRight size={14} />
                    </Link>
                 </div>
              </main>

              {/* TOC Section on Right (Desktop Only) */}
              <aside className="hidden xl:block w-64 h-full sticky top-32 max-h-[80vh] overflow-hidden pr-4">
                 <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 w-fit">
                    <div className="w-1 h-1 rounded-full bg-sage animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-fira">Global Intelligence Stream</span>
                 </div>
                 <ScrollSpyTOC />
                 <div className="mt-auto pt-10 border-t border-white/5 space-y-4 px-4 overflow-hidden">
                    <div className="p-4 rounded-2xl bg-sage/5 border border-sage/10 text-[10px] text-slate-400 font-medium leading-relaxed">
                       PRO TIP: Use <span className="font-fira text-sage">gitsage --local</span> to run inference on your local GPU via Ollama. No cloud connection required.
                    </div>
                 </div>
              </aside>
           </div>
        </div>
      </div>
    </div>
  );
}
