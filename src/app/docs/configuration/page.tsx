import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Configuration Reference",
  description: "Full reference for ~/.git-sage.json configuration options.",
};

const CONFIG_PARAMS = [
  {
    key: "ai_provider",
    type: "string",
    default: '"gemini"',
    values: '"gemini" | "local"',
    desc: 'The AI provider to use. "gemini" uses Google Gemini API; "local" routes to Ollama.',
  },
  {
    key: "model",
    type: "string",
    default: '"gemini-1.5-flash"',
    values: "Any valid model ID",
    desc: 'The specific model to use. For local: "mistral", "llama3", "codellama", etc.',
  },
  {
    key: "auto_commit",
    type: "boolean",
    default: "false",
    values: "true | false",
    desc: "If true, automatically commits without asking for confirmation when confidence is high (≥ 85%).",
  },
  {
    key: "max_length",
    type: "number",
    default: "72",
    values: "40–120",
    desc: "Maximum character length for the commit subject line.",
  },
  {
    key: "style",
    type: "string",
    default: '"conventional"',
    values: '"conventional" | "simple" | "detailed"',
    desc: "Commit message formatting style. Conventional Commits is recommended.",
  },
  {
    key: "telemetry",
    type: "boolean",
    default: "true",
    values: "true | false",
    desc: "Anonymous usage telemetry to help improve GitSage. No code or diff data is ever sent.",
  },
];

export default function ConfigurationPage() {
  return (
    <article>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", fontSize: "0.72rem", color: "#a78bfa", marginBottom: "0.75rem", fontFamily: "var(--font-fira-code), monospace" }}>
          Configuration
        </span>
        <h1 id="configuration" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Config Reference
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          GitSage reads configuration from{" "}
          <code style={{ fontFamily: "var(--font-fira-code), monospace", background: "rgba(167,139,250,0.08)", padding: "0.15rem 0.5rem", borderRadius: "4px", color: "#a78bfa", fontSize: "0.82rem" }}>
            ~/.git-sage.json
          </code>
          . This file is created automatically the first time you run{" "}
          <code style={{ fontFamily: "var(--font-fira-code), monospace", background: "rgba(34,197,94,0.08)", padding: "0.15rem 0.5rem", borderRadius: "4px", color: "#22c55e", fontSize: "0.82rem" }}>
            gitsage config
          </code>.
        </p>
      </div>

      {/* Full config example */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="full-config" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Full Configuration File
        </h2>
        <CodeBlock
          filename="~/.git-sage.json"
          language="json"
          code={`{
  "ai_provider": "gemini",
  "model": "gemini-1.5-flash",
  "auto_commit": false,
  "max_length": 72,
  "style": "conventional",
  "telemetry": true
}`}
        />
      </section>

      {/* Parameter table */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="parameters" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
          Parameters
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {CONFIG_PARAMS.map((param) => (
            <div
              key={param.key}
              className="glass"
              style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <code style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.85rem", color: "#22c55e", fontWeight: 600 }}>
                  {param.key}
                </code>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span style={{ padding: "0.15rem 0.5rem", borderRadius: "4px", background: "rgba(56,189,248,0.08)", color: "#38bdf8", fontSize: "0.7rem", fontFamily: "var(--font-fira-code), monospace" }}>
                    {param.type}
                  </span>
                  <span style={{ padding: "0.15rem 0.5rem", borderRadius: "4px", background: "rgba(167,139,250,0.08)", color: "#a78bfa", fontSize: "0.7rem", fontFamily: "var(--font-fira-code), monospace" }}>
                    default: {param.default}
                  </span>
                </div>
              </div>
              <p style={{ color: "#4b5563", fontSize: "0.82rem", lineHeight: 1.65, margin: 0, marginBottom: "0.4rem" }}>
                {param.desc}
              </p>
              <p style={{ color: "#374151", fontSize: "0.75rem", fontFamily: "var(--font-fira-code), monospace", margin: 0 }}>
                Values: {param.values}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLI config commands */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="cli-config" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Setting Config via CLI
        </h2>
        <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          You can update configuration directly from the terminal without editing the JSON file:
        </p>
        <CodeBlock
          code={`# Set Gemini as provider with your API key
gitsage config --provider gemini --key YOUR_GEMINI_KEY

# Switch to local Ollama mode
gitsage config --provider local

# Enable auto-commit for high-confidence suggestions
gitsage config --auto-commit true

# Change max commit message length
gitsage config --max-length 80

# View current config
gitsage config`}
          language="bash"
        />
      </section>

      {/* GEMINI_API_KEY env */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="gemini-setup" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Gemini API Key Setup
        </h2>
        <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          Get your free API key from{" "}
          <a href="https://aistudio.google.com" target="_blank" rel="noopener" style={{ color: "#38bdf8" }}>
            Google AI Studio
          </a>
          . Set it as an environment variable for security:
        </p>
        <CodeBlock
          filename="~/.bashrc or ~/.zshrc"
          language="bash"
          code={`export GEMINI_API_KEY="AIza...your-key-here"`}
        />
        <div className="glass" style={{ padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(251,191,36,0.15)", marginTop: "1.25rem", borderLeft: "3px solid #fbbf24" }}>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: "#fbbf24", fontWeight: 600 }}>⚠️ Security:</span>{" "}
            Never commit your API key to version control. GitSage stores it encrypted in{" "}
            <code style={{ fontFamily: "var(--font-fira-code), monospace", color: "#a78bfa", fontSize: "0.78rem" }}>~/.git-sage.json</code>,
            which is outside your repo.
          </p>
        </div>
      </section>

      {/* Next */}
      <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)", marginTop: "2rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Next Steps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { href: "/docs/providers", label: "Set up local Ollama model" },
            { href: "/docs/troubleshooting", label: "Troubleshooting common issues" },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#22c55e", textDecoration: "none", fontSize: "0.875rem" }}>
              <ArrowRight size={14} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
