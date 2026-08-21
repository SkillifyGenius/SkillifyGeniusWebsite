import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { HeroSocraticSimulator } from "@/components/home/HeroSocraticSimulator";
import { InteractiveCurriculumExplorer } from "@/components/home/InteractiveCurriculumExplorer";
import { SkillGraphPreview } from "@/components/home/SkillGraphPreview";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Brain, 
  Code2, 
  Compass, 
  Award, 
  Layers, 
  Rocket, 
  Terminal, 
  Star,
  Users,
  Lightbulb,
  Workflow,
  Globe,
  Clock,
  Check,
  Gamepad2
} from "lucide-react";

export default async function HomePage() {
  const courses = await api.getCourses();
  const reviews = await api.getReviews();

  return (
    <div className="flex flex-col space-y-28 pb-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold text-[#2563EB]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>A Founder-Led Engineering Academy (Ages 6-18)</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#0F172A] max-w-4xl mx-auto leading-[1.06]">
            Build{" "}
            <span className="brand-gradient-text">Problem Solvers</span>,{" "}
            <span className="text-[#0F172A]">Not Just Coders.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-2xl text-[#475569] max-w-3xl mx-auto leading-relaxed font-normal">
            A project-based engineering academy where students learn how to think, solve problems independently, and build real-world technology with AI.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/trial" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 shadow-xl shadow-blue-500/20 px-8 py-3.5 text-sm font-bold">
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 px-8 py-3.5 text-sm font-semibold border-slate-300 hover:bg-slate-50">
                <span>Explore Programs</span>
              </Button>
            </Link>
          </div>

          {/* Premium Learning Philosophy Statement */}
          <div className="pt-8 max-w-2xl mx-auto space-y-2 border-t border-slate-200/60">
            <p className="text-base font-bold text-[#0F172A]">
              We don't teach students what to memorize.
            </p>
            <p className="text-sm text-[#2563EB] font-semibold">
              We teach them how to learn, think, and create.
            </p>
          </div>

          {/* Three Core Pillars Under Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
            {/* Pillar 1 */}
            <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_15px_40px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] mb-5 shadow-sm">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Problem Solving First</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Students learn to break down complex problems, debug failures, and develop logical thinking.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-[#2563EB] font-bold uppercase">
                Step 01 • Think
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_15px_40px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981] mb-5 shadow-sm">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Self Learning Ability</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Students develop the confidence to research, experiment, and learn new technologies independently.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-[#10B981] font-bold uppercase">
                Step 02 • Learn Independently
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_15px_40px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366F1] mb-5 shadow-sm">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Build Real Projects</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Students apply their knowledge by creating real applications and engineering solutions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-[#6366F1] font-bold uppercase">
                Step 03 • Create & Ship
              </div>
            </div>
          </div>

          {/* Interactive Live Python Game Simulator in Hero */}
          <div className="pt-10">
            <div className="text-center mb-4 space-y-1">
              <span className="text-xs font-mono uppercase text-[#2563EB] font-bold flex items-center justify-center gap-1.5">
                <Gamepad2 className="h-4 w-4 text-yellow-500" />
                Interactive Python Game Preview
              </span>
              <p className="text-xs text-[#64748B]">
                Run and play a real text-based Python game directly in your browser:
              </p>
            </div>
            <HeroSocraticSimulator />
          </div>

          {/* Global Timezone Compatibility Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[#64748B] border-t border-slate-200/60">
            <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
              <Globe className="h-4 w-4 text-[#2563EB]" />
              <span>Global Cohort Scheduling:</span>
            </div>
            <span>🇺🇸 US Eastern (EST) & Pacific (PST)</span>
            <span>🇬🇧 UK London (GMT/BST)</span>
            <span>🇪🇺 Central Europe (CET)</span>
            <span>🇸🇬 Singapore & Asia (SGT)</span>
          </div>
        </div>
      </section>

      {/* 2. WHY SKILLIFY GENIUS IS DIFFERENT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="blue" className="text-xs">Pedagogical Difference</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Why Skillify Genius Is Different
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto text-base sm:text-lg">
            Most EdTech platforms teach syntax memorization. We build engineers and independent thinkers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)] hover:border-blue-200 transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] mb-6 shadow-sm">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">Beyond Syntax Learning</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Students don't memorize tutorials. They learn how to think, analyze problems, and build solutions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#2563EB]">
              Cognitive Depth →
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] hover:border-emerald-200 transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981] mb-6 shadow-sm">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">Problem Solving First</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Every learning journey starts with reasoning, debugging, and understanding why things work.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#10B981]">
              Root Cause Analysis →
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366F1] mb-6 shadow-sm">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">Real Engineering Practice</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Students create real applications, handle failures, and develop an engineering mindset.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#6366F1]">
              Deployable Software →
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(168,85,247,0.12)] hover:border-purple-200 transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-6 shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">AI as a Learning Partner</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Students use AI Socratically to explore ideas, debug code, and build projects faster.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-purple-600">
              Future-Proof Mastery →
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 6-DIMENSIONAL SKILL GRAPH™ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SkillGraphPreview />
      </section>

      {/* 4. THE SKILLIFY GENIUS FOUNDATION FRAMEWORK™ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 p-8 sm:p-14 card-shadow space-y-10">
          <div className="max-w-3xl space-y-3">
            <Badge variant="blue">Proprietary Academy Standard</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              The Skillify Genius Foundation Framework™
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              A 5-stage progressive learning framework that guides students from basic visual logic to advanced independent engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">Stage 1</span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">Foundation</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">Algorithmic thinking, spatial logic, debugging patience & computational patterns.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#2563EB] font-semibold">
                Thinking Habits
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-sky-300 transition-colors">
              <div>
                <span className="text-xs font-mono text-sky-600 font-bold uppercase">Stage 2</span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">Exploration</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">Experimenting across Python, 2D physics, interactive game mechanics & data.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-[11px] text-sky-600 font-semibold">
                Creative Prototyping
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#10B981] font-bold uppercase">Stage 3</span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">Creation</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">Building full-featured web applications, API integrations & UI architecture.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#10B981] font-semibold">
                Deployable Apps
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-indigo-300 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#6366F1] font-bold uppercase">Stage 4</span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">Engineering</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">System thinking, architecture, tradeoffs & systematic debugging.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#6366F1] font-semibold">
                Cloud Databases
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-amber-300 transition-colors">
              <div>
                <span className="text-xs font-mono text-amber-600 font-bold uppercase">Stage 5</span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">Innovation</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">AI workflows, autonomous systems & real-world impact.</p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-[11px] text-amber-600 font-semibold">
                Public Portfolio
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PROBLEM SOLVER FRAMEWORK™ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="indigo">Proprietary Cognitive Methodology</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Skillify Genius Problem Solver Framework™
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Every project follows an intentional 5-stage cognitive engineering loop that students carry with them into high school, college, and tech careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: "01", name: "Deconstruct", desc: "Break ambiguous problems down into atomic logic, data inputs & edge cases.", icon: Lightbulb, color: "text-[#2563EB]" },
            { step: "02", name: "Architect", desc: "Plan component hierarchy, data structures, state flow & wireframes.", icon: Layers, color: "text-sky-600" },
            { step: "03", name: "Build & Test", desc: "Write modular code, test hypotheses, and execute rapid iteration loops.", icon: Terminal, color: "text-[#10B981]" },
            { step: "04", name: "Leverage AI", desc: "Use Socratic AI prompting and script automation to multiply productivity.", icon: Workflow, color: "text-[#6366F1]" },
            { step: "05", name: "Defend", desc: "Audit security hygiene, deploy live to cloud, and present to mentors.", icon: Shield, color: "text-amber-600" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="rounded-[22px] bg-white border border-slate-200/80 p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-slate-300">{s.step}</span>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{s.name}</h3>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. INTERACTIVE CURRICULUM EXPLORER BY AGE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <Badge variant="violet">Structured Trajectory</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Curriculum Explorer by Age & Stage
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto text-base sm:text-lg">
            Personalized learning paths calibrated precisely for cognitive readiness from ages 6 to 18.
          </p>
        </div>

        <InteractiveCurriculumExplorer />
      </section>

      {/* 7. FOUNDER AUTHORITY & LEARNING PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-blue-200/80 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/20 p-8 sm:p-12 card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="blue">Founder Authority & Philosophy</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                "Learning should adapt to the student - not the student adapting to a fixed curriculum."
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Skillify Genius was founded by an educator and software practitioner teaching students across 20+ countries since 2013. We reject passive lecture watching and certificate mills. Every student builds real software with personalized mentor guidance.
              </p>
              
              {/* Founder Credential Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-xs font-semibold text-[#1E40AF]">
                  <Award className="h-3.5 w-3.5" /> 10+ Years Teaching
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-xs font-semibold text-emerald-800">
                  <Users className="h-3.5 w-3.5" /> Students in 20+ Countries
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 text-xs font-semibold text-[#4338CA]">
                  <Shield className="h-3.5 w-3.5" /> National Android Hackathon Winner
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E2E8F0] card-shadow space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">Personalized Trajectory</span>
                <h4 className="text-sm font-bold text-[#0F172A]">Not Sure Where to Start?</h4>
                <p className="text-xs text-[#64748B]">
                  Take our 2-minute diagnostic assessment to identify your child's cognitive baseline.
                </p>
              </div>
              <Link href="/pathfinder" className="block">
                <Button variant="primary" size="sm" className="w-full gap-2 text-xs font-bold shadow-md shadow-blue-500/20">
                  <span>Start Pathfinder Quiz</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARENT TRUST SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="emerald" className="text-xs">Parent Trust & Verified Proof</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Loved by Parents in 20+ Countries
          </h2>
          <p className="text-[#475569] max-w-2xl mx-auto text-base sm:text-lg">
            Hear how Skillify Genius transformed screen time into engineering mindset and problem-solving confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23_42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#334155] leading-relaxed italic">
                  "{rev.comment}"
                </p>
                {rev.studentProjectHighlight && (
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-[#0F172A]">
                    <span className="font-semibold text-[#2563EB]">Project Highlight: </span>
                    {rev.studentProjectHighlight}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{rev.reviewerName}</h4>
                  <p className="text-xs text-[#64748B]">{rev.role} • {rev.location}</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL ASSESSMENT CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Badge variant="blue" className="bg-blue-900/60 text-blue-200 border-blue-700">
              Personalized 1-on-1 Trial
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Ready to See Your Child Think Like an Engineer?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a 45-minute 1-on-1 Socratic Diagnostic session. Our technology mentors will assess cognitive baseline, build a real mini-project, and present a personalized roadmap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/trial" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 bg-[#2563EB] hover:bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/25 px-8 py-3.5">
                <span>Book 1-on-1 Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white px-8 py-3.5 font-semibold">
                <span>Explore 4-Phase Roadmap</span>
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 relative z-10">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#10B981]" /> 100% Free Consultation</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#10B981]" /> Live Mentor Guidance</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#10B981]" /> Custom Skill Graph Report</span>
          </div>
        </div>
      </section>
    </div>
  );
}
