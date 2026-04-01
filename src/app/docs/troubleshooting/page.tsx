import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle, Info, LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting | GitSage",
  description: "Common issues and solutions for GitSage — empty diffs, API timeouts, provider errors.",
};

const ISSUES = [
  {
    id: "empty-diff",
    title: "Empty Diff / No Staged Changes",
    badge: { label: "Common", color: "text-sage", bg: "bg-sage/10", border: "border-sage/20" },
    symptom: "GitSage exits with: No staged changes found.",
    cause: "You haven't staged any files before running GitSage.",
    solution: `# Stage specific files\ngit add src/auth/middleware.py\n\n# Or stage all modified files\ngit add -A\n\n# Then run\ngitsage`,
  },
  {
    id: "api-timeout",
    title: "API Timeout / Connection Error",
    badge: { label: "Network", color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" },
    symptom: "ReadTimeout: Gemini API did not respond within 30 seconds.",
    cause: "Network instability or Gemini service disruption. GitSage has built-in retry logic with graceful fallback.",
    solution: `# GitSage auto-retries 3 times, then prompts:\n# "Gemini unavailable. Switch to local? (y/n)"\n\n# Force local mode for this commit:\ngitsage --provider local\n\n# Or increase timeout in config:\ngitsage config --timeout 60`,
  },
  {
    id: "invalid-api-key",
    title: "Invalid API Key (401 Error)",
    badge: { label: "Auth", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    symptom: "Error: GEMINI_API_KEY is invalid or missing.",
    cause: "The API key is not set, has expired, or is incorrectly formatted.",
    solution: `# Verify your environment variable\necho $GEMINI_API_KEY\n\n# Reset the key\ngitsage config --provider gemini --key YOUR_NEW_KEY\n\n# Get a new key from:\n# https://aistudio.google.com`,
  }
];

export default function TroubleshootingPage() {
  return (
    <article className="max-w-4xl">
      <header className="mb-12 pb-12 border-b border-white/5 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-6 font-fira">
           <LifeBuoy size={12} />
           Troubleshooting
        </div>
        <h1 className="text-4xl md:text-5xl font-outfit font-bold text-slate-50 tracking-tight mb-6">
          Common Issues
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          Quick solutions for the most frequent technical hurdles when using the GitSage intelligence engine.
        </p>
      </header>

      <div className="space-y-16">
        {ISSUES.map((issue) => (
          <section key={issue.id} className="scroll-mt-32" id={issue.id}>
            <div className="flex items-center gap-4 mb-6">
               <h2 className="text-2xl font-bold text-slate-50 tracking-tight">{issue.title}</h2>
               <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${issue.badge.color} ${issue.badge.bg} border ${issue.badge.border}`}>
                  {issue.badge.label}
               </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
               <div className="glass p-5 rounded-2xl border-l-4 border-l-red-500/50">
                  <div className="flex items-center gap-2 mb-2 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                     <AlertCircle size={14} />
                     Symptom
                  </div>
                  <p className="font-fira text-xs text-slate-400 leading-relaxed font-medium">
                    {issue.symptom}
                  </p>
               </div>
               <div className="glass p-5 rounded-2xl border-l-4 border-l-amber-500/50">
                  <div className="flex items-center gap-2 mb-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                     <Info size={14} />
                     Root Cause
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {issue.cause}
                  </p>
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-2 text-sage text-[10px] font-bold uppercase tracking-widest">
                  <CheckCircle size={14} />
                  Resolution
               </div>
               <CodeBlock code={issue.solution} language="bash" />
            </div>
          </section>
        ))}
      </div>

      {/* Community Callout */}
      <div className="mt-20 p-8 glass-strong rounded-3xl border border-sage/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sage/10 blur-3xl -mr-16 -mt-16" />
        <p className="relative z-10 text-slate-400 leading-relaxed mb-0">
          Still stuck? Join our community or open a technical report on 
          <a href="https://github.com" className="text-sky-400 hover:text-sky-300 ml-1 font-medium underline underline-offset-4 transition-colors">
            GitHub Issues
          </a>
          . Please include your OS details and gitsage --version output.
        </p>
      </div>

      <div className="mt-12 flex">
        <Link href="/docs" className="flex items-center gap-2 text-slate-500 hover:text-sage transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Documentation
        </Link>
      </div>
    </article>
  );
}
