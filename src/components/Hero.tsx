"use client";

import React from "react";
import { ArrowDown, Shield, Terminal, Award, Mail, ExternalLink } from "lucide-react";
import Hero3D from "./Hero3D";
import DecryptedText from "./DecryptedText";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-crimson/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & Clearance Badges (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          {/* Top Telemetry Tag */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-cyber-muted">
            <span className="px-2.5 py-1 rounded bg-cyber-surface border border-white/10 text-gray-300 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-crimson animate-ping" />
              <span>CLEARANCE: LEVEL 1</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-cyber-surface border border-white/10 text-gray-300">
              NMAMIT NITTE // 2025-2029
            </span>
            <span className="px-2.5 py-1 rounded bg-cyber-surface border border-white/10 text-emerald-400">
              CGPA 8.24
            </span>
          </div>

          {/* Decrypting Hero Name Headline */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-mono tracking-widest text-cyber-crimson uppercase font-semibold">
              // IDENTITY_VERIFIED_OPERATOR
            </h2>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter text-white uppercase leading-[1.05]">
              <DecryptedText
                text="K DHANUSH KUDVA"
                className="hover:text-cyber-crimson transition-colors"
                scrambleOnMount={true}
              />
            </h1>
          </div>

          {/* Subtitle / Headline from verified facts */}
          <p className="text-lg sm:text-xl font-medium text-gray-300 max-w-2xl leading-relaxed">
            Cyber Security Student{" "}
            <span className="text-white font-semibold">@NMAMIT</span>{" "}
            <span className="text-cyber-crimson font-mono">•</span> Kali Linux{" "}
            <span className="text-cyber-crimson font-mono">•</span> SIEM{" "}
            <span className="text-cyber-crimson font-mono">•</span> Python{" "}
            <span className="text-cyber-crimson font-mono">•</span> Java
          </p>

          {/* Compact Bio snippet */}
          <p className="text-sm sm:text-base text-cyber-muted max-w-xl font-normal leading-relaxed">
            Focused on penetration testing, threat hunting, and SIEM monitoring. Strengthening core DSA while engineering practical security solutions. Open to cyber security internships.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <a
                href="#credentials"
                data-cursor-text="VAULT"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyber-crimson text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-cyber-glow hover:bg-cyber-crimsonGlow transition-all text-center"
              >
                <Award className="w-4 h-4 shrink-0" />
                <span>CREDENTIALS VAULT</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <a
                href="#contact"
                data-cursor-text="CONNECT"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl cyber-glass border border-white/15 text-gray-200 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-cyber-crimson hover:text-white transition-all flex items-center justify-center space-x-2 text-center"
              >
                <Mail className="w-4 h-4 text-cyber-crimson shrink-0" />
                <span>INITIATE CONTACT</span>
              </a>
            </Magnetic>

            <div className="flex justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/kdhanushkudva/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LINKEDIN"
                className="p-3.5 rounded-xl cyber-glass border border-white/10 text-gray-400 hover:text-white hover:border-cyber-crimson/50 transition-all flex items-center justify-center"
                aria-label="LinkedIn profile of K Dhanush Kudva"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Micro Telemetry Ticker */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-6 text-[11px] font-mono text-gray-500">
            <div>
              <span className="text-gray-400">LOCATION:</span> Karnataka, India
            </div>
            <div>
              <span className="text-gray-400">FOCUS:</span> Threat Hunting & Pentesting
            </div>
            <div>
              <span className="text-gray-400">STATUS:</span>{" "}
              <span className="text-emerald-400">AVAILABLE FOR INTERNSHIPS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Cyber Shield (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full relative aspect-square max-w-[500px] flex items-center justify-center">
            {/* Ambient Shield Base Glow */}
            <div className="absolute inset-0 rounded-full border border-cyber-crimson/20 animate-pulse pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/10 pointer-events-none animate-radar-sweep" />

            {/* 3D Canvas Element */}
            <Hero3D />

            {/* Floating Cyber Badges */}
            <div className="absolute -bottom-2 -left-2 cyber-glass p-3 rounded-xl border border-white/10 shadow-2xl font-mono text-xs hidden sm:flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyber-crimson" />
              <div>
                <div className="text-[10px] text-gray-400">SYSTEM DEFENSE</div>
                <div className="text-white font-bold">ACTIVE PROTOCOLS</div>
              </div>
            </div>

            <div className="absolute -top-2 -right-2 cyber-glass p-3 rounded-xl border border-white/10 shadow-2xl font-mono text-xs hidden sm:flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-gray-400">VERIFIED CTF</div>
                <div className="text-emerald-400 font-bold">NULL ORIGIN 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
          SCROLL TO INVESTIGATE
        </span>
        <ArrowDown className="w-4 h-4 text-cyber-crimson animate-bounce" />
      </div>
    </section>
  );
}
