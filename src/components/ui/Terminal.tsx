"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight, Cpu, Activity, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps {
  title?: string;
  initialLines?: { type: string; text: string; icon?: any }[];
  commandPrompt?: string;
  className?: string;
}

export function TerminalComponent({ 
  title = "gitsage — 80x24", 
  initialLines = [], 
  commandPrompt = "$ gitsage",
  className 
}: TerminalProps) {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newCmd = input.trim();
    setLines([...lines, { type: "prompt", text: newCmd }]);
    setInput("");
    
    // Simulate processing
    setIsTyping(true);
    setTimeout(() => {
      setLines(prev => [...prev, { type: "info", text: "Analyzing changes...", icon: Activity }]);
      setTimeout(() => {
         setLines(prev => [...prev, { type: "success", text: "Intelligence generated.", icon: CheckCircle2 }]);
         setIsTyping(false);
      }, 800);
    }, 400);
  };

  return (
    <div className={cn("group rounded-2xl overflow-hidden border border-white/5 bg-[#030712] shadow-2xl flex flex-col", className)}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
         <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
         </div>
         <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest font-fira truncate px-4">
            <TerminalIcon size={10} className="text-sage opacity-50" />
            {title}
         </div>
         <div className="w-10" />
      </div>

      {/* Terminal Screen */}
      <div 
        ref={scrollRef}
        className="p-6 h-[300px] overflow-y-auto font-fira text-sm selection:bg-sage/30 custom-scrollbar scroll-smooth"
      >
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -4 }} 
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex items-start gap-2.5",
                line.type === "prompt" ? "text-sage" : 
                line.type === "error" ? "text-red-400" :
                line.type === "success" ? "text-emerald-400" :
                "text-slate-400"
              )}
            >
              <span className="shrink-0 opacity-40 mt-1">
                 {line.type === "prompt" ? "❯" : line.icon ? <line.icon size={12} strokeWidth={2.5} /> : "·"}
              </span>
              <span className="leading-relaxed whitespace-pre-wrap">{line.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Command Input Area */}
        <form onSubmit={handleCommand} className="mt-4 flex items-center gap-2.5 group">
           <span className="text-sage font-bold shrink-0">❯</span>
           <input 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             disabled={isTyping}
             placeholder="Type a command..."
             className="flex-1 bg-transparent border-none outline-none text-white font-fira placeholder-slate-800"
             autoFocus
           />
           {isTyping && (
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
               <Cpu size={14} className="text-sage" />
             </motion.div>
           )}
        </form>
      </div>

      {/* Footer Status */}
      <div className="px-6 py-2 bg-black/20 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2 text-[8px] font-bold text-slate-700 uppercase tracking-[0.2em]">
            <Activity size={10} /> Operational
         </div>
         <div className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.2em]">
            Central Node: Secure
         </div>
      </div>
    </div>
  );
}
