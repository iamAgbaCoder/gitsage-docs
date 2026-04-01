import Link from "next/link";
import { GitBranch } from "lucide-react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const LINKS = {
  product: [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Documentation" },
    { href: "/docs/getting-started", label: "Quick Start" },
    { href: "/docs/configuration", label: "Configuration" },
  ],
  resources: [
    { href: "/docs/engine-report", label: "Engine Report" },
    { href: "/docs/providers", label: "AI Providers" },
    { href: "/docs/troubleshooting", label: "Troubleshooting" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(34,197,94,0.06)",
        background: "rgba(2,6,23,0.8)",
        padding: "3rem 1.5rem 2rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "2.5rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 30, borderRadius: "7px", background: "linear-gradient(135deg, #22c55e, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GitBranch size={15} color="#020617" strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }} className="gradient-sage">
                GitSage
              </span>
            </Link>
            <p style={{ color: "#4b5563", fontSize: "0.83rem", lineHeight: 1.7, maxWidth: "280px" }}>
              The production-grade AI Git assistant that understands WHY you coded, not just WHAT you changed.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <a
                href="https://github.com/iamAgbaCoder/gitsage"
                id="footer-github"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4b5563", transition: "color 0.2s" }}
                className="footer-icon-link hover:text-white"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="http://iamagbacoder.github.io/"
                id="footer-website"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4b5563", transition: "color 0.2s" }}
                className="footer-icon-link hover:text-white"
              >
                <FaGlobe size={18} />
              </a>
              <a
                href="https://linkedin.com/in/iamAgbaCoder"
                id="footer-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4b5563", transition: "color 0.2s" }}
                className="footer-icon-link hover:text-sky-400"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#22c55e", marginBottom: "1rem", fontWeight: 600 }}>
              Product
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {LINKS.product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "#4b5563", textDecoration: "none", fontSize: "0.83rem", transition: "color 0.2s" }} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#38bdf8", marginBottom: "1rem", fontWeight: 600 }}>
              Resources
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {LINKS.resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "#4b5563", textDecoration: "none", fontSize: "0.83rem", transition: "color 0.2s" }} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "#1f2937", fontSize: "0.78rem", fontFamily: "var(--font-fira-code), monospace" }}>
            © 2026 GitSage. MIT License.
          </p>
          <p style={{ color: "#1f2937", fontSize: "0.78rem" }}>
            Built with{" "}
            <span style={{ color: "#22c55e" }}>♥</span>
            {" "}by <Link href="https://github.com/iamAgbaCoder" className="text-sage">iamAgbaCoder</Link>, for developers.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #94a3b8 !important; }
        .footer-icon-link:hover { color: #22c55e !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
