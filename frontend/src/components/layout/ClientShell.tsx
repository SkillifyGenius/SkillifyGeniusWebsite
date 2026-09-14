"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactWidget } from "@/components/shared/FloatingContactWidget";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FloatingContactWidget />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
