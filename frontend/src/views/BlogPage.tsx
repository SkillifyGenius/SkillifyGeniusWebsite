"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock3, Sparkles, User, X } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { fallbackPosts } from "@/data/content";
import type { BlogPost } from "@/types";

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    void api.getBlogPosts().then((data) => data.length && setPosts(data));
  }, []);

  // Keep the original modal behavior available to keyboard users.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActivePost(null);
    }
    if (activePost) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const previousOverflow = document.body.style.overflow;
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
        previousFocusRef.current?.focus();
      };
    }
  }, [activePost]);

  function renderArticleBody(content: string) {
    if (!content) return null;
    return content.split("\n\n").map((block, idx) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={idx} className="mt-8 mb-3 font-display text-xl font-black text-[#102a25] sm:text-2xl">
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").map((line) => line.replace("- ", ""));
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc pl-5 text-[#4a635b] text-base leading-7">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="my-4 text-base leading-8 text-[#4a635b] sm:text-lg">
          {block}
        </p>
      );
    });
  }

  return (
    <>
      <Seo
        title="Learning Resources & Parent Guidance | Skillify Genius"
        description="Practical pedagogical guidance for students and parents on developing problem solving, independent debugging, and responsible AI literacy."
      />

      {/* HEADER SECTION */}
      <section className="relative overflow-hidden px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Pedagogical Essays & Guides
        </span>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-black text-[#102a25] sm:text-5xl lg:text-6xl">
          Ideas for curious students and thoughtful parents.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#597068] sm:text-lg">
          In-depth notes on computational problem solving, self-directed debugging, and responsible technology habits.
        </p>
      </section>

      {/* ARTICLES GRID */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActivePost(post);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Read article: ${post.title}`}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[#fbfcf8] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/30 hover:bg-white hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 uppercase tracking-wider">
                    {post.category || "Learning"}
                  </span>
                </div>

                <h2 className="mt-6 font-display text-2xl font-black leading-snug text-[#102a25] group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#597068] line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="mt-8 border-t border-emerald-950/5 pt-5">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-emerald-700" />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary font-black group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FULL ARTICLE READING MODAL / SLIDE-OVER */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-reader-title"
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-emerald-950/60 p-4 sm:p-6 backdrop-blur-md animate-fade-up"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-[2.5rem] border border-emerald-950/10 bg-white p-7 shadow-2xl sm:p-12 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-emerald-950/10 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-900">
                  {activePost.category || "Guide"}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5 text-emerald-700" /> {activePost.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-emerald-700" /> {new Date(activePost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setActivePost(null)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="mt-8">
              <h1 id="blog-reader-title" className="font-display text-3xl font-black leading-tight text-[#102a25] sm:text-4xl">
                {activePost.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#597068]">
                <User className="h-3.5 w-3.5 text-emerald-600" />
                <span>{activePost.author}</span>
              </div>

              <div className="my-8 h-px bg-emerald-950/10" />

              <div className="prose prose-emerald max-w-none text-[#4a635b]">
                {renderArticleBody(activePost.content || activePost.excerpt)}
              </div>
            </div>

            {/* In-Article CTA Bridge */}
            <div className="mt-12 rounded-3xl border border-emerald-700/20 bg-emerald-50/70 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    Apply these concepts in practice
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-[#102a25]">
                    Experience personalized 1:1 mentorship tailored for your child.
                  </p>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <Link href="/trial" onClick={() => setActivePost(null)}>
                    Book free 1:1 assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
