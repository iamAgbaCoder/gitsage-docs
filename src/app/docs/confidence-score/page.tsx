import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConfidenceAnimator from "@/components/ConfidenceAnimator";

export const metadata: Metadata = {
  title: "Confidence Score",
  description: "Understand GitSage's confidence scoring system and how it ensures commit quality.",
};

export default function ConfidenceScorePage() {
  return (
    <article>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "2rem", marginBottom: "2.5rem" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", fontSize: "0.72rem", color: "#38bdf8", marginBottom: "0.75rem", fontFamily: "var(--font-fira-code), monospace" }}>
          Engine Report
        </span>
        <h1 id="confidence-score" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: "0.75rem" }}>
          Confidence Score
        </h1>
        <p style={{ color: "#4b5563", lineHeight: 1.75, maxWidth: "560px", fontSize: "0.95rem" }}>
          Every GitSage suggestion includes a Confidence Score — a trust metric that ensures your Git history remains pristine and accurate.
        </p>
      </div>

      {/* Live Animator */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 id="live-demo" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
          Confidence Animator (Live Demo)
        </h2>
        <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          Scroll into view to see the bar animate from 0 to 85%:
        </p>
        <ConfidenceAnimator target={85} />
      </section>

      {/* Tiers */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="score-tiers" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem" }}>
          Score Tiers
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { range: "85–100%", label: "High Confidence", color: "#22c55e", bar: 18, desc: "GitSage auto-commits if auto_commit: true. Otherwise, shows the suggestion with 1-click approve." },
            { range: "50–84%", label: "Medium Confidence", color: "#fbbf24", bar: 12, desc: "Always prompts for review. You can approve, edit inline, or regenerate." },
            { range: "25–49%", label: "Low Confidence", color: "#fb923c", bar: 7, desc: "GitSage warns you and requests contextual input (e.g. --context flag) before proceeding." },
            { range: "0–24%", label: "Very Low Confidence", color: "#f87171", bar: 3, desc: "GitSage declines to auto-suggest. You are prompted to write the message manually." },
          ].map((tier) => (
            <div key={tier.range} className="glass" style={{ padding: "1.25rem", borderRadius: "12px", border: `1px solid ${tier.color}18` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                <span style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.78rem", color: tier.color, fontWeight: 600 }}>
                  {tier.range}
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f1f5f9" }}>{tier.label}</span>
              </div>
              <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.75rem", color: tier.color, marginBottom: "0.5rem" }}>
                [{Array(tier.bar).fill("█").join("")}{Array(20 - tier.bar).fill("░").join("")}]
              </div>
              <p style={{ color: "#4b5563", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Factors */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 id="factors" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
          What Affects the Score?
        </h2>
        <div className="glass" style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
          {[
            ["Diff clarity", "Larger, well-named function changes score higher than cryptic binary patches"],
            ["Semantic signals", "Meaningful variable names, docstrings, and comments improve accuracy"],
            ["Scope detection", "Single-concern commits with clear module boundaries score higher"],
            ["Model certainty", "The AI's own token probabilities are factored into the score"],
          ].map(([factor, explanation]) => (
            <div key={factor} style={{ display: "flex", gap: "1rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.78rem", color: "#22c55e", minWidth: "140px" }}>{factor}</span>
              <span style={{ fontSize: "0.82rem", color: "#4b5563", lineHeight: 1.6 }}>{explanation}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="glass" style={{ padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Related</h3>
        <Link href="/docs/engine-report" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#22c55e", textDecoration: "none", fontSize: "0.875rem" }}>
          <ArrowRight size={14} />
          Three-Pillar Intelligence Report
        </Link>
      </div>
    </article>
  );
}
