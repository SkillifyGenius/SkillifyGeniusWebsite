"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Gamepad2, 
  Globe, 
  Cpu, 
  Shield 
} from "lucide-react";

export default function PathfinderQuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: 13,
    experience: "beginner",
    interest: "apps",
    goal: "portfolio",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const evaluation = await api.evaluatePathfinder(answers);
        setResult(evaluation);
        setStep(5);
      } catch (err) {
        console.error("Evaluation failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Quiz Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="blue" className="gap-1.5">
          <Compass className="h-3.5 w-3.5" />
          <span>Pathfinder Diagnostic 2.0</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          Find Your Child's Future Skills Track
        </h1>
        <p className="text-[#475569] text-sm sm:text-base">
          Complete our 2-minute diagnostic assessment to receive an instant <strong>Future Readiness Score</strong> and customized learning pathway.
        </p>

        {/* Step Progress Tracker */}
        {step <= 4 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-10 bg-[#2563EB]"
                    : s < step
                    ? "w-4 bg-[#10B981]"
                    : "w-4 bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Step Cards */}
      <Card className="border-[#E2E8F0] bg-white p-8 sm:p-12 card-shadow">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">Step 1 of 4</span>
              <h2 className="text-2xl font-bold text-[#0F172A]">How old is your child?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Ages 6 - 8 (Early Explorer)", age: 7, desc: "Foundational visual logic & algorithmic thinking" },
                { label: "Ages 9 - 11 (Junior Builder)", age: 10, desc: "Transition from visual blocks to text logic" },
                { label: "Ages 12 - 14 (Creator Lab)", age: 13, desc: "Real-world web apps, Python & cloud databases" },
                { label: "Ages 15 - 18 (Advanced Innovator)", age: 16, desc: "Full-stack systems, AI automation & cyber defense" },
              ].map((opt) => (
                <button
                  key={opt.age}
                  onClick={() => setAnswers({ ...answers, age: opt.age })}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    answers.age === opt.age
                      ? "border-[#2563EB] bg-blue-50/70 text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]"
                      : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <h4 className="font-bold text-base text-[#0F172A]">{opt.label}</h4>
                  <p className="text-xs text-[#64748B] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">Step 2 of 4</span>
              <h2 className="text-2xl font-bold text-[#0F172A]">What is their prior coding experience?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "beginner", label: "Complete Beginner", desc: "No prior coding or technical experience" },
                { key: "scratch", label: "Visual Blocks (Scratch/Blockly)", desc: "Built simple games with drag-and-drop" },
                { key: "intermediate", label: "Some Python or Web Code", desc: "Knows basic variables, loops, or HTML" },
                { key: "advanced", label: "Active Project Builder", desc: "Has built independent scripts or web projects" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAnswers({ ...answers, experience: opt.key })}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    answers.experience === opt.key
                      ? "border-[#2563EB] bg-blue-50/70 text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]"
                      : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <h4 className="font-bold text-base text-[#0F172A]">{opt.label}</h4>
                  <p className="text-xs text-[#64748B] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">Step 3 of 4</span>
              <h2 className="text-2xl font-bold text-[#0F172A]">What area excites your child the most?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "games", label: "Game Design & Physics", icon: Gamepad2, desc: "Building 2D/3D interactive games and physics logic" },
                { key: "apps", label: "Web Applications & Tools", icon: Globe, desc: "Building live interactive web applications with cloud databases" },
                { key: "ai", label: "AI Workflows & Automation", icon: Cpu, desc: "Mastering LLMs, prompt engineering & automated scripts" },
                { key: "security", label: "Cyber Safety & Ethical Defense", icon: Shield, desc: "Understanding network defenses, privacy & threat modeling" },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setAnswers({ ...answers, interest: opt.key })}
                    className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                      answers.interest === opt.key
                        ? "border-[#2563EB] bg-blue-50/70 text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]"
                        : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base text-[#0F172A]">{opt.label}</h4>
                      <p className="text-xs text-[#64748B] mt-1">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">Step 4 of 4</span>
              <h2 className="text-2xl font-bold text-[#0F172A]">What is your primary educational goal?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "confidence", label: "Build Logic & Confidence", desc: "Develop structured thinking and remove fear of technology" },
                { key: "portfolio", label: "Deploy a Real Tech Portfolio", desc: "Create live projects for high school and university admissions" },
                { key: "ai", label: "Prepare for the AI Economy", desc: "Learn to build and automate using modern AI workflows" },
                { key: "engineering", label: "Master Professional Software Habits", desc: "Learn Git, cloud databases, testing & root cause debugging" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setAnswers({ ...answers, goal: opt.key })}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    answers.goal === opt.key
                      ? "border-[#2563EB] bg-blue-50/70 text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]"
                      : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <h4 className="font-bold text-base text-[#0F172A]">{opt.label}</h4>
                  <p className="text-xs text-[#64748B] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && result && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <Badge variant="emerald" className="gap-1 mb-2 bg-white">
                  <Sparkles className="h-3 w-3" />
                  Diagnostic Complete
                </Badge>
                <h3 className="text-2xl font-black text-[#0F172A]">
                  Recommended Track: {result.recommendedTrack}
                </h3>
                <p className="text-xs text-[#475569] mt-1">
                  Starting Placement: <strong className="text-[#0F172A]">Phase {result.recommendedPhase}</strong>
                </p>
              </div>

              <div className="text-center p-4 rounded-xl bg-white border border-emerald-200 shadow-sm shrink-0">
                <span className="text-3xl font-black text-[#10B981] font-mono">
                  {result.readinessScore}%
                </span>
                <p className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] mt-0.5 font-bold">
                  Future Readiness Score
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-bold">
                Tailored 4-Stage Learning Journey:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.customRoadmap.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A]">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href={`/learn/foundation/${result.startingModule}`} className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto">
                  Try Sample Challenge in Studio
                </Button>
              </Link>
              <Link href="/trial" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 shadow-md shadow-blue-500/20">
                  <span>Confirm Free 1-on-1 Assessment</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Step Navigation Buttons */}
        {step < 5 && (
          <div className="flex items-center justify-between pt-8 border-t border-[#E2E8F0] mt-8">
            <Button
              variant="ghost"
              size="md"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={loading}
              className="gap-2"
            >
              <span>{step === 4 ? "Calculate Readiness Score" : "Continue"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
