import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const viewport: Viewport = {
  themeColor: "#020617",
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GitSage — The Intelligence Layer for Git",
    template: "%s | GitSage",
  },
  description:
    "Stop writing commit messages. Start generating intelligence. GitSage uses advanced AI to analyze code changes and explain the intent, impact, and scope of every commit.",
  keywords: ["git", "ai", "commit", "developer tools", "gemini", "ollama", "conventional commits"],
  authors: [{ name: "GitSage Team" }],
  openGraph: {
    type: "website",
    title: "GitSage — The Intelligence Layer for Git",
    description:
      "AI-powered Git commit assistant that understands WHY you coded, not just WHAT you changed.",
    siteName: "GitSage",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitSage — The Intelligence Layer for Git",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <body className="bg-[#020617] text-white selection:bg-sage/30">
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
