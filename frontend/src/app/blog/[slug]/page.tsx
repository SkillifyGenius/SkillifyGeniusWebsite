import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { fallbackPosts } from "@/data/content";
import { pageMetadata, SITE_URL } from "@/lib/site-metadata";

export function generateStaticParams() { return fallbackPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = fallbackPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return { ...pageMetadata(`/blog/${slug}`, `${post.title} | Skillify Genius`, post.excerpt), openGraph: { title: post.title, description: post.excerpt, url: `${SITE_URL}/blog/${slug}`, type: "article", publishedTime: post.publishedAt } };
}

function ArticleBody({ content }: { content: string }) {
  return <div className="space-y-5 text-base leading-8 text-[#4a635b] sm:text-lg">{content.split("\n\n").map((block, index) => {
    if (block.startsWith("### ")) return <h2 key={index} className="pt-6 text-2xl font-black text-[#102a25]">{block.slice(4)}</h2>;
    if (block.startsWith("- ")) return <ul key={index} className="list-disc space-y-2 pl-6">{block.split("\n").map((line, item) => <li key={item}>{line.replace(/^- /, "")}</li>)}</ul>;
    return <p key={index}>{block}</p>;
  })}</div>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = fallbackPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: "Skillify Genius" }, mainEntityOfPage: `${SITE_URL}/blog/${slug}` };
  return <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800"><ArrowLeft className="h-4 w-4" /> All resources</Link><span className="mt-10 block text-xs font-black uppercase tracking-wider text-emerald-700">{post.category || "Learning"} · {post.readTime}</span><h1 className="mt-4 text-4xl font-black leading-tight text-[#102a25] sm:text-5xl">{post.title}</h1><p className="mt-5 text-xl leading-8">{post.excerpt}</p><div className="mt-7 flex flex-wrap gap-5 border-b border-emerald-950/10 pb-8 text-sm font-semibold text-[#597068]"><span className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</span><time dateTime={post.publishedAt} className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></div><div className="mt-10"><ArticleBody content={post.content || post.excerpt} /></div><div className="mt-14 rounded-3xl bg-emerald-50 p-7"><h2 className="text-xl font-black text-[#102a25]">Apply these ideas with a personal mentor.</h2><p className="mt-3 leading-7">Explore a technology journey shaped around your goals and learning style.</p><Link href="/assessment" className="mt-5 inline-block font-black text-emerald-800">Build your roadmap →</Link></div></article>;
}
