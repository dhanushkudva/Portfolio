"use client";

import React, { useEffect, useState } from "react";
import { playSound } from "@/lib/audio";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [granted, setGranted] = useState<boolean>(false);
  const [isWiping, setIsWiping] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already booted this session
    try {
      if (sessionStorage.getItem("kdk_boot_passed") === "1") {
        onComplete();
        return;
      }
    } catch {}

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKey);

    const bootSteps = [
      "> initializing kernel :: secure_boot_v2.4...",
      "> loading cryptographic modules [AES-256-GCM, SHA-384]...",
      "> analyzing visitor environment: remote_client_connected",
      "> mounting defense protocol: SIEM_INGEST_READY",
      "> verifying credentials: K DHANUSH KUDVA [NMAMIT CYBER SECURITY]",
      "> authorization clearance verified.",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSteps.length) {
        setLogs((prev) => [...prev, bootSteps[currentStep]]);
        setProgress(Math.round(((currentStep + 1) / bootSteps.length) * 85));
        playSound("terminal");
        currentStep++;
      } else {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setGranted(true);
          playSound("access");
          setTimeout(() => {
            setIsWiping(true);
            try {
              sessionStorage.setItem("kdk_boot_passed", "1");
            } catch {}
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 800);
        }, 300);
      }
    }, 280);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onComplete]);

  const handleSkip = () => {
    playSound("access");
    setIsWiping(true);
    try {
      sessionStorage.setItem("kdk_boot_passed", "1");
    } catch {}
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-cyber-bg flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 font-mono ${
        isWiping ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top telemetry header */}
      <div className="flex justify-between items-center text-xs text-cyber-muted/80 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-crimson animate-ping" />
          <span className="text-white font-bold tracking-widest uppercase">
            SEC_SYS_TERMINAL // KDK-NODE-01
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="px-3 py-1 text-xs border border-cyber-crimson/50 text-cyber-crimson hover:bg-cyber-crimson hover:text-white transition-all uppercase tracking-wider rounded"
        >
          [ Skip Boot ]
        </button>
      </div>

      {/* Center Console Output */}
      <div className="max-w-2xl w-full mx-auto my-auto py-8">
        <div className="mb-4 text-xs text-cyber-dim tracking-wider">
          PORTFOLIO BOOT SEQUENCE // NMAMIT CYBERSECURITY RESEARCH
        </div>

        <div className="space-y-2 text-sm sm:text-base text-gray-300 min-h-[180px]">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-cyber-crimson font-bold">#</span>
              <span className={idx === logs.length - 1 ? "text-white font-semibold" : "text-gray-400"}>
                {log}
              </span>
            </div>
          ))}
          {!granted && (
            <div className="flex items-center space-x-2 text-cyber-crimson animate-pulse">
              <span>_</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs text-cyber-muted mb-2 font-mono">
            <span>INTEGRITY_CHECK</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-900 rounded overflow-hidden">
            <div
              className="h-full bg-cyber-crimson transition-all duration-200 shadow-cyber-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Access Granted Flash */}
        {granted && (
          <div className="mt-8 p-4 bg-cyber-crimson/10 border border-cyber-crimson rounded text-center animate-bounce">
            <h1 className="text-2xl sm:text-4xl font-black text-cyber-crimson tracking-widest font-mono shadow-cyber-glow">
              &gt;&gt; ACCESS GRANTED &lt;&lt;
            </h1>
            <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">
              Identity Confirmed: K Dhanush Kudva | Security Clearance Level 1
            </p>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="flex justify-between items-center text-[11px] text-gray-500 border-t border-white/10 pt-4">
        <span>SECURITY LEVEL: RESEARCHER</span>
        <span>KARNATAKA, INDIA [UTC+05:30]</span>
      </div>
    </div>
  );
}
