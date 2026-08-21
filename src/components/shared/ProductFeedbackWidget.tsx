"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MessageSquarePlus, X, CheckCircle2, Star } from "lucide-react";

export function ProductFeedbackWidget() {
  const { role, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<"ease" | "confusion" | "difficulty" | "suggestion" | "trust">("suggestion");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getCategoryOptions = () => {
    if (role === "student") {
      return [
        { value: "ease", label: "What was easy & fun?" },
        { value: "confusion", label: "What was confusing?" },
        { value: "difficulty", label: "Which challenge was too hard?" },
        { value: "suggestion", label: "Feature or project idea" },
      ];
    }
    if (role === "parent") {
      return [
        { value: "trust", label: "What increased your trust?" },
        { value: "confusion", label: "Was learning progress clear?" },
        { value: "suggestion", label: "What information was missing?" },
      ];
    }
    return [
      { value: "suggestion", label: "Workflow suggestion" },
      { value: "difficulty", label: "Tool or feature request" },
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await api.submitFeedback({
        userRole: role,
        userName: user?.name || "Anonymous User",
        category,
        message,
        rating,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error("Failed to submit feedback", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full bg-[#2563EB] text-white px-4 py-2.5 text-xs font-bold shadow-lg shadow-blue-500/25 hover:bg-[#1E40AF] transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span>Feedback</span>
        </button>
      </div>

      {/* Feedback Modal / Card */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6 bg-slate-900/20 backdrop-blur-xs animate-fadeIn">
          <Card className="w-full max-w-md border-[#E2E8F0] bg-white p-6 rounded-[24px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#0F172A]">Share Your Feedback</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] font-semibold capitalize">
                  {role} View
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-[#10B981] mx-auto" />
                <h4 className="text-sm font-bold text-[#0F172A]">Thank you for your feedback!</h4>
                <p className="text-xs text-[#64748B]">Our curriculum and engineering team reviews every note.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">Topic</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-9 rounded-xl border border-[#E2E8F0] bg-white px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {getCategoryOptions().map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">Experience Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1 rounded-lg ${
                          rating >= star ? "text-amber-400" : "text-slate-200"
                        } hover:scale-110 transition-transform`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">What could we improve or clarify?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us your thoughts..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={submitting}>
                    {submitting ? "Sending..." : "Submit Feedback"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
