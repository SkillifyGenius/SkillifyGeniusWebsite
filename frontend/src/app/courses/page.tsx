import { CoursesPage } from "@/views/CoursesPage";
import { pageMetadata } from "@/lib/site-metadata";
import { SITE_URL } from "@/lib/site-metadata";
import { fallbackCourses } from "@/data/content";

export const metadata = pageMetadata("/courses", "Courses | Skillify Genius", "Explore teacher-led coding, web creation, AI, and digital skills courses for young learners.");

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses` },
        ],
      },
      ...fallbackCourses.map((course) => ({
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: { "@id": `${SITE_URL}/#organization` },
      })),
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <CoursesPage />
  </>;
}
