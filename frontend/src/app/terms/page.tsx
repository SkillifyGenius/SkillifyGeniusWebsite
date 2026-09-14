import { LegalPage } from "@/views/LegalPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/terms", "Terms of Service | Skillify Genius", "Read the Skillify Genius terms of service.");
export default function Page() { return <LegalPage kind="terms" />; }
