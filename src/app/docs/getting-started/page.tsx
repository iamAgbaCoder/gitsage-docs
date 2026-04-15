import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Terminal, Key, ShieldCheck, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install GitSage and run your first AI-powered commit in under 2 minutes.",
};

export default function GettingStartedPage() {
  return (
    <article className="space-y-12">
      {/* Header Section */}
      <header className="space-y-4 pb-8 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-1 bg-sage/10 border border-sage/20 rounded-full w-fit">
          <Zap size={14} className="text-sage" />
          <span className="text-[10px] font-bold text-sage uppercase tracking-widest">Getting Started</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white">
           Installation Guide
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          GitSage is a lightweight, language-agnostic CLI tool that integrates directly with your Git workflow. 
          Supports Python, JavaScript, TypeScript, Go, Rust, and more. 
          Install it in seconds and start generating intelligence for your repository.
        </p>
      </header>

      {/* Overview Block */}
      <section className="space-y-4">
        <h2 id="overview" className="text-xl font-bold font-outfit text-white flex items-center gap-2">
           <Info size={20} className="text-sky-400" /> Overview
        </h2>
        <Card variant="glass">
           <CardContent className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                GitSage uses advanced Large Language Models (LLMs) to analyze your staged changes. 
                It doesn't just describe code; it understands the <strong>intent</strong>, <strong>impact</strong>, and <strong>reach</strong> of your commits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[
                  "No complex dependencies",
                  "Python 3.10+ compatible",
                  "Git 2.x integration",
                  "Blazing fast inference",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-sage shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
           </CardContent>
        </Card>
      </section>

      {/* Usage / Installation Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
           <h2 id="installation" className="text-xl font-bold font-outfit text-white flex items-center gap-2">
              <Terminal size={20} className="text-sage" /> Installation
           </h2>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">v1.0.0 stable</span>
        </div>
        <div className="space-y-6">
           <div className="space-y-2">
              <p className="text-sm text-slate-400">Install globally using pip (ensure your Python environment is active):</p>
              <CodeBlock code="pip install gitsage" language="bash" />
           </div>
           <div className="space-y-2">
              <p className="text-sm text-slate-400">Or upgrade to the latest intelligence engine:</p>
              <CodeBlock code="pip install --upgrade gitsage" language="bash" />
           </div>
        </div>
      </section>

      {/* API Configuration Block */}
      <section className="space-y-4">
        <h2 id="configuration" className="text-xl font-bold font-outfit text-white flex items-center gap-2">
           <Key size={20} className="text-amber-400" /> API Configuration
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
           GitSage uses centralized intelligence by default. 
           Acquire your production API key by signing up on our 
           <Link href="/dashboard" className="text-sage hover:underline mx-1">GitSage Portal</Link> 
           and configure your environment:
        </p>
        <Card variant="solid" className="border-amber-400/20">
           <CardContent className="space-y-4">
              <CodeBlock 
                code={`# Authenticate via GitSage CLI (Recommended)\ngitsage auth --token YOUR_GITSAGE_KEY`} 
                language="bash" 
              />
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/70 text-xs leading-relaxed">
                 <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                 <p>
                    <strong>Security Warning:</strong> Never share your API keys or commit them to public repositories. 
                    GitSage stores keys locally in your secure user configuration directory.
                 </p>
              </div>
           </CardContent>
        </Card>
      </section>

      {/* Setup Examples Block */}
      <section className="space-y-4">
        <h2 id="examples" className="text-xl font-bold font-outfit text-white flex items-center gap-2">
           <ShieldCheck size={20} className="text-sky-400" /> Verification & Quick Start
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Run Analysis</p>
              <CodeBlock 
                code={`gitsage`} 
                language="bash" 
              />
           </div>
           <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Commit shorthand</p>
              <CodeBlock 
                code={`gitsage -c`} 
                language="bash" 
              />
           </div>
        </div>
      </section>

      {/* Next Steps Footer */}
      <footer className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
         <Link href="/docs/engine-report" className="group p-6 glass rounded-2xl border border-white/5 hover:border-sage/30 transition-all">
            <div className="flex justify-between items-center">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next Chapter</p>
                  <p className="text-lg font-bold text-white group-hover:text-sage transition-colors">Engine Intelligence</p>
               </div>
               <ChevronRight size={24} className="text-slate-700 group-hover:text-sage transition-all translate-x-0 group-hover:translate-x-1" />
            </div>
         </Link>
         <Link href="/docs/configuration" className="group p-6 glass rounded-2xl border border-white/5 hover:border-sage/30 transition-all">
            <div className="flex justify-between items-center">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Advanced Setup</p>
                  <p className="text-lg font-bold text-white group-hover:text-sage transition-colors">Config Reference</p>
               </div>
               <ChevronRight size={24} className="text-slate-700 group-hover:text-sage transition-all translate-x-0 group-hover:translate-x-1" />
            </div>
         </Link>
      </footer>
    </article>
  );
}
