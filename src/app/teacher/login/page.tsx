"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, ArrowRight } from "lucide-react";

export default function TeacherLoginPage() {
  const router = useRouter();
  const { switchRole, login } = useAuth();
  const [email, setEmail] = useState("alex@skillifygenius.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.loginUser(email, "mentor");
      switchRole("mentor");
      login("mentor");
      router.push("/dashboard/mentor");
    } catch {
      switchRole("mentor");
      login("mentor");
      router.push("/dashboard/mentor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 shadow-md shadow-purple-500/20 text-white mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <Badge variant="violet" className="text-xs">Faculty & Instructors</Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Teacher & Mentor Access
            </h1>
            <p className="text-xs text-[#64748B]">
              Access student cohorts, calibrate telemetry, and review software submissions.
            </p>
          </div>
        </div>

        <Card className="border-[#E2E8F0] bg-white p-8 card-shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0F172A]">Instructor Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#0F172A]">Security Passcode</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full gap-2 font-bold mt-2 bg-purple-600 hover:bg-purple-700"
            >
              <span>{loading ? "Authenticating..." : "Access Teacher Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3.5 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase text-purple-700 font-bold">
              Demo Faculty Account
            </span>
            <p className="text-[11px] text-[#475569]">
              Pre-loaded with <strong>Senior Instructor</strong> credentials.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
