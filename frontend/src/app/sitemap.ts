import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";
import { fallbackPosts } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/courses", "/blog", "/about", "/contact", "/trial", "/privacy", "/safeguarding", "/terms", "/mentorship", "/programs", "/assessment"];
  return [
    ...routes.map((route) => ({ url: `${SITE_URL}${route}`, changeFrequency: "monthly" as const })),
    ...fallbackPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.publishedAt, changeFrequency: "yearly" as const })),
  ];
}
