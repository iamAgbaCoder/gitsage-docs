import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "glow";
  isHoverable?: boolean;
}

export function Card({ className, variant = "glass", isHoverable = false, children, ...props }: CardProps) {
  const baseStyles = "rounded-2xl border border-white/5 transition-all duration-300";
  
  const variants = {
    glass: "glass backdrop-blur-xl shadow-2xl",
    solid: "bg-[#030712]/50 shadow-inner",
    glow: "glass border-sage/20 shadow-[0_0_50px_rgba(34,197,94,0.05)]",
  };

  const hoverStyles = isHoverable ? "hover:border-sage/30 hover:shadow-sage/5 hover:-translate-y-1" : "";

  return (
    <div className={cn(baseStyles, variants[variant], hoverStyles, className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-b border-white/5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-t border-white/5 bg-black/20 rounded-b-2xl", className)} {...props}>
      {children}
    </div>
  );
}
