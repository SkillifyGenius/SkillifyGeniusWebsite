import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("flex min-h-24 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-emerald-100 disabled:opacity-50", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
