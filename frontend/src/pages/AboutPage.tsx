import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Compass,
  Globe2,
  GraduationCap,
  Laptop,
  Radio,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const credentials = [
  { icon: CalendarDays, value: "2012", label: "Teaching since" },
  { icon: Award, value: "2014", label: "National Award Recipient" },
  { icon: Globe2, value: "21+", label: "Countries taught" },
  { icon: UserRoundCheck, value: "1:1", label: "Customized mentorship" },
];

const pillars = [
  {
    icon: BrainCircuit,
    title: "1. Problem Solving",
    subtitle: "Algorithmic thinking over rote memorization",
    description:
      "Syntax changes every decade; the ability to deconstruct an ambiguous challenge into logical, testable steps is timeless. We teach students how to think computationally before writing a single line.",
  },
  {
    icon: Laptop,
    title: "2. Self-Learning",
    subtitle: "The stamina to debug and build independently",
    description:
      "The greatest gift an educator can give a student is the confidence to navigate roadblocks. We teach learners how to read documentation, isolate errors, and iterate fearlessly without giving up.",
  },
  {
    icon: ShieldCheck,
    title: "3. Digital Safety",
    subtitle: "Principled literacy in an algorithmic world",
    description:
      "From safeguarding personal privacy and evaluating sources to fact-checking generative AI outputs, we instill healthy digital ethics and discernment that protect young creators online.",
  },
];

const globalStandards = [
  {
    standard: "US & AP Computer Science",
    focus: "Computational logic, algorithmic decomposition, and rigorous procedural problem solving.",
  },
  {
    standard: "UK GCSE & A-Level Computing",
    focus: "Connecting computational theory directly with practical software design and clean coding principles.",
  },
  {
    standard: "International Baccalaureate (IB)",
    focus: "Inquiry-driven investigation, independent project design, and thoughtful reflection on technology's impact.",
  },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About the Educator & Academic Lead | Skillify Genius"
        description="Meet the software engineer and educator guiding personalized 1:1 technology learning across 21+ countries since 2012."
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-32 top-8 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-800 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-emerald-600" /> Problem solving · Self-learning · Digital safety
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Academic leadership & engineering</p>
              <h1 className="mt-4 font-display text-5xl font-black leading-tight sm:text-6xl text-[#102a25]">
                Built and taught by a lifelong self-learner.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#597068]">
                Learn from someone who continues to build and learn in production, not someone who only recites textbook theory.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="shadow-lg shadow-emerald-950/10">
                  <Link to="/trial">Book free 45-min assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <span className="text-xs font-semibold text-muted-foreground">No obligation · Live 45-min assessment</span>
              </div>
            </div>

            <aside className="rounded-[2.5rem] bg-[#0d2922] p-8 text-white shadow-2xl shadow-emerald-950/20 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                  Academic lead
                </span>
                <BriefcaseBusiness className="h-6 w-6 text-emerald-300" />
              </div>
              <div className="mt-9 flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-2xl font-black text-emerald-300">
                  1:1
                </span>
                <div>
                  <p className="font-black uppercase tracking-wider text-amber-300">Co-founder & senior instructor</p>
                  <p className="mt-2 text-sm text-emerald-100/70">Software Engineer & Educator</p>
                </div>
              </div>
              <div className="my-8 h-px bg-white/10" />
              <p className="leading-7 text-emerald-100/75 text-sm sm:text-base">
                Senior Coding Instructor across international platforms, guiding learners from 21+ countries through personalized mentorship.
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Radio className="h-4 w-4" /> Actively teaching and building
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* EXPERIENCE CREDENTIALS */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Experience at a glance</p>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl text-[#102a25]">
              Production experience brought into personalized teaching.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map(({ icon: Icon, value, label }) => (
              <article key={value} className="rounded-3xl border border-emerald-950/10 bg-[#f7faf7] p-7 transition hover:shadow-lg">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-7 font-display text-4xl font-black text-emerald-800">{value}</p>
                <p className="mt-2 text-sm font-bold text-[#597068]">{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOCRATIC MENTORSHIP METHOD */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-emerald-950/10 bg-white p-8 shadow-xl sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-900">
                <BookOpenCheck className="h-3.5 w-3.5 text-emerald-700" /> Teaching Methodology
              </span>
              <h2 className="mt-5 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-[#102a25]">
                The Socratic method: guiding discovery, not dictating answers.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#597068] sm:text-lg">
                In mass bootcamps, teachers recite slides and tell students which line of code to copy. This creates fragile knowledge that breaks the moment the student faces a blank screen.
              </p>
              <p className="mt-4 text-base leading-8 text-[#597068] sm:text-lg">
                Our approach is intentionally Socratic. By asking targeted, probing questions, we guide students to formulate hypotheses, isolate variables, and diagnose their own bugs. The student remains in the driver’s seat 100% of the time, building true intellectual independence.
              </p>
            </div>

            <div className="grid gap-4 rounded-3xl border border-emerald-950/10 bg-[#f8faf8] p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-emerald-950/10 pb-4">
                <Compass className="h-5 w-5 text-emerald-700" />
                <h3 className="font-display font-black text-base text-[#102a25]">The Mentorship Rhythm</h3>
              </div>
              {[
                ["Active Socratic Inquiry", "Never typing for the student; guiding through diagnostic questions."],
                ["Fearless Debugging", "Reframing errors as valuable data rather than personal failure."],
                ["Original Project Agency", "Every student creates original software aligned with their passions."],
                ["Articulating Logic", "Students learn to explain why their code works in plain language."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3 pt-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[#102a25]">{title}</p>
                    <p className="text-xs text-[#597068] leading-5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE CORE LEARNING PILLARS */}
      <section className="bg-[#0d2922] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
              Core Pillars
            </span>
            <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Three foundations that outlive changing tech stacks.
            </h2>
            <p className="mt-5 text-base leading-8 text-emerald-100/70 sm:text-lg">
              Languages, libraries, and frameworks will evolve. These three competencies empower learners for a lifetime of independent adaptation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, subtitle, description }) => (
              <div
                key={title}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[.05] p-8 transition hover:bg-white/[.08]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-black text-white">{title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-amber-300/90">{subtitle}</p>
                <p className="mt-4 text-xs leading-6 text-emerald-100/65 sm:text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PEDAGOGY ACROSS 21+ COUNTRIES */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-900">
              <Globe2 className="h-3.5 w-3.5 text-emerald-700" /> Global Perspective
            </span>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-[#102a25]">
              Guiding learners across 21+ countries and curricula.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#597068] sm:text-lg">
              Because 1:1 mentorship is bespoke, our teaching adapts seamlessly to support students following premier international curricula.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {globalStandards.map(({ standard, focus }) => (
              <div key={standard} className="rounded-3xl border border-emerald-950/10 bg-[#f7faf7] p-7">
                <GraduationCap className="h-6 w-6 text-emerald-700" />
                <h3 className="mt-4 font-display text-lg font-black text-[#102a25]">{standard}</h3>
                <p className="mt-3 text-xs leading-6 text-[#597068] sm:text-sm">{focus}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-emerald-50 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 border border-emerald-100">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Experience the difference</p>
              <p className="mt-2 font-display text-2xl font-black text-emerald-950">
                Start with a live, no-obligation 1:1 assessment.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 sm:mt-0 shrink-0">
              <Link to="/trial">Book free 45-min assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
