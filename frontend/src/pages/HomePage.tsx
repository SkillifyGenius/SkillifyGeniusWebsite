import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpenCheck, BrainCircuit, Check, ChevronRight,
  CirclePlay, Code2, HeartHandshake, Laptop, Lock, MessageSquareText,
  Radio, Shield, ShieldCheck, Sparkles, Target, UsersRound, Video, X, Zap,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseRegistrationForm } from "@/components/home/CourseRegistrationForm";
import { ParentFaq } from "@/components/home/ParentFaq";
import { PathwayDiagnostic } from "@/components/home/PathwayDiagnostic";
import { SessionAnatomy } from "@/components/home/SessionAnatomy";
import { api } from "@/lib/api";
import { fallbackCourses, fallbackPosts } from "@/data/content";
import { COURSE_VISUAL_META } from "@/data/coursesMeta";
import type { BlogPost, Course, ParentReview } from "@/types";

const learningFeatures = [
  { icon: Video, title: "Customized live 1:1", text: "Focused teaching shaped around one learner’s pace, questions, and goals." },
  { icon: CirclePlay, title: "Review at your pace", text: "Clear lesson notes and supporting resources reinforce each concept." },
  { icon: Laptop, title: "Meaningful projects", text: "Students create useful work instead of only watching or copying." },
  { icon: MessageSquareText, title: "Teacher support", text: "Feedback helps learners understand mistakes and improve independently." },
];

const trustPoints = [
  ["A clear learning path", "You know what your child is learning now and what comes next."],
  ["Progress you can understand", "Regular, plain-language feedback connects effort to real improvement."],
  ["Safe, responsible technology", "Privacy, digital wellbeing, and responsible AI use are part of the learning process."],
  ["A teacher who knows the student", "Teaching adapts to pace, confidence, interests, and current ability."],
];

const safeguardingItems = [
  {
    icon: Lock,
    title: "Parent-Monitored Sessions",
    description: "Open-door policy. Parents are welcome to observe any live session, plus receive regular milestone digests.",
  },
  {
    icon: ShieldCheck,
    title: "Child Safety & Privacy First",
    description: "COPPA & GDPR-K conscious protocol. Private, secure 1:1 video rooms; student data is never sold or published.",
  },
  {
    icon: UsersRound,
    title: "Dedicated Lead Educator",
    description: "Zero rotating student interns or unverified tutors. Direct mentorship from a Software Engineer & Educator teaching since 2012.",
  },
  {
    icon: Zap,
    title: "No Lock-in Pressure",
    description: "Start with a free, no-obligation live 1:1 assessment. Continue only if your learner feels inspired and thrives.",
  },
];

const comparisonRows = [
  {
    dimension: "Teaching Pace",
    dimensionBadge: "Calibration",
    groupCamps: "Fixed group schedule. Fast students get bored; slower students get left behind.",
    skillify1on1: "100% adaptive. Paced precisely to your child’s natural speed, depth, and questions.",
    keyAdvantage: "Paced for genuine mastery",
  },
  {
    dimension: "Instructor Calibre",
    dimensionBadge: "Senior Pedagogy",
    groupCamps: "Frequently rotating college interns following standardized slide-deck recipes.",
    skillify1on1: "Senior Software Engineer & Educator teaching since 2012 (2014 National Award Recipient).",
    keyAdvantage: "12+ Yrs proven experience",
  },
  {
    dimension: "Project Authenticity",
    dimensionBadge: "Real Portfolio",
    groupCamps: "Copy-paste tutorials where every student in the cohort builds the exact same clone.",
    skillify1on1: "Original, student-conceived projects aligned with their personal hobbies and real-world utility.",
    keyAdvantage: "100% student-owned creation",
  },
  {
    dimension: "Parent Clarity",
    dimensionBadge: "Transparency",
    groupCamps: "Generic automated completion badges with minimal individual insight.",
    skillify1on1: "Direct, plain-language feedback connecting effort to real improvement after every milestone.",
    keyAdvantage: "Open-door session observation",
  },
  {
    dimension: "Core Focus",
    dimensionBadge: "First Principles",
    groupCamps: "Isolated syntax memorization that fades quickly after the camp ends.",
    skillify1on1: "Timeless foundations: Problem Solving, Self-Learning, and Digital Safety.",
    keyAdvantage: "Enduring mental models",
  },
];

export function HomePage() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [reviews, setReviews] = useState<ParentReview[]>([]);

  useEffect(() => {
    void Promise.all([api.getCourses(), api.getBlogPosts(), api.getReviews()]).then(([courseData, postData, reviewData]) => {
      if (courseData.length) setCourses(courseData.slice(0, 3));
      if (postData.length) setPosts(postData.slice(0, 3));
      setReviews(reviewData.filter((review) => review.verified).slice(0, 2));
    });
  }, []);

  return (
    <>
      <Seo title="Skillify Genius | Customized 1:1 Technology Mentorship" description="Elite 1:1 technology and coding mentorship focused on problem solving, self-learning, and digital safety." />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> Problem solving · Self-learning · Digital safety
            </div>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              Customized <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">1:1 technology learning</span> for every student.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 sm:text-xl text-[#4a635b]">
              Personalized mentorship from a software engineer and educator who continues to teach, build, and learn in production.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-13 px-8 text-base shadow-lg shadow-emerald-950/15" asChild>
                <Link to="/trial">Book 45-min trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-13 px-7 text-base bg-white/60 hover:bg-white" asChild>
                <Link to="/courses">Explore courses</Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#456159]">
              {['Live 1:1 guidance', 'Personalized mentorship', 'Actively teaching & building'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rotate-2 rounded-[2.75rem] bg-gradient-to-tr from-emerald-500/20 via-emerald-300/10 to-amber-300/20 blur-xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/90 p-4 shadow-2xl shadow-emerald-950/15 backdrop-blur-xl">
              {/* Preserved 3D Avatar Image with Enhanced Presentation */}
              <img
                src="/images/hero_3d.png"
                alt="Student exploring technology with a teacher-led learning platform"
                className="aspect-[4/3] w-full rounded-[1.7rem] object-cover transition-transform duration-500 hover:scale-[1.02]"
                fetchPriority="high"
              />

              {/* Floating Live Badge */}
              <div className="absolute top-8 right-8 animate-float">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-emerald-900 shadow-md backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  100% Live 1:1 Mentorship
                </span>
              </div>

              {/* Bottom Goal Banner */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg backdrop-blur-lg">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-primary">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">The goal</p>
                  <p className="mt-1 text-sm font-bold text-foreground">Confident learners who can build and explain their ideas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFEGUARDING & PARENT TRUST PROTOCOL STRIP (FIRST-WORLD STANDARD) */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-950/10 bg-white/80 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-2 border-b border-emerald-950/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-primary">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Peace of Mind for Families</p>
                <h2 className="text-xl font-black text-foreground">Safe, Transparent & Monitored 1:1 Environment</h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 sm:self-center">
              <ShieldCheck className="h-3.5 w-3.5" /> High-Trust Standards
            </span>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {safeguardingItems.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group rounded-2xl border border-transparent p-4 transition hover:border-emerald-950/10 hover:bg-emerald-50/50">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-black text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#597068]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT BANNER */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#0d2922] text-white shadow-2xl shadow-emerald-950/20 lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Free 45-minute live 1:1 assessment</p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Start with a customized 1:1 conversation.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-emerald-100/75">
              Discuss the learner’s needs with a senior coding instructor and shape a personalized direction around problem solving, self-learning, and digital safety.
            </p>
            <Button asChild size="lg" className="mt-7 bg-white text-emerald-950 hover:bg-emerald-50 font-bold shadow-md">
              <Link to="/trial">Book free 45-min assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4 border-t border-white/10 bg-white/[.04] p-8 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:p-10">
            {[['01', 'No obligation'], ['02', '45-min live assessment'], ['03', 'Customized learning focus']].map(([number, label]) => (
              <div key={number} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-300 font-black text-emerald-950">
                  {number}
                </span>
                <p className="font-bold text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 30-SECOND INTERACTIVE PATHWAY DIAGNOSTIC */}
      <PathwayDiagnostic />

      {/* THE AI ERA CRITICAL THINKING SECTION (INTELLECTUAL VALUE FOR FIRST-WORLD PARENTS) */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-emerald-950/10 bg-white p-8 shadow-xl shadow-emerald-950/5 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-900">
              <BrainCircuit className="h-3.5 w-3.5 text-amber-700" /> Thinking in the Age of AI
            </span>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-[#102a25]">
              Syntax is automated. <span className="text-primary">Deep problem solving is timeless.</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-[#597068] sm:text-lg">
              When AI can generate code in seconds, rote memorization is obsolete. We teach young learners how technology actually functions, building the mental models, curiosity, and intellectual resilience to direct technology rather than passively consume it.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-950/10 bg-[#f8faf8] p-7 transition-all hover:bg-white hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-primary">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-foreground">1. Algorithmic Thinking</h3>
              <p className="mt-3 text-sm leading-6 text-[#597068]">
                Breaking complex ambiguity into clear, manageable steps. Students learn how to structure ideas before touching a single line of code.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-[#f8faf8] p-7 transition-all hover:bg-white hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-800">
                <Laptop className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-foreground">2. Self-Directed Debugging</h3>
              <p className="mt-3 text-sm leading-6 text-[#597068]">
                Teaching students how to inspect errors, formulate hypotheses, read documentation, and overcome friction without giving up.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-[#f8faf8] p-7 transition-all hover:bg-white hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-black text-foreground">3. Responsible AI Literacy</h3>
              <p className="mt-3 text-sm leading-6 text-[#597068]">
                Learning to question outputs, verify logic, protect private data, and use modern AI tools with judgment and ethical awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANATOMY OF A 1:1 MENTORSHIP SESSION */}
      <SessionAnatomy />

      {/* EDUCATOR SECTION */}
      <section id="teacher" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-stretch">
          <div className="flex flex-col rounded-[2rem] bg-[#0d2922] p-8 text-white shadow-2xl shadow-emerald-950/15 sm:p-10">
            <span className="w-fit rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
              Academic lead
            </span>
            <div className="mt-10 flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-2xl font-black text-emerald-300">
                1:1
              </span>
              <div>
                <p className="font-black uppercase tracking-wider text-amber-300">Co-founder & senior instructor</p>
                <p className="mt-2 text-sm text-emerald-100/70">Software Engineer & Educator</p>
              </div>
            </div>
            <div className="my-8 h-px bg-white/10" />
            <p className="leading-7 text-emerald-100/70">
              Senior Coding Instructor across international platforms, guiding learners from 20+ countries through personalized mentorship.
            </p>
            <div className="mt-auto flex items-center gap-2 pt-10 text-sm font-bold text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(110,231,183,.1)]" />
              Actively teaching and building
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Academic leadership & engineering</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Built and taught by a lifelong self-learner.</h2>
            <p className="mt-6 text-lg leading-8">
              Learn from someone who continues to build and learn in production, not someone who only recites textbook theory.
            </p>
            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-3xl border bg-[#f7faf7] sm:grid-cols-4">
              {[['2012', 'Teaching since'], ['2014', 'National Award Recipient'], ['20+', 'Countries taught'], ['1:1', 'Customized mentorship']].map(([value, label]) => (
                <div key={value} className="border-b border-r p-5 last:border-r-0 sm:border-b-0">
                  <p className="text-2xl font-black text-emerald-700">{value}</p>
                  <p className="mt-2 text-xs font-semibold leading-5">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link to="/trial">Book free 45-min assessment <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <span className="text-xs font-semibold text-muted-foreground">No obligation · Live 45-min assessment</span>
            </div>
            <Button asChild variant="ghost" className="mt-4">
              <Link to="/about">View educator profile <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRANSPARENT COMPARISON SECTION: WHY 1:1 VS GROUP CAMPS */}
      <section id="comparison" className="relative px-5 py-20 sm:px-8 lg:py-28 overflow-hidden">
        {/* Ambient lighting mesh */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[850px] rounded-full bg-gradient-to-b from-emerald-200/40 via-teal-100/25 to-transparent blur-3xl -z-10" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-100/70 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
              Transparent Value Comparison
            </span>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl text-[#102a25] tracking-tight">
              Why customized 1:1 mentorship <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">outperforms group bootcamps.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#597068]">
              Mass coding camps teach to the median student. Here is why bespoke 1:1 mentorship unlocks genuine mastery, creative autonomy, and lasting confidence.
            </p>
          </div>

          {/* Elevated Comparison Container */}
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-emerald-950/15 bg-white/95 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl ring-1 ring-black/[0.03]">
            {/* Table Header Row (Desktop) */}
            <div className="hidden grid-cols-[1.05fr_1.15fr_1.4fr] border-b border-emerald-950/10 bg-slate-50/90 p-6 md:grid items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Dimension
                </span>
                <p className="text-sm font-bold text-slate-700 mt-0.5">Evaluation Criteria</p>
              </div>

              <div className="px-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Group Bootcamps
                </span>
                <p className="text-xs text-slate-500 mt-1">10-20 students per cohort</p>
              </div>

              <div className="relative rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 px-5 py-3.5 text-white shadow-md shadow-emerald-950/20">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-sm uppercase tracking-wider text-white">
                    Skillify Genius (Bespoke 1:1)
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-200">
                    <Sparkles className="h-3 w-3 text-amber-300" /> Gold Standard
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80 mt-0.5">100% private, adaptive mentorship</p>
              </div>
            </div>

            {/* Table Body Rows */}
            <div className="divide-y divide-emerald-950/10">
              {comparisonRows.map((row) => (
                <div
                  key={row.dimension}
                  className="grid p-6 md:grid-cols-[1.05fr_1.15fr_1.4fr] md:items-center gap-5 transition-colors duration-200 hover:bg-emerald-50/20"
                >
                  {/* Dimension Column */}
                  <div>
                    <div className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                      {row.dimensionBadge}
                    </div>
                    <div className="font-display font-bold text-base sm:text-lg text-[#102a25] mt-1.5">
                      {row.dimension}
                    </div>
                  </div>

                  {/* Group Camps Column */}
                  <div className="rounded-2xl bg-rose-50/40 border border-rose-100/80 p-4 text-xs leading-relaxed text-slate-600 md:bg-transparent md:border-0 md:p-4 md:text-sm">
                    <span className="mb-2 block font-bold text-rose-700 md:hidden uppercase text-[11px] tracking-wide">
                      Mass Group Bootcamps:
                    </span>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-2 ring-rose-200/60 mt-0.5">
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </span>
                      <span>{row.groupCamps}</span>
                    </div>
                  </div>

                  {/* Skillify Genius Column (The Elevated Winner) */}
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/70 to-teal-50/50 border border-emerald-200/90 p-4 text-xs leading-relaxed text-emerald-950 font-medium md:p-5 md:text-sm shadow-xs">
                    <div className="flex items-center justify-between mb-1.5 md:hidden">
                      <span className="font-bold text-emerald-800 uppercase text-[11px] tracking-wide">
                        Skillify Genius (1:1):
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                        {row.keyAdvantage}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-700/30 ring-2 ring-emerald-200 mt-0.5">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 leading-relaxed">
                          {row.skillify1on1}
                        </p>
                        <span className="hidden md:inline-flex items-center gap-1 mt-2.5 rounded-full bg-emerald-100/90 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-800">
                          <Check className="h-3 w-3 text-emerald-700" />
                          {row.keyAdvantage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Luxury Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-emerald-950/15 bg-gradient-to-r from-emerald-950 via-[#0d2922] to-emerald-900 p-6 sm:p-9 text-white">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                  100% Free 45-Min Assessment • No Obligation • Open-Door Policy
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white mt-2">
                  Experience the 1:1 difference firsthand with your child.
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-xl leading-relaxed">
                  A personalized 45-minute live diagnostic session to assess baseline aptitude, demystify tech concepts, and design a custom learning roadmap.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Button asChild size="lg" className="w-full md:w-auto bg-emerald-400 text-emerald-950 hover:bg-emerald-300 font-black shadow-xl shadow-emerald-400/25 h-13 px-8 text-base transition-all hover:scale-[1.02]">
                  <Link to="/trial" className="flex items-center justify-center gap-2">
                    Book free 45-min assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS / COURSES SECTION */}
      <section id="programs" className="px-5 py-20 sm:px-8 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Learning pathways</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black sm:text-5xl">Courses built around progress, not pressure.</h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/courses">View all courses <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
            {courses.map((course, index) => {
              const meta = COURSE_VISUAL_META[course.slug] || {
                badge: course.level,
                isPopular: false,
                highlightText: "Customized 1:1 Pathway",
                gradientHeader: "from-emerald-600 to-teal-700",
                borderClass: "border-emerald-950/10",
                badgeClass: "bg-emerald-50 text-emerald-800",
                image: "/images/hero_3d.png",
                imageAlt: course.title,
                cyberSecurityFocus: "Safe digital hygiene and online boundaries.",
                accentColor: "text-emerald-700",
                techPills: [],
              };

              return (
                <div
                  key={course.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] bg-white transition-all duration-300 hover:-translate-y-1.5 ${
                    meta.isPopular
                      ? "border-2 border-emerald-500 shadow-2xl shadow-emerald-700/15 ring-4 ring-emerald-500/10"
                      : "border border-emerald-950/10 shadow-xl shadow-emerald-950/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-950/10"
                  }`}
                >
                  {/* Visual 3D Hero Art Banner */}
                  <div className={`relative h-52 w-full overflow-hidden bg-gradient-to-br ${meta.gradientHeader} p-4 flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

                    <img
                      src={meta.image}
                      alt={meta.imageAlt}
                      className="relative z-0 h-44 w-auto rounded-2xl object-contain drop-shadow-2xl border border-white/20 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top-Left Phase Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white border border-white/20 shadow-sm">
                        Phase 0{index + 1}
                      </span>
                    </div>

                    {/* Top-Right 'Most Popular' Pill for Featured Course */}
                    {meta.isPopular && (
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg shadow-amber-500/30 ring-2 ring-white/60">
                          <Sparkles className="h-3.5 w-3.5 text-white" /> Most Popular
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Pathway Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${meta.badgeClass}`}>
                        {meta.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-black text-[#102a25] group-hover:text-emerald-900 transition-colors">
                      {course.title}
                    </h3>
                    <p className={`mt-1 text-xs font-extrabold ${meta.accentColor}`}>
                      {meta.highlightText}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#597068]">
                      {course.description}
                    </p>

                    {/* Cyber Security Knowledge Strip (Standard in all courses) */}
                    <div className="mt-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-3.5">
                      <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Built-in Cyber Security Knowledge</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-4 font-medium text-emerald-950/80">
                        {meta.cyberSecurityFocus}
                      </p>
                    </div>

                    {/* Metadata Strip */}
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-600">
                      <span>{course.ageGroup}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{course.duration}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{course.classFrequency}</span>
                    </div>

                    {/* Tech Stack Pills */}
                    {meta.techPills.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#597068] mb-2">
                          Core Tools & Concepts
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {meta.techPills.map((pill) => (
                            <span
                              key={pill.label}
                              className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${pill.bg}`}
                            >
                              {pill.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Checklist */}
                    <div className="mt-5 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#597068] mb-2">
                        What Students Master
                      </p>
                      <ul className="grid gap-2">
                        {course.skillsDeveloped.slice(0, 3).map((skill) => (
                          <li key={skill} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Call to Actions */}
                    <div className="mt-6 flex flex-col gap-2 pt-5 border-t border-slate-100">
                      <Button asChild className="w-full shadow-md shadow-emerald-950/10">
                        <Link to={`/trial?course=${course.slug}`}>
                          Book free 45-min trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="w-full text-xs font-bold text-slate-600 hover:text-slate-900">
                        <a href="#register">Register interest</a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE LEARNING EXPERIENCE */}
      <section className="bg-[#0d2922] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">The learning experience</p>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">Support that turns lessons into lasting skills.</h2>
            <p className="mt-5 text-lg leading-8 text-emerald-100/65">
              A simple rhythm of learning, practising, building, and reflecting keeps students moving forward.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[.06] p-6 transition hover:bg-white/[.1]">
                <Icon className="h-7 w-7 text-emerald-300" />
                <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-100/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENTS SECTION */}
      <section id="parents" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-700">
              <HeartHandshake className="h-4 w-4" /> For parents
            </div>
            <h2 className="mt-6 text-4xl font-black sm:text-5xl">Confidence comes from knowing what is happening.</h2>
            <p className="mt-6 text-lg leading-8">
              You should never have to guess whether classes are useful. The learning plan, expectations, and progress are explained in language that makes sense.
            </p>
          </div>
          <div className="grid gap-4">
            {trustPoints.map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-[#f6f7f1] p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-black text-primary shadow-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm leading-6">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {reviews.length > 0 && (
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2">
            {reviews.map((review) => (
              <blockquote key={review.id} className="rounded-3xl border p-7">
                <p className="text-lg leading-8 text-foreground">“{review.comment}”</p>
                <footer className="mt-5 text-sm font-bold">{review.reviewerName} · {review.role}</footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>

      {/* PARENT FAQ ACCORDION */}
      <ParentFaq />

      {/* RESOURCES */}
      <section id="resources" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Notes & guidance</p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">Useful ideas for learning well.</h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/blog">All resources <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <article key={post.id} className="rounded-3xl border bg-white p-6 transition hover:shadow-xl hover:shadow-emerald-950/5">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
                  {index === 0 ? <BrainCircuit /> : index === 1 ? <Code2 /> : <ShieldCheck />}
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-widest text-emerald-700">{post.category || 'Learning'} · {post.readTime}</p>
                <h3 className="mt-3 text-xl font-black leading-7">{post.title}</h3>
                <p className="mt-3 text-sm leading-6">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION SECTION */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28" id="register">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Simple registration</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Tell us about your learner.</h2>
            <p className="mt-6 text-lg leading-8">
              Share a few details and the teacher will get in touch to understand your goals, answer questions, and recommend the right starting point.
            </p>
            <div className="mt-8 grid gap-4">
              {[[UsersRound, 'For students and parents'], [BookOpenCheck, 'No confusing enrollment process'], [Radio, 'A personal follow-up before classes begin']].map(([Icon, text]) => {
                const ItemIcon = Icon as typeof UsersRound;
                return (
                  <div key={String(text)} className="flex items-center gap-3 font-bold">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-primary">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                    {String(text)}
                  </div>
                );
              })}
            </div>
          </div>
          <CourseRegistrationForm courses={courses} />
        </div>
      </section>
    </>
  );
}
