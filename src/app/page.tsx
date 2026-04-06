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
    images: [{ url: "/api/og?title=Git%20Intelligence%20Layer&description=Commit%20with%20Intelligence%20not%20just%20messages" }],
  }
};

const METRICS = [
  { value: "< 2s", label: "Analysis Speed", sub: "10+ files with GitSage AI Engine" },
  { value: "~5s", label: "Local Latency", sub: "Ollama/Mistral on avg hardware" },
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 border border-sage/20 text-xs text-sage font-fira tracking-tight mb-8 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                v1.2.0 · pip install gitsage
              </div>

              <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.05] tracking-tight mb-8 text-slate-50">
                Commit with <br />
                <span className="gradient-sage">Intelligence</span>,
                <br />
                Any Language.
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mb-10">
                The production-grade Git Assistant that understands{" "}
                <span className="text-slate-300 italic font-medium">WHY</span> you coded, not just{" "}
                <span className="text-slate-300 italic font-medium">WHAT</span> you changed. Supports Python, JS, Go, Rust, and more.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/docs/getting-started" className="btn-sage group">
                  <Zap size={18} className="fill-current" />
                  Get Started Free
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/docs" className="btn-ghost">
                  View Docs
                </Link>
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

        {/* ─── METRICS ─── */}
        <section className="py-12 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {METRICS.map((m) => (
                <div key={m.label} className="glass tactical-grid p-6 rounded-2xl text-center">
                  <div className="text-3xl font-extrabold font-fira gradient-sage mb-1">{m.value}</div>
                  <div className="text-sm font-semibold text-slate-400 mb-1">{m.label}</div>
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
              <div key={p.title} className="glass tactical-grid p-8 rounded-3xl group">
                <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.border} border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <p.icon size={24} className={p.color} />
                </div>
                <h4 className="text-xl font-bold text-slate-50 mb-4">{p.title}</h4>
                <p className="text-slate-400 leading-relaxed">{p.desc}</p>
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
              <div className="mb-4 text-xs font-fira text-slate-500">// Try the live terminal below</div>
              <LiveTerminal />
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-sage/5">
          <div className="max-w-4xl mx-auto glass-strong tactical-grid p-12 md:p-16 rounded-[40px] text-center border-sage/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 blur-[80px] -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 blur-[80px] -ml-32 -mb-32" />
             
             <div className="flex justify-center mb-8"><Brain size={64} className="text-sage" /></div>
             <h2 className="text-3xl md:text-5xl font-outfit font-bold text-slate-50 mb-6">Ready to write intelligent commits?</h2>
             <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">Install in seconds. Works with any Git repository. No lock-in, no subscriptions.</p>
             
             <div className="max-w-md mx-auto mb-10">
                <CodeBlock code="pip install gitsage" language="bash" />
             </div>

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
        </section>

        <Footer />
      </div>
    </div>
  );
}
