import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck2, Mail, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { contact } from "@/lib/contact";

export function FloatingContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="flex max-h-[calc(100vh-7rem)] flex-col gap-2 overflow-y-auto rounded-2xl border border-emerald-950/10 bg-white/95 p-3 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl animate-fade-up sm:w-64">
          <div className="flex items-center justify-between border-b border-emerald-950/5 pb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-emerald-600" /> Fast Support
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-700"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Link
            to="/trial"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl bg-emerald-50/80 p-2.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
              <CalendarCheck2 className="h-4 w-4" />
            </span>
            <div>
              <p className="font-bold">Book Free 45-Min Assessment</p>
              <p className="text-[10px] text-emerald-700">No obligation</p>
            </div>
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-foreground transition hover:bg-slate-50"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[#597068]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div>
              <p className="font-bold">Send an Inquiry</p>
              <p className="text-[10px] text-muted-foreground">Replies in 24h</p>
            </div>
          </Link>

          <a
            href={contact.emailHref}
            className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-foreground transition hover:bg-slate-50"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[#597068]">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <p className="font-bold">Direct Email</p>
              <p className="text-[10px] text-muted-foreground">{contact.email}</p>
            </div>
          </a>

          <a href={contact.phoneHref} className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-foreground transition hover:bg-slate-50">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[#597068]"><Phone className="h-4 w-4" /></span>
            <div><p className="font-bold">Call</p><p className="text-[10px] text-muted-foreground">{contact.phoneDisplay}</p></div>
          </a>

          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-foreground transition hover:bg-slate-50">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800"><MessageCircle className="h-4 w-4" /></span>
            <div><p className="font-bold">WhatsApp</p><p className="text-[10px] text-muted-foreground">Message us</p></div>
          </a>

          <a href={contact.telegramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-bold text-foreground transition hover:bg-slate-50">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 text-sky-700"><Send className="h-4 w-4" /></span>
            <div><p className="font-bold">Telegram</p><p className="text-[10px] text-muted-foreground">Message us</p></div>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 rounded-full bg-primary px-4 py-3 text-white shadow-2xl shadow-emerald-950/25 transition hover:-translate-y-0.5 hover:bg-[#07563d] focus:outline-none focus:ring-4 focus:ring-emerald-200"
        aria-label="Toggle quick actions"
        aria-expanded={open}
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span className="text-xs font-bold tracking-wide">
          {open ? "Close" : "Book 45-Min Trial"}
        </span>
        <CalendarCheck2 className="h-4 w-4 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
