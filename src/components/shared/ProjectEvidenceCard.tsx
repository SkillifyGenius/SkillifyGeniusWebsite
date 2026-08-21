import React from "react";
import { ProjectEvidence } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github, CheckCircle2, ShieldCheck } from "lucide-react";

interface ProjectEvidenceCardProps {
  project: ProjectEvidence;
  showFeedback?: boolean;
}

export function ProjectEvidenceCard({ project, showFeedback = true }: ProjectEvidenceCardProps) {
  return (
    <Card className="flex flex-col justify-between border-[#E2E8F0] bg-white card-shadow card-shadow-hover">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="violet">
            Phase {project.phase} Project
          </Badge>
          <Badge variant="emerald" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified Capstone
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-[#0F172A]">
          {project.title}
        </CardTitle>
        <p className="text-xs text-[#64748B]">
          Built by <span className="font-semibold text-[#0F172A]">{project.studentName}</span> (Age {project.studentAge})
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-[#475569] line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Skills Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.skillsDemonstrated.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-[#475569] border border-slate-200/80 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Mentor Feedback Callout */}
        {showFeedback && project.mentorFeedback && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-[#0F172A]">
            <div className="flex items-center gap-1.5 font-bold text-[#10B981] mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Mentor Verification Note:</span>
            </div>
            <p className="italic text-[#334155]">"{project.mentorFeedback}"</p>
            <p className="mt-1 text-[11px] text-[#64748B] font-medium">- {project.mentorName}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
        <div className="flex items-center gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              Source Code
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
