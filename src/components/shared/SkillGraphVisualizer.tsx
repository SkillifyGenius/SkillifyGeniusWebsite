"use client";

import React from "react";
import { EngineeringGrowthMetrics } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Cpu, Brain, Code2, Network, Sparkles, Wrench } from "lucide-react";

interface SkillGraphVisualizerProps {
  metrics: EngineeringGrowthMetrics;
  studentName?: string;
  level?: string;
  verifiedProjectsCount?: number;
  challengesSolved?: number;
  interactive?: boolean;
}

export function SkillGraphVisualizer({
  metrics,
  studentName = "Liam Vance",
  level = "Full-Stack Creator (Level 2)",
  verifiedProjectsCount = 5,
  challengesSolved = 34,
}: SkillGraphVisualizerProps) {
  const dimensions = [
    {
      key: "problemSolving",
      label: "Problem Solving",
      value: metrics.problemSolving,
      icon: Brain,
      strokeColor: "#2563EB",
      barColor: "bg-[#2563EB]",
      badgeBg: "bg-blue-50 text-[#2563EB]",
      description: "Algorithmic logic decomposition & RCA debugging",
    },
    {
      key: "selfLearning",
      label: "Self-Learning Ability",
      value: metrics.selfLearning,
      icon: Sparkles,
      strokeColor: "#10B981",
      barColor: "bg-[#10B981]",
      badgeBg: "bg-emerald-50 text-[#10B981]",
      description: "Independent documentation research & discovery",
    },
    {
      key: "programming",
      label: "Programming Foundations",
      value: metrics.programming,
      icon: Code2,
      strokeColor: "#2563EB",
      barColor: "bg-[#2563EB]",
      badgeBg: "bg-blue-50 text-[#2563EB]",
      description: "Clean modular ES6+ & Python architecture",
    },
    {
      key: "systemThinking",
      label: "System & Cloud Thinking",
      value: metrics.systemThinking,
      icon: Network,
      strokeColor: "#6366F1",
      barColor: "bg-[#6366F1]",
      badgeBg: "bg-indigo-50 text-[#6366F1]",
      description: "Data flow, REST APIs & Appwrite cloud databases",
    },
    {
      key: "creativity",
      label: "Creativity & Ideation",
      value: metrics.creativity,
      icon: Cpu,
      strokeColor: "#F59E0B",
      barColor: "bg-amber-500",
      badgeBg: "bg-amber-50 text-amber-800",
      description: "Original project mechanics & custom UI design",
    },
    {
      key: "engineeringMindset",
      label: "Engineering Mindset",
      value: metrics.engineeringMindset,
      icon: Wrench,
      strokeColor: "#10B981",
      barColor: "bg-[#10B981]",
      badgeBg: "bg-emerald-50 text-[#10B981]",
      description: "Tradeoff analysis, test coverage & defensive hygiene",
    },
  ];

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="border-[#E2E8F0] bg-white card-shadow">
      <CardHeader className="border-b border-[#E2E8F0] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <CardTitle className="text-xl font-bold text-[#0F172A] tracking-tight">
                Engineering Growth Profile™
              </CardTitle>
            </div>
            <p className="mt-1 text-sm text-[#64748B]">
              Verified multi-dimensional capability telemetry for <strong className="text-[#0F172A]">{studentName}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="py-1 px-3 bg-emerald-50 text-[#10B981]">
              {level}
            </Badge>
            <Badge variant="blue" className="py-1 px-3">
              {verifiedProjectsCount} Projects Shipped
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            const strokeDashoffset = circumference - (circumference * dim.value) / 100;
            return (
              <div
                key={dim.key}
                className="group relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${dim.badgeBg} font-semibold`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Circular Progress Ring */}
                    <div className="relative flex items-center justify-center">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          stroke="#E2E8F0"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          stroke={dim.strokeColor}
                          strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute font-mono text-[11px] font-extrabold text-[#0F172A]">
                        {dim.value}%
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#0F172A]">
                    {dim.label}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{dim.description}</p>
                </div>

                {/* Linear Gauge */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0]/70">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className={`h-full rounded-full ${dim.barColor} transition-all duration-700 ease-out`}
                      style={{ width: `${dim.value}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry Summary Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-xs text-[#475569] gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <span>
              <strong>Measurement Model:</strong> Evaluated via autonomous coding challenge solves & Socratic RCA reflections.
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[#64748B]">
            <span>Challenges Solved: <strong className="text-[#0F172A]">{challengesSolved}</strong></span>
            <span>Skill Integrity: <strong className="text-[#10B981]">Verified 100%</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
