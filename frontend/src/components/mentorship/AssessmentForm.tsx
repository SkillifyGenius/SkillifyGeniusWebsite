"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { programs, specializations, type Assessment, type Interest, type ProgramId } from "@/data/mentorship";

const countries = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Ireland", "Other"];
const inputClass = "min-h-12 w-full rounded-xl border border-emerald-950/15 bg-white px-4 text-sm text-[#102a25] outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

export function AssessmentForm({ initialProgram }: { initialProgram: ProgramId }) {
  const router = useRouter();
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const assessment: Assessment = {
      age: Number(form.get("age")),
      country: String(form.get("country") || ""),
      education: String(form.get("education") || ""),
      currentSkills: String(form.get("currentSkills") || ""),
      careerGoal: String(form.get("careerGoal") || ""),
      weeklyHours: Number(form.get("weeklyHours")),
      learningStyle: String(form.get("learningStyle") || ""),
      interest: String(form.get("interest")) as Interest,
      preferredLanguage: String(form.get("preferredLanguage") || ""),
      program: String(form.get("program")) as ProgramId,
    };
    if (!Number.isFinite(assessment.age) || assessment.age < 8 || assessment.age > 100 || !Number.isFinite(assessment.weeklyHours) || assessment.weeklyHours < 1 || assessment.weeklyHours > 40) {
      setError("Please enter a valid age and weekly time commitment.");
      return;
    }
    try {
      sessionStorage.setItem("skillify-mentorship-draft", JSON.stringify({ assessment, completedGoals: [], skillRatings: {}, portfolio: [], journal: [], feedback: [] }));
      router.push("/journey");
    } catch {
      setError("Your browser could not hold the roadmap for this session. Please enable session storage and try again.");
    }
  }

  return <section className="px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
    <div className="lg:sticky lg:top-28 lg:self-start"><span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-800"><Compass className="h-4 w-4" /> Before enrollment</span><h1 className="mt-6 text-4xl font-black text-[#102a25] sm:text-5xl">Start with your technology assessment.</h1><p className="mt-6 text-lg leading-8">Tell us where you are and where you want to go. We will show a draft roadmap with a goal-fit language, learning stages, and weekly practice rhythm.</p><div className="mt-8 rounded-3xl border border-emerald-950/10 bg-white p-6"><h2 className="font-black text-[#102a25]">A mentor shapes the final plan.</h2><p className="mt-2 text-sm leading-7">This instant roadmap is a starting point. Your educator adjusts the language, pace, projects, and milestones after a live conversation.</p></div><p className="mt-6 flex gap-2 text-sm leading-6 text-[#597068]"><ShieldCheck className="h-5 w-5 shrink-0 text-emerald-700" /> Your answers stay in this browser tab for this session. They are not sent to our servers.</p><Link href="/programs" className="mt-7 inline-block text-sm font-bold text-emerald-800">← Review the mentorship stages</Link></div>
    <form onSubmit={submit} className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-10"><h2 className="text-2xl font-black text-[#102a25]">Your learning profile</h2><p className="mt-2 text-sm">About 3 minutes. No account or commitment required.</p><div className="mt-8 grid gap-6 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-bold">Age<input className={inputClass} type="number" name="age" min="8" max="100" required placeholder="e.g. 16" /></label>
      <label className="grid gap-2 text-sm font-bold">Country<select className={inputClass} name="country" required defaultValue=""><option value="" disabled>Select country</option>{countries.map((country) => <option key={country}>{country}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold">Education level<select className={inputClass} name="education" required defaultValue=""><option value="" disabled>Select a level</option>{["School student", "College or university student", "Graduate", "Working professional", "Career changer", "Self-taught learner"].map((level) => <option key={level}>{level}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold">Available hours each week<input className={inputClass} type="number" name="weeklyHours" min="1" max="40" required placeholder="e.g. 5" /></label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">Current skills or experience<textarea className={`${inputClass} min-h-24 py-3`} name="currentSkills" maxLength={300} placeholder="Beginner, Scratch, Python basics, web projects, or anything else" /></label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">Career or learning goal<input className={inputClass} name="careerGoal" required maxLength={180} placeholder="e.g. Build mobile apps, explore cybersecurity, or become a developer" /></label>
      <label className="grid gap-2 text-sm font-bold">Preferred learning style<select className={inputClass} name="learningStyle" required defaultValue=""><option value="" disabled>Select a style</option>{["Hands-on projects", "Visual explanations", "Reading and research", "Guided discussion", "Mixed approach"].map((style) => <option key={style}>{style}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold">Technology interest<select className={inputClass} name="interest" required defaultValue=""><option value="" disabled>Select an interest</option>{Object.entries(specializations).map(([id, value]) => <option value={id} key={id}>{value.name}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold">Preferred language <span className="font-normal text-[#597068]">(optional)</span><select className={inputClass} name="preferredLanguage" defaultValue=""><option value="">Let the roadmap suggest</option>{["Python", "JavaScript", "Java", "C", "C++", "C#", "Go", "Rust", "PHP", "Swift", "Kotlin"].map((language) => <option key={language}>{language}</option>)}</select></label>
      <label className="grid gap-2 text-sm font-bold">Mentorship stage<select className={inputClass} name="program" defaultValue={initialProgram}>{programs.map((program) => <option key={program.id} value={program.id}>{program.name} · {program.duration}</option>)}</select></label>
    </div>{error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}<button type="submit" className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 text-sm font-extrabold text-white hover:bg-emerald-700">Generate my roadmap <ArrowRight className="h-4 w-4" /></button><p className="mt-4 text-center text-xs leading-5">For learners under 18, please complete this with a parent or guardian.</p></form>
  </div></section>;
}
