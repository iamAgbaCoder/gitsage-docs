import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({ className, label, error, leftIcon, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{label}</label>}
      <div className="group relative transition-all duration-300">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sage transition-colors duration-200">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            "w-full bg-[#030712] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200",
            "focus:border-sage/40 focus:ring-4 focus:ring-sage/5 focus:bg-sage/5",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/5",
            leftIcon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] font-bold text-red-500 px-1 animate-pulse">{error}</p>}
    </div>
  );
}
