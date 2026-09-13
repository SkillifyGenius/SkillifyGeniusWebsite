import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Compass,
  Laptop,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepOption {
  id: string;
  title: string;
  subtitle: string;
}

const ageOptions: StepOption[] = [
  { id: "8-11", title: "Ages 8-11", subtitle: "Curious explorers & young problem solvers" },
  { id: "12-14", title: "Ages 12-14", subtitle: "Budding creators & logical thinkers" },
  { id: "15-18", title: "Ages 15-18", subtitle: "Independent builders & future-ready teens" },
];

const interestOptions: StepOption[] = [
  { id: "logic", title: "Creative Logic & Game Systems", subtitle: "Puzzles, interactive physics, and playful algorithms" },
  { id: "web", title: "Web Creator & Digital Products", subtitle: "Building responsive websites, tools, and UI applications" },
  { id: "ai", title: "Practical AI & Systems Thinking", subtitle: "Prompt design, fact-checking, and responsible AI workflows" },
];

const experienceOptions: StepOption[] = [
  { id: "beginner", title: "Complete Beginner", subtitle: "Excited to start from square one with friendly 1:1 guidance" },
  { id: "blocks", title: "Some Scratch / Block Coding", subtitle: "Understands basics and ready for real code and logic" },
  { id: "tinkerer", title: "Self-Taught Explorer", subtitle: "Has experimented on their own and wants structured engineering mentorship" },
];

export function PathwayDiagnostic() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAge, setSelectedAge] = useState<string>("8-11");
  const [selectedInterest, setSelectedInterest] = useState<string>("logic");
  const [selectedExp, setSelectedExp] = useState<string>("beginner");

  function getRecommendation() {
    if (selectedInterest === "ai" || selectedAge === "15-18") {
      return {
        title: "Practical AI for Students",
        slug: "practical-ai-for-students",
        tagline: "Responsible AI literacy, research, and high-order logic.",
        milestones: [
          { phase: "Weeks 1-4", goal: "Deconstruct how AI models work, fact-checking, and prompting fundamentals." },
          { phase: "Weeks 5-8", goal: "Build real study workflows, data analysis helpers, and creative utilities." },
          { phase: "Weeks 9-10", goal: "Complete and present an original, ethical AI-supported project." },
        ],
      };
    }

    if (selectedInterest === "web" || selectedAge === "12-14") {
      return {
        title: "Web Creator Lab",
        slug: "web-creator-lab",
        tagline: "Design, build, and publish complete modern web projects.",
        milestones: [
          { phase: "Weeks 1-5", goal: "Master HTML structure, modern CSS styling, and responsive layout principles." },
          { phase: "Weeks 6-11", goal: "Add interactivity and state logic using clean, modern JavaScript." },
          { phase: "Weeks 12-16", goal: "Design, code, and deploy an original live web application." },
        ],
      };
    }

    return {
      title: "Coding & Creative Logic",
      slug: "coding-creative-logic",
      tagline: "A playful, friendly foundation in computational thinking and debugging.",
      milestones: [
        { phase: "Weeks 1-4", goal: "Explore sequencing, loops, and conditions through visual puzzles." },
        { phase: "Weeks 5-8", goal: "Create interactive mini-games and learn fearless independent debugging." },
        { phase: "Weeks 9-12", goal: "Build and present an original interactive game from scratch." },
      ],
    };
  }

  const recommendation = getRecommendation();

  return (
    <section id="diagnostic" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-emerald-950/10 bg-white p-7 shadow-2xl shadow-emerald-950/5 sm:p-12 lg:p-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-950/10 pb-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-900">
              <Compass className="h-3.5 w-3.5 text-emerald-700" /> 30-Second Diagnostic
            </span>
            <h2 className="mt-3 font-display text-2xl font-black text-[#102a25] sm:text-3xl">
              Find the perfect 1:1 learning path for your child.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <span
                key={num}
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black transition-all ${
                  step === num
                    ? "bg-primary text-white scale-110 shadow-md"
                    : step > num || step === 4
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > num || step === 4 ? <Check className="h-4 w-4" /> : num}
              </span>
            ))}
          </div>
        </div>

        {/* STEP 1: AGE */}
        {step === 1 && (
          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Step 1 of 3</p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
              What is your learner’s current age bracket?
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ageOptions.map((opt) => {
                const isSelected = selectedAge === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedAge(opt.id)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-emerald-50/70 shadow-md ring-2 ring-primary/20"
                        : "border-emerald-950/10 hover:border-emerald-950/25 hover:bg-[#f8faf8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-black text-[#102a25]">{opt.title}</span>
                      {isSelected && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#597068]">{opt.subtitle}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <Button size="lg" onClick={() => setStep(2)}>
                Next: Choose Interest <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: INTEREST */}
        {step === 2 && (
          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Step 2 of 3</p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
              What sparks their curiosity the most?
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {interestOptions.map((opt) => {
                const isSelected = selectedInterest === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedInterest(opt.id)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-emerald-50/70 shadow-md ring-2 ring-primary/20"
                        : "border-emerald-950/10 hover:border-emerald-950/25 hover:bg-[#f8faf8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base font-black text-[#102a25]">{opt.title}</span>
                      {isSelected && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#597068]">{opt.subtitle}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button size="lg" onClick={() => setStep(3)}>
                Next: Experience Level <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: EXPERIENCE */}
        {step === 3 && (
          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Step 3 of 3</p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
              What is their prior technical experience?
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {experienceOptions.map((opt) => {
                const isSelected = selectedExp === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedExp(opt.id)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-emerald-50/70 shadow-md ring-2 ring-primary/20"
                        : "border-emerald-950/10 hover:border-emerald-950/25 hover:bg-[#f8faf8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base font-black text-[#102a25]">{opt.title}</span>
                      {isSelected && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#597068]">{opt.subtitle}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button size="lg" onClick={() => setStep(4)} className="font-bold">
                See Custom Roadmap <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === 4 && (
          <div className="mt-8 animate-fade-up">
            <div className="rounded-3xl border border-emerald-700/20 bg-emerald-50/60 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Recommended 1:1 Pathway
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-black text-[#102a25]">
                    {recommendation.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#456159]">{recommendation.tagline}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="self-start">
                  <RotateCcw className="mr-2 h-3.5 w-3.5" /> Retake
                </Button>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Tailored Milestone Progression:
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {recommendation.milestones.map((m, i) => (
                    <div key={m.phase} className="rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm">
                      <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
                        {m.phase}
                      </span>
                      <p className="mt-2 text-xs leading-5 text-[#102a25] font-medium">{m.goal}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-emerald-950/10 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#456159]">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <span>Free assessment includes a tailored consultation based on these answers.</span>
                </div>
                <Button asChild size="lg" className="shadow-lg shadow-emerald-950/10">
                  <Link to={`/trial?course=${recommendation.slug}`}>
                    Discuss this roadmap in free 45-min trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
