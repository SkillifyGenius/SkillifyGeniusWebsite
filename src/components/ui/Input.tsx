import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:border-[#2563EB] focus-visible:ring-2 focus-visible:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-subtle",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
