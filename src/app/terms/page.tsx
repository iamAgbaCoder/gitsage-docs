import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-8 font-outfit uppercase tracking-tight">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <p>Last Updated: April 2026</p>
          <section>
            <h2 className="text-xl font-bold text-sage mb-2">1. Intelligence Usage</h2>
            <p>GitSage provides AI-powered analysis of git diffs. By using this service, you grant us permission to process your code fragments for the purpose of generating commit intelligence.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-sage mb-2">2. Liability</h2>
            <p>GitSage is provided "as is". While we strive for 99% accuracy in commit generation, we are not responsible for unintended consequences of AI-generated text in your repository history.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
