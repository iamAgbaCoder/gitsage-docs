"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Cpu, 
  Settings, 
  BookOpen, 
  ChevronRight, 
  Terminal, 
  ShieldCheck, 
  Layout, 
  Sparkles,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon?: any;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const DOCS_SECTIONS: SidebarSection[] = [
  {
    title: "Onboarding",
    links: [
      { href: "/docs/getting-started", label: "Quick Start Guide", icon: Zap },
      { href: "/docs/installation", label: "Installation", icon: Terminal },
      { href: "/docs/configuration", label: "Configuration", icon: Settings },
    ],
  },
  {
    title: "Intelligence Engine",
    links: [
      { href: "/docs/engine-report", label: "The Three Pillars", icon: Cpu },
      { href: "/docs/confidence-score", label: "Confidence Models", icon: ShieldCheck },
      { href: "/docs/providers", label: "AI Providers", icon: Layout },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/troubleshooting", label: "Troubleshooting", icon: BookOpen },
      { href: "/docs/faq", label: "Global FAQ", icon: Sparkles },
    ],
  },
];

interface DocsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-y-0 left-0 w-80 h-full bg-[#030712]/95 backdrop-blur-xl border-r border-white/5 z-[101] p-6 pt-12 overflow-y-auto custom-scrollbar lg:relative lg:translate-x-0 lg:w-72 lg:bg-transparent lg:border-none lg:z-10 lg:pt-0 pb-20",
          !isOpen && "lg:block" // Force block for large screens
        )}
      >
        {/* Navigation Wrapper */}
        <nav className="space-y-10 lg:sticky lg:top-24 max-h-[calc(100vh-120px)]">
          {/* Header for Mobile (Optional) */}
          <div className="flex lg:hidden items-center gap-3 mb-12 border-b border-white/5 pb-6">
             <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center shrink-0">
               <Command size={18} className="text-obsidian" />
             </div>
             <span className="font-outfit font-bold text-lg tracking-tight gradient-sage">Docs Portal</span>
          </div>

          {/* Grouped Links */}
          {DOCS_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => onClose()}
                        className={cn(
                          "group relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                          isActive 
                            ? "bg-sage/10 text-sage border border-sage/10" 
                            : "text-slate-500 hover:bg-white/5 hover:text-white"
                        )}
                      >
                         <div className="flex items-center gap-3 shrink-0">
                            {link.icon && <link.icon size={16} className={cn("transition-colors", isActive ? "text-sage" : "text-slate-600 group-hover:text-slate-400")} />}
                            <span className="whitespace-nowrap">{link.label}</span>
                         </div>
                         {isActive && (
                           <motion.div 
                             layoutId="active-sidebar-pill" 
                             className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                           />
                         )}
                         {!isActive && (
                           <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none" />
                         )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* External Callout in Sidebar */}
          <div className="pt-6 border-t border-white/5 mx-4">
             <Link 
               href="https://github.com/iamAgbaCoder/gitsage/issues" 
               target="_blank"
               className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#030712] border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:border-sage/20 hover:text-sage transition-all"
             >
                <Sparkles size={12} className="text-sage" /> Report Global Issue
             </Link>
          </div>
        </nav>
      </motion.aside>
    </>
  );
}
