"use client";

import { useState } from "react";
import { Check, Copy, Terminal, Hash, ChevronRight } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 w-full max-w-full overflow-hidden rounded-2xl border border-white/5 bg-[#030712] shadow-2xl transition-all duration-300 hover:border-sage/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/40 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 border-r border-white/10 pr-3 mr-1">
            <div className="h-2 w-2 rounded-full bg-red-500/50" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
            <div className="h-2 w-2 rounded-full bg-green-500/50" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-sage opacity-70" />
            <span className="text-[10px] font-bold font-fira text-slate-500 uppercase tracking-widest">
              {filename || language}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border ${
            copied 
              ? "bg-sage/10 border-sage/20 text-sage" 
              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative overflow-x-auto custom-scrollbar p-5 md:p-6 font-fira text-xs md:text-sm leading-relaxed text-slate-300 selection:bg-sage/30">
        <div className="absolute left-0 top-0 h-full w-12 border-r border-white/5 bg-black/20 pointer-events-none select-none flex flex-col items-center pt-5 md:pt-6 gap-[1.1px] text-[10px] font-bold text-slate-700">
           {code.trim().split("\n").map((_, i) => (
             <span key={i} className="h-[1.4rem]">{i + 1}</span>
           ))}
        </div>
        <pre className="pl-10 md:pl-12 whitespace-pre">
          <code>
            {code.trim().split("\n").map((line, i) => (
              <div key={i} className="min-h-[1.4rem] flex items-center">
                {line.trim().startsWith("#") ? (
                  <span className="text-slate-600 italic">{line}</span>
                ) : line.trim().startsWith("gitsage") ? (
                  <>
                    <span className="text-sage font-bold">gitsage</span>
                    <span className="text-slate-400">{line.slice(7)}</span>
                  </>
                ) : (
                  <span className={line.includes("available") || line.includes("active") ? "text-slate-400" : ""}>
                    {line}
                  </span>
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Footer / Status decoration (matching user image hints) */}
      {code.includes("active") && (
        <div className="flex items-center gap-4 px-6 py-2 bg-sage/5 border-t border-white/5 opacity-80">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-sage uppercase tracking-wider">
               <Hash size={10} />
               Stealth Active
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-sky-400 uppercase tracking-wider">
               <ChevronRight size={10} />
               Ollama Ready
            </div>
        </div>
      )}
    </div>
  );
}
