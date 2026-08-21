"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Skillify Genius Error Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full border-[#E2E8F0] bg-white p-8 text-center space-y-6 card-shadow">
        <div className="h-16 w-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0F172A]">Something went wrong</h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            An unexpected error occurred. Our engineering team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="md" onClick={() => reset()} className="w-full sm:w-auto gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
