import type { Metadata } from "next";
import MeshBackground from "@/components/MeshBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocsSidebar from "@/components/DocsSidebar";

export const metadata: Metadata = {
  title: "Documentation",
  description: "GitSage documentation — installation, configuration, and usage guides.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <MeshBackground />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        <Header />
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            padding: "2.5rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "3rem",
            flex: 1,
          }}
          className="docs-layout"
        >
          {/* Sidebar */}
          <aside
            className="glass"
            style={{
              borderRadius: "16px",
              padding: "1.25rem",
              height: "fit-content",
              position: "sticky",
              top: "80px",
              border: "1px solid rgba(34,197,94,0.08)",
            }}
          >
            <DocsSidebar />
          </aside>

          {/* Content */}
          <main style={{ minWidth: 0 }}>
            {children}
          </main>
        </div>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .docs-layout { grid-template-columns: 1fr !important; }
          .docs-layout aside { position: static !important; }
        }
      `}</style>
    </div>
  );
}
