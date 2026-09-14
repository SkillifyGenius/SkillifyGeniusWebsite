import { BlogPage } from "@/views/BlogPage";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("/blog", "Learning Resources & Parent Guidance | Skillify Genius", "Practical pedagogical guidance for students and parents on developing problem solving, independent debugging, and responsible AI literacy.");

export default function Page() { return <BlogPage />; }
