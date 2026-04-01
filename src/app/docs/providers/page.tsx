import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { Globe, Lock, ArrowRight, Settings2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "AI Providers — GitSage & Ollama",
  description: "Configure GitSage to use the high-speed GitSage Intelligence Engine (Cloud Mode) or Ollama (Stealth Mode).",
};

export default function ProvidersPage() {
  return (
    <article className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="space-y-6 border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-fira tracking-tight">
          <Settings2 size={14} /> Configuration
        </div>
        <h1 id="ai-providers" className="text-4xl md:text-5xl font-extrabold font-outfit text-white tracking-tight">
          AI Providers
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          GitSage supports two primary intelligence modes: Cloud (Powered by GitSage's Intelligence Layer) for maximum speed and accuracy, and Local (Ollama) for absolute privacy.
        </p>
      </header>

      {/* Comparison */}
      <section className="space-y-6">
        <h2 id="comparison" className="text-2xl font-bold font-outfit text-white">
          Provider Comparison
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* GitSage API */}
          <Card variant="glass" className="border-t-4 border-t-sky-400">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-sky-400" />
                <h3 className="text-xl font-bold font-outfit text-white">Cloud Mode</h3>
              </div>
              <p className="text-sky-400 text-xs font-fira">ai_provider: &quot;gitsage&quot;</p>
              <ul className="space-y-3">
                {["✅ Sub-2s analysis speed", "✅ Deep reasoning on complex diffs", "✅ 95%+ scope accuracy", "⚠️ Requires GitSage key"].map((item) => (
                  <li key={item} className={`text-sm ${item.startsWith("✅") ? "text-slate-300" : "text-slate-500"}`}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Ollama */}
          <Card variant="glass" className="border-t-4 border-t-sage">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Lock size={24} className="text-sage" />
                <h3 className="text-xl font-bold font-outfit text-white">Stealth Mode (Local)</h3>
              </div>
              <p className="text-sage text-xs font-fira">ai_provider: &quot;local&quot;</p>
              <ul className="space-y-3">
                {["✅ Zero data leaves your machine", "✅ No API key required", "✅ Works offline", "⚠️ ~5s latency on avg hardware", "⚠️ Requires Ollama installed"].map((item) => (
                  <li key={item} className={`text-sm ${item.startsWith("✅") ? "text-slate-300" : "text-slate-500"}`}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* API Setup */}
      <section className="space-y-6">
        <h2 id="cloud-setup" className="text-2xl font-bold font-outfit text-white">
          Setting Up Cloud Mode
        </h2>
        <ol className="list-decimal list-inside text-slate-400 space-y-3 pl-2">
          <li>Create an account at the <Link href="/dashboard" className="text-sky-400 hover:underline">GitSage Portal</Link> and generate an API key.</li>
          <li>Configure GitSage with your secure key using the CLI command below.</li>
          <li>Run <code className="text-sage font-fira text-sm">gitsage</code> in any repository to start auto-committing.</li>
        </ol>
        <CodeBlock
          code={`gitsage config --provider gitsage --key YOUR_API_KEY\n\n# Or via environment variable:\nexport GITSAGE_API_KEY="your-key-here"`}
          language="bash"
        />
      </section>

      {/* Ollama Setup */}
      <section className="space-y-6">
        <h2 id="ollama-setup" className="text-2xl font-bold font-outfit text-white">
          Setting Up Ollama (Local)
        </h2>
        <ol className="list-decimal list-inside text-slate-400 space-y-3 pl-2">
          <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener" className="text-sky-400 hover:underline">ollama.ai</a>.</li>
          <li>Pull a supported model (Mistral recommended).</li>
          <li>Switch GitSage to local mode in your current repository.</li>
        </ol>
        <CodeBlock
          code={`# 1. Install Ollama (macOS example)\nbrew install ollama\n\n# 2. Pull the Mistral model\nollama pull mistral\n\n# 3. Switch GitSage to local mode\ngitsage config --provider local\n\n# 4. Verify the connection\ngitsage --local\n# 🛡️  Stealth Mode active — Ollama/mistral connected`}
          language="bash"
        />

        <div className="p-4 rounded-xl border border-sage/20 bg-sage/5 border-l-4 border-l-sage">
          <p className="text-sm text-slate-400">
            <strong className="text-sage">Supported local models:</strong>{" "}
            <code className="text-sage font-fira text-xs">mistral</code>,{" "}
            <code className="text-sage font-fira text-xs">llama3</code>,{" "}
            <code className="text-sage font-fira text-xs">codellama</code>,{" "}
            <code className="text-sage font-fira text-xs">gemma2</code>
          </p>
        </div>
      </section>

      {/* Switching */}
      <section className="space-y-6">
        <h2 id="switching-providers" className="text-2xl font-bold font-outfit text-white">
          Switching Providers on the Fly
        </h2>
        <CodeBlock
          code={`# Use GitSage Cloud for this commit only (without changing global config)\ngitsage --provider gitsage\n\n# Use local for this commit only\ngitsage --provider local`}
          language="bash"
        />
      </section>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold font-outfit text-white mb-4">Next Steps</h3>
        <Link href="/docs/troubleshooting" className="inline-flex items-center gap-2 text-sage text-sm font-medium hover:text-sage/80 transition-colors">
          <ArrowRight size={16} /> Troubleshoot intelligence engine issues
        </Link>
      </Card>
    </article>
  );
}
