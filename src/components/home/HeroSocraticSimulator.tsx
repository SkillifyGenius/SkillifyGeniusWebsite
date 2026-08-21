"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { 
  Play, 
  Terminal, 
  RefreshCw, 
  Sparkles,
  Gamepad2,
  Compass,
  Zap,
  ShieldAlert,
  Trophy,
  ArrowRight
} from "lucide-react";

interface GameState {
  energy: number;
  crystals: number;
  health: number;
  sector: string;
  step: number;
  gameStatus: "idle" | "playing" | "won" | "lost";
}

export function HeroSocraticSimulator() {
  const [gameState, setGameState] = useState<GameState>({
    energy: 100,
    crystals: 0,
    health: 100,
    sector: "Landing Zone (Alpha)",
    step: 0,
    gameStatus: "idle",
  });

  const [inputVal, setInputVal] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Python 3.12.0 (main, interactive game runtime)",
    "[Loaded File] mars_adventure.py",
    "Press 'Run Python Game' below to start your mission!",
  ]);

  const handleStartGame = () => {
    setGameState({
      energy: 100,
      crystals: 0,
      health: 100,
      sector: "Landing Zone (Alpha)",
      step: 1,
      gameStatus: "playing",
    });
    setTerminalLogs([
      "==================================================",
      " 🚀 MARS ROVER TEXT-BASED ADVENTURE (v1.0) ",
      "==================================================",
      "> python mars_adventure.py",
      "🛰️ Rover OS booted. Mission: Collect 3 Martian Power Crystals.",
      "📍 Current Sector: Landing Zone (Alpha)",
      "🔋 Energy: 100% | ❤️ Health: 100% | 💎 Crystals: 0/3",
      "",
      "What is your next action?",
      " [1] Scan Sector for Alien Mineral Signals",
      " [2] Drive North into Red Sand Dunes",
      " [3] Deploy Solar Panels to recharge",
    ]);
  };

  const handleAction = (choice: number) => {
    if (gameState.gameStatus !== "playing") return;

    if (gameState.step === 1) {
      if (choice === 1) {
        setGameState((prev) => ({
          ...prev,
          energy: prev.energy - 15,
          crystals: prev.crystals + 1,
          step: 2,
          sector: "Crystal Valley",
        }));
        setTerminalLogs((prev) => [
          ...prev,
          "> Action: [1] Scan Sector for Alien Mineral Signals",
          "🔍 Sonar scan pulse sent...",
          "✨ PING! Glowing Martian Quartz discovered under a ridge!",
          "💎 Crystal collected! (Total: 1/3) | Energy: 85%",
          "",
          "📍 Current Sector: Crystal Valley",
          "⚠️ Warning: A Martian Dust Storm is approaching from the East!",
          "What is your next action?",
          " [1] Activate Magnetic Forcefield (Cost: 20% Energy)",
          " [2] Rush South to take shelter in Lava Tubes",
          " [3] Ignore storm & drill deeper for crystals",
        ]);
      } else if (choice === 2) {
        setGameState((prev) => ({
          ...prev,
          energy: prev.energy - 25,
          health: prev.health - 15,
          step: 2,
          sector: "Deep Sand Dunes",
        }));
        setTerminalLogs((prev) => [
          ...prev,
          "> Action: [2] Drive North into Red Sand Dunes",
          "⚠️ Wheels slipped in loose Martian silt! Hull damage -15%",
          "📍 Sector: Deep Sand Dunes | Energy: 75% | Health: 85%",
          "",
          "What is your next action?",
          " [1] Reverse thrusters & scan for hard ground",
          " [2] Deploy anchor hooks & collect surface minerals",
          " [3] Call orbital satellite for emergency map",
        ]);
      } else {
        setGameState((prev) => ({
          ...prev,
          energy: 100,
          step: 1,
        }));
        setTerminalLogs((prev) => [
          ...prev,
          "> Action: [3] Deploy Solar Panels",
          "☀️ Solar array extended. Full direct sunlight absorbed!",
          "🔋 Energy restored to 100%!",
          "Choose your next exploration move: [1] Scan, [2] Drive North",
        ]);
      }
    } else if (gameState.step === 2) {
      if (choice === 1 || choice === 2) {
        setGameState((prev) => ({
          ...prev,
          energy: prev.energy - 20,
          crystals: prev.crystals + 2,
          step: 3,
          sector: "Ancient Crater Base",
          gameStatus: "won",
        }));
        setTerminalLogs((prev) => [
          ...prev,
          `> Action: [${choice}] Safe evasive maneuver executed!`,
          "🛡️ Successfully bypassed the dust storm without catastrophic damage!",
          "🎉 Sonar detected a massive ancient crystal geode at Crater Base!",
          "💎💎 +2 Crystals extracted! Total Crystals: 3/3!",
          "==================================================",
          " 🏆 MISSION COMPLETE: YOU WON THE MARS CHALLENGE! ",
          "==================================================",
          "🚀 Rover Curiosity safely returned to base with all samples.",
          "Click 'Play Again' to test other decision paths!",
        ]);
      } else {
        setGameState((prev) => ({
          ...prev,
          health: 0,
          energy: 0,
          gameStatus: "lost",
        }));
        setTerminalLogs((prev) => [
          ...prev,
          "> Action: [3] Ignore storm & drill deeper",
          "💥 CRITICAL: 120km/h dust gale battered the communication mast!",
          "❌ Rover power supply overloaded. Mission Failed.",
          "Click 'Play Again' to restart and try a better survival strategy!",
        ]);
      }
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputVal.trim());
    if (num >= 1 && num <= 3) {
      handleAction(num);
    }
    setInputVal("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[24px] border border-slate-800 bg-[#0B1120] text-slate-200 shadow-[0_25px_70px_rgba(15,23,42,0.25)] overflow-hidden text-left font-sans">
      {/* 1. macOS Top Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F172A] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/90" />
          <div className="h-3 w-3 rounded-full bg-amber-500/90" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
          <span className="ml-3 text-xs font-mono text-slate-300 hidden sm:inline flex items-center gap-2">
            <span className="text-yellow-400 font-bold">🐍</span> mars_adventure.py — (Interactive Python Text Game)
          </span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 text-[11px] font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">PYTHON 3.12 RUNTIME</span>
        </div>
      </div>

      {/* 2. Main Game Workspace: Left Code (6 cols) | Right Interactive Game Terminal (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left 6 Cols: Authentic Python Code */}
        <div className="lg:col-span-6 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto space-y-1 text-slate-300 bg-[#070B14]">
          <div className="text-slate-500"># mars_adventure.py - Interactive Text Game</div>
          <div><span className="text-purple-400">import</span> random</div>
          <div className="pt-1"><span className="text-purple-400">class</span> <span className="text-yellow-300">MarsMission</span>:</div>
          <div className="pl-4">
            <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-red-300">self</span>):
          </div>
          <div className="pl-8"><span className="text-red-300">self</span>.energy = <span className="text-orange-300">100</span></div>
          <div className="pl-8"><span className="text-red-300">self</span>.crystals = <span className="text-orange-300">0</span></div>
          <div className="pl-8"><span className="text-red-300">self</span>.health = <span className="text-orange-300">100</span></div>
          <div className="pl-8"><span className="text-red-300">self</span>.sector = <span className="text-emerald-300">"Landing Zone"</span></div>

          <div className="pt-2 pl-4">
            <span className="text-purple-400">def</span> <span className="text-blue-400">explore</span>(<span className="text-red-300">self</span>, choice: <span className="text-emerald-400">int</span>):
          </div>
          <div className="pl-8 text-emerald-400 bg-emerald-950/30 py-0.5 px-1 rounded border border-emerald-800/40">
            <span className="text-purple-400">if</span> choice == <span className="text-orange-300">1</span>:  <span className="text-slate-500 font-normal"># Mineral Sonar Scan</span>
          </div>
          <div className="pl-12"><span className="text-red-300">self</span>.crystals += <span className="text-orange-300">1</span></div>
          <div className="pl-12"><span className="text-red-300">self</span>.energy -= <span className="text-orange-300">15</span></div>
          <div className="pl-8">
            <span className="text-purple-400">elif</span> choice == <span className="text-orange-300">2</span>: <span className="text-slate-500 font-normal"># Navigate Dunes</span>
          </div>
          <div className="pl-12"><span className="text-red-300">self</span>.health -= <span className="text-orange-300">15</span></div>
          <div className="pl-8">
            <span className="text-purple-400">elif</span> choice == <span className="text-orange-300">3</span>: <span className="text-slate-500 font-normal"># Solar Recharge</span>
          </div>
          <div className="pl-12"><span className="text-red-300">self</span>.energy = <span className="text-orange-300">100</span></div>

          <div className="pt-2 pl-4">
            <span className="text-purple-400">def</span> <span className="text-blue-400">check_win</span>(<span className="text-red-300">self</span>) -&gt; <span className="text-emerald-400">bool</span>:
          </div>
          <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-red-300">self</span>.crystals &gt;= <span className="text-orange-300">3</span> <span className="text-purple-400">and</span> <span className="text-red-300">self</span>.health &gt; <span className="text-orange-300">0</span></div>

          <div className="pt-3 text-slate-500"># Game Loop Controller</div>
          <div>mission = <span className="text-yellow-300">MarsMission</span>()</div>
          <div><span className="text-purple-400">while</span> <span className="text-purple-400">not</span> mission.check_win():</div>
          <div className="pl-4">action = <span className="text-blue-400">int</span>(<span className="text-blue-400">input</span>(<span className="text-emerald-300">"Choose (1-3): "</span>))</div>
          <div className="pl-4">mission.explore(action)</div>
        </div>

        {/* Right 6 Cols: Interactive Playable Terminal */}
        <div className="lg:col-span-6 p-4 bg-[#090D16] flex flex-col justify-between space-y-3 font-mono text-[11px]">
          {/* Terminal Top Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-[#2563EB]" />
                <span className="font-bold text-slate-200">Interactive Game Terminal</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-amber-400 font-bold">🔋 {gameState.energy}%</span>
                <span className="text-emerald-400 font-bold">💎 {gameState.crystals}/3</span>
                <span className="text-red-400 font-bold">❤️ {gameState.health}%</span>
              </div>
            </div>

            {/* Terminal Log Output Window */}
            <div className="space-y-1 overflow-y-auto max-h-[220px] text-slate-300 pr-1 scrollbar-thin">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith(" 🏆") || log.startsWith("✨") || log.startsWith("🎉")
                      ? "text-emerald-400 font-bold"
                      : log.startsWith("⚠️") || log.startsWith("💥") || log.startsWith("❌")
                      ? "text-amber-400 font-semibold"
                      : log.startsWith(">")
                      ? "text-blue-400 font-semibold"
                      : log.startsWith("=")
                      ? "text-slate-600"
                      : log.startsWith(" [")
                      ? "text-yellow-300 font-medium"
                      : "text-slate-300"
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Game Controls */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            {gameState.gameStatus === "idle" ? (
              <Button
                onClick={handleStartGame}
                variant="primary"
                size="md"
                className="w-full gap-2 bg-[#2563EB] hover:bg-blue-600 font-bold text-xs font-sans"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Run Python Game & Play in Browser</span>
              </Button>
            ) : gameState.gameStatus === "playing" ? (
              <div className="space-y-2">
                <div className="text-[11px] font-sans font-bold text-slate-300">
                  Select your Python decision action:
                </div>
                
                {/* 3 Quick Action Interactive Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleAction(1)}
                    className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-800/80 text-blue-200 text-[11px] font-bold text-center transition-all hover:scale-[1.02]"
                  >
                    Action [ 1 ]
                  </button>
                  <button
                    onClick={() => handleAction(2)}
                    className="p-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-800/80 text-amber-200 text-[11px] font-bold text-center transition-all hover:scale-[1.02]"
                  >
                    Action [ 2 ]
                  </button>
                  <button
                    onClick={() => handleAction(3)}
                    className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-200 text-[11px] font-bold text-center transition-all hover:scale-[1.02]"
                  >
                    Action [ 3 ]
                  </button>
                </div>

                {/* Or type choice */}
                <form onSubmit={handleInputSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Or type 1, 2, or 3 and hit enter..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <Button type="submit" variant="outline" size="sm" className="border-slate-700 text-xs text-slate-300">
                    Send
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleStartGame}
                  variant="primary"
                  size="sm"
                  className="w-full gap-2 bg-[#10B981] hover:bg-emerald-600 font-bold text-xs font-sans"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Play Again (Restart Python Game)</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
