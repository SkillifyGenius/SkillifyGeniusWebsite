"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function TrialBookingPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childAge: 12,
    country: "United States",
    timezone: "America/New_York (EST)",
    preferredSlot: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
    interests: ["Game Design", "Web Apps"],
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    "Game Design & Physics",
    "Web Apps & Creator Lab",
    "AI Tools & Automation",
    "Cyber Safety & Ethical Defense",
    "Python Computational Logic"
  ];

  const toggleInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.bookTrial({
        ...formData,
        preferredSlot: new Date(formData.preferredSlot).toISOString(),
      });
      setSubmitted(true);
    } catch (err: any) {
      setError("Failed to schedule trial. Please check your fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="emerald" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span>1-on-1 Free Assessment</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          Book Your 45-Minute Diagnostic Session
        </h1>
        <p className="text-[#475569] text-sm sm:text-base">
          Experience our Socratic teaching methodology firsthand. 30 minutes of interactive problem solving with your child + 15 minutes of parent diagnostic debrief.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Box */}
        <div className="lg:col-span-2">
          <Card className="border-[#E2E8F0] bg-white p-8 sm:p-10 card-shadow">
            {submitted ? (
              <div className="text-center space-y-6 py-8">
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981] mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-[#0F172A]">Assessment Scheduled!</h2>
                  <p className="text-sm text-[#475569] max-w-md mx-auto">
                    A confirmation calendar invite (.ics) has been dispatched to <strong>{formData.parentEmail}</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-left max-w-md mx-auto space-y-2.5 text-[#334155] font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Student:</span>
                    <strong className="text-[#0F172A]">{formData.childName} (Age {formData.childAge})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Timezone:</span>
                    <span className="text-[#0F172A]">{formData.timezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Format:</span>
                    <span className="text-[#10B981] font-bold">1:1 Live Online Session (45 Mins)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/dashboard/student">
                    <Button variant="primary" size="md">
                      Explore Student Learning Studio
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Parent Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Parent Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="elena@example.com"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-[#0F172A]">Phone Number (For Reminders) *</label>
                    <Input
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Country *</label>
                    <select
                      className="flex h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="International">Other (Global)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Child's Name *</label>
                    <Input
                      required
                      placeholder="e.g. Liam"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Child's Age (6-18) *</label>
                    <Input
                      type="number"
                      min={6}
                      max={18}
                      required
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: parseInt(e.target.value) || 12 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Timezone *</label>
                    <select
                      className="flex h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    >
                      <option value="America/New_York (EST)">Eastern Time (EST - NY, Toronto)</option>
                      <option value="America/Chicago (CST)">Central Time (CST - Chicago)</option>
                      <option value="America/Los_Angeles (PST)">Pacific Time (PST - LA, SF)</option>
                      <option value="Europe/London (GMT/BST)">United Kingdom (GMT / BST)</option>
                      <option value="Europe/Berlin (CET)">Central Europe (CET - Berlin, Paris)</option>
                      <option value="Asia/Dubai (GST)">Gulf Standard (GST - Dubai)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Preferred Date & Time *</label>
                    <Input
                      type="datetime-local"
                      required
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    />
                  </div>
                </div>

                {/* Child Interests Multi-Select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F172A]">
                    What excites your child? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((item) => {
                      const selected = formData.interests.includes(item);
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleInterest(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selected
                              ? "border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-[#2563EB]"
                              : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-slate-300"
                          }`}
                        >
                          {selected ? "✓ " : "+ "}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-2 mt-4 shadow-md shadow-blue-500/20"
                >
                  <span>{loading ? "Scheduling Assessment..." : "Confirm Free 1-on-1 Assessment"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Right Info Box */}
        <div className="space-y-6">
          <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#2563EB]" />
              What Happens in the Assessment?
            </h3>
            <ul className="space-y-3.5 text-xs text-[#475569]">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 rounded-full bg-blue-50 text-[#2563EB] items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">1</span>
                <span><strong className="text-[#0F172A]">30-Min Problem-Solving Challenge:</strong> Your child engages in an interactive coding puzzle with a senior mentor.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 rounded-full bg-emerald-50 text-[#10B981] items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">2</span>
                <span><strong className="text-[#0F172A]">15-Min Parent Diagnostic Consultation:</strong> We review cognitive strengths, learning velocity, and recommend starting phase.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 rounded-full bg-purple-50 text-purple-700 items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">3</span>
                <span><strong className="text-[#0F172A]">Custom Learning Roadmap:</strong> Receive a tailored curriculum plan with zero pressure.</span>
              </li>
            </ul>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/40 p-6 space-y-2 card-shadow">
            <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Skillify Genius Parent Guarantee</span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              100% Free & Educational. No credit card required. Sessions conducted via secure HD video link with certified technology educators.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
