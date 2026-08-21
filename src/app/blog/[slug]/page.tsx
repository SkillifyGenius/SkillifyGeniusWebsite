import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Skillify Genius`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLdPost = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Skillify Genius",
      "url": "https://www.skillifygenius.com"
    }
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPost) }}
      />

      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Guides & Insights</span>
      </Link>

      {/* Post Header */}
      <header className="space-y-6 border-b border-[#E2E8F0] pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
          <span className="flex items-center gap-1 font-mono font-medium">
            <Clock className="h-3.5 w-3.5 text-[#2563EB]" /> {post.readTime}
          </span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <div className="flex gap-1.5">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="violet" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] font-bold text-sm">
              SG
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">{post.author}</p>
              <p className="text-xs text-[#64748B]">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="space-y-6 text-[#334155] leading-relaxed">
        <p className="text-lg font-medium text-[#0F172A] leading-relaxed italic border-l-4 border-[#2563EB] pl-4">
          {post.excerpt}
        </p>

        <div className="whitespace-pre-line text-base leading-relaxed space-y-4 text-[#475569]">
          {post.content}
        </div>
      </div>

      {/* Trial CTA in Footer */}
      <div className="rounded-[24px] border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 card-shadow">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-[#0F172A]">
            Experience Future Skills Education
          </h3>
          <p className="text-xs text-[#475569] max-w-md">
            Book a complimentary 45-minute 1-on-1 assessment to evaluate your child's problem-solving potential.
          </p>
        </div>

        <Link href="/trial" className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto gap-2 shadow-md shadow-blue-500/20">
            <span>Book Free Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
