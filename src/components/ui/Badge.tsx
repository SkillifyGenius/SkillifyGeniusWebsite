import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "emerald" | "amber" | "violet" | "cyan" | "indigo" | "blue";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-blue-50 text-[#2563EB] border-blue-200/80 font-medium",
    blue: "bg-blue-50 text-[#2563EB] border-blue-200/80 font-medium",
    indigo: "bg-indigo-50 text-[#6366F1] border-indigo-200/80 font-medium",
    secondary: "bg-slate-100 text-[#475569] border-slate-200 font-medium",
    outline: "border-[#E2E8F0] text-[#0F172A] bg-white font-medium",
    emerald: "bg-emerald-50 text-[#10B981] border-emerald-200/80 font-medium",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80 font-medium",
    violet: "bg-purple-50 text-purple-700 border-purple-200/80 font-medium",
    cyan: "bg-sky-50 text-sky-700 border-sky-200/80 font-medium",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
