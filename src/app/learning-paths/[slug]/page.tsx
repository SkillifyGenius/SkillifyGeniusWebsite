import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Compass, ArrowRight, ArrowLeft, Layers } from "lucide-react";

interface LearningPathPageProps {
  params: Promise<{ slug: string }>;
}

const learningPathsData: Record<string, any> = {
  "game-development-track": {
    title: "Game Development & Physics Logic Track",
    ageGroup: "Ages 8-18",
    description: "Designed for young creators passionate about gaming. Master 2D/3D coordinate physics, collision detection, game loops, and modular Python engine architecture.",
    stages: [
      { name: "Stage 1: Logic & Spatial Reasoning", desc: "Coordinate math, event-driven loops, velocity vectors" },
      { name: "Stage 2: Game Architecture & State Machines", desc: "Managing player states, scoreboards, level progression" },
      { name: "Stage 3: 2D Physics Capstone Engine", desc: "Building Gravity Escape with custom collision physics" },
      { name: "Stage 4: Multiplayer & Public Defense", desc: "Deploying playable game links and code review" },
    ],
    recommendedStartingPhase: 1
  },
  "full-stack-web-apps": {
    title: "Full-Stack Web Apps & Creator Lab Track",
    ageGroup: "Ages 12-18",
    description: "Transition from simple scripts into complete web software engineering. Build cloud-connected applications with HTML5, CSS3, asynchronous JavaScript, and Appwrite databases.",
    stages: [
      { name: "Stage 1: Modern Semantic Architecture", desc: "HTML5 layouts, CSS Grid/Flexbox, responsive design" },
      { name: "Stage 2: Asynchronous JS & REST APIs", desc: "Promises, async/await, API data fetching, state flow" },
      { name: "Stage 3: Cloud Database Integration", desc: "Appwrite NoSQL databases, user sessions & security rules" },
      { name: "Stage 4: Live Vercel Launch & Portfolio", desc: "Deploying to custom domains and Lighthouse audits" },
    ],
    recommendedStartingPhase: 2
  },
  "ai-tools-automation": {
    title: "AI Tools & Workflow Automation Track",
    ageGroup: "Ages 12-18",
    description: "Master multi-turn prompt engineering, chain-of-thought logic, Python task automation scripts, and personal AI study productivity command centers.",
    stages: [
      { name: "Stage 1: Advanced Prompt Engineering", desc: "Context windows, few-shot prompting, hallucination mitigation" },
      { name: "Stage 2: Personal Knowledge OS", desc: "Automated note synthesizers and active recall pipelines" },
      { name: "Stage 3: Python Automation & Webhooks", desc: "Web scraping, automated file processing, API pipelines" },
      { name: "Stage 4: AI Command Center Launch", desc: "Deploying a personal study operating system" },
    ],
    recommendedStartingPhase: 3
  }
};

export async function generateMetadata({ params }: LearningPathPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = learningPathsData[slug];
  if (!path) return { title: "Learning Path Not Found" };

  return {
    title: `${path.title} - Personalized Pathway`,
    description: path.description,
  };
}

export default async function LearningPathDetailPage({ params }: LearningPathPageProps) {
  const { slug } = await params;
  const path = learningPathsData[slug];

  if (!path) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Curriculum</span>
      </Link>

      <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-8 sm:p-12 card-shadow space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="blue" className="gap-1">
            <Compass className="h-3 w-3" />
            Personalized Track
          </Badge>
          <Badge variant="violet">{path.ageGroup}</Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          {path.title}
        </h1>

        <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed">
          {path.description}
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/trial">
            <Button variant="primary" size="lg" className="gap-2 shadow-md shadow-blue-500/20">
              <span>Book Assessment For This Track</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pathfinder">
            <Button variant="outline" size="lg">
              Take Diagnostic Quiz
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#2563EB]" />
          4-Stage Track Milestone Progression
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {path.stages.map((stage: any, idx: number) => (
            <Card key={idx} className="border-[#E2E8F0] bg-white p-6 space-y-2 card-shadow">
              <span className="text-xs font-mono text-[#10B981] font-bold uppercase">
                Milestone {idx + 1}
              </span>
              <h4 className="text-base font-bold text-[#0F172A]">{stage.name}</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">{stage.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
