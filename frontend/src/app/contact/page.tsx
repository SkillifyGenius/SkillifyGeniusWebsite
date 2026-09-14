import { ContactPage } from "@/views/ContactPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/contact", "Contact | Skillify Genius", "Ask about technology mentorship, assessments, or the right personal learning journey.");
export default function Page() { return <ContactPage />; }
