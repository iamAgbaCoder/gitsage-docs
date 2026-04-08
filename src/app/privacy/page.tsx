import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-8 font-outfit uppercase tracking-tight">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <p>Last Updated: April 2026</p>
          <section>
            <h2 className="text-xl font-bold text-sage mb-2">1. Code Data Handling</h2>
            <p>We do not store your full source code. GitSage only processes the specific code snippets (git diffs) required for commit message generation. This data is ephemeral and used only for analysis.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-sage mb-2">2. Identity Connectivity</h2>
            <p>GitHub SSO data is used strictly for authentication and to link your GitSage intelligence profile across devices. We never read your private repositories without explicit permission via the GitSage CLI.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
