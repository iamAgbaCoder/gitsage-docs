"use client";

import React from "react";
import { Settings, User, Bell, Shield, Moon, Globe, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const sections = [
    {
      title: "Profile Information",
      icon: User,
      desc: "Manage your public profile and developer identity.",
      inputs: [
        { label: "Display Name", value: user?.name, type: "text" },
        { label: "Email Address", value: user?.email, type: "email" },
      ]
    },
    {
      title: "Security & Access",
      icon: Shield,
      desc: "Configure your multifactor authentication and session preferences.",
      inputs: [
        { label: "Current Password", value: "••••••••••••", type: "password" },
      ]
    },
    {
       title: "Notifications",
       icon: Bell,
       desc: "Configure how you receive intelligence updates and usage alerts.",
       inputs: []
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl space-y-8 sm:space-y-12"
    >
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-purple-400 uppercase tracking-[0.2em] text-[10px] font-bold">
           <Settings size={12} />
           Preferences Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-outfit text-white">Identity Settings</h1>
        <p className="text-slate-400 text-sm sm:text-base">Configure your GitSage experience and manage your security protocols.</p>
      </section>

      {/* Settings Sections */}
      <div className="space-y-6">
         {sections.map((section) => (
           <motion.div key={section.title} variants={itemVariants}>
              <Card variant="glass" className="overflow-hidden">
                 <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/5 rounded-lg text-slate-400"><section.icon size={18} /></div>
                       <div>
                          <h3 className="font-bold text-white text-sm uppercase tracking-tight">{section.title}</h3>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{section.desc}</p>
                       </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">Edit Section</Button>
                 </CardHeader>
                 <CardContent className="space-y-6 px-8 py-8">
                    {section.inputs.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                         {section.inputs.map((input) => (
                           <div key={input.label} className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{input.label}</label>
                              <div className="px-4 py-3 bg-black/40 border border-white/5 rounded-xl text-sm text-slate-300 font-outfit">
                                 {input.value}
                              </div>
                           </div>
                         ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Advanced preferences coming soon to v1.3.0</p>
                      </div>
                    )}
                 </CardContent>
              </Card>
           </motion.div>
         ))}
      </div>

      {/* Action Footer */}
      <motion.div variants={itemVariants} className="flex justify-end gap-4 pt-10 border-t border-white/5">
         <Button variant="ghost">Reset Changes</Button>
         <Button className="px-10">
            <Save size={16} className="mr-2" />
            Synchronize Preferences
         </Button>
      </motion.div>
    </motion.div>
  );
}
