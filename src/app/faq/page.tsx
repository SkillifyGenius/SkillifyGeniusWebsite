import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HelpCircle, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Parent Frequently Asked Questions",
  description: "Get clear answers about our 4-Phase curriculum, Socratic methodology, 1-on-1 trial assessments, and parent trust portal.",
};

export default async function FAQPage() {
  const faqs = await api.getFAQs();

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="blue" className="gap-1.5">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Parent Knowledge Base</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-[#475569] text-sm sm:text-base">
          Everything parents want to know about our teaching philosophy, weekly schedule, and measurable progress tracking.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-3 card-shadow">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-start gap-3">
              <span className="text-[#2563EB] font-mono text-base mt-0.5 font-bold">Q.</span>
              <span>{faq.question}</span>
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed pl-7">
              {faq.answer}
            </p>
          </Card>
        ))}
      </div>

      <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-8 text-center space-y-4 card-shadow">
        <h3 className="text-xl font-bold text-[#0F172A]">Have a specific question not listed here?</h3>
        <p className="text-xs text-[#475569] max-w-md mx-auto">
          Our senior mentors are available for direct academic consultations.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button variant="outline" size="md" className="gap-2">
              <MessageSquare className="h-4 w-4 text-[#2563EB]" />
              <span>Contact Admissions</span>
            </Button>
          </Link>
          <Link href="/trial">
            <Button variant="primary" size="md" className="gap-2 shadow-md shadow-blue-500/20">
              <span>Book 1-on-1 Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
