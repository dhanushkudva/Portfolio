"use client";

import React, { useState } from "react";
import { Terminal, ShieldAlert, ShieldCheck, Code2, Cpu, Wrench, CheckCircle2 } from "lucide-react";
import TiltCard from "./TiltCard";
import { playSound } from "@/lib/audio";

interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient" | "Core Foundation";
  experience: string;
  usage: string;
}

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "OFFENSIVE" | "DEFENSIVE" | "DEV">("ALL");

  const offensiveSkills: SkillItem[] = [
    {
      name: "Kali Linux",
      level: "Proficient",
      experience: "Primary OS for security labs & CTF competitions",
      usage: "Null Origin CTF, packet tracing, and vulnerable lab exploitation",
    },
    {
      name: "Penetration Testing",
      level: "Core Foundation",
      experience: "Web app and service vulnerability assessments",
      usage: "Hands-on vulnerability scanning and offensive security fundamentals",
    },
    {
      name: "Wireshark",
      level: "Proficient",
      experience: "Deep packet inspection and protocol forensics",
      usage: "Analysing TCP/UDP handshakes, HTTP payloads, and malware traffic captures",
    },
    {
      name: "Ubuntu & Linux Systems",
      level: "Proficient",
      experience: "Server management, permissions, and shell scripting",
      usage: "Daily driver, server configuration, bash automation",
    },
  ];

  const defensiveSkills: SkillItem[] = [
    {
      name: "SIEM Architecture",
      level: "Core Foundation",
      experience: "Security Information & Event Management pipelines",
      usage: "Telemetry aggregation, event correlation, and rule generation",
    },
    {
      name: "Threat Hunting",
      level: "Core Foundation",
      experience: "Proactive indicator of compromise (IoC) detection",
      usage: "Identifying suspicious persistence mechanisms and lateral movement",
    },
    {
      name: "Log Analysis",
      level: "Proficient",
      experience: "Web activity and server proxy forensic investigation",
      usage: "Deloitte Cyber Job Simulation breach investigation",
    },
    {
      name: "Incident Response",
      level: "Core Foundation",
      experience: "Breach triage, containment strategies, and reporting",
      usage: "Mitigation workflows for corporate simulation exercises",
    },
  ];

  const engineeringSkills: SkillItem[] = [
    {
      name: "Python",
      level: "Proficient",
      experience: "Scripting, exploit analysis, data parsing",
      usage: "Automating security tasks, data survey analytics, and coursework",
    },
    {
      name: "Java",
      level: "Proficient",
      experience: "Object-oriented software architecture and DSA",
      usage: "Core academic curriculum, robust backend logic and algorithms",
    },
    {
      name: "C++",
      level: "Core Foundation",
      experience: "Systems programming and memory management",
      usage: "Strengthening Data Structures & Algorithms and systems concepts",
    },
    {
      name: "C",
      level: "Core Foundation",
      experience: "Low-level hardware interfaces and pointers",
      usage: "Foundational computer architecture and low-level understanding",
    },
    {
      name: "GitHub & Version Control",
      level: "Proficient",
      experience: "Git branching, collaborative repositories, CI/CD",
      usage: "Open source contributions and repository version control",
    },
    {
      name: "VS Code & Development Tools",
      level: "Proficient",
      experience: "Custom debugging environment and extensions",
      usage: "Primary IDE for Python, Java, C++, and web development",
    },
  ];

  const marquee1 = [
    "KALI LINUX",
    "SIEM ARCHITECTURE",
    "PENETRATION TESTING",
    "WIRESHARK",
    "PYTHON",
    "JAVA",
    "THREAT HUNTING",
    "C++",
    "LOG ANALYSIS",
  ];

  const marquee2 = [
    "UBUNTU",
    "INCIDENT RESPONSE",
    "GITHUB",
    "VS CODE",
    "NETWORK SECURITY",
    "C PROGRAMMING",
    "DATA STRUCTURES",
    "SECURITY AUDITING",
  ];

  return (
    <section id="skills" className="relative py-28 border-t border-white/5 bg-[#05070A] overflow-hidden scroll-mt-24">
      {/* Top Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-16 space-y-3">
        <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
          <span>05 // ARSENAL &amp; CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          CYBER SECURITY &amp; TECHNICAL ARSENAL
        </h2>
        <p className="text-sm font-mono text-cyber-muted max-w-xl">
          Verified competencies across offensive penetration testing, defensive SIEM monitoring, and software engineering.
        </p>
      </div>

      {/* Infinite Opposite-Direction Marquees */}
      <div className="space-y-4 mb-20 pointer-events-none select-none opacity-85">
        {/* Row 1: Left */}
        <div className="flex overflow-hidden whitespace-nowrap bg-black/40 border-y border-white/5 py-3">
          <div className="flex animate-marquee space-x-8 text-sm sm:text-base font-mono font-bold tracking-widest text-gray-300">
            {marquee1.concat(marquee1).map((item, idx) => (
              <span key={idx} className="flex items-center space-x-3">
                <span className="text-cyber-crimson">#</span>
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block ml-4" />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Right (Reverse) */}
        <div className="flex overflow-hidden whitespace-nowrap bg-black/40 border-b border-white/5 py-3">
          <div className="flex animate-marquee-reverse space-x-8 text-sm sm:text-base font-mono font-bold tracking-widest text-cyber-crimson">
            {marquee2.concat(marquee2).map((item, idx) => (
              <span key={idx} className="flex items-center space-x-3">
                <span className="text-white">›</span>
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-crimson/30 inline-block ml-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Skills Cluster Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: "ALL", label: "ALL CAPABILITIES" },
            { id: "OFFENSIVE", label: "OFFENSIVE & RECON" },
            { id: "DEFENSIVE", label: "DEFENSIVE & SIEM" },
            { id: "DEV", label: "DEV & TOOLS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound("click");
                setActiveCategory(tab.id as typeof activeCategory);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                activeCategory === tab.id
                  ? "bg-cyber-crimson text-white border-cyber-crimson shadow-cyber-glow"
                  : "cyber-glass border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CLUSTER 1: OFFENSIVE */}
          {(activeCategory === "ALL" || activeCategory === "OFFENSIVE") && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/10 font-mono text-xs font-bold text-cyber-crimson">
                <ShieldAlert className="w-4 h-4" />
                <span>OFFENSIVE &amp; PENTESTING</span>
              </div>
              <div className="space-y-3">
                {offensiveSkills.map((s) => (
                  <TiltCard key={s.name} maxTilt={6}>
                    <div className="cyber-glass rounded-xl p-4 border border-white/10 hover:border-cyber-crimson/50 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white font-mono text-sm">
                          {s.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyber-crimson/15 text-cyber-crimson font-mono font-semibold">
                          {s.level}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 font-sans mt-1">
                        {s.experience}
                      </div>
                      <div className="text-[11px] font-mono text-cyber-dim mt-2 pt-2 border-t border-white/5">
                        PROOF: {s.usage}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          )}

          {/* CLUSTER 2: DEFENSIVE */}
          {(activeCategory === "ALL" || activeCategory === "DEFENSIVE") && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/10 font-mono text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>DEFENSIVE &amp; SIEM MONITORING</span>
              </div>
              <div className="space-y-3">
                {defensiveSkills.map((s) => (
                  <TiltCard key={s.name} maxTilt={6}>
                    <div className="cyber-glass rounded-xl p-4 border border-white/10 hover:border-emerald-500/50 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white font-mono text-sm">
                          {s.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono font-semibold">
                          {s.level}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 font-sans mt-1">
                        {s.experience}
                      </div>
                      <div className="text-[11px] font-mono text-cyber-dim mt-2 pt-2 border-t border-white/5">
                        PROOF: {s.usage}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          )}

          {/* CLUSTER 3: ENGINEERING */}
          {(activeCategory === "ALL" || activeCategory === "DEV") && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/10 font-mono text-xs font-bold text-cyber-cyan">
                <Code2 className="w-4 h-4" />
                <span>PROGRAMMING &amp; DEV TOOLS</span>
              </div>
              <div className="space-y-3">
                {engineeringSkills.map((s) => (
                  <TiltCard key={s.name} maxTilt={6}>
                    <div className="cyber-glass rounded-xl p-4 border border-white/10 hover:border-cyber-cyan/50 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white font-mono text-sm">
                          {s.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyber-cyan font-mono font-semibold">
                          {s.level}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 font-sans mt-1">
                        {s.experience}
                      </div>
                      <div className="text-[11px] font-mono text-cyber-dim mt-2 pt-2 border-t border-white/5">
                        PROOF: {s.usage}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
