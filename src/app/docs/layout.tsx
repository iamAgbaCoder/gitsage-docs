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
      
      {/* Mobile FAB */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-[120] p-4 rounded-full bg-sage shadow-2xl text-obsidian sage-glow transform active:scale-95 lg:hidden"
      >
        <Menu size={24} strokeWidth={2.5} />
      </button>

      <div className="flex-1 flex w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-24">
        {/* Three-column layout: sidebar | content | TOC */}
        <div className="flex w-full gap-0 lg:gap-10 xl:gap-12 items-start">

          {/* ── LEFT SIDEBAR (sticky on desktop, drawer on mobile) ── */}
          <DocsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 flex flex-col xl:flex-row gap-12 xl:gap-16 items-start">
            <main className="flex-1 min-w-0 w-full min-h-[calc(100vh-16rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>

              <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} className="text-sage" /> GitSage Docs
                </p>
                <Link href="https://github.com/iamAgbaCoder/GitSage" target="_blank" className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-sage transition-all">
                  View on GitHub <ChevronRight size={14} />
                </Link>
              </div>
            </main>

            {/* ── RIGHT TOC (sticky on desktop) ── */}
            <aside className="hidden xl:flex flex-col w-60 shrink-0 sticky top-32 self-start max-h-[calc(100vh-9rem)] overflow-y-auto scrollbar-none pr-2">
              <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 w-fit">
                <div className="w-1 h-1 rounded-full bg-sage animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-fira">On this page</span>
              </div>
              <ScrollSpyTOC />
              <div className="mt-8 pt-6 border-t border-white/5 space-y-4 px-4">
                <div className="p-4 rounded-2xl bg-sage/5 border border-sage/10 text-[10px] text-slate-400 font-medium leading-relaxed">
                  PRO TIP: Use <span className="font-fira text-sage">gitsage --local</span> to run inference on your local GPU via Ollama. No cloud required.
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </div>
  );
}
