"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Cpu, Zap, GitBranch, Globe, Lock, Command, Search, CheckCircle2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "prompt" | "output" | "error" | "info" | "success" | "report";
  text: string;
  icon?: any;
}

const COMMAND_RESPONSES: Record<string, TerminalLine[]> = {
  help: [
    { type: "info", text: "GitSage v1.2.0 — AI-powered Git Intelligence", icon: Terminal },
    { type: "success", text: "Available commands:" },
    { type: "output", text: "  gitsage          Run full analysis on staged changes" },
    { type: "output", text: "  gitsage -c        Stage all & commit with AI message" },
    { type: "output", text: "  gitsage config    Configure provider & preferences" },
    { type: "output", text: "  gitsage --local   Use local Ollama model (privacy mode)" },
    { type: "output", text: "  clear             Clear terminal" },
  ],
  "gitsage": [
    { type: "info", text: "Scanning staged changes...", icon: Search },
    { type: "output", text: "  → 3 files modified, 47 insertions, 12 deletions" },
    { type: "info", text: "Connecting to GitSage Intelligence Engine...", icon: Cpu },
    { type: "output", text: "  → Model loaded in 0.3s" },
    { type: "info", text: "Generating intelligence report...", icon: Zap },
    { type: "report", text: "Suggesting: feat(auth): add JWT token expiry validation" },
    { type: "success", text: "Confidence: ████████████████████░░  91%" },
  ],
  "gitsage --local": [
    { type: "info", text: "Switching to Stealth Mode...", icon: Lock },
    { type: "success", text: "Ollama connected — mistral:7b active", icon: CheckCircle2 },
    { type: "output", text: "Context isolated. No data leaving machine." },
  ]
};

export default function LiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "info", text: "GitSage v1.2.0 (Stable) — build 0x7A23", icon: Terminal },
    { type: "output", text: "Type 'help' to explore the intelligence engine." },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim();
    setLines(prev => [...prev, { type: "prompt", text: cmd }]);
    setInput("");
    setIsProcessing(true);

    if (cmd === "clear") {
      setLines([]);
      setIsProcessing(false);
      return;
    }

    const response = COMMAND_RESPONSES[cmd] || [
      { type: "error", text: `Command not found: ${cmd}` }
    ];

    for (const line of response) {
      await new Promise(r => setTimeout(r, 150));
      setLines(prev => [...prev, line]);
    }

    setIsProcessing(false);
  };

  return (
    <div className="group relative w-full h-[400px] glass overflow-hidden rounded-2xl border border-sage/20 shadow-2xl transition-all duration-500 hover:border-sage/40">
      {/* Hacker Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-sage/10 bg-black/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-fira text-slate-500 uppercase tracking-widest">
           <Command size={10} />
           gitsage — 80x24
        </div>
        <div className="w-8" />
      </div>

      {/* Body */}
      <div 
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="relative z-20 h-[calc(100%-40px)] p-6 overflow-y-auto font-fira text-sm selection:bg-sage/40 custom-scrollbar cursor-text"
      >
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-1.5 flex items-start gap-2 ${
                line.type === "prompt" ? "text-sage" :
                line.type === "error" ? "text-red-400" :
                line.type === "success" ? "text-green-400" :
                line.type === "info" ? "text-sky-400" :
                line.type === "report" ? "text-purple-400 font-bold" :
                "text-slate-500"
              }`}
            >
              <span className="shrink-0 opacity-50 mt-1">
                {line.type === "prompt" ? "❯" : line.icon ? <line.icon size={12} strokeWidth={2.5} /> : "·"}
              </span>
              <span className="whitespace-pre-wrap">{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
          <span className="text-sage font-bold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-slate-50 font-fira caret-sage"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          {isProcessing && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Cpu size={14} className="text-sage" />
            </motion.div>
          )}
          {!isProcessing && (
            <div className="w-2 h-4 bg-sage/60 animate-pulse" />
          )}
        </form>

        {/* Extra hacker info at bottom */}
        <div className="mt-8 pt-4 border-t border-white/5 opacity-20 text-[10px] text-slate-500 space-y-1">
           <div className="flex items-center gap-2">
             <Activity size={10} />
             LOCAL_TIME: {mounted ? new Date().toLocaleTimeString() : "--:--:--"}
           </div>
           <div>ENC_STAGED: ACTIVE</div>
           <div>PROVIDER: {lines.some(l => l.text.includes("Ollama")) ? "OLLAMA" : "GITSAGE_API"}</div>
        </div>
      </div>
    </div>
  );
}
