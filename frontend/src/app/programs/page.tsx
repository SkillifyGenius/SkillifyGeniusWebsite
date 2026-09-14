import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";
import { programs, specializations } from "@/data/mentorship";

export const metadata = pageMetadata("/programs", "Technology Mentorship Programs | Skillify Genius", "Explore personalized 6, 12, and 18-month technology mentorship and apprenticeship journeys with 1:1 guidance.");

const steps = [
  ["01", "Technology assessment", "We learn your goals, experience, available time, and learning preferences."],
  ["02", "Personal roadmap", "A mentor chooses a starting language, projects, and milestones for your direction."],
  ["03", "1:1 mentorship", "Live guidance turns confusion into questions, investigation, and decisions."],
  ["04", "Project-based learning", "Build useful work, review mistakes, and document your progress."],
  ["05", "Independent mastery", "Learn to research and adapt when technology changes."],
] as const;

export default function ProgramsPage() {
  return <>
    <section className="relative overflow-hidden bg-[#0d2922] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Sparkles className="h-4 w-4" /> Personal technology journeys</span>
        <h1 className="mt-7 max-w-4xl text-5xl font-black leading-tight sm:text-6xl">Learn how to think like a technologist, not just how to write code.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/80">Develop the ability to understand, build, and adapt to any technology through a personal roadmap, expert 1:1 mentorship, and meaningful projects.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/assessment" className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-extrabold text-emerald-950 hover:bg-emerald-300">Build my roadmap <ArrowRight className="h-4 w-4" /></Link><Link href="/trial" className="inline-flex h-12 items-center rounded-xl border border-white/30 px-6 text-sm font-extrabold text-white hover:bg-white/10">Talk with a mentor</Link></div>
        <p className="mt-6 text-sm text-emerald-100/65">For learners across the USA, Canada, UK, Australia, New Zealand, and Ireland.</p>
      </div>
    </section>

    <section className="px-5 py-20 sm:px-8 lg:py-28" id="programs"><div className="mx-auto max-w-7xl">
      <span className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Programs overview</span><h2 className="mt-4 max-w-3xl text-4xl font-black text-[#102a25] sm:text-5xl">Three stages. One personal direction.</h2><p className="mt-5 max-w-3xl text-lg leading-8">Every stage develops self-learning, problem solving, technical independence, responsible AI use, and cybersecurity awareness.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">{programs.map((program, index) => <article key={program.id} className={`flex flex-col rounded-[2rem] border p-7 shadow-lg shadow-emerald-950/5 sm:p-8 ${index === 1 ? "border-emerald-500 bg-white" : "border-emerald-950/10 bg-[#fbfcf8]"}`}>
        <span className="w-fit rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-white">{program.duration}</span><h3 className="mt-6 text-2xl font-black text-[#102a25]">{program.name}</h3><p className="mt-4 text-sm leading-7"><strong className="text-emerald-900">For:</strong> {program.audience}.</p><p className="mt-4 text-sm leading-7"><strong className="text-emerald-900">Transformation:</strong> {program.outcome}</p>
        <div className="mt-6 border-t border-emerald-950/10 pt-6"><p className="text-xs font-black uppercase tracking-wider text-emerald-800">Main skills</p><ul className="mt-4 grid gap-3">{program.skills.map((skill) => <li key={skill} className="flex gap-2 text-sm font-semibold text-slate-700"><Check className="h-4 w-4 shrink-0 text-emerald-600" />{skill}</li>)}</ul></div>
        <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><strong>Personalized:</strong> {program.approach}</p><Link href={`/assessment?program=${program.id}`} className="mt-7 inline-flex items-center gap-2 font-extrabold text-emerald-800">Explore my fit <ArrowRight className="h-4 w-4" /></Link>
      </article>)}</div>
    </div></section>

    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28" id="how-it-works"><div className="mx-auto max-w-7xl"><span className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">How it works</span><h2 className="mt-4 text-4xl font-black text-[#102a25] sm:text-5xl">Guided until you can guide yourself.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{steps.map(([number, title, text]) => <div key={number} className="rounded-3xl border border-emerald-950/10 bg-[#f7faf5] p-6"><span className="text-3xl font-black text-emerald-600">{number}</span><h3 className="mt-5 text-xl font-black text-[#102a25]">{title}</h3><p className="mt-3 text-sm leading-6">{text}</p></div>)}</div></div></section>

    <section className="px-5 py-20 sm:px-8 lg:py-28" id="curriculum"><div className="mx-auto max-w-7xl"><span className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Mentorship architecture</span><h2 className="mt-4 text-4xl font-black text-[#102a25] sm:text-5xl">A clear structure that makes room for you.</h2><p className="mt-5 max-w-4xl leading-7">Your programming language is selected for your goals, background, and industry interests. Options include Python, JavaScript, Java, C/C++, C#, Go, Rust, PHP, Swift, and Kotlin.</p><div className="mt-10 grid gap-6 lg:grid-cols-3">{programs.map((program) => <article key={program.id} className="rounded-[2rem] border border-emerald-950/10 bg-white p-7"><h3 className="text-2xl font-black text-[#102a25]">{program.name}</h3><p className="mt-2 text-sm font-bold text-emerald-700">{program.duration}</p><div className="mt-6 space-y-7">{program.phases.map((phase) => <div key={phase.period} className="border-t border-emerald-950/10 pt-5"><span className="text-xs font-black uppercase tracking-wider text-emerald-700">{phase.period}</span><h4 className="mt-2 text-lg font-black text-[#102a25]">{phase.title}</h4><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#597068]">{phase.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div>)}</div></article>)}</div></div></section>

    <section className="bg-[#0d2922] px-5 py-20 text-white sm:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><span className="text-xs font-black uppercase tracking-[.18em] text-emerald-300">Mastery specializations</span><h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">Go deeper where your goals lead.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Object.values(specializations).map((specialization) => <article key={specialization.name} className="rounded-3xl border border-white/15 bg-white/5 p-6"><h3 className="text-xl font-black text-white">{specialization.name}</h3><ul className="mt-4 space-y-2 text-sm text-emerald-50/75">{specialization.focus.map((focus) => <li key={focus} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-emerald-300" />{focus}</li>)}</ul></article>)}</div></div></section>

    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl"><span className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Why this is different</span><h2 className="mt-4 text-4xl font-black text-[#102a25] sm:text-5xl">From fixed lessons to lasting independence.</h2><div className="mt-10 overflow-x-auto rounded-3xl border border-emerald-950/10"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-[#0d2922] text-white"><tr><th className="p-5">Dimension</th><th className="p-5">Traditional courses</th><th className="p-5">Our mentorship</th></tr></thead><tbody>{[["Learning path", "Fixed curriculum", "Personal roadmap"], ["Technology", "Fixed language", "Multiple goal-fit technologies"], ["Teaching", "Video learning", "Live human mentorship"], ["Outcome", "Short-term skills", "Long-term independence"]].map(([label, traditional, mentorship]) => <tr key={label} className="border-t border-emerald-950/10"><th className="p-5 text-emerald-950">{label}</th><td className="p-5 text-slate-600">{traditional}</td><td className="p-5 font-bold text-emerald-800">{mentorship}</td></tr>)}</tbody></table></div><div className="mt-10 rounded-3xl bg-emerald-50 p-7 sm:p-9"><h3 className="text-xl font-black text-emerald-950">Your first roadmap starts with an assessment.</h3><p className="mt-2 leading-7">See a sample journey before enrollment. A mentor reviews it with you and adjusts the plan around your real strengths and goals.</p><Link href="/assessment" className="mt-5 inline-flex items-center gap-2 font-extrabold text-emerald-800">Create my roadmap <ArrowRight className="h-4 w-4" /></Link></div></div></section>
  </>;
}
