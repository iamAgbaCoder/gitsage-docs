import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Dynamic content params
  const title = searchParams.get("title") || "GitSage Intelligence Core";
  const description = searchParams.get("description") || "The Intelligence Layer for your Git workflow.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          backgroundImage: "radial-gradient(circle at 50% 50%, #22c55e08 0%, #030712 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Cinematic Mesh Glows */}
        <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "#22c55e10", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "450px", height: "450px", borderRadius: "50%", background: "#0ea5e908", filter: "blur(80px)" }} />

        {/* Browser Window Frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1000px",
            height: "500px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34, 197, 94, 0.1)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Window Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 32px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
              Intelligence Portal / {title.split(" ")[0]}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#22c55e", fontSize: "14px", fontWeight: "bold" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
              SECURE
            </div>
          </div>

          {/* Window Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "60px",
              flex: 1,
            }}
          >
            {/* Branding Accent */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
               <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", fontWeight: "bold" }}>G</div>
               <span style={{ fontSize: "18px", color: "white", fontWeight: "bold", letterSpacing: "-0.02em" }}>GitSage Intelligence</span>
            </div>

            <h1
              style={{
                fontSize: "72px",
                fontWeight: "900",
                color: "white",
                marginBottom: "20px",
                lineHeight: 1.05,
                letterSpacing: "-0.05em",
                backgroundImage: "linear-gradient(to bottom right, #fff 30%, #94a3b8)",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#64748b",
                lineHeight: 1.5,
                maxWidth: "800px",
                fontWeight: "500",
              }}
            >
              {description}
            </p>
          </div>

          {/* Code Artifact Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "60px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderRadius: "12px",
              color: "#22c55e",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            $ gitsage analyze --live
          </div>
        </div>

        {/* Global Branding Accent */}
        <div style={{ position: "absolute", bottom: "40px", fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
          Proprietary Intelligence Protocol v2.5
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
