import { AboutPage } from "@/views/AboutPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/about", "About the Educator | Skillify Genius", "Meet the software engineer and educator guiding personalized 1:1 technology learning.");
export default function Page() { return <AboutPage />; }
