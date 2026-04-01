import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import { ArrowRight, Settings2, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Configuration Reference | GitSage",
  description: "Full reference for ~/.git-sage.json configuration options.",
};

const CONFIG_PARAMS = [
  {
    key: "ai_provider",
    type: "string",
    default: '"gitsage"',
    values: '"gitsage" | "local"',
    desc: 'The intelligence engine to use. "gitsage" uses the GitSage API Cloud; "local" routes to Ollama.',
  },
  {
    key: "model",
    type: "string",
    default: '"gitsage-fast"',
    values: "Any valid model ID",
    desc: 'The specific model. For local: "mistral", "llama3", "codellama", etc.',
  },
  {
    key: "auto_commit",
    type: "boolean",
    default: "false",
    values: "true | false",
    desc: "If true, automatically commits without asking for confirmation when confidence is high (≥ 85%).",
  },
  {
    key: "max_length",
    type: "number",
    default: "72",
    values: "40–120",
    desc: "Maximum character length for the commit subject line.",
  },
  {
    key: "style",
    type: "string",
    default: '"conventional"',
    values: '"conventional" | "simple" | "detailed"',
    desc: "Commit message formatting style. Conventional Commits is recommended.",
  },
  {
    key: "telemetry",
    type: "boolean",
    default: "true",
    values: "true | false",
    desc: "Anonymous usage telemetry to help improve GitSage. No code or diff data is ever sent.",
  },
];

export default function ConfigurationPage() {
  return (
    <article className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="space-y-6 border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-fira tracking-tight">
          <Settings2 size={14} /> Configuration
        </div>
        <h1 id="configuration" className="text-4xl md:text-5xl font-extrabold font-outfit text-white tracking-tight">
          Config Reference
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          GitSage reads configuration from{" "}
          <code className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-fira text-sm">~/.git-sage.json</code>
          . This file is created automatically the first time you run{" "}
          <code className="bg-sage/10 text-sage px-2 py-0.5 rounded font-fira text-sm">gitsage config</code>.
        </p>
      </header>

      {/* Full config example */}
      <section className="space-y-6">
        <h2 id="full-config" className="text-2xl font-bold font-outfit text-white">
          Full Configuration File
        </h2>
        <CodeBlock
          filename="~/.git-sage.json"
          language="json"
          code={`{
  "ai_provider": "gitsage",
  "model": "gitsage-fast",
  "auto_commit": false,
  "max_length": 72,
  "style": "conventional",
  "telemetry": true
}`}
        />
      </section>

      {/* Parameter table */}
      <section className="space-y-6">
        <h2 id="parameters" className="text-2xl font-bold font-outfit text-white">
          Parameters
        </h2>
        <div className="space-y-4">
          {CONFIG_PARAMS.map((param) => (
            <Card key={param.key} variant="glass">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <code className="font-fira text-sage font-bold text-sm">
                    {param.key}
                  </code>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-fira">
                      {param.type}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-fira">
                      default: {param.default}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-2">
                  {param.desc}
                </p>
                <p className="text-xs text-slate-600 font-fira">
                  Values: {param.values}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CLI config commands */}
      <section className="space-y-6">
        <h2 id="cli-config" className="text-2xl font-bold font-outfit text-white">
          Setting Config via CLI
        </h2>
        <p className="text-slate-400 leading-relaxed text-sm">
          You can update configuration directly from the terminal without editing the JSON file:
        </p>
        <CodeBlock
          code={`# Set GitSage Cloud as provider with your API key\ngitsage config --provider gitsage --key YOUR_GLOBAL_KEY\n\n# Switch to local Ollama mode\ngitsage config --provider local\n\n# Enable auto-commit for high-confidence suggestions\ngitsage config --auto-commit true\n\n# Change max commit message length\ngitsage config --max-length 80\n\n# View current config\ngitsage config`}
          language="bash"
        />
      </section>

      {/* Environment Setup */}
      <section className="space-y-6">
        <h2 id="env-setup" className="text-2xl font-bold font-outfit text-white">
          API Key Setup
        </h2>
        <p className="text-slate-400 leading-relaxed text-sm">
          Get your production API key from the{" "}
          <Link href="/dashboard" className="text-sky-400 hover:underline">
            GitSage Portal
          </Link>
          . Set it as an environment variable for security:
        </p>
        <CodeBlock
          filename="~/.bashrc or ~/.zshrc"
          language="bash"
          code={`export GITSAGE_API_KEY="gs_prod...your-key-here"`}
        />
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 border-l-4 border-l-amber-500 flex items-start gap-3 mt-4">
          <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400">
            <strong className="text-amber-500">Security:</strong>{" "}
            Never commit your API key to version control. GitSage stores it encrypted in{" "}
            <code className="text-purple-400 font-fira text-xs bg-purple-500/10 px-1 py-0.5 rounded">~/.git-sage.json</code>,
            which is outside your repo.
          </p>
        </div>
      </section>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold font-outfit text-white mb-4">Next Steps</h3>
        <div className="flex flex-col gap-3">
          {[
            { href: "/docs/providers", label: "Set up local Ollama model" },
            { href: "/docs/troubleshooting", label: "Troubleshooting common issues" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sage text-sm font-medium hover:text-sage/80 transition-colors">
              <ArrowRight size={16} />
              {link.label}
            </Link>
          ))}
        </div>
      </Card>
    </article>
  );
}
