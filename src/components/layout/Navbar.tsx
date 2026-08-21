"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Sparkles, 
  Menu, 
  X, 
  User,
  ArrowRight,
  Mail,
  Phone
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/courses", label: "Programs" },
    { href: "/pathfinder", label: "Pathfinder" },
    { href: "/blog", label: "Blogs" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      {/* 1. TOP CONTACT & DIRECT MESSAGING BAR */}
      <div className="w-full bg-[#0F172A] text-slate-300 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Email & Phone */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="mailto:skillifygenius@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>skillifygenius@gmail.com</span>
            </a>

            <a
              href="tel:+8801860998888"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#10B981]" />
              <span>+880 1860 99 88 88</span>
            </a>
          </div>

          {/* Right: Direct WhatsApp & Telegram with Original Icons */}
          <div className="flex items-center gap-4 font-medium">
            <span className="hidden md:inline text-slate-400">Direct Admissions Desk:</span>
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801860998888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 hover:text-white hover:bg-emerald-900 transition-all font-semibold"
            >
              {/* Authentic WhatsApp Icon */}
              <svg className="h-3.5 w-3.5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.768-5.768zm0 10.37c-.846 0-1.636-.232-2.316-.653l-.166-.103-1.558.409.416-1.519-.111-.176c-.461-.734-.705-1.59-.704-2.472 0-2.537 2.064-4.601 4.603-4.601 2.538 0 4.602 2.064 4.602 4.601 0 2.538-2.064 4.602-4.602 4.602zm2.536-3.468c-.139-.07-8.23-4.062-8.369-4.132-.139-.07-.24-.105-.341.07-.101.175-.391.507-.479.612-.088.105-.176.122-.315.052-.139-.07-.588-.217-1.12-.691-.414-.369-.693-.825-.774-.965-.081-.14-.009-.216.061-.285.063-.062.139-.162.209-.243.07-.081.093-.139.139-.232.046-.093.023-.174-.012-.244-.035-.07-.341-.82-.467-1.124-.123-.296-.248-.256-.341-.261-.088-.005-.189-.006-.29-.006-.101 0-.265.038-.403.189-.138.151-.529.517-.529 1.261s.541 1.463.616 1.564c.075.101 1.065 1.626 2.58 2.279.36.155.641.248.86.318.362.115.692.099.953.06.291-.044.894-.366 1.02-.72.126-.354.126-.657.088-.72-.038-.063-.139-.1-.278-.17zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.957-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.632 0-3.149-.49-4.42-1.332l-.317-.208-2.937.828.784-2.863-.228-.328A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/+8801860998888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-300 hover:text-white hover:bg-sky-900 transition-all font-semibold"
            >
              {/* Authentic Telegram Icon */}
              <svg className="h-3.5 w-3.5 fill-current text-[#229ED9]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] shadow-md shadow-blue-500/20 text-white group-hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#0F172A]">
                  Skillify<span className="text-[#2563EB]">Genius</span>
                </span>
                <Badge variant="blue" className="text-[10px] px-1.5 py-0">2.0</Badge>
              </div>
              <p className="text-[10px] font-mono tracking-wider text-[#64748B] uppercase font-semibold">
                Future Skills Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-50 text-[#2563EB] font-semibold"
                      : "text-[#475569] hover:text-[#0F172A] hover:bg-slate-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Student Login & Book Assessment */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login/student">
              <Button variant="ghost" size="md" className="gap-2 text-[#475569] hover:text-[#0F172A] text-xs font-semibold">
                <User className="h-4 w-4 text-[#2563EB]" />
                <span>Student Login</span>
              </Button>
            </Link>

            <Link href="/trial">
              <Button variant="primary" size="md" className="shadow-md shadow-blue-500/20 text-xs font-bold px-5">
                <span>Book Assessment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/trial">
              <Button variant="primary" size="sm" className="text-xs">
                Book Trial
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-[#0F172A]" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3.5 py-2.5 text-sm font-medium text-[#475569] rounded-xl hover:bg-slate-50 hover:text-[#0F172A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <Link
                href="/login/student"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]"
              >
                <User className="h-4 w-4 text-[#2563EB]" />
                <span>Student Login</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
