"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Compass, Lightbulb, MessageSquareText, Plus, ShieldCheck, Target, Trash2 } from "lucide-react";
import { createRoadmap, type Assessment } from "@/data/mentorship";

interface Draft {
  assessment: Assessment;
  completedGoals: number[];
  skillRatings: Record<string, number>;
  portfolio: string[];
  journal: string[];
  feedback: string[];
}

const storageKey = "skillify-mentorship-draft";
const fieldClass = "min-h-11 w-full rounded-xl border border-emerald-950/15 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

export function JourneyDashboard() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [project, setProject] = useState("");
  const [reflection, setReflection] = useState("");
  const [feedbackNote, setFeedbackNote] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Draft;
        if (parsed.assessment && Array.isArray(parsed.completedGoals) && Array.isArray(parsed.portfolio) && Array.isArray(parsed.journal) && Array.isArray(parsed.feedback) && parsed.skillRatings) setDraft(parsed);
      }
    } catch { /* A malformed browser draft is ignored. */ }
    setLoaded(true);
  }, []);

  function update(next: Draft) {
    setDraft(next);
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* The current page remains usable without browser storage. */ }
  }

  if (!loaded) return <div className="mx-auto max-w-7xl px-5 py-20 text-sm text-[#597068]">Loading your roadmap…</div>;
  if (!draft) return <section className="mx-auto max-w-3xl px-5 py-24 text-center"><Compass className="mx-auto h-12 w-12 text-emerald-700" /><h1 className="mt-6 text-4xl font-black text-[#102a25]">Create your learning journey.</h1><p className="mt-5 text-lg leading-8">Your roadmap is held only for the current browser session. Start with an assessment to build it.</p><Link href="/assessment" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white">Start assessment <ArrowRight className="h-4 w-4" /></Link></section>;

  const roadmap = createRoadmap(draft.assessment);
  const completed = draft.completedGoals.length;
  const progress = Math.round((completed / roadmap.stages.length) * 100);
  const skillNames = ["Problem decomposition", "Programming logic", "Debugging", "Documentation", "AI verification", "Cybersecurity awareness"];

  function addEntry(key: "portfolio" | "journal" | "feedback", value: string, clear: (value: string) => void) {
    const trimmed = value.trim();
    if (!trimmed) return;
    update({ ...draft!, [key]: [...draft![key], trimmed] });
    clear("");
  }

  return <div className="bg-[#f6f7f1] px-5 py-12 sm:px-8 lg:py-20"><div className="mx-auto max-w-7xl">
    <div className="rounded-[2rem] bg-[#0d2922] p-7 text-white sm:p-10"><span className="text-xs font-black uppercase tracking-[.18em] text-emerald-300">Personal learning journey · Browser draft</span><h1 className="mt-4 text-4xl font-black sm:text-5xl">Your path to technical independence.</h1><p className="mt-4 max-w-3xl text-emerald-50/80">A starting roadmap for {draft.assessment.age}-year-old learner in {draft.assessment.country}, shaped around {draft.assessment.careerGoal}. Review it with your mentor before enrollment.</p><div className="mt-7 flex flex-wrap gap-3"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{roadmap.program.name}</span><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{roadmap.specialization.name}</span><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{draft.assessment.weeklyHours} hrs/week</span></div></div>
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><ShieldCheck className="mr-2 inline h-4 w-4" />This is a private, on-device planning draft. It does not create an account or send progress to a mentor. Your entries disappear when this browser session ends.</div>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><Compass className="h-6 w-6 text-emerald-700" /><h2 className="text-2xl font-black text-[#102a25]">Personal learning roadmap</h2></div><p className="mt-4 text-sm leading-7">{roadmap.guidance}</p><p className="mt-4 text-xs font-black uppercase tracking-wider text-emerald-700">Suggested technology sequence</p><div className="mt-3 flex flex-wrap gap-2">{roadmap.specialization.path.map((step, index) => <span key={step} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">{index + 1}. {step}</span>)}</div><ol className="mt-7 space-y-3">{roadmap.stages.map((stage, index) => <li key={stage} className="flex gap-3 rounded-2xl bg-[#f6f7f1] p-4 text-sm leading-6"><span className="font-black text-emerald-700">{String(index + 1).padStart(2, "0")}</span>{stage}</li>)}</ol></section>

        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><Target className="h-6 w-6 text-emerald-700" /><h2 className="text-2xl font-black text-[#102a25]">Progress tracking</h2></div><span className="text-xl font-black text-emerald-800">{progress}%</span></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} /></div><p className="mt-3 text-sm">{completed} of {roadmap.stages.length} roadmap milestones marked complete.</p><div className="mt-6 grid gap-3">{roadmap.stages.map((stage, index) => <label key={stage} className="flex cursor-pointer items-start gap-3 rounded-xl border border-emerald-950/10 p-3 text-sm leading-6"><input type="checkbox" className="mt-1 accent-emerald-700" checked={draft.completedGoals.includes(index)} onChange={() => update({ ...draft, completedGoals: draft.completedGoals.includes(index) ? draft.completedGoals.filter((item) => item !== index) : [...draft.completedGoals, index] })} /><span>{stage}</span></label>)}</div></section>

        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><BookOpen className="h-6 w-6 text-emerald-700" /><h2 className="text-2xl font-black text-[#102a25]">Project portfolio</h2></div><p className="mt-3 text-sm">Record projects you build and can explain. Add links or project names when ready.</p><div className="mt-5 flex gap-2"><input className={fieldClass} value={project} onChange={(event) => setProject(event.target.value)} maxLength={180} placeholder="Project name or URL" aria-label="Project name or URL" /><button type="button" onClick={() => addEntry("portfolio", project, setProject)} className="rounded-xl bg-emerald-800 px-4 text-white" aria-label="Add project"><Plus className="h-4 w-4" /></button></div><ul className="mt-4 space-y-2">{draft.portfolio.map((entry, index) => <li key={`${entry}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50 p-3 text-sm"><span className="break-all">{entry}</span><button type="button" onClick={() => update({ ...draft, portfolio: draft.portfolio.filter((_, item) => item !== index) })} aria-label="Remove project" className="text-slate-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button></li>)}</ul></section>

        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><MessageSquareText className="h-6 w-6 text-emerald-700" /><h2 className="text-2xl font-black text-[#102a25]">Learning journal</h2></div><p className="mt-3 text-sm">What did you build, struggle with, or discover this week?</p><textarea className={`${fieldClass} mt-5 min-h-28`} value={reflection} onChange={(event) => setReflection(event.target.value)} maxLength={1000} placeholder="Write a short reflection…" aria-label="Learning reflection" /><button type="button" onClick={() => addEntry("journal", reflection, setReflection)} className="mt-3 rounded-xl bg-emerald-800 px-5 py-2 text-sm font-bold text-white">Add reflection</button><ul className="mt-4 space-y-3">{draft.journal.map((entry, index) => <li key={index} className="rounded-xl bg-[#f6f7f1] p-4 text-sm leading-6 whitespace-pre-wrap">{entry}</li>)}</ul></section>
      </div>

      <div className="space-y-6">
        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6"><h2 className="text-xl font-black text-[#102a25]">Weekly goals</h2><ul className="mt-4 space-y-3">{roadmap.weeklyGoals.map((goal) => <li key={goal} className="flex gap-2 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{goal}</li>)}</ul><p className="mt-4 text-xs">Your mentor can adjust the cadence after your first session.</p></section>
        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6"><h2 className="text-xl font-black text-[#102a25]">Skill assessment</h2><p className="mt-2 text-sm">Self-rate each skill from new to confident. Revisit with your mentor.</p><div className="mt-5 space-y-4">{skillNames.map((skill) => <label key={skill} className="grid gap-2 text-sm font-bold text-emerald-950">{skill}<select className={fieldClass} value={draft.skillRatings[skill] ?? 0} onChange={(event) => update({ ...draft, skillRatings: { ...draft.skillRatings, [skill]: Number(event.target.value) } })}><option value={0}>New to this</option><option value={1}>Exploring</option><option value={2}>Practicing</option><option value={3}>Confident</option></select></label>)}</div></section>
        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6"><h2 className="text-xl font-black text-[#102a25]">Mentor feedback notes</h2><p className="mt-2 text-sm leading-6">After a real session, record what your mentor asked you to practice. No feedback has been provided in this draft.</p><textarea className={`${fieldClass} mt-4 min-h-24`} value={feedbackNote} onChange={(event) => setFeedbackNote(event.target.value)} maxLength={1000} placeholder="Notes from a mentor conversation…" aria-label="Mentor feedback notes" /><button type="button" onClick={() => addEntry("feedback", feedbackNote, setFeedbackNote)} className="mt-3 rounded-xl border border-emerald-800 px-4 py-2 text-sm font-bold text-emerald-800">Save note</button><ul className="mt-4 space-y-2">{draft.feedback.map((entry, index) => <li key={index} className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 whitespace-pre-wrap">{entry}</li>)}</ul></section>
        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6"><div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-emerald-700" /><h2 className="text-xl font-black text-[#102a25]">AI learning assistant guidance</h2></div><p className="mt-3 text-sm leading-6">Use an AI assistant to ask for hints and explanations, then verify every answer in documentation or with your own tests.</p><div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">“I am learning {roadmap.language}. Please ask me three questions that help me debug this issue. Do not write the full solution.”</div><p className="mt-3 text-xs">Never paste passwords, private student data, or confidential project information into AI tools.</p></section>
        <Link href="/trial" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-extrabold text-white hover:bg-emerald-700">Review this roadmap with a mentor <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  </div></div>;
}
