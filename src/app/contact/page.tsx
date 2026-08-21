"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { Mail, Globe, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Admissions Consultation",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.submitLead(formData);
      setSubmitted(true);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="blue" className="gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <span>Admissions & Support</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          Get in Touch
        </h1>
        <p className="text-[#475569] text-sm sm:text-base">
          Have questions about our 4-Phase curriculum, regional timezones, or tailored tracks? Our academic team responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-[#E2E8F0] bg-white p-8 sm:p-10 card-shadow">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981] mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Inquiry Received!</h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. A technology mentor will review your note and contact you at <strong>{formData.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="sarah.jenkins@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Phone / WhatsApp (Optional)</label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">Subject *</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0F172A]">Your Message or Question *</label>
                  <textarea
                    required
                    rows={5}
                    className="flex w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:border-[#2563EB] focus-visible:ring-2 focus-visible:ring-blue-500/10 transition-all shadow-subtle"
                    placeholder="Tell us about your child's age, passions, and current learning goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-2 mt-2 shadow-md shadow-blue-500/20"
                >
                  <span>{loading ? "Sending Inquiry..." : "Send Message"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[#E2E8F0] bg-white p-6 space-y-4 card-shadow">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#2563EB]" />
              Global Academy Operations
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Skillify Genius operates live online cohorts and 1-on-1 private mentoring aligned to US Eastern, US Pacific, UK BST/GMT, and European Central timezones.
            </p>
            <div className="pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-1.5 font-medium">
              <p>📍 USA: New York & San Francisco</p>
              <p>📍 UK & Europe: London & Zurich</p>
              <p>✉️ info@skillifygenius.com</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
