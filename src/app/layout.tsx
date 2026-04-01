import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
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
    <html
      lang="en"
      className={`${outfit.variable} ${firaCode.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
