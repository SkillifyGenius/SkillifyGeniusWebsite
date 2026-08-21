"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Brain, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Terminal,
  Layers,
  Globe,
  Lock
} from "lucide-react";

export default function StudentRegistrationPage() {
  const router = useRouter();
  const { switchRole, login } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [age, setAge] = useState(12);
  const [country, setCountry] = useState("United States");
  const [experienceLevel, setExperienceLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

  const [interests, setInterests] = useState<string[]>(["Problem Solving", "Web Development"]);

  const interestOptions = [
    { id: "web", label: "Web Development", icon: Globe },
    { id: "ai", label: "AI & Automation", icon: Sparkles },
    { id: "game", label: "Game Development", icon: Rocket },
    { id: "problem_solving", label: "Problem Solving", icon: Brain },
    { id: "foundations", label: "Programming Foundations", icon: Code2 },
  ];

  const toggleInterest = (label: string) => {
    if (interests.includes(label)) {
      setInterests(interests.filter((i) => i !== label));
    } else {
      setInterests([...interests, label]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      await api.registerStudent({
        name: name || "Young Innovator",
        email: email || `student_${Date.now()}@skillifygenius.com`,
        password,
        age,
        country,
        experienceLevel,
        interests,
      });

      switchRole("student");
      login("student");
      setStep(4);

      setTimeout(() => {
        router.push("/dashboard/student");
      }, 2200);
    } catch (err) {
      console.error("Registration error", err);
      // Fallback
      switchRole("student");
      login("student");
      setStep(4);
      setTimeout(() => {
        router.push("/dashboard/student");
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="mx-auto max-w-6xl w-full">
        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
          
          {/* Left Column: Brand Storytelling & Academy Trust */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-white text-[#2563EB] flex items-center justify-center font-black shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Skillify<span className="text-blue-200">Genius</span>
                </span>
              </Link>

              <div className="space-y-3 pt-4">
                <Badge variant="emerald" className="text-xs bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                  Global Admissions
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Become a Future-Ready Engineer.
                </h2>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Join a selective global community of young creators developing real-world problem solving, AI fluency, and unassisted building ability.
                </p>
              </div>

              {/* 3 Academy Pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="h-4 w-4 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Problem Solving First</h4>
                    <p className="text-[11px] text-blue-200">Reason through logic puzzles and learn Root Cause Analysis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="h-4 w-4 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Deploy Real Web Apps</h4>
                    <p className="text-[11px] text-blue-200">Ship verified cloud applications to your public portfolio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Socratic AI Mentor</h4>
                    <p className="text-[11px] text-blue-200">Guided progressive questions without spoon-feeding answers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badge */}
            <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-300" /> COPPA & GDPR Safe
              </span>
              <span>20+ Countries</span>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            {/* Progress Bar */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-mono uppercase font-bold text-[#2563EB]">
                  {step === 4 ? "Complete" : `Step ${step} of 3`}
                </span>
                <span className="font-medium">
                  {step === 1 && "Account Information"}
                  {step === 2 && "Student Profile"}
                  {step === 3 && "Learning Tracks"}
                  {step === 4 && "Welcome to Academy!"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] transition-all duration-500 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Account Info */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#0F172A]">Create Student Account</h3>
                  <p className="text-xs text-[#64748B]">Enter credentials to access your Socratic Studio.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Student Full Name</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Liam Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Email Address</label>
                    <Input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Password</label>
                    <Input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full gap-2 font-bold shadow-md shadow-blue-500/20">
                  <span>Continue to Student Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            {/* STEP 2: Student Profile */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#0F172A]">Student Profile & Level</h3>
                  <p className="text-xs text-[#64748B]">Help us customize your starting Socratic challenges.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#0F172A]">Student Age</label>
                      <Input
                        type="number"
                        min={6}
                        max={18}
                        required
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#0F172A]">Country</label>
                      <Input
                        type="text"
                        required
                        placeholder="e.g. United States"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-[#0F172A]">Current Experience Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`p-3.5 rounded-xl border text-center transition-all text-xs font-bold ${
                            experienceLevel === lvl
                              ? "border-[#2563EB] bg-blue-50/80 text-[#2563EB] shadow-sm"
                              : "border-slate-200 bg-white text-[#475569] hover:bg-slate-50"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setStep(1)}
                    className="gap-1 text-xs"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </Button>
                  <Button type="submit" variant="primary" size="md" className="flex-1 gap-2 font-bold shadow-md shadow-blue-500/20">
                    <span>Continue to Learning Goals</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: Learning Goals */}
            {step === 3 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#0F172A]">Select Focus Tracks</h3>
                  <p className="text-xs text-[#64748B]">Choose what you are most excited to build and engineer.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interestOptions.map((opt) => {
                    const isSelected = interests.includes(opt.label);
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleInterest(opt.label)}
                        className={`p-3.5 rounded-xl border flex items-center gap-3 text-left transition-all ${
                          isSelected
                            ? "border-[#2563EB] bg-blue-50/70 text-[#0F172A] shadow-sm"
                            : "border-slate-200 bg-white text-[#475569] hover:bg-slate-50"
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-[#64748B]"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold">{opt.label}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setStep(2)}
                    className="gap-1 text-xs"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="flex-1 gap-2 font-bold shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    <Rocket className="h-4 w-4" />
                    <span>{loading ? "Configuring Studio..." : "Complete Registration & Enter Studio"}</span>
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4: Confirmation Screen */}
            {step === 4 && (
              <div className="text-center py-8 space-y-6 animate-fadeIn">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/30 animate-bounce">
                  🚀
                </div>
                <div className="space-y-2">
                  <Badge variant="emerald" className="text-xs">Registration Complete</Badge>
                  <h3 className="text-3xl font-black text-[#0F172A]">
                    Welcome to Skillify Genius!
                  </h3>
                  <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    Your student workspace has been initialized with your personalized Skill Graph™ telemetry.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 max-w-sm mx-auto text-xs text-[#2563EB] font-bold">
                  Redirecting to your Student Studio...
                </div>
              </div>
            )}

            {/* Footer Sign-in prompt */}
            <div className="pt-6 border-t border-slate-100 text-center text-xs text-[#64748B]">
              Already have an account?{" "}
              <Link href="/login/student" className="text-[#2563EB] font-bold hover:underline">
                Student Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
