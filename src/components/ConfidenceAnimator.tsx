"use client";

import { useEffect, useRef, useState } from "react";

export default function ConfidenceAnimator({ target = 85 }: { target?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let current = 0;
          const interval = setInterval(() => {
            current += 1.5;
            if (current >= target) {
              clearInterval(interval);
              setValue(target);
            } else {
              setValue(Math.round(current));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const filled = Math.round((value / 100) * 20);
  const blockBar = "█".repeat(filled) + "░".repeat(20 - filled);

  return (
    <div ref={ref} className="glass" style={{ padding: "1.75rem", borderRadius: "14px", border: "1px solid rgba(34,197,94,0.12)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: "#4b5563", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>AI Confidence Score</div>
          <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.8rem", color: "#22c55e" }}>
            feat(auth): add JWT token expiry validation
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>
          {value}%
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-fira-code), monospace", fontSize: "0.85rem", color: "#22c55e", marginBottom: "0.6rem", letterSpacing: "-0.01em" }}>
        [{blockBar}]
      </div>

      <div className="confidence-bar-track">
        <div className="confidence-bar-fill" style={{ width: `${value}%` }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem" }}>
        <span style={{ fontSize: "0.72rem", color: "#4b5563" }}>0%</span>
        <span style={{ fontSize: "0.72rem", color: value >= 85 ? "#22c55e" : "#4b5563" }}>High Confidence ≥85%</span>
        <span style={{ fontSize: "0.72rem", color: "#4b5563" }}>100%</span>
      </div>
    </div>
  );
}
