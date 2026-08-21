"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck
} from "lucide-react";

export default function NewProjectEvidencePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    studentName: "Liam Vance",
    studentAge: 13,
    phase: 2,
    description: "",
    skillsDemonstrated: "Modern Web Architecture, Appwrite Database, Async JavaScript, Tailwind CSS",
    demoUrl: "",
    repoUrl: "",
    frameworkStage: "defend" as const,
    mentorFeedback: "Project code and live functionality verified for autonomous execution.",
    mentorName: "Alex (Senior Technology Mentor)",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const skillsArray = formData.skillsDemonstrated
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const generatedSlug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      await api.submitProject({
        ...formData,
        studentId: "student-101",
        slug: generatedSlug,
        skillsDemonstrated: skillsArray,
      });

      setSubmitted(true);
      setTimeout(() => {
        router.push("/dashboard/student");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to submit project evidence");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Student Studio</span>
      </Link>

      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <Badge variant="emerald" className="gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Skill Evidence Submission</span>
        </Badge>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
          Publish Verified Software Project
        </h1>
        <p className="text-[#475569] text-xs sm:text-sm">
          Submit your live deployed application and GitHub repository to demonstrate mastery on your Skill Graph™.
        </p>
      </div>

      <Card className="border-[#E2E8F0] bg-white p-8 sm:p-10 card-shadow">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-[#10B981] mx-auto" />
            <h2 className="text-2xl font-black text-[#0F172A]">Project Evidence Published!</h2>
            <p className="text-xs text-[#475569]">
              Your software project is now verified and live in your portfolio. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-[#0F172A]">Project Title *</label>
                <Input
                  required
                  placeholder="e.g. Cloud Habit Tracker & Analytics"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#0F172A]">Curriculum Phase *</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: parseInt(e.target.value) || 1 })}
                >
                  <option value={1}>Phase 1: Foundation (Logic & Games)</option>
                  <option value={2}>Phase 2: Creator Lab (Web & Apps)</option>
                  <option value={3}>Phase 3: AI Tools & Automation</option>
                  <option value={4}>Phase 4: Cyber Safety & Defense</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#0F172A]">Project Problem Statement & Description *</label>
              <textarea
                required
                rows={4}
                className="flex w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:border-[#2563EB] transition-all shadow-subtle"
                placeholder="Describe what real-world problem this application solves, how components interact, and how state/data is managed..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#0F172A]">Live Deployed URL * (e.g. Vercel/Netlify)</label>
                <Input
                  type="url"
                  required
                  placeholder="https://my-app.vercel.app"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#0F172A]">GitHub Source Code Repository URL *</label>
                <Input
                  type="url"
                  required
                  placeholder="https://github.com/my-user/my-app"
                  value={formData.repoUrl}
                  onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#0F172A]">Skills Demonstrated (comma-separated) *</label>
              <Input
                required
                value={formData.skillsDemonstrated}
                onChange={(e) => setFormData({ ...formData, skillsDemonstrated: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full gap-2 mt-4 shadow-md shadow-blue-500/20"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{loading ? "Verifying & Publishing..." : "Submit Verified Project Evidence"}</span>
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
