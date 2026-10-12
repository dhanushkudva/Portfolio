"use client";

import React, { useRef, useEffect, useState } from "react";
import { ShieldCheck, UserCheck, Code, Globe, Terminal, Cpu } from "lucide-react";
import TiltCard from "./TiltCard";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsScrolled, setStatsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        setStatsScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "8.24", label: "CURRENT CGPA", sub: "NMAMIT B.Tech CSE" },
    { value: "50", label: "SURVEY RESPONDENTS", sub: "CAMPCO Ltd. Project" },
    { value: "8", label: "WEEKS INTERNSHIP", sub: "Thaniya Technologies" },
    { value: "24h", label: "NITK HACKATHON", sub: "Build for Billions Finalist" },
    { value: "24h", label: "INTERNATIONAL CTF", sub: "Null Origin Participant" },
  ];

  const languages = [
    { name: "Konkani", badge: "Mother Tongue" },
    { name: "Tulu", badge: "Native" },
    { name: "English", badge: "Professional" },
    { name: "Kannada", badge: "Fluent" },
    { name: "Hindi", badge: "Fluent" },
  ];

  const bioWords = [
    "B.Tech", "CSE", "(Cyber Security)", "student", "at", "NMAM", "Institute", "of", "Technology,",
    "Nitte", "(Aug 2025 - Jul 2029),", "with", "a", "CGPA", "of", "8.24.",
    "Deeply", "focused", "on", "penetration", "testing,", "threat", "hunting,", "and", "SIEM", "monitoring.",
    "Constantly", "strengthening", "Data", "Structures", "&", "Algorithms", "while", "building", "a", "rock-solid", "foundation", "in", "practical", "cybersecurity.",
    "Eager", "to", "learn,", "participate", "in", "high-stakes", "technical", "events,", "and", "drive", "impact", "through", "collaborative", "teamwork", "and", "leadership."
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A]/80 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
            <span>01 // DOSSIER & PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            ARCHITECTING DEFENSIVE &amp; OFFENSIVE READINESS
          </h2>
        </div>

        {/* Word-by-Word Kinetic Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl cyber-glass border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-crimson/5 rounded-full blur-3xl pointer-events-none" />
              <div className="text-xs font-mono text-cyber-muted mb-4 flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-cyber-crimson" />
                <span>BIOGRAPHICAL TELEMETRY STREAM</span>
              </div>
              <p className="text-xl sm:text-2xl font-light text-gray-200 leading-relaxed font-sans flex flex-wrap gap-x-2 gap-y-1.5">
                {bioWords.map((word, i) => (
                  <span
                    key={i}
                    className="transition-colors duration-300 hover:text-cyber-crimson hover:font-medium"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Spoken Languages Badges */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Linguistic Capabilities</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="px-4 py-2 rounded-xl cyber-glass border border-white/10 flex items-center space-x-2 font-mono text-xs hover:border-cyber-cyan/50 transition-all"
                  >
                    <span className="text-white font-semibold">{lang.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-cyber-muted">
                      {lang.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Card / Security Credentials Holo Badge (5 cols) */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={10}>
              <div className="cyber-glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-cyber-card relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyber-crimson/15 border border-cyber-crimson/30 flex items-center justify-center text-cyber-crimson">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-white tracking-wide">
                        OPERATOR BADGE
                      </h3>
                      <div className="text-[10px] font-mono text-cyber-muted">
                        SECURITY CLEARANCE ID: KDK-2026
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                    ACTIVE
                  </span>
                </div>

                {/* Avatar Hologram Placeholder */}
                <div className="relative aspect-[4/3] rounded-xl bg-[#090D16] border border-white/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden mb-6 group">
                  <div className="absolute inset-0 cyber-grid-dense opacity-30" />
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-cyber-crimson/20 border border-cyber-crimson/50 flex items-center justify-center text-white mb-3 shadow-cyber-glow group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-10 h-10 text-cyber-crimson" />
                  </div>
                  <div className="relative z-10 font-mono text-sm font-bold text-white">
                    K DHANUSH KUDVA
                  </div>
                  <div className="relative z-10 text-xs font-mono text-cyber-muted mt-1">
                    B.Tech CSE (Cyber Security) @ NMAMIT
                  </div>
                  <div className="relative z-10 mt-2 text-[10px] font-mono text-cyber-dim uppercase">
                    [ Photo placeholder // LinkedIn profile connected ]
                  </div>
                </div>

                {/* Profile Key Attributes */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-gray-400">INSTITUTION</span>
                    <span className="text-white font-medium text-right">NMAMIT Nitte</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-gray-400">BATCH</span>
                    <span className="text-white font-medium">Aug 2025 - Jul 2029</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-gray-400">BASE LOCATION</span>
                    <span className="text-white font-medium">Karnataka, India</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">CORE FOCUS</span>
                    <span className="text-cyber-crimson font-semibold">Pentesting &amp; Threat Hunting</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Count-Up Key Metrics Grid */}
        <div className="pt-8">
          <div className="text-xs font-mono text-cyber-muted mb-6 uppercase tracking-widest flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-cyber-crimson" />
            <span>VERIFIED PERFORMANCE METRICS</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl cyber-glass border border-white/10 hover:border-cyber-crimson/40 transition-all text-left group"
              >
                <div className="font-mono text-3xl sm:text-4xl font-black text-white group-hover:text-cyber-crimson transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-bold text-gray-300 mt-2 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[11px] font-mono text-cyber-muted mt-1">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
