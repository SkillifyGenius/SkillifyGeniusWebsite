import { Link } from "react-router-dom";
import { BookOpen, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { contact } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-[#0d2922] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-3 font-display font-black text-xl"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400 text-emerald-950 shadow-md shadow-emerald-950/20"><BookOpen className="h-5 w-5" /></span>
            Skillify Genius
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-emerald-100/70">Customized 1:1 technology learning focused on problem solving, self-learning, and digital safety.</p>
        </div>
        <div>
          <p className="font-extrabold text-white">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-emerald-100/65">
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <Link to="/trial" className="hover:text-white">Book 45-Min Trial</Link>
            <Link to="/about" className="hover:text-white">About the Teacher</Link>
            <Link to="/blog" className="hover:text-white">Blog & Articles</Link>
            <Link to="/safeguarding" className="hover:text-white">Child Safeguarding</Link>
          </div>
        </div>
        <div>
          <p className="font-extrabold text-white">Get in touch</p>
          <div className="mt-4 grid gap-3 text-sm text-emerald-100/65">
            <a href={contact.emailHref} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0" /> {contact.email}</a>
            <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0" /> {contact.phoneDisplay}</a>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp</a>
            <a href={contact.telegramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Send className="h-4 w-4 shrink-0" /> Telegram</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-emerald-100/50"><Link to="/privacy">Privacy Policy</Link><Link to="/safeguarding">Safeguarding</Link><Link to="/terms">Terms of Service</Link></div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-xs text-emerald-100/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row sm:px-3">
          <div>© {new Date().getFullYear()} Skillify Genius. Built for curious minds.</div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 font-medium text-emerald-200/70 transition-colors hover:text-white"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
