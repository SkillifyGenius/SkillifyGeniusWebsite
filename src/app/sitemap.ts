import { MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.skillifygenius.com";

  const courses = await api.getCourses();
  const blogPosts = await api.getBlogPosts();

  const staticRoutes = [
    "",
    "/courses",
    "/pathfinder",
    "/trial",
    "/blog",
    "/about",
    "/contact",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const courseRoutes = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
