import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { Globe, Lock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Providers — Gemini & Ollama",
  description: "Configure GitSage to use Google Gemini (Cloud Mode) or Ollama (Stealth Mode).",
};

export default function ProvidersPage() {
  return (
    <article>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", fontSize: "0.72rem", color: "#fb923c", marginBottom: "0.75rem", fontFamily: "var(--font-fira-code), monospace" }}>
          Configuration
        </span>
        <h1 id="ai-providers" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          AI Providers
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          GitSage supports two AI provider modes — Cloud (Google Gemini) for maximum speed and accuracy, and Local (Ollama) for complete privacy.
        </p>
      </div>

      {/* Comparison */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="comparison" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
          Provider Comparison
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="providers-grid">
          {/* Gemini */}
          <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", borderTop: "3px solid #38bdf8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <Globe size={20} color="#38bdf8" />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Cloud Mode</h3>
            </div>
            <p style={{ color: "#38bdf8", fontSize: "0.75rem", fontFamily: "var(--font-fira-code), monospace", marginBottom: "1rem" }}>
              ai_provider: &quot;gemini&quot;
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["✅ Sub-2s analysis speed", "✅ Deep reasoning on complex diffs", "✅ 95%+ scope accuracy", "⚠️ Requires API key", "⚠️ Code sent to Google servers"].map((item) => (
                <li key={item} style={{ fontSize: "0.82rem", color: item.startsWith("✅") ? "#4b5563" : "#6b7280" }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Ollama */}
          <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", borderTop: "3px solid #22c55e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <Lock size={20} color="#22c55e" />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Stealth Mode (Local)</h3>
            </div>
            <p style={{ color: "#22c55e", fontSize: "0.75rem", fontFamily: "var(--font-fira-code), monospace", marginBottom: "1rem" }}>
              ai_provider: &quot;local&quot;
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["✅ Zero data leaves your machine", "✅ No API key required", "✅ Works offline", "⚠️ ~5s latency on avg hardware", "⚠️ Requires Ollama installed"].map((item) => (
                <li key={item} style={{ fontSize: "0.82rem", color: item.startsWith("✅") ? "#4b5563" : "#6b7280" }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gemini Setup */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="gemini-setup" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Setting Up Gemini
        </h2>
        <ol style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.75, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li>Go to <a href="https://aistudio.google.com" target="_blank" rel="noopener" style={{ color: "#38bdf8" }}>aistudio.google.com</a> and generate a free API key.</li>
          <li>Configure GitSage with the key using the CLI command below.</li>
          <li>Run <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#22c55e", fontSize: "0.82rem" }}>gitsage</code> — you&#39;re ready.</li>
        </ol>
        <CodeBlock
          code={`gitsage config --provider gemini --key YOUR_API_KEY

# Or via environment variable:
export GEMINI_API_KEY="your-key-here"`}
          language="bash"
        />
      </section>

      {/* Ollama Setup */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="ollama-setup" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Setting Up Ollama (Local)
        </h2>
        <ol style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.75, paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>
          <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener" style={{ color: "#38bdf8" }}>ollama.ai</a>.</li>
          <li>Pull a supported model (Mistral recommended).</li>
          <li>Switch GitSage to local mode.</li>
        </ol>
        <CodeBlock
          code={`# 1. Install Ollama (macOS example)
brew install ollama

# 2. Pull the Mistral model
ollama pull mistral

# 3. Switch GitSage to local mode
gitsage config --provider local

# 4. Verify the connection
gitsage --local
# 🛡️  Stealth Mode active — Ollama/mistral connected`}
          language="bash"
        />

        <div className="glass" style={{ padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(34,197,94,0.15)", marginTop: "1.25rem", borderLeft: "3px solid #22c55e" }}>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: "#22c55e", fontWeight: 600 }}>Supported local models:</span>{" "}
            <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#22c55e", fontSize: "0.8rem" }}>mistral</code>,{" "}
            <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#22c55e", fontSize: "0.8rem" }}>llama3</code>,{" "}
            <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#22c55e", fontSize: "0.8rem" }}>codellama</code>,{" "}
            <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#22c55e", fontSize: "0.8rem" }}>gemma2</code>
          </p>
        </div>
      </section>

      {/* Switching */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="switching-providers" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Switching Providers on the Fly
        </h2>
        <CodeBlock
          code={`# Use Gemini for this commit only (without changing config)
gitsage --provider gemini

# Use local for this commit only
gitsage --provider local`}
          language="bash"
        />
      </section>

      <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Next Steps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/docs/troubleshooting" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#22c55e", textDecoration: "none", fontSize: "0.875rem" }}>
            <ArrowRight size={14} />
            Troubleshoot provider connection issues
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .providers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </article>
  );
}
