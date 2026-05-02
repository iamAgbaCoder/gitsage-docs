import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const SITE_URL = "https://gitsage-ai.vercel.app";

const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GitSage — The Intelligence Layer for Git",
    template: "%s | GitSage",
  },
  description:
    "Stop writing commit messages. Start generating intelligence. GitSage uses advanced AI to analyze code changes and explain the intent, impact, and scope of every commit. Works with pip, npm, yarn, pnpm, uv, poetry, and curl.",
  keywords: ["git", "ai", "commit", "developer tools", "gitsage", "ollama", "conventional commits", "python", "javascript", "rust", "go", "npm", "pip", "uv", "poetry"],
  authors: [{ name: "GitSage Team" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "GitSage — The Intelligence Layer for Git",
    description: "The Intelligence Layer for your Git workflow. Analyzing WHAT changed to explain WHY it matters.",
    siteName: "GitSage",
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: "GitSage — AI-powered Git commit intelligence",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitSage — The Intelligence Layer for Git",
    description: "The Intelligence Layer for your Git workflow. Analyzing WHAT changed to explain WHY it matters.",
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

import ScrollHandler from "@/components/ScrollHandler";
import TelemetryHandler from "@/components/TelemetryHandler";
import KeepAlive from "@/components/KeepAlive";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <head>
        {/* Disable browser scroll restoration before any JS runs */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://gitsage-api.up.railway.app" />
      </head>
      <body className="bg-[#020617] text-white selection:bg-sage/30 font-outfit overflow-x-hidden w-full">
        <ScrollHandler />
        <KeepAlive />
        <AuthProvider>
          <TelemetryHandler />
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#030712",
                color: "#f1f5f9",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "var(--font-outfit), sans-serif",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#030712",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

export { viewport };
