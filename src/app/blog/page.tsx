import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookOpen, Clock, ArrowRight, Sparkles, Brain, Shield, Code2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Future Skills & Tech Education Guides",
  description: "Educational thought leadership and research guides on computational thinking, AI literacy, and screen-time transformation for parents.",
};

export default async function BlogPage() {
  const posts = await api.getBlogPosts();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai literacy":
        return Sparkles;
      case "cyber safety":
        return Shield;
      case "pedagogy":
        return Brain;
      default:
        return Code2;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge variant="blue" className="gap-1 text-xs">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Thought Leadership</span>
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          Educational Guides & Insights
        </h1>
        <p className="text-[#475569] text-base sm:text-lg">
          Research-backed articles on computational thinking, AI literacy, and preparing young minds for future technology careers.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const categoryName = post.category || (post.tags && post.tags[0]) || "AI & Education";
          const CategoryIcon = getCategoryIcon(categoryName);
          return (
            <div
              key={post.id}
              className="rounded-[24px] bg-white border border-slate-200/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(37,99,235,0.1)] hover:border-blue-200 transition-all duration-300 ease-out flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Visual Cover Banner Header */}
                <div className="h-36 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-emerald-50/40 border border-slate-100 p-6 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-center text-[#2563EB]">
                    <CategoryIcon className="h-6 w-6" />
                  </div>
                  <Badge variant="blue" className="text-xs bg-white/90">{categoryName}</Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                  <span className="flex items-center gap-1 font-mono font-medium">
                    <Clock className="h-3.5 w-3.5 text-[#2563EB]" /> {post.readTime}
                  </span>
                  <span className="font-medium">{formatDate(post.publishedAt)}</span>
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded-lg bg-slate-100/80 text-[#475569] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{post.author}</p>
                  <p className="text-[11px] text-[#64748B]">{post.authorRole}</p>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#2563EB]" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
