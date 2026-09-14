import { LegalPage } from "@/views/LegalPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/privacy", "Privacy Policy | Skillify Genius", "Read the Skillify Genius privacy policy.");
export default function Page() { return <LegalPage kind="privacy" />; }
