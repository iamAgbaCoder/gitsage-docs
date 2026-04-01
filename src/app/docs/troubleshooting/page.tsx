import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle2, Info, LifeBuoy, ChevronRight, Activity, Zap, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Troubleshooting | GitSage",
  description: "Common issues and solutions for GitSage — empty diffs, API timeouts, provider errors.",
};

const ISSUES = [
  {
    id: "empty-diff",
    title: "Empty Diff Detection",
    badge: "Common",
    symptom: "GitSage exits with: No staged changes found.",
    cause: "The intelligence engine requires specific files to be staged before it can analyze your intent.",
    solution: `# Stage specific files\ngit add src/auth/middleware.py\n\n# Or stage all modified files\ngit add -A\n\n# Then run analysis\ngitsage`,
  },
  {
    id: "api-timeout",
    title: "Intelligence Latency",
    badge: "Network",
    symptom: "ReadTimeout: Gemini API did not respond within 30 seconds.",
    cause: "Network instability or transient provider disruption. GitSage includes built-in retry logic but defaults to a 30s timeout.",
    solution: `# Switch to localized privacy mode (Ollama)\ngitsage --provider local\n\n# Or increase global timeout threshold\ngitsage config --timeout 60`,
  },
  {
    id: "invalid-api-key",
    title: "Identity Verification Failure",
    badge: "Auth",
    symptom: "Error: GEMINI_API_KEY is invalid or missing status 401.",
    cause: "The secret key provided is either malformed, expired, or has insufficient quota.",
    solution: `# Verify your environment state\ngitsage config --provider gemini --key YOUR_KEY\n\n# Get a fresh key from:\n# https://aistudio.google.com`,
  }
];

export default function TroubleshootingPage() {
  return (
    <article className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="space-y-4 pb-8 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full w-fit">
          <LifeBuoy size={14} className="text-amber-500" />
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Global Support</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white">
           Troubleshooting
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
           Solutions for common technical hurdles. If your issue persists, our intelligence team is always available via the GitHub repository.
        </p>
      </header>

      {/* Main Issues Flow */}
      <div className="space-y-16">
        {ISSUES.map((issue) => (
          <section key={issue.id} className="scroll-mt-32 space-y-6" id={issue.id}>
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold font-outfit text-white tracking-tight">{issue.title}</h2>
               <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  {issue.badge} Issue
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Symptom Card */}
               <Card variant="solid" className="border-red-500/10 bg-red-500/[0.02]">
                  <CardContent className="p-5 space-y-3">
                     <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest px-1">
                        <AlertCircle size={14} /> Symptom Identified
                     </div>
                     <p className="font-fira text-xs text-slate-400 leading-relaxed font-medium bg-black/40 p-3 rounded-lg border border-white/5 shadow-inner italic">
                       {issue.symptom}
                     </p>
                  </CardContent>
               </Card>

               {/* Cause Card */}
               <Card variant="glass">
                  <CardContent className="p-5 space-y-3">
                     <div className="flex items-center gap-2 text-sky-400 text-[10px] font-bold uppercase tracking-widest px-1">
                        <Activity size={14} /> Root Cause
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed font-outfit">
                       {issue.cause}
                     </p>
                  </CardContent>
               </Card>
            </div>

            {/* Resolution Section */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-sage text-[10px] font-bold uppercase tracking-widest px-1">
                  <CheckCircle2 size={14} /> Recommended Resolution
               </div>
               <CodeBlock code={issue.solution} language="bash" />
            </div>
          </section>
        ))}
      </div>

      {/* Footer Support Callout */}
      <footer className="mt-20 pt-16">
         <Card variant="glow" className="p-8 md:p-12 text-center space-y-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-sage/10 blur-[60px] rounded-full -z-10" />
            <div className="space-y-4">
               <h3 className="text-2xl font-bold font-outfit text-white">Still encountering anomalies?</h3>
               <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                  Join our developer community to report bugs, request features, or get direct support from the GitSage engineering team.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Link href="https://github.com" target="_blank" className="btn-sage group">
                  <ExternalLink size={16} /> Open GitHub Issue
               </Link>
               <Link href="/docs" className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-sage transition-all underline underline-offset-4 decoration-white/10 hover:decoration-sage">
                  <Zap size={14} /> Core Node Documentation
               </Link>
            </div>
         </Card>

         <div className="mt-12 flex justify-between items-center text-[10px] font-bold text-slate-700 uppercase tracking-widest">
            <Link href="/docs" className="flex items-center gap-2 hover:text-sage transition-all">
               <ArrowLeft size={12} /> Return to Intelligence Node
            </Link>
            <span>v1.2.x System Protocol</span>
         </div>
      </footer>
    </article>
  );
}
