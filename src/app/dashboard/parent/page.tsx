"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StudentGrowthProfile, ProjectEvidence, RCALog, ParentGrowthTimelineItem } from "@/types";
import { SkillGraphVisualizer } from "@/components/shared/SkillGraphVisualizer";
import { ProjectEvidenceCard } from "@/components/shared/ProjectEvidenceCard";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  ShieldCheck, 
  Calendar, 
  Brain, 
  CheckCircle2, 
  MessageSquare, 
  Video,
  Award,
  Milestone
} from "lucide-react";

export default function ParentDashboardPage() {
  const [profile, setProfile] = useState<StudentGrowthProfile | null>(null);
  const [projects, setProjects] = useState<ProjectEvidence[]>([]);
  const [rcaLogs, setRcaLogs] = useState<RCALog[]>([]);
  const [timeline, setTimeline] = useState<ParentGrowthTimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [p, pr, r, t] = await Promise.all([
          api.getStudentProfile(),
          api.getProjects(),
          api.getRCALogs(),
          api.getParentTimeline(),
        ]);
        setProfile(p);
        setProjects(pr);
        setRcaLogs(r);
        setTimeline(t);
      } catch (err) {
        console.error("Failed to load parent portal", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        <Skeleton className="h-32 w-full rounded-[24px]" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Skeleton className="h-36 rounded-[20px]" />
          <Skeleton className="h-36 rounded-[20px]" />
          <Skeleton className="h-36 rounded-[20px]" />
        </div>
        <Skeleton className="h-96 rounded-[20px]" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      {/* Top Trust Header */}
      <div className="rounded-[24px] border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-emerald-50/60 p-8 sm:p-10 card-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="emerald" className="gap-1 text-xs bg-white">
                <ShieldCheck className="h-3.5 w-3.5" />
                Parent Trust Portal
              </Badge>
              <span className="text-xs text-[#64748B] font-medium">Linked Student: {profile.studentName}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Measurable Growth & Learning Evidence
            </h1>
            <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
              Your child has developed measurable problem-solving independence by constructing <strong className="text-[#10B981]">{profile.verifiedProjectsCount} deployable software projects</strong> and resolving {rcaLogs.length} complex debugging bottlenecks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button variant="outline" size="md" className="w-full sm:w-auto gap-2">
                <MessageSquare className="h-4 w-4 text-[#2563EB]" />
                <span>Message Mentor</span>
              </Button>
            </Link>
            <Link href="/learn/foundation/module-1">
              <Button variant="primary" size="md" className="w-full sm:w-auto gap-2 shadow-md shadow-blue-500/20">
                <Video className="h-4 w-4" />
                <span>Join Live Session</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. HIGH-TRUST BLUE + GREEN HIGHLIGHT METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-blue-100 bg-blue-50/40 p-6 flex flex-col justify-between card-shadow">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#2563EB] font-bold">Your Child Improved</span>
            <div className="text-3xl font-black text-[#2563EB]">+18%</div>
            <p className="text-xs font-bold text-[#0F172A]">Problem Solving Ability</p>
          </div>
          <p className="text-[11px] text-[#64748B] mt-3 pt-2 border-t border-blue-100 font-medium">
            Evaluated via autonomous logic challenges
          </p>
        </Card>

        <Card className="border-emerald-100 bg-emerald-50/40 p-6 flex flex-col justify-between card-shadow">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#10B981] font-bold">Verified Portfolio</span>
            <div className="text-3xl font-black text-[#10B981]">{profile.verifiedProjectsCount} Projects</div>
            <p className="text-xs font-bold text-[#0F172A]">Completed & Deployed</p>
          </div>
          <p className="text-[11px] text-[#64748B] mt-3 pt-2 border-t border-emerald-100 font-medium">
            Live working web apps with custom domains
          </p>
        </Card>

        <Card className="border-purple-100 bg-purple-50/40 p-6 flex flex-col justify-between card-shadow">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-purple-700 font-bold">Self-Direction Index</span>
            <div className="text-3xl font-black text-purple-700">Excellent</div>
            <p className="text-xs font-bold text-[#0F172A]">Learning Confidence</p>
          </div>
          <p className="text-[11px] text-[#64748B] mt-3 pt-2 border-t border-purple-100 font-medium">
            Independent research & RCA debugging habits
          </p>
        </Card>
      </div>

      {/* 2. MONTHLY GROWTH TIMELINE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <Milestone className="h-5 w-5 text-[#2563EB]" />
              Monthly Growth & Milestone Timeline
            </h2>
            <p className="text-xs text-[#64748B]">
              Documented chronological progression of software created and challenges resolved.
            </p>
          </div>
          <Badge variant="blue">3 Months Active</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeline.map((item) => (
            <Card key={item.id} className="border-[#E2E8F0] bg-white p-6 space-y-3 flex flex-col justify-between card-shadow card-shadow-hover">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">
                    {item.month} {item.year}
                  </span>
                  <Badge variant="emerald" className="text-[10px]">
                    {item.badgeText}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#10B981] font-bold flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                <span>Impact: {item.skillImpact}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. SKILL GRAPH TELEMETRY */}
      <SkillGraphVisualizer
        metrics={profile.metrics}
        studentName={profile.studentName}
        level={profile.level}
        verifiedProjectsCount={profile.verifiedProjectsCount}
        challengesSolved={profile.challengesSolved}
      />

      {/* 4. PLAIN-ENGLISH WEEKLY MENTOR RECAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 card-shadow">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <Brain className="h-5 w-5" />
              <CardTitle className="text-xl font-bold text-[#0F172A]">
                Weekly Plain-English Academic Report
              </CardTitle>
            </div>
            <Badge variant="blue">Verified by Alex (Senior Mentor)</Badge>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] font-bold">
              Cognitive Breakthrough Observed:
            </h4>
            <p className="text-sm text-[#334155] leading-relaxed italic">
              "{profile.recentMentorNotes}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <h5 className="text-xs font-mono uppercase text-[#10B981] font-bold">
                Demonstrated Growth:
              </h5>
              <ul className="space-y-1.5 text-xs text-[#334155]">
                {profile.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                    <span className="font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <h5 className="text-xs font-mono uppercase text-amber-700 font-bold">
                Next Milestone Targets:
              </h5>
              <ul className="space-y-1.5 text-xs text-[#334155]">
                {profile.focusAreas.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span className="font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Schedule & Logistics */}
        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 flex flex-col justify-between card-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
              <Calendar className="h-4 w-4 text-[#2563EB]" />
              <span>Upcoming Live Cohort</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 space-y-1 text-xs">
              <span className="text-[#2563EB] font-bold">Phase 2: Creator Lab</span>
              <p className="text-[#0F172A] font-bold">Tuesday & Thursday @ 5:30 PM EST</p>
              <p className="text-[#64748B]">Mentor: Alex (Software Practitioner)</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-1 text-xs">
              <span className="text-[#10B981] font-bold">Attendance & Consistency</span>
              <p className="text-[#0F172A] font-bold">98% On-Time Completion</p>
              <p className="text-[#64748B]">Class recordings accessible anytime</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0]">
            <Link href="/contact">
              <Button variant="outline" size="sm" className="w-full">
                Request Schedule Reschedule
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* 5. VERIFIED PROJECTS SHIPPED */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Verified Project Artifacts
            </h2>
            <p className="text-xs text-[#64748B]">
              Test your child's live applications deployed on the cloud.
            </p>
          </div>
          <Badge variant="emerald">{projects.length} Verified Apps</Badge>
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
