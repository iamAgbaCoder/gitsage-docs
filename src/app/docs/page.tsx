import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Zap, Cpu, Settings, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation Overview",
  description: "Complete documentation for GitSage — the AI-powered Git commit assistant.",
  openGraph: {
    title: "The Sage's Toolkit | Documentation",
    description: "Learn how to turn your Git history into an intelligence layer with AI-powered commit analysis.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  }
};

const SECTIONS = [
  {
    icon: Zap,
    color: "#22c55e",
    href: "/docs/getting-started",
    title: "Getting Started",
    desc: "Install GitSage in seconds and run your first AI-powered commit analysis.",
  },
  {
    icon: Cpu,
    color: "#38bdf8",
    href: "/docs/engine-report",
    title: "Engine Report",
    desc: "Understand the three-pillar intelligence report: What Changed, Why it Matters, and Reach & Scope.",
  },
  {
    icon: Settings,
    color: "#a78bfa",
    href: "/docs/configuration",
    title: "Configuration",
    desc: "Configure your AI provider, model, commit style, and privacy preferences.",
  },
  {
    icon: BookOpen,
    color: "#fb923c",
    href: "/docs/troubleshooting",
    title: "Troubleshooting",
    desc: "Common issues — empty diffs, API timeouts, and provider setup errors.",
  },
];

export default function DocsIndexPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#22c55e", marginBottom: "0.6rem", fontWeight: 600 }}>
          Documentation
        </p>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "1rem" }}>
          The Sage&#39;s Toolkit
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          Everything you need to turn your Git history into an intelligence layer.
          GitSage is designed to be minimal to install, instant to run, and powerful to extend.
        </p>
      </div>

      {/* Section cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "3rem" }} className="docs-index-grid">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{ textDecoration: "none" }}
          >
            <div
              className="glass tactical-grid"
              style={{
                padding: "1.5rem",
                borderRadius: "14px",
                border: `1px solid ${s.color}18`,
                transition: "all 0.25s ease",
                height: "100%",
              }}
              id={`docs-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "9px",
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.9rem",
                }}
              >
                <s.icon size={20} color={s.color} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{s.title}</h2>
                <ArrowRight size={15} color="#374151" />
              </div>
              <p style={{ color: "#4b5563", fontSize: "0.82rem", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick ref */}
      <div
        className="glass"
        style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.1)" }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>Quick Reference</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }} className="docs-index-grid">
          {[
            { cmd: "pip install gitsage", desc: "Install GitSage" },
            { cmd: "gitsage", desc: "Analyze staged changes" },
            { cmd: "gitsage -c", desc: "Stage all & commit" },
            { cmd: "gitsage config --provider local", desc: "Switch to Ollama" },
          ].map((item) => (
            <div key={item.cmd} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <code style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.78rem", color: "#22c55e", background: "rgba(34,197,94,0.06)", padding: "0.25rem 0.6rem", borderRadius: "5px", whiteSpace: "nowrap" }}>
                {item.cmd}
              </code>
              <span style={{ color: "#4b5563", fontSize: "0.8rem", lineHeight: 1.5 }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .docs-index-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
