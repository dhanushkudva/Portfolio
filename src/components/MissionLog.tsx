"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Check, Play, RefreshCw, Cpu } from "lucide-react";
import { playSound } from "@/lib/audio";

interface Mission {
  id: string;
  codename: string;
  date: string;
  operation: string;
  target: string;
  summary: string;
  logs: string[];
}

export default function MissionLog() {
  const missions: Mission[] = [
    {
      id: "ctf-null-origin",
      codename: "OP_NULL_ORIGIN_2026",
      date: "19-20 SEP 2026",
      operation: "International 24-Hour Capture The Flag",
      target: "creds.cyberhx.com [ID: NO-2026-6606C3]",
      summary:
        "Participated as an individual challenger in CyberHX's international 24-hour CTF. Solved multi-category challenges across reverse engineering, cryptography, forensics, and web penetration testing.",
      logs: [
        "19:00:00 [INIT] Connecting to Null Origin CTF v2.6 gateway...",
        "19:15:22 [AUTH] Operator verified: K Dhanush Kudva (ID: NO-2026-6606C3)",
        "21:40:10 [REVERSE] Decompiling target ELF binary; identified XOR key routine",
        "02:18:45 [CRYPTO] Decoded RSA ciphertext with factorized modulus",
        "06:30:12 [FORENSICS] Extracted hidden telemetry from PCAP network stream",
        "18:59:59 [STATUS] Competition finalized. 24 hours logged. Status: Certified Participant",
      ],
    },
    {
      id: "hackathon-nitk",
      codename: "OP_BUILD_FOR_BILLIONS",
      date: "26-27 SEP 2026",
      operation: "NITK Surathkal 24-Hour Offline Hackathon",
      target: "Team StarLight @ NITK Surathkal Campus",
      summary:
        "Qualified for the prestigious OFFLINE round at NITK Surathkal hosted by Web Enthusiasts' Club, Incubate, and IET NITK. Engaged in rapid software and systems prototyping under 24-hour deadline.",
      logs: [
        "09:00:00 [STAGE] Qualified online screening; admitted to NITK Surathkal campus",
        "10:30:00 [DEPLOY] Team StarLight initiated architecture sprint",
        "14:15:00 [ENG] Built distributed backend core with strict validation endpoints",
        "22:45:00 [DEFENSE] Hardened API against injection and unauthorized token escalation",
        "05:30:00 [INTEGRATION] Finalized end-to-end user workflows and stress tests",
        "09:00:00 [FINAL] 24-hour offline sprint presented to NITK evaluation panel",
      ],
    },
    {
      id: "deloitte-simulation",
      codename: "OP_DELOITTE_AU_TRIAGE",
      date: "OCTOBER 2026",
      operation: "Deloitte Australia Cyber Job Simulation (Forage)",
      target: "Corporate Web Activity Logs & Threat Vectors",
      summary:
        "Analysed web activity logs to identify suspicious user activity and anomalous data transfers. Authored security response guidance to support a simulated client under an active enterprise breach.",
      logs: [
        "00:00:00 [INGEST] Ingested 100k+ web access log records from perimeter reverse proxies",
        "00:15:30 [ANOMALY] Detected spike in anomalous POST requests to internal database endpoint",
        "00:32:10 [THREAT_HUNT] Isolated compromised IP addresses executing reconnaissance probes",
        "00:48:00 [CONTAINMENT] Outlined urgent network egress firewall rule quarantine",
        "01:05:00 [REPORT] Delivered incident analysis brief to executive steering committee",
      ],
    },
    {
      id: "hero-hcc-s10",
      codename: "OP_HERO_CAMPUS_CHALLENGE",
      date: "SEPTEMBER 2026",
      operation: "Hero Campus Challenge Season 10",
      target: "Hero MotoCorp Assessment Portal (Unstop)",
      summary:
        "Completed the nationwide online evaluation round in algorithmic problem solving and technical reasoning organized by Hero MotoCorp Limited.",
      logs: [
        "14:00:00 [PORTAL] Connected to Unstop Proctoring & Assessment engine",
        "14:15:20 [EVAL] Executed timed algorithmic problem set and logical analysis",
        "15:30:00 [SUBMIT] Completed test suite with high accuracy benchmarks",
        "15:30:05 [VERIFIED] Official Certificate of Participation generated",
      ],
    },
  ];

  const [activeMission, setActiveMission] = useState<Mission>(missions[0]);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    // Type out mission logs line by line
    setDisplayedLogs([]);
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index < activeMission.logs.length) {
        setDisplayedLogs((prev) => [...prev, activeMission.logs[index]]);
        playSound("terminal");
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [activeMission]);

  const selectMission = (m: Mission) => {
    playSound("click");
    setActiveMission(m);
  };

  return (
    <section id="missions" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A]/90 scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
            <span>04 // TACTICAL MISSION LOGS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            COMPETITIONS &amp; SECURITY DRILLS
          </h2>
          <p className="text-sm font-mono text-cyber-muted max-w-xl">
            Real-time typewriter telemetry from international CTFs, 24-hour on-campus hackathons, and corporate breach simulations.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="cyber-glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Top Terminal Title Bar */}
          <div className="bg-[#080D17] px-4 sm:px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-gray-400">
                bash :: /root/missions/{activeMission.codename.toLowerCase()}.log
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-bold">
                TELEMETRY STREAM LIVE
              </span>
            </div>
          </div>

          {/* Mission Tabs Navigation */}
          <div className="flex border-b border-white/10 overflow-x-auto bg-[#070B13]">
            {missions.map((m) => (
              <button
                key={m.id}
                onClick={() => selectMission(m)}
                className={`px-4 sm:px-6 py-3 font-mono text-xs font-semibold whitespace-nowrap transition-all border-r border-white/5 flex items-center space-x-2 ${
                  activeMission.id === m.id
                    ? "bg-cyber-crimson/15 text-cyber-crimson border-b-2 border-b-cyber-crimson font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{m.codename}</span>
              </button>
            ))}
          </div>

          {/* Terminal Main Body */}
          <div className="p-6 sm:p-8 space-y-6 font-mono">
            {/* Mission Overview Brief */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-cyber-muted">
                <div>
                  OPERATION:{" "}
                  <span className="text-white font-bold">{activeMission.operation}</span>
                </div>
                <div>
                  TIMELINE: <span className="text-cyber-crimson">{activeMission.date}</span>
                </div>
              </div>
              <div className="text-xs text-cyber-muted">
                TARGET / CREDENTIAL:{" "}
                <span className="text-emerald-400">{activeMission.target}</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-gray-300 pt-1 leading-relaxed">
                {activeMission.summary}
              </p>
            </div>

            {/* Typewriter Output Lines */}
            <div className="min-h-[220px] space-y-2.5 text-xs sm:text-sm text-gray-300 bg-black/60 p-5 rounded-xl border border-white/5">
              <div className="text-cyber-dim text-xs pb-2 border-b border-white/5 flex items-center justify-between">
                <span>&gt; EXECUTION_TRACE // TIMESTAMP [UTC+05:30]</span>
                {isTyping && (
                  <span className="text-cyber-crimson animate-pulse flex items-center space-x-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>DECRYPTING LOGS...</span>
                  </span>
                )}
              </div>

              {displayedLogs.map((log, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-cyber-crimson font-bold select-none">&gt;</span>
                  <span className="leading-relaxed font-mono">{log}</span>
                </div>
              ))}

              {isTyping && (
                <span className="inline-block w-2 h-4 bg-cyber-crimson animate-pulse align-middle" />
              )}
            </div>

            {/* Mission Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Mission telemetry authenticated against institutional records.</span>
              </div>
              <button
                onClick={() => {
                  setDisplayedLogs([]);
                  setIsTyping(true);
                  setTimeout(() => {
                    setDisplayedLogs(activeMission.logs);
                    setIsTyping(false);
                  }, 500);
                }}
                className="px-3 py-1.5 rounded border border-white/10 hover:border-cyber-crimson text-xs hover:text-white transition-all flex items-center space-x-1.5"
              >
                <Play className="w-3 h-3 text-cyber-crimson" />
                <span>Re-run Trace</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
