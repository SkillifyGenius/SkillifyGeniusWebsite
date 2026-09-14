import { pageMetadata } from "@/lib/site-metadata";
import { AssessmentForm } from "@/components/mentorship/AssessmentForm";
import type { ProgramId } from "@/data/mentorship";

export const metadata = pageMetadata("/assessment", "Technology Assessment | Skillify Genius", "Answer a few questions to see a personal technology mentorship roadmap before enrollment.");

export default async function AssessmentPage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const { program } = await searchParams;
  const selected = program === "professional" || program === "mastery" ? program : "foundation";
  return <AssessmentForm initialProgram={selected as ProgramId} />;
}
