import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Terminal
} from "lucide-react";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await api.getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} (Phase ${course.phase})`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await api.getCourseBySlug(slug);

  if (!course) notFound();

  const jsonLdCourse = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Skillify Genius",
      "sameAs": "https://www.skillifygenius.com"
    },
    "educationalLevel": course.level,
    "timeRequired": "P24W",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online 1-on-1 and Micro-Groups",
      "courseWorkload": course.classFrequency
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }}
      />

      {/* Header Banner */}
      <div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 p-8 sm:p-14 card-shadow space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="violet" className="py-1 px-3 text-xs font-bold">
            Phase {course.phase} Syllabus
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
            <Users className="h-4 w-4 text-[#2563EB]" /> {course.ageGroup}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
            <Clock className="h-4 w-4 text-[#10B981]" /> {course.duration}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          {course.title}
        </h1>

        <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed font-normal">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link href="/trial">
            <Button variant="primary" size="lg" className="gap-2 shadow-md shadow-blue-500/20">
              <span>Book Free 1-on-1 Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/learn/foundation/module-1">
            <Button variant="outline" size="lg" className="gap-2">
              <Terminal className="h-4 w-4 text-[#2563EB]" />
              <span>Launch Socratic Studio Sandbox</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Skills Developed & Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-[#E2E8F0] bg-white p-8 card-shadow">
          <CardHeader className="p-0 pb-6 border-b border-[#E2E8F0]">
            <Badge variant="blue" className="w-fit mb-2">Competencies</Badge>
            <CardTitle className="text-2xl font-bold text-[#0F172A]">
              What Skills Will The Student Develop?
            </CardTitle>
            <p className="text-xs text-[#64748B]">
              Measured and verified on the student's dynamic Skillify Genius Skill Graph™.
            </p>
          </CardHeader>

          <CardContent className="p-0 pt-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.skillsDeveloped.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#0F172A] font-semibold leading-relaxed">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Primary Outcome Box */}
        <Card className="border-emerald-200 bg-emerald-50/40 p-8 flex flex-col justify-between card-shadow">
          <div className="space-y-4">
            <Badge variant="emerald" className="gap-1 bg-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Capstone Outcome</span>
            </Badge>
            <h3 className="text-xl font-bold text-[#0F172A]">
              Production Capstone
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {course.primaryOutcome}
            </p>
          </div>

          <div className="pt-6 border-t border-emerald-200/80 mt-6 space-y-2">
            <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              ✓ Deployed to live URL with custom domain
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              ✓ Verified GitHub source code repository
            </p>
          </div>
        </Card>
      </div>

      {/* Modules Syllabus Breakdown */}
      <div className="space-y-8">
        <div className="space-y-2">
          <Badge variant="indigo">Granular Syllabus Progression</Badge>
          <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">
            Module-by-Module Progression
          </h2>
          <p className="text-[#64748B] text-sm">
            Each module follows the 5-stage Problem Solver Framework™ (Deconstruct ➔ Architect ➔ Build ➔ Leverage ➔ Defend).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {course.modules.map((mod) => (
            <Card key={mod.id} className="border-[#E2E8F0] bg-white p-6 flex flex-col justify-between card-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">
                    Module {mod.moduleOrder}
                  </span>
                  <Link href={`/learn/foundation/${mod.id}`}>
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-[#2563EB]">
                      <span>Enter Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A]">{mod.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{mod.description}</p>

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#2563EB] font-bold">
                    Hands-On Project:
                  </span>
                  <p className="text-xs font-bold text-[#0F172A]">{mod.project}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] mt-4 flex flex-wrap gap-1.5">
                {mod.skills.map((s, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
