import { MentorshipHomePage } from "@/views/MentorshipHomePage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/mentorship", "Technology Mentorship | Skillify Genius", "Explore personalized one-to-one technology mentorship, learning journeys, and a personal roadmap.");

export default function Page() { return <MentorshipHomePage />; }
