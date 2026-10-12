"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, X } from "lucide-react";
import { playSound } from "@/lib/audio";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiBreach() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isBreached, setIsBreached] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === "b" ? "b" : e.key.toLowerCase() === "a" ? "a" : e.key;

      setKeySequence((prev) => {
        const next = [...prev, key].slice(-KONAMI_CODE.length);
        const matches = KONAMI_CODE.every(
          (k, idx) => next[idx]?.toLowerCase() === k.toLowerCase()
        );

        if (matches) {
          setIsBreached(true);
          playSound("glitch");
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isBreached) return null;

  return (
    <div
      className="fixed inset-0 z-[10003] bg-red-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 font-mono select-none"
      onClick={() => setIsBreached(false)}
    >
      <div
        className="max-w-2xl w-full p-8 rounded-3xl bg-black/80 border-2 border-red-500 shadow-[0_0_80px_rgba(255,42,61,0.8)] space-y-6 relative overflow-hidden animate-glitch"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500 flex items-center justify-center mx-auto text-red-500 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-red-500 tracking-widest uppercase">
            &gt;&gt; SYSTEM BREACH DETECTED &lt;&lt;
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-mono">
            KONAMI OVERRIDE VECTOR ACCEPTED // PROTOCOL 0x99 ACTIVATED
          </p>
        </div>

        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-left text-gray-200 space-y-1">
          <div>[ALERT] Zero-day anomaly triggered by operator keystrokes.</div>
          <div>[STATUS] Firewall bypassed. Elevated clearance assigned to visitor.</div>
          <div>[IDENTITY] K Dhanush Kudva :: Certified Defense Analyst.</div>
          <div>[ACTION] Direct contact unlocked: <span className="text-red-400 font-bold">dhanushkudvaofficial@gmail.com</span></div>
        </div>

        <button
          onClick={() => setIsBreached(false)}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-cyber-glow"
        >
          [ Restore Normal State ]
        </button>
      </div>
    </div>
  );
}
