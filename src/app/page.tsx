import type { Metadata } from "next";
import MeshBackground from "@/components/MeshBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommitSimulator from "@/components/CommitSimulator";
import LiveTerminal from "@/components/LiveTerminal";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import {
  Brain,
  Zap,
  GitCommit,
  ArrowRight,
  CheckCircle,
  Terminal,
  Cpu,
  Globe,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GitSage — Commit with Intelligence, Not Just Messages",
  description:
    "The production-grade Git Assistant that understands WHY you coded, not just WHAT you changed. AI-powered commit messages with GitSage Intelligence and Ollama.",
  openGraph: {
    title: "GitSage | Commit with Intelligence",
    description: "The production-grade Git Assistant that understands WHY you coded, not just WHAT you changed.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  }
};

const METRICS = [
  { value: "< 2s", label: "Analysis Speed", sub: "10+ files with GitSage AI Engine" },
  { value: "0.3s", label: "Model Load", sub: "Optimized warm-start intelligence" },
  { value: "~2MB", label: "Binary Size", sub: "Lightweight CLI footprint" },
  { value: "95%+", label: "Scope Accuracy", sub: "Conventional Commit detection" },
];

const PILLARS = [
  {
    icon: Brain,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Deep Intelligence",
    desc: "Beyond simple summaries — GitSage provides Reach & Scope analysis for every change, identifying affected modules and preventing unintended side effects.",
  },
  {
    icon: Globe,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    title: "Provider Agility",
    desc: "Seamlessly switch between GitSage Cloud and Ollama (Local) for maximum privacy. Your architecture, your rules.",
  },
  {
    icon: GitCommit,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    title: "Conventional Excellence",
    desc: "Automatically formats every message to the Conventional Commits specification with 95%+ accuracy in scope identification.",
  },
  {
    icon: Cpu,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    title: "Engine First",
    desc: "A pristine Intelligence Layer that lives independently from the UI — ready for Git hooks, IDEs, CI/CD pipelines, and custom dashboards.",
  },
];

const REPORT_PILLARS = [
  {
    icon: Brain,
    title: "What Changed",
    color: "text-green-400",
    borderColor: "border-green-400/30",
    desc: "A concise summary of the structural modifications — file paths, line deltas, and semantic changes extracted from the raw diff.",
  },
  {
    icon: Zap,
    title: "Why it Matters",
    color: "text-sky-400",
    borderColor: "border-sky-400/30",
    desc: "The logical reasoning behind the change, extracted from code diff context — business justification, bug fixes, and performance gains.",
  },
  {
    icon: ShieldCheck,
    title: "Reach & Scope",
    color: "text-purple-400",
    borderColor: "border-purple-400/30",
    desc: "Identification of affected modules, classes, and dependencies — preventing unintended ripple effects across your codebase.",
  },
];

import CommunityReach from "@/components/CommunityReach";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-obsidian selection:bg-sage/30">
      <MeshBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        {/* ─── HERO ─── */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 border border-sage/20 text-xs text-sage font-fira tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                  v1.1.0 · Latest Release
                </div>
                <a
                  href="https://github.com/iamAgbaCoder/gitsage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all font-fira"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  Star on GitHub
                </a>
              </div>

              <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.05] tracking-tight mb-6 text-slate-50">
                Commit with <br />
                <span className="gradient-sage">Intelligence</span>,
                <br />
                Any Language.
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mb-8">
                The production-grade Git Assistant that understands{" "}
                <span className="text-slate-300 italic font-medium">WHY</span> you coded, not just{" "}
                <span className="text-slate-300 italic font-medium">WHAT</span> you changed. Supports Python, JS, Go, Rust, and more.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/docs/getting-started" className="btn-sage group">
                  <Zap size={18} className="fill-current" />
                  Get Started Free
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/docs" className="btn-ghost">
                  View Docs
                </Link>
              </div>

              {/* Install command strip */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] font-fira text-sm text-slate-400 mb-8 self-start max-w-xs select-all cursor-text">
                <span className="text-sage select-none">$</span>
                <span className="text-slate-300">pip install gitsage</span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                {["Conventional Commits", "GitSage & Ollama", "95%+ Accuracy"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-sage" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Preview */}
            <div className="relative">
               <div className="absolute -inset-20 bg-sage/5 blur-[120px] rounded-full pointer-events-none" />
               <CommitSimulator />
            </div>
          </div>
        </section>

        {/* ─── GLOBAL IMPACT / TELEMETRY ─── */}
        <section className="py-16 border-t border-white/5 bg-white/[0.005]">
           <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-10">
                Trusted by developers worldwide
              </p>
              <CommunityReach />
           </div>
        </section>

        {/* ─── METRICS ─── */}
        <section className="py-16 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {METRICS.map((m) => (
                <div key={m.label} className="glass tactical-grid p-6 rounded-2xl text-center group hover:border-sage/20 hover:bg-sage/5 transition-all duration-300">
                  <div className="text-3xl font-extrabold font-fira gradient-sage mb-1 group-hover:scale-105 transition-transform inline-block">{m.value}</div>
                  <div className="text-sm font-semibold text-slate-300 mb-1">{m.label}</div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-wider">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-sage uppercase tracking-[0.2em] mb-4">The Sage Pillars</h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold text-slate-50 mb-6">Intelligence by Design</h3>
            <p className="text-slate-400 max-w-lg mx-auto text-lg">Every feature is built around a single principle: your Git history should be as intelligent as the code you write.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className={`glass tactical-grid p-8 rounded-3xl group hover:border-[${p.border.replace('border-','').replace('/20','')}/30] transition-all duration-300`}>
                <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.border} border flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}>
                  <p.icon size={24} className={p.color} />
                </div>
                <h4 className="text-xl font-bold text-slate-50 mb-3">{p.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── REPORT DEEP DIVE ─── */}
        <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-sky-400 uppercase tracking-[0.2em] mb-4">Engine Report</h2>
              <h3 className="text-4xl md:text-5xl font-outfit font-bold text-slate-50 mb-6">Three-Pillar Intelligence</h3>
              <p className="text-slate-400 max-w-lg mx-auto text-lg">Unlike standard AI commit generators, every GitSage analysis breaks into three distinct tactical sections.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {REPORT_PILLARS.map((p) => (
                <div key={p.title} className={`glass-strong tactical-grid p-8 rounded-3xl text-center border-t-2 ${p.borderColor}`}>
                  <div className={`flex justify-center mb-6 ${p.color}`}>
                     <p.icon size={48} strokeWidth={1.5} />
                  </div>
                  <h4 className={`text-xl font-bold mb-4 ${p.color}`}>{p.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TERMINAL SECTION ─── */}
        <section className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Privacy First</h2>
              <h3 className="text-4xl font-outfit font-bold text-slate-50 mb-8 leading-tight">
                Cloud Speed or <br />
                <span className="gradient-cyber">Local Privacy.</span>
                <br />You choose.
              </h3>
              
              <div className="space-y-4 mb-10">
                <div className="glass p-5 rounded-2xl border-l-4 border-l-sky-400">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe size={18} className="text-sky-400" />
                    <span className="font-bold text-slate-50">Cloud Mode</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">Use the GitSage Intelligence Layer for high-performance, deep reasoning. Sub-2s analysis on 10+ modified files.</p>
                </div>
                <div className="glass p-5 rounded-2xl border-l-4 border-l-sage">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock size={18} className="text-sage" />
                    <span className="font-bold text-slate-50">Stealth Mode (Local)</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">Run 100% locally with Ollama + Mistral. Your code <span className="text-sage font-medium">never leaves your machine</span>.</p>
                </div>
              </div>

              <CodeBlock 
                code={`# Switch to local mode\ngitsage config --provider local\n\n# ✅ Ollama connected — mistral:7b available\n# 🛡️  Stealth Mode active`}
                language="bash"
              />
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="mb-4 text-xs font-fira text-slate-500">{"// Try the live terminal below"}</div>
              <LiveTerminal />
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-sage/5">
          <div className="max-w-4xl mx-auto glass-strong tactical-grid p-12 md:p-16 rounded-[40px] text-center border-sage/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-72 h-72 bg-sage/10 blur-[100px] -mr-36 -mt-36 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 blur-[100px] -ml-36 -mb-36 pointer-events-none" />

             <div className="relative z-10">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sage/10 border border-sage/20 mb-8">
                 <Brain size={32} className="text-sage" />
               </div>
               <h2 className="text-3xl md:text-5xl font-outfit font-bold text-slate-50 mb-4">Ready to write intelligent commits?</h2>
               <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">Install in seconds. Works with any Git repository. No lock-in, no subscriptions.</p>

               <div className="max-w-md mx-auto mb-4">
                  <CodeBlock code="pip install gitsage" language="bash" />
               </div>
               <p className="text-xs text-slate-600 font-fira mb-10">or: <span className="text-slate-500">curl -fsSL https://gitsage-ai.vercel.app/install.sh | bash</span></p>

               <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/docs/getting-started" className="btn-sage">
                    <Terminal size={18} className="fill-current" />
                    Read the Docs
                  </Link>
                  <Link href="https://github.com/iamAgbaCoder/gitsage" className="btn-ghost">
                    View on GitHub
                    <ArrowRight size={16} />
                  </Link>
               </div>
             </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
