import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold kinetic-transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-primary text-white hover:scale-105 neon-shadow",
      secondary: "bg-slate-900 text-white hover:bg-slate-800",
      outline: "border border-purple-200 text-slate-700 hover:bg-white",
      ghost: "hover:bg-primary/10 text-primary",
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-10 py-4",
      lg: "px-12 py-5 text-lg",
      icon: "p-3 rounded-xl",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
