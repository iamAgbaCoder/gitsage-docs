"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitBranch, Search, Zap, Github } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/getting-started", label: "Guide" },
  { href: "/docs/configuration", label: "Config" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          pointer-events-auto
          relative flex items-center justify-between gap-8 px-6 py-2.5
          rounded-2xl border transition-all duration-500
          ${scrolled 
            ? "glass-strong w-full max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
            : "glass w-full max-w-5xl border-white/5"}
        `}
      >
        {/* Dynamic Island Highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-sage/5 via-sky-500/5 to-sage/5 rounded-2xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage to-sky-500 flex items-center justify-center sage-glow transform transition-transform group-hover:scale-110 group-hover:rotate-6">
              <GitBranch size={20} className="text-obsidian" strokeWidth={2.5} />
            </div>
            <div className="absolute -inset-1 bg-sage/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight gradient-sage">
            GitSage
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 relative z-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-400 hover:text-sage hover:bg-sage/5 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:border-sage/20 hover:text-sage cursor-pointer transition-all">
            <Search size={14} />
            <span className="text-xs font-fira">⌘K</span>
          </div>

          <Link
            href="https://github.com"
            target="_blank"
            className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Github size={18} />
          </Link>

          <Link
            href="/docs/getting-started"
            className="btn-sage !px-4 !py-1.5 !text-xs"
          >
            <Zap size={14} className="fill-current" />
            <span className="hidden sm:inline">Get Started</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-400 hover:text-sage transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-[calc(100%+10px)] inset-x-0 glass rounded-2xl overflow-hidden border border-white/10 md:hidden"
            >
              <div className="p-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-lg text-slate-400 hover:bg-sage/10 hover:text-sage transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
