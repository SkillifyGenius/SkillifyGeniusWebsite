"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Activity, 
  Brain, 
  Compass, 
  Code2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface SkillDimension {
  key: string;
  name: string;
  score: number;
  description: string;
  icon: any;
  color: string;
  howMeasured: string;
}

const DIMENSIONS: SkillDimension[] = [
  {
    key: "problemSolving",
    name: "Problem Solving",
    score: 88,
    description: "Ability to deconstruct unfamiliar bugs, isolate edge cases, and reason logically through challenges.",
    icon: Brain,
    color: "#2563EB",
    howMeasured: "Calculated via test assertion passes without requesting Level 3 direct solutions.",
  },
  {
    key: "selfLearning",
    name: "Self-Learning Independence",
    score: 82,
    description: "Confidence to research official API documentation, inspect error logs, and formulate hypotheses independently.",
    icon: Compass,
    color: "#10B981",
    howMeasured: "Measured by time-to-discovery and progressive hint ladder step avoidance.",
  },
  {
    key: "programming",
    name: "Programming Logic",
    score: 91,
    description: "Mastery of loops, conditional branches, asynchronous state, data structures, and typed contracts.",
    icon: Code2,
    color: "#6366F1",
    howMeasured: "Evaluated by code cleanliness, modularity, and automated unit test execution.",
  },
  {
    key: "systemThinking",
    name: "Systems & Architecture",
    score: 76,
    description: "Understanding how clients communicate with servers, database schema design, and cloud workflows.",
    icon: Layers,
    color: "#8B5CF6",
    howMeasured: "Scored across capstone project schemas, API integrations, and cloud deployments.",
  },
  {
    key: "creativity",
    name: "Applied Creativity",
    score: 85,
    description: "Adding original mechanics, UI polish, and thoughtful features beyond basic starter requirements.",
    icon: Sparkles,
    color: "#EC4899",
    howMeasured: "Verified by mentor qualitative reviews and unique capstone extensions.",
  },
  {
    key: "engineeringMindset",
    name: "Engineering Habits & RCA",
    score: 79,
    description: "Documenting Root Cause Analysis (RCA), writing descriptive commits, and learning from failure.",
    icon: ShieldCheck,
    color: "#F59E0B",
    howMeasured: "Tracked by depth of RCA reflections and test-driven refactoring cycles.",
  },
];

export function SkillGraphPreview() {
  const [activeSkillKey, setActiveSkillKey] = useState<string>("problemSolving");
  const activeSkill = DIMENSIONS.find((d) => d.key === activeSkillKey) || DIMENSIONS[0];

  return (
    <div className="rounded-[28px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left 6 Cols: Interactive Dimension Selector */}
      <div className="lg:col-span-6 space-y-6 text-left">
        <div className="space-y-2">
          <Badge variant="blue" className="text-xs gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Proprietary Measurement Model
          </Badge>
          <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            The 6-Dimensional Skill Graph™
          </h3>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Most courses count "hours watched." We track <strong>tangible cognitive capabilities</strong> algorithmically updated every time a student debugs code or publishes a project.
          </p>
        </div>

        {/* 6 Skill Dimension Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            const isActive = dim.key === activeSkillKey;
            return (
              <button
                key={dim.key}
                onClick={() => setActiveSkillKey(dim.key)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-2 ${
                  isActive
                    ? "bg-blue-50/90 border-[#2563EB] shadow-md shadow-blue-500/10 scale-[1.02]"
                    : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div
                    className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${dim.color}15`, color: dim.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-xs font-bold truncate ${isActive ? "text-[#0F172A]" : "text-[#475569]"}`}>
                    {dim.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: dim.color }}>
                  {dim.score}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Skill Explanation Callout */}
        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeSkill.color }} />
              {activeSkill.name} ({activeSkill.score}/100)
            </h4>
            <span className="text-[11px] font-mono uppercase text-[#2563EB] font-bold">Live Calibrated</span>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">
            {activeSkill.description}
          </p>
          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-[#64748B] flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[#10B981]" />
            <span><strong>How Measured:</strong> {activeSkill.howMeasured}</span>
          </div>
        </div>
      </div>

      {/* Right 6 Cols: Visual Radar Polygon & Parent Growth Badge */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-[24px] bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-inner space-y-6">
        {/* SVG Radar Chart Representation */}
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Concentric Hexagons */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
              <polygon
                key={idx}
                points="100,10 178,55 178,145 100,190 22,145 22,55"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
                transform={`scale(${level})`}
                style={{ transformOrigin: "center" }}
              />
            ))}

            {/* Radar Axes */}
            <line x1="100" y1="100" x2="100" y2="10" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="100" y1="100" x2="178" y2="55" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="100" y1="100" x2="178" y2="145" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="100" y1="100" x2="100" y2="190" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="100" y1="100" x2="22" y2="145" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="100" y1="100" x2="22" y2="55" stroke="#E2E8F0" strokeWidth="1" />

            {/* Real Data Polygon */}
            {/* Values: PS=88, SL=82, PL=91, ST=76, CR=85, EM=79 */}
            <polygon
              points="100,21 164,63 162,136 100,171 35,138 31,64"
              fill="rgba(37, 99, 235, 0.18)"
              stroke="#2563EB"
              strokeWidth="2.5"
            />

            {/* Data Point Circles */}
            <circle cx="100" cy="21" r="4.5" fill="#2563EB" />
            <circle cx="164" cy="63" r="4.5" fill="#10B981" />
            <circle cx="162" cy="136" r="4.5" fill="#6366F1" />
            <circle cx="100" cy="171" r="4.5" fill="#8B5CF6" />
            <circle cx="35" cy="138" r="4.5" fill="#EC4899" />
            <circle cx="31" cy="64" r="4.5" fill="#F59E0B" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Overall Index</span>
            <span className="text-2xl font-black text-[#0F172A]">84.2</span>
            <span className="text-[10px] text-[#10B981] font-bold">Advanced Tier</span>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="w-full text-center space-y-2">
          <p className="text-xs text-[#64748B]">
            Transparently accessible by parents on weekly growth reports.
          </p>
          <Link href="/pathfinder" className="block">
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs font-bold border-slate-300">
              <span>Test Your Child's Baseline on Pathfinder</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
