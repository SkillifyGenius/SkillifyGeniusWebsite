"use client";

import React, { useState } from "react";
import { MessageSquare, X, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export function FloatingContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end">
      {/* Expanded Popover Card */}
      {open && (
        <div className="mb-3 w-80 sm:w-96 rounded-[24px] bg-white border border-slate-200/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)] space-y-4 animate-fadeIn">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#0F172A]">Admissions Consultation Desk</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed">
            Have questions about learning trajectories, age suitability (ages 6-18), or global cohort schedules? Chat directly with an admissions advisor.
          </p>

          {/* Action Links */}
          <div className="space-y-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801860998888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 transition-all group"
            >
              <div className="flex items-center gap-3">
                {/* Official WhatsApp SVG */}
                <div className="h-9 w-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.768-5.768zm0 10.37c-.846 0-1.636-.232-2.316-.653l-.166-.103-1.558.409.416-1.519-.111-.176c-.461-.734-.705-1.59-.704-2.472 0-2.537 2.064-4.601 4.603-4.601 2.538 0 4.602 2.064 4.602 4.601 0 2.538-2.064 4.602-4.602 4.602zm2.536-3.468c-.139-.07-8.23-4.062-8.369-4.132-.139-.07-.24-.105-.341.07-.101.175-.391.507-.479.612-.088.105-.176.122-.315.052-.139-.07-.588-.217-1.12-.691-.414-.369-.693-.825-.774-.965-.081-.14-.009-.216.061-.285.063-.062.139-.162.209-.243.07-.081.093-.139.139-.232.046-.093.023-.174-.012-.244-.035-.07-.341-.82-.467-1.124-.123-.296-.248-.256-.341-.261-.088-.005-.189-.006-.29-.006-.101 0-.265.038-.403.189-.138.151-.529.517-.529 1.261s.541 1.463.616 1.564c.075.101 1.065 1.626 2.58 2.279.36.155.641.248.86.318.362.115.692.099.953.06.291-.044.894-.366 1.02-.72.126-.354.126-.657.088-.72-.038-.063-.139-.1-.278-.17zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.957-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.632 0-3.149-.49-4.42-1.332l-.317-.208-2.937.828.784-2.863-.228-.328A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">WhatsApp Chat</div>
                  <div className="text-[11px] text-[#059669] font-medium">+880 1860 99 88 88</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/+8801860998888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-950 transition-all group"
            >
              <div className="flex items-center gap-3">
                {/* Official Telegram SVG */}
                <div className="h-9 w-9 rounded-xl bg-[#229ED9] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">Telegram Support</div>
                  <div className="text-[11px] text-sky-700 font-medium">Direct Admissions</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-[#2563EB]" /> skillifygenius@gmail.com
            </span>
            <span className="font-medium text-[#10B981]">Replies ~5 mins</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0F172A] text-white shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 border border-slate-700 group"
      >
        <div className="h-6 w-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.768-5.768zm0 10.37c-.846 0-1.636-.232-2.316-.653l-.166-.103-1.558.409.416-1.519-.111-.176c-.461-.734-.705-1.59-.704-2.472 0-2.537 2.064-4.601 4.603-4.601 2.538 0 4.602 2.064 4.602 4.601 0 2.538-2.064 4.602-4.602 4.602zm2.536-3.468c-.139-.07-8.23-4.062-8.369-4.132-.139-.07-.24-.105-.341.07-.101.175-.391.507-.479.612-.088.105-.176.122-.315.052-.139-.07-.588-.217-1.12-.691-.414-.369-.693-.825-.774-.965-.081-.14-.009-.216.061-.285.063-.062.139-.162.209-.243.07-.081.093-.139.139-.232.046-.093.023-.174-.012-.244-.035-.07-.341-.82-.467-1.124-.123-.296-.248-.256-.341-.261-.088-.005-.189-.006-.29-.006-.101 0-.265.038-.403.189-.138.151-.529.517-.529 1.261s.541 1.463.616 1.564c.075.101 1.065 1.626 2.58 2.279.36.155.641.248.86.318.362.115.692.099.953.06.291-.044.894-.366 1.02-.72.126-.354.126-.657.088-.72-.038-.063-.139-.1-.278-.17zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.957-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.632 0-3.149-.49-4.42-1.332l-.317-.208-2.937.828.784-2.863-.228-.328A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
          </svg>
        </div>
        <span className="text-xs font-bold tracking-tight">Need Guidance? Chat with us</span>
      </button>
    </div>
  );
}
