import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install GitSage and run your first AI-powered commit in under 2 minutes.",
};

export default function GettingStartedPage() {
  return (
    <article>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", fontSize: "0.72rem", color: "#22c55e", marginBottom: "0.75rem", fontFamily: "var(--font-fira-code), monospace" }}>
          Getting Started
        </span>
        <h1 id="installation" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Installation
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          GitSage is a Python CLI tool. Install it from PyPI in seconds — no dependencies to manage, no configuration required to get started.
        </p>
      </div>

      {/* Requirements */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="requirements" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
          Requirements
        </h2>
        <div className="glass" style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
          {[
            "Python 3.10 or higher",
            "Git 2.x installed and configured",
            "A Gemini API key (or local Ollama instance for local mode)",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.4rem 0", fontSize: "0.875rem", color: "#94a3b8" }}>
              <CheckCircle size={14} color="#22c55e" />
              {req}
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="pip-install" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
          Install via pip
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "1rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          GitSage is available on PyPI. Install it globally or inside a virtualenv:
        </p>
        <CodeBlock code="pip install gitsage" language="bash" />
        <p style={{ color: "#4b5563", marginTop: "0.75rem", fontSize: "0.875rem" }}>
          To upgrade to the latest version:
        </p>
        <CodeBlock code="pip install --upgrade gitsage" language="bash" />
      </section>

      {/* API Key Setup */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="api-key-setup" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
          Configure your API key
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "1rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          GitSage uses Google Gemini by default. Get your free API key from{" "}
          <a href="https://aistudio.google.com" target="_blank" rel="noopener" style={{ color: "#38bdf8" }}>
            Google AI Studio
          </a>{" "}
          and set it as an environment variable:
        </p>
        <CodeBlock
          code={`# Linux / macOS
export GEMINI_API_KEY="your-api-key-here"

# Windows PowerShell
$env:GEMINI_API_KEY="your-api-key-here"

# Or configure via GitSage directly
gitsage config --provider gemini --key YOUR_API_KEY`}
          language="bash"
          filename="~/.bashrc"
        />

        <div
          className="glass"
          style={{ padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(56,189,248,0.15)", marginTop: "1.25rem", borderLeft: "3px solid #38bdf8" }}
        >
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: "#38bdf8", fontWeight: 600 }}>💡 No Key?</span>{" "}
            Switch to local mode with Ollama — no API key required. See the{" "}
            <Link href="/docs/providers" style={{ color: "#38bdf8" }}>AI Providers</Link> guide.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="quick-start" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
          Quick Start
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "1rem", fontSize: "0.875rem", lineHeight: 1.7 }}>
          Make some changes, stage them, and let GitSage generate the commit message:
        </p>
        <CodeBlock
          code={`# Make your code changes, then:
git add src/auth/middleware.py

# Run GitSage analysis
gitsage

# Or: stage everything + commit in one shot
gitsage -c`}
          language="bash"
        />
      </section>

      {/* Verify */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="verify-install" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
          Verify the installation
        </h2>
        <CodeBlock
          code={`gitsage --version
# GitSage v1.2.0`}
          language="bash"
        />
      </section>

      {/* Next Steps */}
      <div
        className="glass"
        style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)", marginTop: "2rem" }}
      >
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Next Steps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { href: "/docs/engine-report", label: "Learn about the Engine Report" },
            { href: "/docs/configuration", label: "Configure your preferences" },
            { href: "/docs/providers", label: "Set up local Ollama mode" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#22c55e", textDecoration: "none", fontSize: "0.875rem", padding: "0.3rem 0" }}
            >
              <ArrowRight size={14} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
