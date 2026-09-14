"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { fallbackCourses } from "@/data/content";
import { COURSE_VISUAL_META } from "@/data/coursesMeta";
import type { Course } from "@/types";

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  useEffect(() => { void api.getCourses().then((data) => data.length && setCourses(data)); }, []);

  return (
    <>
      <Seo title="Courses | Skillify Genius" description="Explore teacher-led coding, web creation, AI, and digital skills courses for young learners." />
      <section className="px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-24 lg:pt-28">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Courses</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-black sm:text-6xl">A clear path from curiosity to confident creation.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">Each pathway combines direct teaching, purposeful practice, and a project the student can proudly explain.</p>
      </section>
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-9">
          {courses.map((course, index) => {
            const meta = COURSE_VISUAL_META[course.slug] || {
              badge: course.level,
              isPopular: false,
              highlightText: "Customized 1:1 Pathway",
              gradientHeader: "from-[#0b3328] via-[#0f4436] to-[#062019]",
              borderClass: "border-emerald-950/10",
              badgeClass: "bg-emerald-50 text-emerald-800",
              accentColor: "text-emerald-700",
              techPills: [],
            };

            return (
              <article
                key={course.id}
                className={`relative grid overflow-hidden rounded-[2.25rem] bg-[#fbfcf8] transition-all duration-300 lg:grid-cols-[.34fr_.66fr] ${
                  meta.isPopular
                    ? "border-2 border-emerald-500 shadow-2xl shadow-emerald-700/15 ring-4 ring-emerald-500/10"
                    : "border border-emerald-950/10 shadow-lg shadow-emerald-950/5 hover:shadow-xl hover:border-emerald-500/30"
                }`}
              >
                {/* Visual Left Column with Themed Gradient & 3D Art */}
                <div className={`relative flex min-h-72 flex-col justify-between overflow-hidden bg-gradient-to-br ${meta.gradientHeader} p-7 sm:p-8 text-white`}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                        Pathway 0{index + 1}
                      </span>
                      {meta.isPopular && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-950 shadow-md">
                          <Sparkles className="h-3 w-3" /> Most Popular
                        </span>
                      )}
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-emerald-100 backdrop-blur-md">
                      {meta.badge}
                    </span>
                  </div>

                  {/* 3D Illustration */}
                  <div className="relative my-4 flex items-center justify-center">
                    <Image
                      src={meta.image}
                      alt={meta.imageAlt}
                      width={1024}
                      height={1024}
                      sizes="144px"
                      className="h-36 w-auto rounded-2xl object-contain drop-shadow-2xl border border-white/20 transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="relative z-10">
                    <p className="text-3xl font-black text-white">{course.level}</p>
                    <p className="mt-1 text-sm text-emerald-100/75">{course.ageGroup}</p>
                  </div>
                </div>

                {/* Content Right Column */}
                <div className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-3xl font-black text-[#102a25]">{course.title}</h2>
                    <span className={`text-xs font-black uppercase tracking-wider ${meta.accentColor}`}>
                      {meta.highlightText}
                    </span>
                  </div>
                  <p className="mt-4 leading-7 text-[#597068]">{course.description}</p>

                  {/* Cyber Security Knowledge Strip */}
                  <div className="mt-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Built-in Cyber Security & Digital Safety Knowledge</span>
                    </div>
                    <p className="mt-1 text-xs font-medium leading-5 text-emerald-950/80">
                      {meta.cyberSecurityFocus}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-[#486159]">
                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-primary" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> {course.classFrequency}
                    </span>
                  </div>

                  {/* Tech Stack Pills */}
                  {meta.techPills.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#597068] mb-2">
                        Tools, Languages & Focus
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {meta.techPills.map((pill) => (
                          <span
                            key={pill.label}
                            className={`rounded-md px-2.5 py-1 text-xs font-bold ${pill.bg} ${pill.text}`}
                          >
                            {pill.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {course.skillsDeveloped.slice(0, 4).map((skill) => (
                      <div className="flex items-start gap-2 text-sm font-semibold text-slate-700" key={skill}>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Project outcome</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">{course.primaryOutcome}</p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button asChild className="shadow-md shadow-emerald-950/10">
                      <Link href={`/trial?course=${course.slug}`}>
                        Book free 45-min assessment <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/#register">Register interest</Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
