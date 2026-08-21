"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { StudentGrowthProfile, ProjectEvidence, ProjectStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  Users, 
  Save, 
  CheckCircle2, 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  Github
} from "lucide-react";

export default function MentorDashboardPage() {
  const [students, setStudents] = useState<StudentGrowthProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentGrowthProfile | null>(null);
  const [projects, setProjects] = useState<ProjectEvidence[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "active" | "at-risk">("all");
  const [metrics, setMetrics] = useState({
    problemSolving: 82,
    selfLearning: 88,
    programming: 74,
    systemThinking: 68,
    creativity: 85,
    engineeringMindset: 76,
  });
  const [mentorNotes, setMentorNotes] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Project Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectEvidence | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [reviewStatus, setReviewStatus] = useState<ProjectStatus>("approved");

  const loadData = async () => {
    setLoading(true);
    try {
      const [allStudents, allProjects] = await Promise.all([
        api.getStudentProfiles(),
        api.getProjects(),
      ]);
      setStudents(allStudents);
      const active = allStudents[0] || null;
      setSelectedStudent(active);
      if (active) {
        setMetrics(active.metrics);
        setMentorNotes(active.recentMentorNotes);
      }
      setProjects(allProjects);
    } catch (err) {
      console.error("Failed to load mentor studio", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectStudent = (s: StudentGrowthProfile) => {
    setSelectedStudent(s);
    setMetrics(s.metrics);
    setMentorNotes(s.recentMentorNotes);
  };

  const handleSaveMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    await api.updateStudentMetrics(metrics, mentorNotes, selectedStudent.studentId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleOpenReview = (p: ProjectEvidence) => {
    setSelectedProject(p);
    setReviewFeedback(p.mentorFeedback || "");
    setReviewStatus(p.status);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    await api.updateProjectStatus(
      selectedProject.id,
      reviewStatus,
      reviewFeedback,
      "Alex (Senior Technology Mentor)"
    );
    setReviewModalOpen(false);
    loadData();
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterMode === "at-risk") return matchesSearch && s.isAtRisk;
    if (filterMode === "active") return matchesSearch && !s.isAtRisk;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 rounded-[20px]" />
          <Skeleton className="lg:col-span-2 h-96 rounded-[20px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="violet" className="text-xs">Mentor Studio</Badge>
            <span className="text-xs text-[#64748B] font-mono">Evaluator: Alex (Senior Mentor)</span>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] mt-1">
            Student Telemetry & Project Verification Suite
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="emerald" className="py-1.5 px-3.5 bg-emerald-50 text-[#10B981] border-emerald-200">
            Active Cohort: {students.length} Learners Managed
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Roster with Search & Filters */}
        <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Users className="h-4 w-4 text-[#2563EB]" />
              Assigned Student Roster
            </h3>

            {/* Search Input */}
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-3 top-3.5 text-[#94A3B8]" />
              <Input
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs h-10"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 pt-1">
              {(["all", "active", "at-risk"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all capitalize ${
                    filterMode === mode
                      ? "bg-slate-900 text-white"
                      : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredStudents.map((s) => {
              const isSelected = selectedStudent?.studentId === s.studentId;
              return (
                <button
                  key={s.studentId}
                  onClick={() => handleSelectStudent(s)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-[#2563EB] bg-blue-50/70 shadow-subtle ring-1 ring-[#2563EB]"
                      : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-[#0F172A] text-sm block">{s.studentName}</strong>
                    {s.isAtRisk ? (
                      <Badge variant="amber" className="text-[9px] gap-1">
                        <AlertTriangle className="h-3 w-3" /> At Risk
                      </Badge>
                    ) : (
                      <Badge variant="emerald" className="text-[9px]">Level {s.currentPhase}</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Age {s.age} • {s.grade}</p>
                  {s.atRiskReason && (
                    <p className="text-[10px] text-amber-700 font-medium mt-1 italic">
                      ⚠️ {s.atRiskReason}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right 2 Cols: Evaluator & Project Review */}
        <div className="lg:col-span-2 space-y-8">
          {selectedStudent && (
            <Card className="border-[#E2E8F0] bg-white p-8 card-shadow space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    Skill Graph™ Telemetry Calibration
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Calibrate multi-dimensional capability metrics for <strong className="text-[#0F172A]">{selectedStudent.studentName}</strong>.
                  </p>
                </div>
                {savedSuccess && (
                  <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Telemetry Synced to Parents!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveMetrics} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>Problem Solving</span>
                      <span className="font-mono text-[#2563EB]">{metrics.problemSolving}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.problemSolving}
                      onChange={(e) => setMetrics({ ...metrics, problemSolving: parseInt(e.target.value) })}
                      className="w-full accent-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>Self-Learning Ability</span>
                      <span className="font-mono text-[#10B981]">{metrics.selfLearning}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.selfLearning}
                      onChange={(e) => setMetrics({ ...metrics, selfLearning: parseInt(e.target.value) })}
                      className="w-full accent-[#10B981]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>Programming Foundations</span>
                      <span className="font-mono text-[#2563EB]">{metrics.programming}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.programming}
                      onChange={(e) => setMetrics({ ...metrics, programming: parseInt(e.target.value) })}
                      className="w-full accent-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>System & Cloud Thinking</span>
                      <span className="font-mono text-purple-700">{metrics.systemThinking}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.systemThinking}
                      onChange={(e) => setMetrics({ ...metrics, systemThinking: parseInt(e.target.value) })}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>Creativity & Ideation</span>
                      <span className="font-mono text-amber-700">{metrics.creativity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.creativity}
                      onChange={(e) => setMetrics({ ...metrics, creativity: parseInt(e.target.value) })}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-[#0F172A]">
                      <span>Engineering Mindset</span>
                      <span className="font-mono text-[#10B981]">{metrics.engineeringMindset}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={metrics.engineeringMindset}
                      onChange={(e) => setMetrics({ ...metrics, engineeringMindset: parseInt(e.target.value) })}
                      className="w-full accent-[#10B981]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                  <label className="font-bold text-[#0F172A]">
                    Weekly Plain-English Academic Report (Pushed Directly to Parent Trust Portal) *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] shadow-subtle leading-relaxed"
                    value={mentorNotes}
                    onChange={(e) => setMentorNotes(e.target.value)}
                  />
                </div>

                <Button type="submit" variant="emerald" size="md" className="gap-2 shadow-md shadow-emerald-500/20">
                  <Save className="h-4 w-4" />
                  <span>Save Telemetry & Push to Parent Portal</span>
                </Button>
              </form>
            </Card>
          )}

          {/* Project Verification Queue */}
          <Card className="border-[#E2E8F0] bg-white p-8 card-shadow space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
                  Project Evidence Verification Queue
                </h3>
                <p className="text-xs text-[#64748B]">
                  Review student pull requests, test live demos, and verify capstones for public showcase.
                </p>
              </div>
              <Badge variant="blue">{projects.length} Total</Badge>
            </div>

            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0F172A]">{p.title}</span>
                      <Badge
                        variant={
                          p.status === "verified_capstone"
                            ? "emerald"
                            : p.status === "approved"
                            ? "blue"
                            : p.status === "under_review"
                            ? "violet"
                            : "amber"
                        }
                        className="text-[9px] capitalize"
                      >
                        {p.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      Submitted by <strong>{p.studentName}</strong> (Phase {p.phase})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-[#E2E8F0] text-[#2563EB] hover:bg-blue-50">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50">
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleOpenReview(p)} className="text-xs">
                      Review & Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* PROJECT REVIEW MODAL */}
      {reviewModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A]">Verify Student Project</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">✕</button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <span className="text-[#64748B]">Project:</span>
                <p className="text-sm font-bold text-[#0F172A]">{selectedProject.title}</p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0F172A]">Verification Status *</label>
                <select
                  className="w-full h-11 rounded-xl border border-[#E2E8F0] bg-white px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as ProjectStatus)}
                >
                  <option value="submitted">Submitted (Pending Review)</option>
                  <option value="under_review">Under Active Review</option>
                  <option value="approved">Approved</option>
                  <option value="verified_capstone">Verified Capstone (Featured)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0F172A]">Mentor Evaluation Note *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  placeholder="Provide qualitative feedback on logic architecture, security hygiene, and clean code principles..."
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#E2E8F0]">
                <Button type="button" variant="ghost" size="sm" onClick={() => setReviewModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Verification & Update Showcase
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
