import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full border-[#E2E8F0] bg-white p-8 text-center space-y-6 card-shadow">
        <div className="h-16 w-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] mx-auto">
          <Compass className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">404 Error</span>
          <h2 className="text-2xl font-bold text-[#0F172A]">Page Not Found</h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            The curriculum module, project, or page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="gap-2">
              <Home className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
