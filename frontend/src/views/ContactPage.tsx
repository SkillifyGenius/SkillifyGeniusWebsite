"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Loader2, Mail, MessageCircle, Phone, Send, ShieldCheck, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { contact } from "@/lib/contact";

export function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await api.submitLead({
        fullName: String(data.get("fullName")),
        email: String(data.get("email")),
        phone: String(data.get("phone") || "") || undefined,
        subject: String(data.get("subject")),
        message: String(data.get("message")),
      });
      event.currentTarget.reset();
      setState("sent");
    } catch (cause) {
      setState("error");
      setError(cause instanceof Error ? cause.message : "Your message could not be sent.");
    }
  }

  return (
    <>
      <Seo
        title="Contact | Skillify Genius"
        description="Ask about mentorship programs, assessments, or a personalized 1:1 learning journey."
      />
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Direct Educator Inquiries
            </span>
            <h1 className="mt-5 font-display text-4xl font-black text-[#102a25] sm:text-5xl lg:text-6xl">
              Let’s find the right next step.
            </h1>
            <p className="mt-6 text-base leading-8 text-[#597068] sm:text-lg">
              Questions about age, experience, session structure, or program fit are welcome. Tell us a little about your goals and we will reply personally.
            </p>

            <div className="mt-9 grid gap-4">
              <a
                href={contact.emailHref}
                className="group flex items-center gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:border-emerald-700/30 hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#597068]">Direct Email</p>
                  <p className="font-display font-bold text-foreground">{contact.email}</p>
                </div>
              </a>

              <a href={contact.phoneHref} className="group flex items-center gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:border-emerald-700/30 hover:shadow-md">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Phone className="h-5 w-5" /></span>
                <div><p className="text-xs font-bold uppercase tracking-wider text-[#597068]">Call us</p><p className="font-display font-bold text-foreground">{contact.phoneDisplay}</p></div>
              </a>

              <div className="grid gap-3 sm:grid-cols-2">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4 font-bold text-foreground shadow-sm transition hover:border-emerald-700/30 hover:shadow-md"><MessageCircle className="h-5 w-5 text-emerald-700" /> Chat on WhatsApp</a>
                <a href={contact.telegramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4 font-bold text-foreground shadow-sm transition hover:border-emerald-700/30 hover:shadow-md"><Send className="h-5 w-5 text-sky-700" /> Chat on Telegram</a>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#597068]">Response Time</p>
                  <p className="font-display font-bold text-foreground">Personal reply within 24 hours</p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-emerald-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" /> Ready to meet the instructor?
                </div>
                <p className="mt-1 text-xs leading-5 text-emerald-950/80">
                  You can also book a free, no-obligation live 1:1 assessment directly.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link href="/trial">Book free 45-min trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="rounded-[2.5rem] border border-emerald-950/10 bg-white p-7 shadow-2xl shadow-emerald-950/5 sm:p-10"
          >
            {state === "sent" ? (
              <div className="grid min-h-[440px] place-items-center text-center">
                <div className="max-w-md">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-black text-[#102a25]">Message Received</h2>
                  <p className="mt-3 leading-7 text-[#597068]">
                    Thank you. We have received your inquiry and the senior instructor will personally reply within 24 hours.
                  </p>
                  <Button type="button" variant="outline" className="mt-6" onClick={() => setState("idle")}>
                    Send another inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-emerald-950/10 pb-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-primary">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Get in Touch</p>
                    <h2 className="font-display text-2xl font-black text-foreground">Send a direct message</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold">
                    Your name
                    <Input required name="fullName" autoComplete="name" placeholder="Your full name" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Email address
                    <Input required name="email" type="email" autoComplete="email" placeholder="parent@example.com" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Phone number <span className="font-normal text-muted-foreground">(optional)</span>
                    <Input name="phone" autoComplete="tel" placeholder="Best number to reach you" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Subject
                    <Input required name="subject" placeholder="Mentorship question or learner inquiry" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                    Message
                    <Textarea
                      required
                      name="message"
                      className="min-h-32"
                      placeholder="Tell us about your learner’s age, interests, goals, or any questions."
                    />
                  </label>
                </div>

                {state === "error" && (
                  <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </p>
                )}

                <Button className="mt-6 w-full h-12 text-base font-bold" size="lg" disabled={state === "sending"}>
                  {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send message
                </Button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
