"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck2,
  Check,
  CheckCircle2,
  Clock3,
  Globe,
  Loader2,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  SunMedium,
  UserRoundCheck,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { contact } from "@/lib/contact";
import { fallbackCourses } from "@/data/content";
import {
  TIMEZONE_LIST,
  formatTimezoneOption,
  getActiveTimezoneSummary,
  getConvertedSlots,
} from "@/lib/timezones";
import type { Course } from "@/types";

const trialSteps = [
  { icon: UserRoundCheck, title: "Senior 1:1 guidance", text: "Meet a Senior Coding Instructor, Software Engineer, and Educator." },
  { icon: Sparkles, title: "45-minute live diagnostic", text: "A personalized 45-minute 1:1 session calibrated to your learner." },
  { icon: BrainCircuit, title: "Skills that matter", text: "Focus on problem solving, self-learning, and digital safety." },
];

export function TrialPage({ initialCourse = "" }: { initialCourse?: string }) {

  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-3");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState({ date: "", time: "Slot 3", tz: "" });

  const [defaultTz, setDefaultTz] = useState("Asia/Dhaka");
  const [timezone, setTimezone] = useState("Asia/Dhaka");

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dhaka";
    setDefaultTz(detected);
    setTimezone(detected);
  }, []);

  const convertedSlots = getConvertedSlots(timezone);
  const selectedSlot = convertedSlots.find((s) => s.id === selectedSlotId) || convertedSlots[0];

  const earliestDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    void api.getCourses().then((data) => data.length && setCourses(data));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") || "");
    const prefDate = String(data.get("preferredDate") || "");
    const slotString = `${selectedSlot.period}: ${selectedSlot.localRange} (${selectedSlot.bdLabel})`;

    try {
      await api.bookTrial({
        parentName: String(data.get("parentName") || ""),
        studentName: String(data.get("studentName") || ""),
        studentAge: Number(data.get("studentAge")),
        email,
        phone: String(data.get("phone") || ""),
        courseSlug: String(data.get("courseSlug") || ""),
        preferredDate: prefDate,
        preferredTime: slotString,
        timezone,
        message: String(data.get("message") || "") || undefined,
      });
      setSubmittedEmail(email);
      setSubmittedDetails({
        date: prefDate,
        time: `${selectedSlot.period} (${selectedSlot.localRange})`,
        tz: timezone,
      });
      form.reset();
      setState("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not book the trial.");
      setState("error");
    }
  }

  return (
    <>
      <Seo title="Book a free 1:1 assessment | Skillify Genius" description="Book a free live 1:1 assessment focused on customized mentorship, problem solving, self-learning, and digital safety." />
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-emerald-950/10 bg-white shadow-2xl shadow-emerald-950/10 lg:grid-cols-[.82fr_1.18fr]">
          <div className="relative overflow-hidden bg-[#0d2922] p-8 text-white sm:p-12 lg:p-14">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                <Sparkles className="h-4 w-4" /> Free · 45-Min Live 1:1 Assessment
              </span>
              <h1 className="mt-7 font-display text-4xl font-black leading-tight text-white sm:text-5xl">
                Book a free live 45-min 1:1 assessment.
              </h1>
              <p className="mt-5 leading-7 text-emerald-100/70">
                Learn from someone who continues to build and learn in production through personalized mentorship shaped around one learner.
              </p>

              <div className="mt-10 grid gap-6">
                {trialSteps.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-300 text-emerald-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display font-black text-white">{title}</h2>
                      <p className="mt-1 text-sm leading-6 text-emerald-100/60">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-emerald-100/70">
                  No obligation. Your selected window is a request and will be personally confirmed via email calendar invitation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            {state === "sent" ? (
              <div className="grid min-h-[650px] place-items-center text-center">
                <div className="max-w-lg">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-md">
                    <CheckCircle2 className="h-10 w-10" />
                  </span>
                  <h2 className="mt-7 font-display text-3xl font-black text-foreground">Your 45-minute assessment request is in.</h2>
                  <p className="mt-4 leading-7 text-[#597068]">
                    Thank you. We have recorded your preferred <span className="font-bold text-foreground">{submittedDetails.time}</span> slot for <span className="font-bold text-foreground">{submittedDetails.date || "your requested date"}</span> in <span className="font-bold text-foreground">{getActiveTimezoneSummary(submittedDetails.tz)}</span>.
                  </p>

                  <div className="mt-6 rounded-2xl border border-emerald-950/10 bg-emerald-50/60 p-5 text-left text-xs leading-5 text-emerald-950">
                    <p className="font-bold text-sm text-emerald-900 mb-1">What happens next?</p>
                    <p>1. The educator will review your learner’s profile and goals.</p>
                    <p className="mt-1">2. You will receive a direct confirmation email at <strong className="font-bold">{submittedEmail}</strong> with a secure Google Meet / Zoom invite synced to your local timezone.</p>
                    <p className="mt-1">3. You are welcome to observe the entire live session.</p>
                  </div>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button onClick={() => setState("idle")} variant="outline">Request another slot</Button>
                    <Button asChild><Link href="/courses">Explore courses <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="border-b border-emerald-950/10 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-primary">
                      <CalendarCheck2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Free 45-minute 1:1 assessment</p>
                      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">Choose your preferred time</h2>
                    </div>
                  </div>

                  {/* SMART GMT TIMEZONE SELECTOR BAR */}
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-950/10 bg-gradient-to-r from-emerald-50/70 via-white to-slate-50/60 p-3 sm:p-4 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                        <Globe className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="block text-[11px] font-black uppercase tracking-wider text-emerald-800">
                          Timezone Calibration
                        </span>
                        <span className="block text-xs font-semibold text-slate-600">
                          Active: <strong className="font-extrabold text-slate-900">{getActiveTimezoneSummary(timezone)}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full sm:max-w-xs rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-bold text-slate-800 shadow-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 cursor-pointer"
                        title="Select your local timezone or GMT offset"
                        aria-label="Select timezone"
                      >
                        {/* Auto-detected option */}
                        <optgroup label="⭐ Auto-Detected Local Timezone">
                          <option value={defaultTz}>
                            ⭐ [Detected] {getActiveTimezoneSummary(defaultTz)}
                          </option>
                        </optgroup>

                        {/* Americas */}
                        <optgroup label="🌎 Americas (US, Canada, LATAM)">
                          {TIMEZONE_LIST.filter((t) => t.region === "Americas").map((t) => (
                            <option key={t.iana} value={t.iana}>
                              {formatTimezoneOption(t)}
                            </option>
                          ))}
                        </optgroup>

                        {/* Europe & UK */}
                        <optgroup label="🌍 Europe & United Kingdom">
                          {TIMEZONE_LIST.filter((t) => t.region === "Europe & UK").map((t) => (
                            <option key={t.iana} value={t.iana}>
                              {formatTimezoneOption(t)}
                            </option>
                          ))}
                        </optgroup>

                        {/* Middle East & South Asia */}
                        <optgroup label="🕌 Middle East & South Asia">
                          {TIMEZONE_LIST.filter((t) => t.region === "Middle East & South Asia").map((t) => (
                            <option key={t.iana} value={t.iana}>
                              {formatTimezoneOption(t)}
                            </option>
                          ))}
                        </optgroup>

                        {/* Asia-Pacific & Oceania */}
                        <optgroup label="🌏 Asia-Pacific, Australia & NZ">
                          {TIMEZONE_LIST.filter((t) => t.region === "Asia-Pacific & Oceania").map((t) => (
                            <option key={t.iana} value={t.iana}>
                              {formatTimezoneOption(t)}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold">
                    Parent or guardian
                    <Input required name="parentName" autoComplete="name" placeholder="Your full name" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Student name
                    <Input required name="studentName" autoComplete="name" placeholder="Student’s full name" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Student age
                    <Input required name="studentAge" type="number" min="6" max="18" inputMode="numeric" placeholder="12" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Phone number
                    <Input required name="phone" autoComplete="tel" placeholder="Best number to reach you" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                    Email address
                    <Input required name="email" type="email" autoComplete="email" placeholder="parent@example.com" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                    Area of interest
                    <select
                      name="courseSlug"
                      required
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="h-11 rounded-xl border bg-white px-4 text-sm outline-none focus:ring-4 focus:ring-emerald-100"
                    >
                      <option value="" disabled>Select a course or choose “Not sure yet”</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.slug}>{course.title}</option>
                      ))}
                      <option value="not-sure">Not sure yet - please recommend</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                    Preferred date
                    <Input required name="preferredDate" type="date" min={earliestDate} />
                  </label>

                  {/* 4 DYNAMIC TIME SLOTS CONVERTED FROM BD TIME (6am-8am, 7pm-11pm) */}
                  <div className="grid gap-2 text-sm font-bold sm:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span>Preferred 45-minute time slot</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                        <Clock3 className="h-3.5 w-3.5 text-emerald-600" />
                        Converted to {getActiveTimezoneSummary(timezone)}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {convertedSlots.map((slot) => {
                        const isSelected = selectedSlotId === slot.id;
                        const SlotIcon = slot.period === "Morning" ? Sun : slot.period === "Afternoon" ? SunMedium : Moon;

                        return (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                              isSelected
                                ? "border-primary bg-emerald-50/80 shadow-sm ring-2 ring-primary/20"
                                : "border-emerald-950/10 bg-white hover:border-emerald-950/20 hover:bg-[#f8faf8]"
                            }`}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                isSelected ? "bg-emerald-200/80 text-emerald-900" : "bg-slate-100 text-slate-600"
                              }`}>
                                <SlotIcon className="h-3 w-3" />
                                {slot.period}
                              </span>
                              {isSelected && <Check className="h-4 w-4 text-primary stroke-[3]" />}
                            </div>

                            <span className={`mt-2.5 font-display text-base font-extrabold tracking-tight ${isSelected ? "text-emerald-950" : "text-foreground"}`}>
                              {slot.localRange}
                            </span>

                            <span className="mt-1 text-[11px] text-muted-foreground font-medium">
                              {slot.bdLabel}
                            </span>

                            <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                              45-min window
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {/* Hidden input to pass selected slot details */}
                    <input
                      type="hidden"
                      name="preferredTime"
                      value={`${selectedSlot.period}: ${selectedSlot.localRange} (${selectedSlot.bdLabel})`}
                    />
                  </div>

                  <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                    Learning goals or questions <span className="font-normal text-muted-foreground">(optional)</span>
                    <Textarea name="message" className="min-h-24" placeholder="Tell us about interests, current experience, or anything that would help the teacher prepare." />
                  </label>
                </div>

                {state === "error" && (
                  <div role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    <p>{error}</p>
                    <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">Need help? Message us on WhatsApp</a>
                  </div>
                )}

                <Button type="submit" size="lg" className="mt-6 w-full h-12 text-base font-bold" disabled={state === "sending"}>
                  {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock3 className="h-4 w-4" />}
                  Request free 45-minute assessment
                </Button>
                <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                  By submitting, you agree that we may contact you regarding this trial request. See our{" "}
                  <Link href="/privacy" className="font-bold text-primary underline">privacy notice</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
