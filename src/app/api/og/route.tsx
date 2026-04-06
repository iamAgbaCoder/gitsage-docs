import { ImageResponse } from "next/og";
// @ts-ignore
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
          backgroundImage: "radial-gradient(circle at 50% 50%, #22c55e10 0%, #030712 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Grid Pattern Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />

        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 40px rgba(34, 197, 94, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "40px",
              fontWeight: "900",
            }}
          >
            GS
          </div>
          <span
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "-0.05em",
            }}
          >
            GitSage
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "900px",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "24px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              lineHeight: 1.6,
              maxWidth: "700px",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer info: Command Palette style */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 24px",
            backgroundColor: "rgba(255,255,255,0.03)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.05)",
            color: "#22c55e",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          <span style={{ color: "white", opacity: 0.5 }}>$</span> gitsage login --open
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
