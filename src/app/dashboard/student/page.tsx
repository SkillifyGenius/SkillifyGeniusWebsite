"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StudentGrowthProfile, CurriculumModule, ProjectEvidence, RCALog } from "@/types";
import { SkillGraphVisualizer } from "@/components/shared/SkillGraphVisualizer";
import { ProjectEvidenceCard } from "@/components/shared/ProjectEvidenceCard";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  Terminal, 
  Plus, 
  Brain, 
  Bug, 
  ArrowRight,
  RefreshCw
} from "lucide-react";

export default function StudentDashboardPage() {
  const [profile, setProfile] = useState<StudentGrowthProfile | null>(null);
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [projects, setProjects] = useState<ProjectEvidence[]>([]);
  const [rcaLogs, setRcaLogs] = useState<RCALog[]>([]);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, m, pr, r] = await Promise.all([
        api.getStudentProfile(),
        api.getModules(),
        api.getProjects(),
        api.getRCALogs(),
      ]);
      setProfile(p);
      setModules(m);
      setProjects(pr);
      setRcaLogs(r);
    } catch (err) {
      console.error("Failed to load student studio", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRecalculateTelemetry = async () => {
    setRecalculating(true);
    try {
      const updatedMetrics = await api.calculateTelemetry(profile?.studentId || "student-101");
      if (profile) {
        setProfile({ ...profile, metrics: updatedMetrics });
      }
    } catch (err) {
      console.error("Failed to recalculate telemetry", err);
    } finally {
      setRecalculating(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-[20px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-48 rounded-[20px]" />
          <Skeleton className="h-48 rounded-[20px]" />
          <Skeleton className="h-48 rounded-[20px]" />
          <Skeleton className="h-48 rounded-[20px]" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="blue" className="text-xs">Student Studio</Badge>
            <span className="text-xs text-[#64748B] font-mono">{profile.level}</span>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] mt-1">
            Welcome back, <span className="text-[#2563EB]">{profile.studentName.split(" ")[0]}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Current Mission: <strong className="text-[#0F172A]">Build your cloud application</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRecalculateTelemetry}
            disabled={recalculating}
            className="gap-1.5 text-xs text-[#2563EB]"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${recalculating ? "animate-spin" : ""}`} />
            <span>Sync Telemetry</span>
          </Button>

          <Link href="/learn/foundation/module-1">
            <Button variant="primary" size="md" className="gap-2 shadow-md shadow-blue-500/20">
              <Terminal className="h-4 w-4" />
              <span>Enter Socratic Studio</span>
            </Button>
          </Link>
          <Link href="/dashboard/student/projects/new">
            <Button variant="outline" size="md" className="gap-2">
              <Plus className="h-4 w-4 text-[#2563EB]" />
              <span>Submit Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Milestone Celebrations & Motivation Strip */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/70 via-white to-blue-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-shadow">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shadow-sm">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#10B981] font-bold">Latest Milestone Achieved</span>
              <Badge variant="emerald" className="text-[9px]">Level 2 Unlocked</Badge>
            </div>
            <p className="text-xs font-bold text-[#0F172A]">
              Resolved 20 Socratic Debugging Challenges & Published 5 Verified Projects
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
          <span>Next Target:</span>
          <Link href="/learn/foundation/module-1">
            <span className="text-[#2563EB] font-bold hover:underline">Complete Module 3 Challenge →</span>
          </Link>
        </div>
      </div>

      {/* 1. ENGINEERING GROWTH PROFILE VISUALIZER */}
      <SkillGraphVisualizer
        metrics={profile.metrics}
        studentName={profile.studentName}
        level={profile.level}
        verifiedProjectsCount={profile.verifiedProjectsCount}
        challengesSolved={profile.challengesSolved}
      />

      {/* 2. THE 4 FOUNDATION MODULES & CHALLENGE HUBS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Foundation Framework™ Modules
            </h2>
            <p className="text-xs text-[#64748B]">
              Master the foundational thinking loops before advancing to full-stack systems.
            </p>
          </div>
          <Badge variant="blue">4 Modules Active</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, idx) => (
            <Card key={mod.id} className="border-[#E2E8F0] bg-white p-5 flex flex-col justify-between card-shadow card-shadow-hover">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">
                    Module {mod.moduleOrder}
                  </span>
                  <span className="text-[11px] text-[#10B981] font-mono font-bold">
                    {idx < 2 ? "✓ Complete" : idx === 2 ? "⏳ In Progress" : "🔒 Next"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A]">{mod.title}</h3>
                <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">{mod.description}</p>

                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-[11px] text-[#0F172A]">
                  <strong className="text-[#2563EB]">Project:</strong> {mod.project}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] mt-4">
                <Link href={`/learn/foundation/${mod.id}`}>
                  <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                    <span>Launch Challenge</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. RECENT RCA LOGS & MENTOR NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RCA Reflections */}
        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2 text-rose-600">
              <Bug className="h-4 w-4" />
              <CardTitle className="text-lg font-bold text-[#0F172A]">
                RCA (Root Cause Analysis) Journal
              </CardTitle>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              {rcaLogs.length} Debugged
            </Badge>
          </div>

          <div className="space-y-3">
            {rcaLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                  <span className="text-[#2563EB] font-bold">{log.moduleTitle}</span>
                  <span>{new Date(log.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-[#0F172A] font-semibold"><strong>Bug:</strong> {log.bugSummary}</p>
                <p className="text-[#475569]"><strong>Root Cause:</strong> {log.rootCause}</p>
                <p className="text-[#10B981] font-medium"><strong>Prevention:</strong> {log.preventionLearned}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Mentor Notes & Strength Analysis */}
        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="flex items-center gap-2 text-[#2563EB] border-b border-[#E2E8F0] pb-3">
            <Brain className="h-4 w-4" />
            <CardTitle className="text-lg font-bold text-[#0F172A]">
              Mentor Evaluation & Focus Areas
            </CardTitle>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 space-y-1.5">
            <h4 className="text-xs font-mono uppercase text-[#2563EB] font-bold">
              Latest Mentor Feedback:
            </h4>
            <p className="text-xs text-[#334155] italic leading-relaxed">
              "{profile.recentMentorNotes}"
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <h5 className="text-xs font-mono uppercase text-[#10B981] font-bold mb-1.5">
                Demonstrated Strengths:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.strengths.map((s, i) => (
                  <Badge key={i} variant="emerald" className="text-[10px]">
                    ✓ {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-amber-700 font-bold mb-1.5">
                Current Focus Areas:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.focusAreas.map((f, i) => (
                  <Badge key={i} variant="amber" className="text-[10px]">
                    ⚡ {f}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. VERIFIED PROJECTS SHIPPED */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              My Verified Project Portfolio
            </h2>
            <p className="text-xs text-[#64748B]">
              Live working applications evaluated and verified by mentors.
            </p>
          </div>
          <Link href="/dashboard/student/projects/new">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Submit New Project</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectEvidenceCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}
