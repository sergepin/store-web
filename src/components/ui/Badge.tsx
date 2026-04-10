import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline";
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest";
  
  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-white/80 backdrop-blur-md text-primary",
    outline: "border border-primary/20 text-primary",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
