import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engine Report — Three-Pillar Intelligence",
  description: "Learn about GitSage's three-pillar intelligence report: What Changed, Why it Matters, and Reach & Scope.",
};

const PILLARS = [
  {
    emoji: "🧠",
    id: "what-changed",
    title: "What Changed",
    color: "#22c55e",
    desc: "A concise structural summary of the code modifications. GitSage extracts file paths, added/removed line counts, function signatures, and class-level changes from the raw git diff.",
    example: `# GitSage Report — What Changed
Modified: src/auth/middleware.py (+19, -0)

Added method: validate_token_expiry(token: str) -> bool
  - JWT decoding with expiry verification
  - Session invalidation on expired tokens
  - Warning logs for invalid token errors`,
  },
  {
    emoji: "💡",
    id: "why-it-matters",
    title: "Why it Matters",
    color: "#38bdf8",
    desc: "The logical reasoning behind the change. GitSage infers business context from code structure, naming conventions, and diff patterns — providing the justification that reviewers and future developers need.",
    example: `# GitSage Report — Why it Matters
Prevents stale sessions from remaining active beyond
JWT expiry, eliminating a class of 401 Unauthorized
errors in production. The automatic session invalidation
reduces support tickets from users stuck in bad auth states.`,
  },
  {
    emoji: "🎯",
    id: "reach-and-scope",
    title: "Reach & Scope",
    color: "#a78bfa",
    desc: "Identification of all modules, classes, and files affected by the change. This helps catch unintended ripple effects and ensures nothing is missed in code review or testing.",
    example: `# GitSage Report — Reach & Scope
Primary:
  → src/auth/middleware.py        [modified]

Downstream impact:
  → src/core/session_manager.py   [calls invalidate_session]
  → src/utils/logger.py           [logging dependency]
  → tests/auth/test_middleware.py [test coverage required]`,
  },
];

export default function EngineReportPage() {
  return (
    <article>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", fontSize: "0.72rem", color: "#38bdf8", marginBottom: "0.75rem", fontFamily: "var(--font-fira-code), monospace" }}>
          Engine Report
        </span>
        <h1 id="engine-report" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Three-Pillar Intelligence
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          Unlike standard AI commit generators that produce a single sentence, GitSage breaks every analysis into three distinct tactical sections — giving you a complete picture of every change.
        </p>
      </div>

      {/* Overview */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 id="overview" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>Overview</h2>
        <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          When you run <code style={{ fontFamily: "var(--font-fira-code), monospace", background: "rgba(34,197,94,0.08)", padding: "0.15rem 0.5rem", borderRadius: "4px", color: "#22c55e", fontSize: "0.82rem" }}>gitsage</code>, the engine produces a structured report with three sections. Each targets a different audience and serves a different purpose.
        </p>
        <CodeBlock
          code={`gitsage

# ╔══ GitSage Report ═══════════════════════════════════╗
# ║                                                      ║
# ║  🧠 What Changed                                     ║
# ║    Added JWT token expiry validation in middleware   ║
# ║                                                      ║
# ║  💡 Why it Matters                                   ║
# ║    Prevents stale sessions causing 401 errors        ║
# ║                                                      ║
# ║  🎯 Reach & Scope                                    ║
# ║    auth/middleware.py · core/session_manager.py      ║
# ║                                                      ║
# ║  Confidence: ████████████████████░░  91%             ║
# ╚══════════════════════════════════════════════════════╝`}
          language="bash"
        />
      </section>

      {/* Three pillars */}
      {PILLARS.map((p) => (
        <section key={p.id} style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{p.emoji}</span>
            <h2 id={p.id} style={{ fontSize: "1.3rem", fontWeight: 700, color: p.color, margin: 0 }}>
              {p.title}
            </h2>
          </div>
          <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            {p.desc}
          </p>
          <CodeBlock code={p.example} language="bash" />
        </section>
      ))}

      {/* Confidence */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="confidence" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Confidence Score
        </h2>
        <p style={{ color: "#4b5563", lineHeight: 1.75, fontSize: "0.875rem", marginBottom: "1rem" }}>
          Every suggestion includes a Confidence Score (0–100%). If confidence drops below 50%, GitSage will prompt you for manual input rather than committing an uncertain message.
        </p>
        <div className="glass" style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.8rem", color: "#22c55e", marginBottom: "0.75rem" }}>
            [████████████████████░░]  91% — High confidence. Committing...
          </div>
          <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.8rem", color: "#fbbf24", marginBottom: "0.75rem" }}>
            [██████████░░░░░░░░░░░░]  47% — Low confidence. Please review before committing.
          </div>
          <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.8rem", color: "#f87171" }}>
            [████░░░░░░░░░░░░░░░░░░]  18% — Very uncertain. Manual commit message required.
          </div>
        </div>
        <Link href="/docs/confidence-score" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#38bdf8", textDecoration: "none", fontSize: "0.82rem", marginTop: "0.75rem" }}>
          <ArrowRight size={13} />
          Full Confidence Score documentation
        </Link>
      </section>

      {/* Next */}
      <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)", marginTop: "2rem" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Next Steps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { href: "/docs/configuration", label: "Configure GitSage" },
            { href: "/docs/providers", label: "Switch AI Providers" },
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
