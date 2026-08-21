"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { CurriculumModule } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Bot, 
  Bug, 
  CheckCircle2, 
  ArrowLeft, 
  Terminal, 
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function SocraticStudioPage() {
  const params = useParams();
  const moduleId = (params?.moduleId as string) || "module-1";
  
  const [moduleData, setModuleData] = useState<CurriculumModule | null>(null);
  const [code, setCode] = useState<string>("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [rcaOpen, setRcaOpen] = useState(false);
  const [rcaForm, setRcaForm] = useState({
    bugSummary: "",
    rootCause: "",
    solution: "",
    preventionLearned: ""
  });
  const [rcaSuccess, setRcaSuccess] = useState(false);

  // GeniusAI Socratic Chat
  const [aiChat, setAiChat] = useState<{ role: "ai" | "user"; text: string }[]>([
    {
      role: "ai",
      text: "Hello creator! I am your Socratic AI mentor. I'm here to ask guiding questions, help deconstruct problems, and debug alongside you. What is your initial strategy for this challenge?"
    }
  ]);
  const [userPrompt, setUserPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [detectedErrorPattern, setDetectedErrorPattern] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const mod = await api.getModuleById(moduleId);
      if (mod) {
        setModuleData(mod);
        setCode(mod.initialCode || "// Write your logic here\nconsole.log('Studio initialized');");
      }
    }
    load();
  }, [moduleId]);

  const handleRunCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
    console.error = (...args) => logs.push("[ERROR] " + args.map(a => String(a)).join(" "));

    try {
      const runnable = new Function(code);
      runnable();
      logs.push("✓ Code executed cleanly.");
    } catch (err: any) {
      logs.push(`⚠️ Runtime Error: ${err.message}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setConsoleOutput(logs);
    }
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim() || aiLoading) return;

    const userText = userPrompt;
    setUserPrompt("");
    setAiChat((prev) => [...prev, { role: "user", text: userText }]);
    setAiLoading(true);

    try {
      const res = await api.askAiMentor({
        studentId: "student-101",
        moduleId,
        codeSnippet: code,
        userPrompt: userText,
        chatHistory: aiChat,
      });

      if (res.detectedMistakePattern) {
        setDetectedErrorPattern(res.detectedMistakePattern);
      }

      setAiChat((prev) => [...prev, { role: "ai", text: res.reply }]);
    } catch (err) {
      setAiChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "What edge case occurs if the input is empty or zero? Inspect the console output to observe the variable state.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleRcaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleData) return;
    try {
      await api.submitRCALog({
        studentId: "student-101",
        moduleId: moduleData.id,
        moduleTitle: moduleData.title,
        ...rcaForm
      });
      // Recalculate dynamic telemetry
      await api.calculateTelemetry("student-101");
      setRcaSuccess(true);
      setTimeout(() => {
        setRcaSuccess(false);
        setRcaOpen(false);
        setRcaForm({ bugSummary: "", rootCause: "", solution: "", preventionLearned: "" });
      }, 1500);
    } catch (err) {
      console.error("Failed to submit RCA log", err);
    }
  };

  if (!moduleData) return <div className="p-12 text-center text-[#64748B]">Loading Socratic Studio...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] overflow-hidden bg-[#F8FAFC]">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#E2E8F0] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/student" className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="blue" className="text-xs">Module {moduleData.moduleOrder}</Badge>
            <h1 className="text-sm font-bold text-[#0F172A] tracking-tight">{moduleData.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRcaOpen(true)}
            className="gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
          >
            <Bug className="h-3.5 w-3.5 text-rose-600" />
            <span>Log RCA Reflection</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCode}
            className="gap-1.5 text-xs shadow-sm font-bold"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Run Logic Simulation</span>
          </Button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANE: Challenge Brief + Socratic Hint Ladder + GeniusAI (5 cols) */}
        <div className="lg:col-span-5 border-r border-[#E2E8F0] flex flex-col h-full overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Challenge Brief */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#2563EB] uppercase font-bold">
                  Socratic Challenge Brief
                </span>
                <Badge variant="emerald" className="text-[10px]">Problem Solver Framework™</Badge>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">{moduleData.project}</h2>
              <p className="text-xs text-[#475569] leading-relaxed">
                {moduleData.challengeBrief || moduleData.description}
              </p>
            </div>

            {/* Socratic Hint Ladder */}
            <div className="rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase text-amber-800 font-bold flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-600" /> Progressive Hint Ladder
                </h3>
                <span className="text-[10px] text-[#64748B] font-medium">
                  {hintsUnlocked} of {moduleData.hints?.length || 4} Unlocked
                </span>
              </div>

              <div className="space-y-2">
                {moduleData.hints?.map((hint, idx) => {
                  const isUnlocked = idx < hintsUnlocked;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs transition-all ${
                        isUnlocked
                          ? "border-amber-200 bg-amber-50/70 text-[#0F172A] font-medium"
                          : "border-[#E2E8F0] bg-white text-[#94A3B8] italic"
                      }`}
                    >
                      {isUnlocked ? (
                        <p>{hint}</p>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>Level {idx + 1} Hint (Locked)</span>
                          {idx === hintsUnlocked && (
                            <button
                              onClick={() => setHintsUnlocked(hintsUnlocked + 1)}
                              className="text-[11px] font-bold text-[#2563EB] hover:text-[#1E40AF] font-sans not-italic"
                            >
                              Unlock Socratic Hint →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GeniusAI Socratic Assistant Chat (Background: #EEF2FF, Border: #C7D2FE, Icon: #6366F1) */}
            <div className="rounded-[20px] border border-[#C7D2FE] bg-[#EEF2FF] p-4 space-y-3 flex flex-col h-72 shadow-subtle">
              <div className="flex items-center justify-between border-b border-[#C7D2FE] pb-2">
                <div className="flex items-center gap-1.5 text-[#6366F1] font-bold text-xs">
                  <Bot className="h-4 w-4" />
                  <span>GeniusAI Learning Mentor</span>
                </div>
                <Badge variant="indigo" className="text-[9px] bg-white">Socratic Mentor</Badge>
              </div>

              {detectedErrorPattern && (
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-800 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <span>Observed Pattern: {detectedErrorPattern}</span>
                </div>
              )}

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                {aiChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl ${
                      msg.role === "ai"
                        ? "bg-white border border-[#C7D2FE] text-[#0F172A] shadow-sm"
                        : "bg-[#6366F1] text-white ml-4 shadow-sm"
                    }`}
                  >
                    <p className={`text-[10px] font-mono mb-0.5 ${msg.role === "ai" ? "text-[#6366F1] font-bold" : "text-indigo-200"}`}>
                      {msg.role === "ai" ? "GeniusAI Mentor" : "You"}
                    </p>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAskAI} className="flex gap-2 pt-2">
                <Input
                  className="h-9 text-xs bg-white border-[#C7D2FE] text-[#0F172A]"
                  placeholder="Ask a guiding question or explain your bug..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  disabled={aiLoading}
                />
                <Button type="submit" variant="primary" size="sm" disabled={aiLoading} className="h-9 px-3 text-xs bg-[#6366F1] hover:bg-indigo-700">
                  {aiLoading ? "..." : "Ask"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Code Editor & Console Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-white">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs text-[#64748B] font-mono">
            <span className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
              <Terminal className="h-3.5 w-3.5 text-[#2563EB]" /> logic_sandbox.js
            </span>
            <button
              onClick={() => setCode(moduleData.initialCode || "")}
              className="flex items-center gap-1 hover:text-[#0F172A] transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset Code
            </button>
          </div>

          {/* Code Textarea */}
          <div className="flex-1 p-4 bg-[#FFFFFF]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent font-mono text-xs sm:text-sm text-[#0F172A] resize-none outline-none leading-relaxed selection:bg-blue-100"
            />
          </div>

          {/* Console / Output Drawer */}
          <div className="h-44 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] font-bold">
              <span>Terminal & Execution Output</span>
              <button onClick={() => setConsoleOutput([])} className="hover:text-[#0F172A]">Clear</button>
            </div>
            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-1 text-[#334155]">
              {consoleOutput.length === 0 ? (
                <p className="text-[#94A3B8] italic">Click "Run Logic Simulation" above to execute code.</p>
              ) : (
                consoleOutput.map((line, i) => (
                  <p key={i} className={line.startsWith("✓") ? "text-[#10B981] font-bold" : line.startsWith("⚠️") ? "text-rose-600 font-bold" : "text-[#0F172A]"}>
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ROOT CAUSE ANALYSIS (RCA) MODAL */}
      {rcaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-xl rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <Bug className="h-5 w-5" />
                <h3 className="text-lg font-bold text-[#0F172A]">Log Root Cause Analysis (RCA)</h3>
              </div>
              <button onClick={() => setRcaOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">✕</button>
            </div>

            {rcaSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-[#10B981] mx-auto" />
                <h4 className="text-lg font-bold text-[#0F172A]">RCA Logged Successfully!</h4>
                <p className="text-xs text-[#10B981] font-mono font-bold">
                  Telemetry dynamically recalculated and pushed to Skill Graph™.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRcaSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">1. What was the bug or failure? *</label>
                  <Input
                    required
                    placeholder="e.g. Gravity loop did not stop at bottom boundary"
                    value={rcaForm.bugSummary}
                    onChange={(e) => setRcaForm({ ...rcaForm, bugSummary: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">2. Why did it happen? (Root Cause) *</label>
                  <Input
                    required
                    placeholder="e.g. Missing conditional boundary check before velocity accumulation"
                    value={rcaForm.rootCause}
                    onChange={(e) => setRcaForm({ ...rcaForm, rootCause: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">3. How did you resolve it? *</label>
                  <Input
                    required
                    placeholder="e.g. Added `if (player.y >= 300) player.vy = 0` constraint"
                    value={rcaForm.solution}
                    onChange={(e) => setRcaForm({ ...rcaForm, solution: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F172A]">4. What engineering lesson did you learn? *</label>
                  <Input
                    required
                    placeholder="e.g. Always bound physics velocities to prevent tunneling"
                    value={rcaForm.preventionLearned}
                    onChange={(e) => setRcaForm({ ...rcaForm, preventionLearned: e.target.value })}
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-[#E2E8F0]">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setRcaOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="emerald" size="sm">
                    Submit RCA & Update Telemetry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
