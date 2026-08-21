import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  Sparkles, 
  Award, 
  Shield, 
  Users, 
  ArrowRight, 
  Brain, 
  Code2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Founder & Educational Philosophy",
  description: "Learn about the founder's tri-fold background: Technology Educator since 2013, Software Development Practitioner, and Personalized Learning Architect.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge variant="blue" className="gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Founder Authority & Credentials</span>
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          Education + Engineering + Innovation
        </h1>
        <p className="text-[#475569] text-base sm:text-lg">
          Skillify Genius is founded on the belief that children shouldn't just memorize coding syntax-they should learn how to think, build, and solve real-world problems.
        </p>
      </div>

      {/* Tri-Fold Identity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">1. Technology Educator</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Teaching coding and computational thinking since 2013. Personally mentored hundreds of students from 20+ countries across private instruction and international platforms.
          </p>
        </Card>

        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
            <Code2 className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">2. Software Practitioner</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Actively collaborating with real-world software engineering teams. Brings professional architecture, Git workflows, cloud databases, and clean code practices into student learning.
          </p>
        </Card>

        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="h-11 w-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">3. Personalized Architect</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Engineers individualized roadmaps adapting to each student's speed, passions, and cognitive maturity. No two students follow the exact same path.
          </p>
        </Card>
      </div>

      {/* Verified Recognition & Research */}
      <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-8 sm:p-10 space-y-6 card-shadow">
        <h3 className="text-xl font-bold text-[#0F172A]">
          Technical Background & Milestones
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Award className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#0F172A]">2014 National Recognition in Android Development</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                National hackathon team achievement recognizing rapid mobile software architecture, creative user interface engineering, and team collaboration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <Shield className="h-6 w-6 text-sky-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#0F172A]">~2 Years Cybersecurity Research Experience</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Hands-on research in secure systems, network threat modeling, and defensive cyber hygiene. Direct basis for Phase 4 Cyber Safety curriculum.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Philosophy Manifesto */}
      <div className="rounded-[24px] border border-blue-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/70 p-8 sm:p-12 space-y-6 card-shadow">
        <Badge variant="blue" className="bg-white">Educational Philosophy</Badge>
        <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          "Every learner is different. Learning should adapt to the student - not the student adapting to a fixed curriculum."
        </h3>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
          Standard school curriculums force all children into rigid, one-size-fits-all conveyor belts. At Skillify Genius, we deconstruct challenges Socratically, allowing students to explore their natural curiosities-whether that is game physics, full-stack web applications, AI automation, or cybersecurity defense.
        </p>

        <div className="pt-4">
          <Link href="/trial">
            <Button variant="primary" size="lg" className="gap-2 shadow-md shadow-blue-500/20">
              <span>Book a Free Diagnostic Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
