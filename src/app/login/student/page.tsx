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
import { Sparkles, Terminal, ArrowRight, ShieldCheck } from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const { switchRole, login } = useAuth();
  const [email, setEmail] = useState("liam@example.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.loginUser(email, "student");
      switchRole("student");
      login("student");
      router.push("/dashboard/student");
    } catch {
      switchRole("student");
      login("student");
      router.push("/dashboard/student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC]">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB] shadow-md shadow-blue-500/20 text-white mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <Badge variant="blue" className="text-xs">Student Portal</Badge>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Enter Student Studio
            </h1>
            <p className="text-xs text-[#64748B]">
              Access your Socratic challenges, live code sandbox, and Skill Graph™.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-[#E2E8F0] bg-white p-8 card-shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0F172A]">Student Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#0F172A]">Password / Passkey</label>
                <span className="text-[11px] text-[#2563EB] hover:underline cursor-pointer">
                  Need help?
                </span>
              </div>
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
              className="w-full gap-2 shadow-md shadow-blue-500/20 font-bold mt-2"
            >
              <Terminal className="h-4 w-4" />
              <span>{loading ? "Authenticating..." : "Launch Student Studio"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Demo Hint */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase text-[#2563EB] font-bold">
              Demo Student Profile
            </span>
            <p className="text-[11px] text-[#475569]">
              Pre-loaded with <strong>Liam Vance</strong> (Level 2 Full-Stack Creator). Click above to log in instantly.
            </p>
          </div>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-xs text-[#64748B]">
            New to Skillify Genius?{" "}
            <Link href="/register/student" className="text-[#2563EB] font-bold hover:underline">
              Create Student Account →
            </Link>
          </p>
          <Link href="/" className="block text-xs text-[#64748B] hover:text-[#0F172A] transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
