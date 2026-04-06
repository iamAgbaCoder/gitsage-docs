"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, Check, Trash2, Plus, Terminal, PlusCircle, Shield, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { GitSageAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiKeysPage() {
  const auth = useAuth();
  const user = auth?.user;
  const refreshUser = auth?.refreshUser;

  const [keys, setKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
    // Real-time polling simulation (Every 10 seconds)
    const interval = setInterval(fetchKeys, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchKeys = async () => {
    try {
      const data: any = await GitSageAPI.listApiKeys();
      const extractedKeys = Array.isArray(data) ? data : (data?.keys || []);
      setKeys(extractedKeys);
    } catch (err) {
      console.error("Failed to fetch keys", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    try {
      setIsCreating(true);
      const res: any = await GitSageAPI.generateApiKey(newKeyName);
      
      // Pattern: { raw_key: "gs_...", id: "...", ... }
      const secret = res?.raw_key || res?.key || res?.api_key || res?.secret;
      const id = res?.id || res?.key_id;

      if (secret) {
        setNewlyGeneratedKey({ ...res, key: secret, id: id || "temp" });
        if (id) GitSageAPI.vault.saveKey(id, secret);
      }
      
      setNewKeyName("");
      toast.success("Intelligence Signature Signature Generated");
      await fetchKeys();
    } catch (err) {
      console.error("[Keys] Key generation failed:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      await GitSageAPI.revokeApiKey(id);
      toast.success("Key successfully revoked.");
      await fetchKeys();
    } catch (err) {}
  };

  const copyToClipboard = (text: string, id: string, type: "secret" | "id" = "secret") => {
    if (!text || text.includes("undefined")) {
      if (type === "secret") {
        toast.error("Secret is masked for security. Create a new key to view full secret.");
        return;
      }
    }
    
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${type === "secret" ? "Full Secret" : "Key ID"} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Derive counts dynamically
  const activeCount = keys.filter(k => k.status === "active").length;
  const revokedCount = keys.filter(k => k.status === "revoked").length;

  return (
    <div className="space-y-8 sm:space-y-12 max-w-full overflow-hidden">
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-sage uppercase tracking-[0.2em] text-[10px] font-bold">
              <Shield size={12} />
              Identity Security
           </div>
           <h1 className="text-3xl sm:text-4xl font-bold font-outfit text-white">Advanced API Keys</h1>
           <p className="text-slate-400 max-w-lg text-sm sm:text-base">Management layer for your GitSage authentication tokens.</p>
        </div>
      </section>

      {/* Stats row for keys */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Keys", value: activeCount, color: "text-sage" },
          { label: "Revoked Keys", value: revokedCount, color: "text-red-400" },
          { label: "Global Reach", value: "12 Edge Nodes", color: "text-sky-400" },
          { label: "Security Level", value: "AES-256", color: "text-amber-400" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-6 text-center">
             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
             <p className={stat.color + " text-2xl font-bold font-outfit"}>{stat.value}</p>
          </Card>
        ))}
      </section>

      {/* Main Keys List */}
      {/* Newly Generated Key Modal Overlay */}
      <AnimatePresence>
        {newlyGeneratedKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 9999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-xl"
            >
              <Card variant="glow" className="p-8 border-sage/30 bg-[#0A0C10] relative overflow-hidden shadow-2xl shadow-sage/10">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-sage rotate-12"><Shield size={120} /></div>
                
                <div className="space-y-8 relative z-10">
                   <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center text-sage">
                         <div className="relative">
                            <Shield size={32} />
                            <motion.div 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               transition={{ delay: 0.3 }}
                               className="absolute -top-1 -right-1 w-5 h-5 bg-sage rounded-full flex items-center justify-center text-black"
                            >
                               <Check size={12} strokeWidth={3} />
                            </motion.div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-bold text-white font-outfit">Secret Key Security Signature</h3>
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">This is a one-time cryptographic reveal</p>
                      </div>
                   </div>

                   <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{newlyGeneratedKey.name}</span>
                         <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[9px] font-bold uppercase border border-sage/10">Production-Ready</span>
                      </div>
                      
                      <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-sage/20 to-sky-400/20 blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                         <code className="relative flex items-center justify-center min-h-[60px] w-full px-4 py-4 bg-black rounded-xl text-sage font-mono text-sm break-all text-center border border-white/10 select-all">
                            {newlyGeneratedKey.key}
                         </code>
                      </div>
                      
                      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                         <p className="text-[10px] text-amber-500/80 font-medium leading-relaxed">
                            <span className="font-bold">CAUTION:</span> Store this key in a secure vault (like GitHub Secrets or 1Password). Once this window is closed, the GitSage engine will purge the plain-text secret from its short-term memory forever.
                         </p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <Button 
                        onClick={() => copyToClipboard(newlyGeneratedKey.key, newlyGeneratedKey.id, "secret")}
                        className="flex-1 py-6 shadow-lg shadow-sage/20 font-bold uppercase tracking-widest text-[11px]"
                      >
                         <Copy size={16} className="mr-2" /> Copy Full Signature
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setNewlyGeneratedKey(null)}
                        className="px-8 bg-white/5 border border-white/10 hover:bg-white/10"
                      >
                         Securely Close
                      </Button>
                   </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="overflow-hidden">
            <CardHeader className="flex items-center justify-between py-6">
               <h3 className="font-bold text-sm uppercase tracking-widest text-white">Active Access Tokens</h3>
               <span className="text-[10px] text-slate-500 font-bold uppercase">{keys.length} Keys Found</span>
            </CardHeader>
            <CardContent className="divide-y divide-white/5 p-0">
               {isLoading && keys.length === 0 ? (
                 <div className="p-12 flex flex-col items-center justify-center gap-4 text-slate-500 animate-pulse">
                    <Terminal size={32} />
                    <p className="text-xs uppercase font-bold tracking-widest">Querying Identity Vault...</p>
                 </div>
               ) : keys.length === 0 ? (
                 <div className="p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-slate-600">
                       <Key size={32} />
                    </div>
                    <p className="text-slate-400 text-sm">No active API keys located for this account.</p>
                 </div>
               ) : (
                 keys.map((key) => (
                   <div key={key.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/[0.02] transition-all group">
                      <div className="space-y-1">
                         <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white text-sm tracking-tight">{key.name}</h4>
                            {key.status === "active" ? (
                              <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage text-[9px] font-bold uppercase border border-sage/10">Active</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-red-400/10 text-red-400 text-[9px] font-bold uppercase border border-red-400/10">Revoked</span>
                            )}
                         </div>
                         <p className="text-xs font-mono text-slate-500">{key.prefix || "••••"}••••••••••••••••••••</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Last Used</p>
                            <p className="text-[10px] text-slate-300 font-fira">{key.lastUsed || "Never"}</p>
                         </div>
                         <div className="flex items-center gap-2 ml-auto">
                            <button 
                               onClick={() => copyToClipboard(key.key || key.id, key.id, key.key ? "secret" : "id")}
                               disabled={key.status !== "active"}
                               className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                               title={key.key ? "Copy Secret Key" : "Copy Key ID"}
                            >
                               {copiedId === key.id ? <Check size={16} className="text-sage" /> : <Copy size={16} />}
                            </button>
                            <button 
                               onClick={() => handleRevokeKey(key.id)}
                               disabled={key.status !== "active"}
                               className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500/20 transition-all opacity-20 group-hover:opacity-100 disabled:hidden"
                               title="Revoke Key"
                            >
                               <Trash2 size={16} />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Creation Panel */}
        <div className="space-y-6">
          <Card variant="glow" className="p-8">
             <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sage/10 border border-sage/20 flex items-center justify-center mx-auto text-sage">
                   <PlusCircle size={32} />
                </div>
                <div className="space-y-2">
                   <h3 className="font-bold text-white text-xl font-outfit">Issue New Token</h3>
                   <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest">GitSage uses granular scoping. Each key is rate-limited independently.</p>
                </div>
                
                <form onSubmit={handleGenerateKey} className="space-y-4 pt-4">
                   <input 
                     type="text" 
                     placeholder="Name: e.g Production-Vercel"
                     value={newKeyName}
                     onChange={(e) => setNewKeyName(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sage/40 transition-all font-outfit"
                     required
                   />
                   <Button className="w-full py-6" disabled={isCreating}>
                      {isCreating ? "Generating Intelligence Signature..." : "Create Intelligence Key"}
                      {!isCreating && <Plus size={18} className="ml-2" />}
                   </Button>
                </form>
             </div>
          </Card>

          <Card variant="glass" className="p-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-sage rotate-12"><Globe size={64} /></div>
             <div className="relative z-10 space-y-4">
                <p className="text-[9px] font-bold text-sage uppercase tracking-widest flex items-center gap-2"><Plus size={10} /> Integration Tip</p>
                <h4 className="font-bold text-white text-sm">Automate Your Workflow</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Add these keys as SECRETS in your CI/CD platform (GitHub Actions, GitLab CI) to automate commit analysis globally.</p>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


