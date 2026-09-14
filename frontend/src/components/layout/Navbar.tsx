import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, Sparkles, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f8f5ed]/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Skillify Genius home"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </span>
          <span>
            <span className="block text-lg font-black leading-none text-slate-900 font-display tracking-tight group-hover:text-emerald-800 transition-colors">
              Skillify Genius
            </span>
            <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-800/80">
              Learn &bull; Create &bull; Grow
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-2 text-sm font-bold transition-all rounded-xl ${
                  isActive
                    ? "text-emerald-900 bg-emerald-100/60 font-black shadow-2xs"
                    : "text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-emerald-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button asChild size="default" className="shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all">
              <Link href="/trial" className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Book 45-Min Trial
              </Link>
            </Button>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 shadow-xs md:hidden hover:bg-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <nav className="border-t border-slate-200/80 bg-[#f8f5ed] px-5 py-5 md:hidden shadow-xl" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1.5">
            {links.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-bold text-sm transition ${
                    isActive
                      ? "bg-emerald-100/80 text-emerald-900"
                      : "text-slate-700 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <span>{label}</span>
                  {label === "Safeguarding" && (
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  )}
                </Link>
              );
            })}
            <div className="pt-3">
              <Button asChild className="w-full justify-center shadow-md">
                <Link href="/trial" onClick={() => setOpen(false)}>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
                  Book 45-Min Trial
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
