import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Layers, Clock, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "4-Phase Future Skills Curriculum",
  description: "Explore our sequenced 4-phase trajectory cultivating algorithmic logic, full-stack web architecture, AI automation, and cyber defense for ages 6-18.",
};

export default async function CoursesPage() {
  const courses = await api.getCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge variant="blue" className="gap-1">
          <Layers className="h-3 w-3" />
          <span>Sequenced Progression</span>
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          The 4-Phase Curriculum Roadmap
        </h1>
        <p className="text-[#475569] text-base sm:text-lg">
          Every phase is engineered around <strong>demonstrated capability</strong>, practical software creation, and the Socratic Problem Solver Framework™.
        </p>
      </div>

      {/* Course List */}
      <div className="space-y-10">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-10 card-shadow transition-all duration-300 hover:shadow-card-hover"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Core Info */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="violet" className="text-xs px-3 py-1 font-bold">
                    Phase {course.phase}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                    <Users className="h-3.5 w-3.5 text-[#2563EB]" /> {course.ageGroup}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                    <Clock className="h-3.5 w-3.5 text-[#10B981]" /> {course.duration}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  <Link href={`/courses/${course.slug}`} className="hover:text-[#2563EB] transition-colors">
                    {course.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {course.description}
                </p>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] font-bold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Primary Demonstrated Outcome:
                  </h4>
                  <p className="text-xs text-[#0F172A] font-semibold">
                    {course.primaryOutcome}
                  </p>
                </div>
              </div>

              {/* Right Column: Skills & CTA */}
              <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-bold mb-3">
                    What Skills Will The Student Develop?
                  </h4>
                  <ul className="space-y-2 text-xs text-[#334155]">
                    {course.skillsDeveloped.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2">
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="primary" size="md" className="w-full gap-2">
                      <span>View Full Syllabus</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/trial">
                    <Button variant="outline" size="sm" className="w-full">
                      Book Free Trial For This Phase
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
