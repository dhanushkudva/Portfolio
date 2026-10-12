"use client";

import React from "react";
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Education() {
  const educationHistory = [
    {
      institution: "NMAM Institute of Technology, Nitte",
      degree: "Bachelor of Technology — B.Tech in CSE (Cyber Security)",
      period: "Aug 2025 – Jul 2029",
      grade: "CGPA 8.24",
      gradeLabel: "Current CGPA",
      location: "Nitte, Karnataka",
      highlight: true,
      notes: [
        "Specialized curriculum in cybersecurity architectures, network protocols, operating systems, and SIEM.",
        "Strengthening Data Structures & Algorithms (DSA) with Python, Java, and C++.",
        "Active member of ACM NMAMIT, Community Lead for COPE, and PROTON Cyber Security department committee.",
      ],
    },
    {
      institution: "Vivekananda Pre-University College, Puttur",
      degree: "Pre-University Examination (Higher Secondary Science)",
      period: "2023 – 2025",
      grade: "86.00%",
      gradeLabel: "Final Percentage",
      location: "Puttur, Karnataka",
      highlight: false,
      notes: [
        "Rigorous foundation in mathematics, physics, and computer fundamentals.",
        "Founder & Leader — Established the college's first-ever college band troop (Veera Savarkar Band Troop).",
        "Key leadership coordinator for multi-day institutional and cultural events.",
      ],
    },
    {
      institution: "Vivekananda English Medium School, Puttur",
      degree: "Secondary School Examination (10th Standard)",
      period: "Completed 2023",
      grade: "92.16%",
      gradeLabel: "Final Percentage",
      location: "Puttur, Karnataka",
      highlight: false,
      notes: [
        "Graduated with distinction and academic honors (92.16%).",
        "Active participant in public speaking, state-level competitions, and student council activities.",
      ],
    },
  ];

  return (
    <section id="education" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A] scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
            <span>07 // ACADEMIC RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            EDUCATION &amp; FOUNDATIONS
          </h2>
          <p className="text-sm font-mono text-cyber-muted max-w-xl">
            Verified academic milestones and performance benchmarks from primary education through B.Tech CSE (Cyber Security).
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {educationHistory.map((edu) => (
            <TiltCard key={edu.institution} maxTilt={6}>
              <div
                className={`cyber-glass rounded-2xl p-6 sm:p-8 border ${
                  edu.highlight
                    ? "border-cyber-crimson/50 shadow-cyber-glow"
                    : "border-white/10"
                } relative overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {/* Left Column: Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-cyber-crimson/15 border border-cyber-crimson/30 flex items-center justify-center text-cyber-crimson">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {edu.institution}
                        </h3>
                        <div className="text-sm sm:text-base font-semibold text-cyber-crimson font-mono mt-0.5">
                          {edu.degree}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyber-muted pt-1">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="pt-3 space-y-1.5 text-xs sm:text-sm text-gray-300">
                      {edu.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-cyber-crimson font-mono">›</span>
                          <span className="leading-relaxed">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Grade Score Badge */}
                  <div className="shrink-0 flex md:flex-col items-center justify-center p-4 rounded-xl bg-black/50 border border-white/10 text-center min-w-[140px]">
                    <div className="font-mono text-3xl sm:text-4xl font-black text-white">
                      {edu.grade}
                    </div>
                    <div className="text-[10px] font-mono text-cyber-crimson font-bold uppercase tracking-wider mt-1">
                      {edu.gradeLabel}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
