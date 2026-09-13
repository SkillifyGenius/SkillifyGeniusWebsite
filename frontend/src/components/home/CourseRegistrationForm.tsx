import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { fallbackCourses } from "@/data/content";
import type { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CourseRegistrationForm({ courses = fallbackCourses }: { courses?: Course[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const data = new FormData(event.currentTarget);
    const student = String(data.get("studentName") || "");

    try {
      await api.submitRegistration({
        studentName: student,
        parentName: String(data.get("parentName") || ""),
        phone: String(data.get("phone") || ""),
        email: String(data.get("email") || "") || undefined,
        courseSlug: String(data.get("courseSlug") || ""),
        message: String(data.get("message") || "") || undefined,
      });
      setSubmittedName(student);
      setStatus("success");
      event.currentTarget.reset();
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "We could not send your registration.");
    }
  }

  if (status === "success") {
    return (
      <div className="grid min-h-[460px] place-items-center rounded-[2.5rem] border border-emerald-950/10 bg-white p-8 text-center shadow-2xl shadow-emerald-950/5">
        <div className="max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-primary shadow-sm">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-black text-[#102a25]">Registration Received</h3>
          <p className="mt-3 leading-7 text-[#597068]">
            Thank you for registering interest for <strong className="font-bold text-foreground">{submittedName}</strong>. The senior educator will personally reach out to review your goals, answer questions, and recommend the best starting pathway.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-950 text-left">
            <p className="font-bold text-emerald-900 mb-1">What happens next?</p>
            <p>1. We review your learner’s profile and experience.</p>
            <p className="mt-1">2. We schedule a free 45-minute 1:1 assessment before any commitment.</p>
          </div>
          <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
            Register another student
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2.5rem] border border-emerald-950/10 bg-white p-7 shadow-2xl shadow-emerald-950/5 sm:p-10">
      <div className="flex items-center justify-between border-b border-emerald-950/10 pb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700">1:1 Course Registration</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#597068]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> No commitment required
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Student name
          <Input name="studentName" required autoComplete="name" placeholder="Student’s full name" />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Parent or guardian
          <Input name="parentName" required autoComplete="name" placeholder="Parent full name" />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Phone number
          <Input name="phone" required autoComplete="tel" placeholder="Best number to reach you" />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Email address <span className="font-normal text-muted-foreground">(optional)</span>
          <Input name="email" type="email" autoComplete="email" placeholder="parent@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-bold sm:col-span-2">
          Preferred course pathway
          <select
            name="courseSlug"
            required
            defaultValue=""
            className="h-11 rounded-xl border border-input bg-white px-4 text-sm font-medium outline-none transition focus:ring-4 focus:ring-emerald-100"
          >
            <option value="" disabled>
              Select a course pathway
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.slug}>
                {course.title} ({course.ageGroup})
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold sm:col-span-2">
          Anything we should know? <span className="font-normal text-muted-foreground">(optional)</span>
          <Textarea
            name="message"
            className="min-h-24"
            placeholder="Learner’s age, current interests, experience, or any questions for the educator."
          />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full h-12 text-base font-bold" disabled={status === "sending"}>
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit registration interest
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Zero payment required now. We first confirm the pathway is an ideal fit for your learner.
      </p>
    </form>
  );
}
