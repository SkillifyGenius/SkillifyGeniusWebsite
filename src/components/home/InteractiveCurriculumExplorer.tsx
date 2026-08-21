"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Brain, 
  Code2, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Terminal,
  CheckCircle2
} from "lucide-react";

interface AgeTrack {
  id: string;
  ageRange: string;
  badge: string;
  badgeVariant: "blue" | "emerald" | "violet" | "amber";
  title: string;
  subtitle: string;
  description: string;
  coreTools: string[];
  capstoneProject: {
    title: string;
    description: string;
    skills: string[];
  };
  keyOutcomes: string[];
}

const AGE_TRACKS: AgeTrack[] = [
  {
    id: "ages-6-8",
    ageRange: "Ages 6-8",
    badge: "Phase 1: Foundation Explorer",
    badgeVariant: "blue",
    title: "Algorithmic Logic & Spatial Problem Solving",
    subtitle: "Transitioning young minds from consumers of screens to logical creators.",
    description:
      "Children deconstruct puzzles, master sequential flow, conditional loops, and coordinate math without cognitive overload.",
    coreTools: ["Visual Block Engine", "Algorithmic Mazes", "Coordinate Logic", "Socratic Storyboards"],
    capstoneProject: {
      title: "Interactive Space Rover Maze Solver",
      description: "A self-navigating visual algorithm that avoids planetary obstacles using conditional logic.",
      skills: ["Sequential Logic", "Nested Loops", "Debugging Habits"],
    },
    keyOutcomes: [
      "Break complex tasks into step-by-step instructions",
      "Understand cause-and-effect in program execution",
      "Develop perseverance through guided debugging",
    ],
  },
  {
    id: "ages-9-11",
    ageRange: "Ages 9-11",
    badge: "Phase 2: Junior Builder",
    badgeVariant: "emerald",
    title: "Real Python Syntax & 2D Game Physics",
    subtitle: "Bridging visual logic to real-world typed code and interactive game mechanics.",
    description:
      "Students write real Python and JavaScript syntax, handling velocity vectors, gravity, collision detection, and user inputs.",
    coreTools: ["Python 3", "HTML5 Canvas", "2D Physics Math", "Root Cause Analysis Log"],
    capstoneProject: {
      title: "Gravitational Orbit Simulator",
      description: "A 2D space simulation calculating orbital velocity, gravity pull, and vector bounce collisions.",
      skills: ["Trigonometry & Vectors", "Asynchronous Timers", "State Management"],
    },
    keyOutcomes: [
      "Write clean, error-free typed code without fear of syntax bugs",
      "Apply middle-school math (coordinate geometry & vectors) in real software",
      "Conduct independent Root Cause Analysis when errors occur",
    ],
  },
  {
    id: "ages-12-14",
    ageRange: "Ages 12-14",
    badge: "Phase 3: Creator Lab",
    badgeVariant: "violet",
    title: "Full-Stack Web Architecture & Cloud Databases",
    subtitle: "Building real web applications with databases, authentication, and REST APIs.",
    description:
      "Students architect responsive web applications, design database schemas, query REST APIs, and deploy live URLs to the web.",
    coreTools: ["Next.js & React", "TypeScript", "Appwrite Cloud BaaS", "Tailwind CSS", "Git & GitHub"],
    capstoneProject: {
      title: "Collaborative Study Hub with Cloud Sync",
      description: "A full-stack web application featuring user auth, live database sync, and interactive markdown notes.",
      skills: ["REST APIs", "CRUD Operations", "Cloud Authentication"],
    },
    keyOutcomes: [
      "Architect multi-page web applications from scratch",
      "Design relational schemas and secure user authentication",
      "Deploy live websites accessible worldwide on custom domains",
    ],
  },
  {
    id: "ages-15-18",
    ageRange: "Ages 15-18",
    badge: "Phase 4: Advanced Innovator",
    badgeVariant: "amber",
    title: "AI Agent Pipelines, Systems & Cyber Defense",
    subtitle: "Engineering future-proof systems with LLMs, automated agents, and security threat modeling.",
    description:
      "High school students build AI-powered agent workflows, implement security threat models, and prepare competitive engineering portfolios.",
    coreTools: ["OpenAI & Gemini APIs", "Vector Databases", "System Architecture", "Pen-testing Hygiene"],
    capstoneProject: {
      title: "Autonomous Socratic Code Reviewer Agent",
      description: "An AI-powered developer tool that analyzes GitHub pull requests and generates Socratic architectural critiques.",
      skills: ["LLM Prompt Engineering", "Vector Embeddings", "Defensive Cybersecurity"],
    },
    keyOutcomes: [
      "Build production-grade AI applications and autonomous agents",
      "Analyze systems for security vulnerabilities and race conditions",
      "Graduate with an engineering portfolio ready for university admissions and tech internships",
    ],
  },
];

export function InteractiveCurriculumExplorer() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>("ages-12-14");
  const currentTrack = AGE_TRACKS.find((t) => t.id === selectedTrackId) || AGE_TRACKS[2];

  return (
    <div className="space-y-10">
      {/* 1. Track Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {AGE_TRACKS.map((track) => {
          const isSelected = track.id === selectedTrackId;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                  : "bg-white text-[#475569] border border-slate-200/80 hover:bg-slate-50 hover:text-[#0F172A]"
              }`}
            >
              <span>{track.ageRange}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-[#64748B]"}`}>
                {track.badge.split(":")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Detailed Track Display Card */}
      <div className="rounded-[28px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Narrative & Outcomes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <Badge variant={currentTrack.badgeVariant} className="text-xs">
              {currentTrack.badge} ({currentTrack.ageRange})
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {currentTrack.title}
            </h3>
            <p className="text-base font-medium text-[#2563EB]">
              {currentTrack.subtitle}
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              {currentTrack.description}
            </p>
          </div>

          {/* Core Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#64748B]">Core Engineering Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {currentTrack.coreTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-[#0F172A]"
                >
                  <Code2 className="h-3.5 w-3.5 text-[#2563EB]" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Key Measurable Outcomes */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#64748B]">Measurable Student Outcomes:</h4>
            <div className="space-y-2">
              {currentTrack.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Capstone Project Preview Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 text-white rounded-[24px] p-7 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Sparkles className="h-4 w-4" />
              Verified Capstone Project
            </div>
            <span className="text-[10px] text-slate-400 font-mono">100% Student-Built</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-bold text-white tracking-tight">
              {currentTrack.capstoneProject.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentTrack.capstoneProject.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Demonstrated Engineering Skills:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentTrack.capstoneProject.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-200 font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link href="/trial" className="block">
              <Button variant="primary" size="md" className="w-full gap-2 text-xs font-bold bg-[#2563EB] hover:bg-blue-600">
                <span>Book Assessment for {currentTrack.ageRange}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
