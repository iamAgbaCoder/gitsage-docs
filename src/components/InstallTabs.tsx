"use client";

import { useState } from "react";
import { Check, Copy, Terminal, ExternalLink } from "lucide-react";

const TABS = [
  {
    id: "pip",
    label: "pip",
    group: "Python",
    install: "pip install gitsage-cli",
    upgrade: "pip install --upgrade gitsage-cli",
    href: null,
  },
  {
    id: "uv",
    label: "uv",
    group: "Python",
    install: "uv tool install gitsage-cli",
    upgrade: "uv tool upgrade gitsage-cli",
    href: null,
  },
  {
    id: "poetry",
    label: "Poetry",
    group: "Python",
    install: "poetry add --group dev gitsage-cli",
    upgrade: "poetry update gitsage-cli",
    href: null,
  },
  {
    id: "npm",
    label: "npm",
    group: "Node",
    install: "npm install -g gitsage-cli",
    upgrade: "npm update -g gitsage-cli",
    href: null,
  },
  {
    id: "pnpm",
    label: "pnpm",
    group: "Node",
    install: "pnpm add -g gitsage-cli",
    upgrade: "pnpm update -g gitsage-cli",
    href: null,
  },
  {
    id: "yarn",
    label: "Yarn",
    group: "Node",
    install: "yarn global add gitsage-cli",
    upgrade: "yarn global upgrade gitsage-cli",
    href: null,
  },
  {
    id: "curl",
    label: "curl",
    group: "Shell",
    install: "curl -fsSL https://gitsage-ai.vercel.app/install.sh | bash",
    upgrade: "curl -fsSL https://gitsage-ai.vercel.app/install.sh | bash --update",
    href: null,
  },
  {
    id: "releases",
    label: "Releases",
    group: "Binary",
    install: "Download from GitHub Releases",
    upgrade: "Download from GitHub Releases",
    href: "https://github.com/iamAgbaCoder/GitSage/releases",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const GROUP_COLORS: Record<string, string> = {
  Python: "text-sky-400",
  Node:   "text-green-400",
  Shell:  "text-purple-400",
  Binary: "text-amber-400",
};

const GROUP_SUB: Record<string, string> = {
  Python: "· package: gitsage-cli",
  Node:   "· package: gitsage-cli",
  Shell:  "· macOS & Linux · checksum verified",
  Binary: "· Windows, macOS, Linux binaries",
};

export default function InstallTabs({ showUpgrade = false }: { showUpgrade?: boolean }) {
  const [active, setActive] = useState<TabId>("pip");
  const [copied, setCopied] = useState(false);

  const tab = TABS.find((t) => t.id === active)!;
  const cmd = showUpgrade ? tab.upgrade : tab.install;
  const isLink = Boolean(tab.href);

  const copy = async () => {
    if (isLink) return;
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/[0.07] bg-[#030712] overflow-hidden shadow-2xl">
      {/* Tab bar */}
      <div className="flex items-center gap-0.5 px-3 pt-3 pb-0 border-b border-white/[0.06] overflow-x-auto scrollbar-none">
        <div className="flex gap-1.5 pr-3 mr-2 border-r border-white/10 shrink-0">
          <div className="h-2 w-2 rounded-full bg-red-500/50" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <div className="h-2 w-2 rounded-full bg-green-500/50" />
        </div>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 px-3 py-2 text-[11px] font-bold font-fira rounded-t-lg transition-all border-b-2 -mb-px ${
              active === t.id
                ? "text-white border-sage bg-white/[0.04]"
                : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.02]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Command / link area */}
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Terminal size={14} className={`shrink-0 ${GROUP_COLORS[tab.group]}`} />
          <span className="font-fira text-sm text-slate-300 truncate select-all">{cmd}</span>
        </div>

        {isLink ? (
          <a
            href={tab.href!}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
          >
            <ExternalLink size={10} />
            Open
          </a>
        ) : (
          <button
            onClick={copy}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
              copied
                ? "bg-sage/10 border-sage/30 text-sage"
                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Badge row */}
      <div className="px-5 pb-3 flex items-center gap-2">
        <span className={`text-[9px] font-bold uppercase tracking-widest ${GROUP_COLORS[tab.group]}`}>
          {tab.group}
        </span>
        <span className="text-[9px] text-slate-600 font-fira">{GROUP_SUB[tab.group]}</span>
      </div>
    </div>
  );
}

