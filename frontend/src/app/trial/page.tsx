import { TrialPage } from "@/views/TrialPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/trial", "Book a Free 45-Min Trial | Skillify Genius", "Book a free live 1:1 coding and technology trial for your learner and choose an existing course pathway.");
export default async function Page({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  return <TrialPage initialCourse={course} />;
}
