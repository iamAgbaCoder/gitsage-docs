"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, CheckCircle, ChevronRight, RefreshCw, Cpu, Zap, Activity, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DIFF_SNIPPET = `diff --git a/src/auth/middleware.py b/src/auth/middleware.py
@@ -42,6 +42,19 @@ class AuthMiddleware:
+    def validate_token_expiry(self, token: str) -> bool:
+        """Check if JWT token is expired."""
+        try:
+            payload = jwt.decode(token, options={"verify_exp": True})
+            exp = payload.get("exp", 0)
+            remaining = exp - time.time()
+            return remaining > TOKEN_REFRESH_THRESHOLD
+        except jwt.ExpiredSignatureError:
+            self._invalidate_session(token)
+            return False`;

const SUGGESTED_COMMIT = {
  type: "feat",
  scope: "auth",
  message: "add proactive JWT token expiry validation",
  body: "Implements validate_token_expiry() to verify JWT tokens before expiry threshold, automatically invalidating stale sessions.",
  confidence: 91,
  reach: ["auth/middleware.py", "core/session_manager.py"],
};

type Phase = "idle" | "analyzing" | "done";

export default function CommitSimulator() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [confidence, setConfidence] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  const loadingSteps = [
    "Reading diff context...",
    "Identifying scope & reach...",
    "Extracting intent signals...",
    "Applying Conventional Commits...",
    "Computing confidence score...",
  ];

  const runSimulation = async () => {
    setPhase("analyzing");
    setConfidence(0);

    for (const step of loadingSteps) {
      setLoadingText(step);
      await new Promise(r => setTimeout(r, 600));
    }

    setPhase("done");
    
    // Animate confidence
    let c = 0;
    const interval = setInterval(() => {
      c += 2;
      if (c >= SUGGESTED_COMMIT.confidence) {
        setConfidence(SUGGESTED_COMMIT.confidence);
        clearInterval(interval);
      } else {
        setConfidence(c);
      }
    }, 20);
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-strong rounded-[32px] overflow-hidden border-sage/20 shadow-2xl relative">
      {/* Glow Effect */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sage/10 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
           <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
           <span className="text-[10px] font-bold font-fira text-sage tracking-[0.2em] uppercase">Intelligence Simulation</span>
        </div>
        <div className="flex gap-1.5 opacity-30">
           <div className="w-1.5 h-1.5 rounded-full bg-white" />
           <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Diff Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <GitBranch size={10} className="text-sky-400" />
              Diff context: auth/middleware.py
            </span>
          </div>
          <div className="bg-obsidian/80 border border-white/5 rounded-2xl p-4 md:p-5 font-fira text-[11px] md:text-xs leading-relaxed overflow-x-auto custom-scrollbar shadow-inner max-h-[180px]">
            {DIFF_SNIPPET.split("\n").map((line, i) => (
              <div key={i} className={line.startsWith("+") ? "text-sage" : line.startsWith("@@") ? "text-sky-400 opacity-70" : "text-slate-500"}>
                {line || "\u00a0"}
              </div>
            ))}
          </div>
        </div>

        {/* Action / Output */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.button
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={runSimulation}
              className="btn-sage w-full justify-center py-4 bg-gradient-to-br from-sage to-green-600 rounded-2xl shadow-[0_10px_40px_rgba(34,197,94,0.2)]"
            >
              <Brain size={18} className="fill-current" />
              Analyze Intelligence
            </motion.button>
          )}

          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-sage/5 border border-sage/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                   className="p-3 bg-sage/10 rounded-full"
                 >
                   <Cpu size={32} className="text-sage" />
                 </motion.div>
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ repeat: Infinity, duration: 1.5 }}
                   className="absolute inset-0 bg-sage/20 blur-xl rounded-full -z-10"
                 />
              </div>
              <div className="space-y-1">
                <p className="text-sage font-fira text-sm font-bold tracking-tight">{loadingText}</p>
                <div className="flex items-center gap-1.5 justify-center">
                   <Activity size={10} className="text-slate-500 animate-pulse" />
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-fira">Computing Inference...</p>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-sage/5 border border-sage/20 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                   <div className="flex items-center gap-2">
                     <CheckCircle size={16} className="text-sage" />
                     <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Intelligence Report</span>
                   </div>
                   <div className="px-2 py-0.5 rounded bg-sage/10 text-[10px] font-bold text-sage border border-sage/20 uppercase tracking-tighter">Verified</div>
                </div>

                {/* Commit block */}
                <div className="space-y-3">
                  <div className="font-fira text-[12px] md:text-sm bg-obsidian border border-white/5 p-4 rounded-xl shadow-inner">
                    <span className="text-sky-400 font-bold">{SUGGESTED_COMMIT.type}</span>
                    <span className="text-slate-600">(</span>
                    <span className="text-orange-400">{SUGGESTED_COMMIT.scope}</span>
                    <span className="text-slate-600">):</span> {SUGGESTED_COMMIT.message}
                    <div className="mt-2 pt-2 border-t border-white/5 text-slate-500 text-[11px] leading-relaxed italic">{SUGGESTED_COMMIT.body}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <span>Trust Index</span>
                       <span className="text-sage">{confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        className="h-full bg-gradient-to-r from-sage to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                       />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-left">Affected Scopes</div>
                    <div className="flex flex-wrap gap-1 justify-start">
                       {SUGGESTED_COMMIT.reach.map(r => (
                         <span key={r} className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[9px] font-fira border border-sky-500/20">{r.split('/').pop()}</span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPhase("idle")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <RefreshCw size={14} />
                  Reset
                </button>
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sage/5 border border-sage/10 text-sage text-xs font-bold uppercase tracking-widest cursor-default">
                  <Activity size={14} />
                  Live Sync
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
