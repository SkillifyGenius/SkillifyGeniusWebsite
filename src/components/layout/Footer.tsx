import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Mail, Globe, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white text-[#475569]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] shadow-md shadow-blue-500/20 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A]">
                Skillify<span className="text-[#2563EB]">Genius</span>
              </span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              A founder-led future skills academy where children aged 6-18 learn to think, build, automate, and solve real-world problems using technology.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#10B981]">
                <Shield className="h-4 w-4" /> COPPA & GDPR Safe
              </span>
              <span className="flex items-center gap-1.5 text-[#2563EB]">
                <Award className="h-4 w-4" /> 10+ Years Mentoring
              </span>
            </div>
          </div>

          {/* Col 2: 4-Phase Curriculum */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase font-mono">
              4-Phase Curriculum
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses/ai-coding-for-smart-students" className="hover:text-[#2563EB] transition-colors">
                  Phase 1: Foundation (Ages 6-18)
                </Link>
              </li>
              <li>
                <Link href="/courses/build-apps-websites-creator-lab" className="hover:text-[#2563EB] transition-colors">
                  Phase 2: Creator Lab (Ages 12-18)
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-tools-automation-for-students" className="hover:text-[#2563EB] transition-colors">
                  Phase 3: AI Tools & Automation
                </Link>
              </li>
              <li>
                <Link href="/courses/cyber-safety-ethical-hacking" className="hover:text-[#2563EB] transition-colors">
                  Phase 4: Cyber Safety & Defense
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Proprietary Frameworks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase font-mono">
              Methodology
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about#foundation-framework" className="hover:text-[#2563EB] transition-colors">
                  Foundation Framework™
                </Link>
              </li>
              <li>
                <Link href="/about#problem-solver" className="hover:text-[#2563EB] transition-colors">
                  Problem Solver Framework™
                </Link>
              </li>
              <li>
                <Link href="/pathfinder" className="hover:text-[#2563EB] transition-colors">
                  Pathfinder Diagnostic Quiz
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#2563EB] transition-colors">
                  4-Phase Curriculum Tracks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Global Markets & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase font-mono">
              Global Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#94A3B8]" />
                <span>US, UK, CA & Europe Timezones</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#94A3B8]" />
                <Link href="/contact" className="hover:text-[#2563EB] transition-colors">
                  Admissions Consultation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#2563EB] transition-colors">
                  Parent Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#E2E8F0] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} Skillify Genius. All rights reserved. Built for future innovators.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/about" className="hover:text-[#0F172A]">About</Link>
            <Link href="/faq" className="hover:text-[#0F172A]">FAQ</Link>
            <Link href="/contact" className="hover:text-[#0F172A]">Contact</Link>
            <Link href="/login/student" className="hover:text-[#2563EB]">Student Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
