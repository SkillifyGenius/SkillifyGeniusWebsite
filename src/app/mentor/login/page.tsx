"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, ArrowRight, Shield } from "lucide-react";

export default function MentorLoginPage() {
  const router = useRouter();
  const { switchRole, login } = useAuth();
  const [email, setEmail] = useState("alex@skillifygenius.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    switchRole("mentor");
    login("mentor");
    setTimeout(() => {
      router.push("/dashboard/mentor");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 shadow-md shadow-purple-500/20 text-white mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <Badge variant="violet" className="text-xs">Faculty & Mentorship</Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Mentor Studio Login
            </h1>
            <p className="text-xs text-[#64748B]">
              Access assigned student rosters, calibrate telemetry, and verify project submissions.
            </p>
          </div>
        </div>

        <Card className="border-[#E2E8F0] bg-white p-8 card-shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0F172A]">Mentor Work Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#0F172A]">Security Token</label>
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
              <span>{loading ? "Authenticating..." : "Access Mentor Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3.5 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase text-purple-700 font-bold">
              Demo Mentor Account
            </span>
            <p className="text-[11px] text-[#475569]">
              Pre-loaded with <strong>Alex</strong> (Senior Technology Mentor).
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
