import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "emerald" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
    
    const variants = {
      primary: "bg-[#2563EB] hover:bg-[#1E40AF] text-white shadow-sm font-semibold",
      secondary: "bg-white hover:bg-blue-50/60 text-[#2563EB] border border-[#2563EB] font-semibold",
      outline: "bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] shadow-sm font-medium",
      ghost: "hover:bg-slate-100 text-[#475569] hover:text-[#0F172A]",
      destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm font-semibold",
      emerald: "bg-[#10B981] hover:bg-emerald-600 text-white shadow-sm font-semibold",
      gradient: "brand-gradient text-white shadow-sm hover:opacity-95 font-semibold",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs rounded-xl gap-1.5",
      md: "h-11 px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5 font-semibold",
      icon: "h-10 w-10 rounded-xl p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
