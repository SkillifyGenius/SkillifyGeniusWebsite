import { Clock, Code2, MessageSquareText, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

interface Phase {
  timeWindow: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Clock;
}

const sessionPhases: Phase[] = [
  {
    timeWindow: "00 - 10 min",
    title: "Concept Discovery & Review",
    tagline: "Socratic inquiry, not lecture slides",
    description: "We review the learner's previous project, celebrate milestones, and introduce today's challenge through open questions that activate curiosity.",
    icon: Sparkles,
  },
  {
    timeWindow: "10 - 40 min",
    title: "Active Hands-On Building",
    tagline: "The student writes 100% of the code",
    description: "The learner shares their screen and builds real software. The senior instructor acts as a pair-programming mentor, prompting, guiding, and encouraging independent thought.",
    icon: Code2,
  },
  {
    timeWindow: "40 - 50 min",
    title: "Debugging & Articulation",
    tagline: "Learning how to explain logic",
    description: "Students test edge cases, intentionally break code, and explain their architecture aloud. Being able to explain why code works builds lifelong retention.",
    icon: UserCheck,
  },
  {
    timeWindow: "50 - 60 min",
    title: "Reflection & Parent Update",
    tagline: "Actionable clarity for the family",
    description: "We document the day's breakthroughs, assign an optional creative mini-challenge for self-learning, and share a plain-language summary for parents.",
    icon: MessageSquareText,
  },
];

export function SessionAnatomy() {
  return (
    <section id="anatomy" className="bg-[#0d2922] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
            <Clock className="h-3.5 w-3.5" /> Pedagogical Architecture
          </span>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            The anatomy of a 60-minute 1:1 session.
          </h2>
          <p className="mt-5 text-base leading-8 text-emerald-100/70 sm:text-lg">
            Every minute is intentionally structured to turn passive learners into self-directed creators. Here is the rhythm behind our personalized instruction.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sessionPhases.map(({ timeWindow, title, tagline, description, icon: Icon }) => (
            <div
              key={timeWindow}
              className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[.05] p-7 transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[.08]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-black text-emerald-300">
                  {timeWindow}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-black text-white">{title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-amber-300/90">{tagline}</p>
              <p className="mt-4 flex-1 text-xs leading-6 text-emerald-100/65 sm:text-sm">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-xs leading-5 text-emerald-100/75">
          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" />
          <span>
            Every session is recorded securely or open for parents to observe live. Zero guesswork, zero unmonitored rooms.
          </span>
        </div>
      </div>
    </section>
  );
}
