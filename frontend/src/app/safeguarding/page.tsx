import { LegalPage } from "@/views/LegalPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/safeguarding", "Child Safeguarding | Skillify Genius", "Read how Skillify Genius supports safe 1:1 technology learning.");
export default function Page() { return <LegalPage kind="safeguarding" />; }
