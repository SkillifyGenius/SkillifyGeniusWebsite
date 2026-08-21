"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { TrialBooking, LeadInquiry, Course, PlatformAnalytics } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  Calendar, 
  Mail, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Layers
} from "lucide-react";

export default function AdminConsolePage() {
  const [trials, setTrials] = useState<TrialBooking[]>([]);
  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [t, l, c, a] = await Promise.all([
        api.getTrials(),
        api.getLeads(),
        api.getCourses(),
        api.getAdminAnalytics(),
      ]);
      setTrials(t);
      setLeads(l);
      setCourses(c);
      setAnalytics(a);
    } catch (err) {
      console.error("Failed to load admin console", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateTrialStatus = async (id: string, status: TrialBooking["status"]) => {
    await api.updateTrialStatus(id, status);
    loadData();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-[20px]" />
          <Skeleton className="h-32 rounded-[20px]" />
          <Skeleton className="h-32 rounded-[20px]" />
          <Skeleton className="h-32 rounded-[20px]" />
        </div>
        <Skeleton className="h-64 rounded-[20px]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      {/* Top Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="amber" className="text-xs">Admin Console</Badge>
            <span className="text-xs text-[#64748B] font-mono">Operations & Global Academy CRM</span>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A] mt-1">
            Enterprise Academy Management System
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh Analytics</span>
          </Button>
          <Link href="/trial">
            <Button variant="primary" size="sm" className="text-xs">
              Test Booking Funnel
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <Card className="border-[#E2E8F0] bg-white p-5 space-y-1 card-shadow">
            <span className="text-[11px] font-mono text-[#2563EB] font-bold uppercase">Total Students</span>
            <div className="text-3xl font-black text-[#0F172A]">{analytics.totalStudents}</div>
            <p className="text-[11px] text-[#10B981] font-semibold">{analytics.activeLearners} Active Learners</p>
          </Card>

          <Card className="border-[#E2E8F0] bg-white p-5 space-y-1 card-shadow">
            <span className="text-[11px] font-mono text-[#10B981] font-bold uppercase">Trial Conversion</span>
            <div className="text-3xl font-black text-[#10B981]">{analytics.trialConversionRate}%</div>
            <p className="text-[11px] text-[#64748B] font-medium">{trials.length} Total Trials Booked</p>
          </Card>

          <Card className="border-[#E2E8F0] bg-white p-5 space-y-1 card-shadow">
            <span className="text-[11px] font-mono text-purple-700 font-bold uppercase">Completion Rate</span>
            <div className="text-3xl font-black text-purple-700">{analytics.courseCompletionRate}%</div>
            <p className="text-[11px] text-[#64748B] font-medium">{analytics.completedProjects} Capstones Built</p>
          </Card>

          <Card className="border-[#E2E8F0] bg-white p-5 space-y-1 card-shadow">
            <span className="text-[11px] font-mono text-amber-700 font-bold uppercase">Active Cohorts</span>
            <div className="text-3xl font-black text-[#0F172A]">{analytics.activeCohortsCount}</div>
            <p className="text-[11px] text-[#64748B] font-medium">US / UK / EU Timezones</p>
          </Card>

          <Card className="border-[#E2E8F0] bg-white p-5 space-y-1 card-shadow">
            <span className="text-[11px] font-mono text-sky-600 font-bold uppercase">System Security</span>
            <div className="text-3xl font-black text-[#10B981]">Active</div>
            <p className="text-[11px] text-[#64748B] font-medium">Appwrite RBAC Enforced</p>
          </Card>
        </div>
      )}

      {/* Analytics Charts & Growth Trends */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Growth Trend Bar Chart */}
          <Card className="lg:col-span-2 border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 card-shadow">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#2563EB]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Monthly Enrollment Growth Trend</h3>
              </div>
              <Badge variant="emerald">+48% Past Quarter</Badge>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4">
              {analytics.monthlyEnrollmentGrowth.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0F172A]">{item.students}</span>
                  <div
                    className="w-full bg-[#2563EB] hover:bg-[#1E40AF] rounded-t-xl transition-all duration-500"
                    style={{ height: `${(item.students / 160) * 120}px` }}
                  />
                  <span className="font-mono text-[11px] text-[#64748B] uppercase font-bold">{item.month}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Phase Distribution Funnel */}
          <Card className="border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-4 card-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base border-b border-[#E2E8F0] pb-3">
                <Layers className="h-5 w-5 text-[#6366F1]" />
                <span>Curriculum Distribution</span>
              </div>

              <div className="space-y-3.5 pt-4">
                {analytics.phaseDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                      <span>{item.phase}</span>
                      <span className="font-mono text-[#2563EB]">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#6366F1] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
              Total Challenges Solved: <strong className="text-[#0F172A]">{analytics.challengesSolvedTotal}</strong>
            </div>
          </Card>
        </div>
      )}

      {/* 1. TRIAL BOOKINGS CRM */}
      <Card className="border-[#E2E8F0] bg-white p-6 sm:p-8 card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
            <Calendar className="h-5 w-5 text-[#2563EB]" />
            <span>1-on-1 Diagnostic Assessment CRM</span>
          </div>
          <Badge variant="blue">{trials.length} Records</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E2E8F0] text-[#64748B] uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-3">Parent & Contact</th>
                <th className="py-3 px-3">Child Info</th>
                <th className="py-3 px-3">Timezone / Slot</th>
                <th className="py-3 px-3">Interests</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {trials.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-3">
                    <strong className="text-[#0F172A] block">{t.parentName}</strong>
                    <span className="text-[#64748B] text-[11px]">{t.parentEmail}</span>
                    <span className="text-[#94A3B8] block text-[10px]">{t.parentPhone}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[#0F172A] font-bold">{t.childName}</span>
                    <span className="text-[#64748B] block text-[11px]">Age {t.childAge} • {t.country}</span>
                  </td>
                  <td className="py-3.5 px-3 text-[#334155] font-mono text-[11px]">
                    <div>{new Date(t.preferredSlot).toLocaleString()}</div>
                    <span className="text-[#94A3B8] text-[10px]">{t.timezone}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {t.interests.map((int, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] text-[#475569] font-medium border border-slate-200">
                          {int}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge
                      variant={
                        t.status === "confirmed"
                          ? "emerald"
                          : t.status === "pending"
                          ? "amber"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex gap-1.5">
                      {t.status !== "confirmed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[10px] h-7 px-2.5 border-emerald-200 text-[#10B981] hover:bg-emerald-50"
                          onClick={() => handleUpdateTrialStatus(t.id, "confirmed")}
                        >
                          Confirm
                        </Button>
                      )}
                      {t.status !== "completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[10px] h-7 px-2 text-[#64748B] hover:text-[#0F172A]"
                          onClick={() => handleUpdateTrialStatus(t.id, "completed")}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 2. ADMISSIONS INQUIRIES & LEADS */}
      <Card className="border-[#E2E8F0] bg-white p-6 sm:p-8 card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
            <Mail className="h-5 w-5 text-[#10B981]" />
            <span>Admissions & Contact Inquiries</span>
          </div>
          <Badge variant="emerald">{leads.length} Messages</Badge>
        </div>

        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2">
                <div>
                  <strong className="text-[#0F172A] text-sm">{lead.fullName}</strong>
                  <span className="text-[#64748B] ml-2 font-mono text-[11px]">&lt;{lead.email}&gt;</span>
                  {lead.phone && <span className="text-[#94A3B8] ml-2 font-mono text-[11px]">Tel: {lead.phone}</span>}
                </div>
                <Badge variant={lead.status === "new" ? "amber" : "secondary"}>
                  {lead.status}
                </Badge>
              </div>
              <p className="text-[#2563EB] font-bold">{lead.subject}</p>
              <p className="text-[#475569] leading-relaxed">{lead.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
