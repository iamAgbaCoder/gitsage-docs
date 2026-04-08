import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const viewport: Viewport = {
  themeColor: "#020617",
};


export const metadata: Metadata = {
  metadataBase: new URL("https://gitsage.dev"),
  title: {
    default: "GitSage — The Intelligence Layer for Git",
    template: "%s | GitSage Intelligence",
  },
  description:
    "Stop writing commit messages. Start generating intelligence. GitSage uses advanced AI to analyze code changes and explain the intent, impact, and scope of every commit. Supports all major programming languages.",
  keywords: ["git", "ai", "commit", "developer tools", "gitsage", "ollama", "conventional commits", "python", "javascript", "rust", "go"],
  authors: [{ name: "GitSage Team" }],
  openGraph: {
    type: "website",
    title: "GitSage — The Intelligence Layer for Git",
    description:
      "The Intelligence Layer for your Git workflow. Analyzing WHAT changed to explain WHY it matters.",
    siteName: "GitSage",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitSage — The Intelligence Layer for Git",
    description: "The Intelligence Layer for your Git workflow. Analyzing WHAT changed to explain WHY it matters.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

import ScrollHandler from "@/components/ScrollHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#020617] text-white selection:bg-sage/30 overflow-x-hidden w-full">
        <ScrollHandler />
        <AuthProvider>
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
