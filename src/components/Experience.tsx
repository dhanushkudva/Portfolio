"use client";

import React from "react";
import { Briefcase, Users, FileText, Calendar, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Experience() {
  const experiences = [
    {
      role: "Cyber Security Intern",
      organization: "Thaniya Technologies",
      location: "Mangaluru, Karnataka",
      period: "22 Jun 2026 – 22 Aug 2026 (8 Weeks)",
      status: "Completed",
      type: "Internship",
      details: [
        "8-week intensive cyber security industry internship at an MSME-registered enterprise.",
        "Actively contributed to practical cybersecurity and systems projects demonstrating analytical proficiency.",
        "Internship completion certificate issued on 04 Sep 2026, signed by Shailesh Shetty, Director.",
      ],
      certUrl: "/certs/thaniya-technologies-internship.pdf",
      highlight: true,
      tag: "INDUSTRY INTERNSHIP",
    },
    {
      role: "Member",
      organization: "ACM - NMAMIT",
      location: "Nitte, Karnataka",
      period: "Oct 2026 – Present",
      status: "Active",
      type: "Professional Body",
      details: [
        "Active student member of the Association for Computing Machinery (ACM) NMAMIT student chapter.",
        "Collaborating on computer science initiatives, hackathons, and algorithmic problem-solving workshops.",
      ],
      tag: "TECHNICAL COMMUNITY",
    },
    {
      role: "Community Lead & Documentation Team Member",
      organization: "COPE NMAMIT",
      location: "Nitte, Karnataka",
      period: "Aug 2026 – Present",
      status: "Active",
      type: "Community & Documentation",
      details: [
        "Leading community operations and formal documentation for institutional student initiatives.",
        "Orchestrating event workflows, official record-keeping, and cross-team communications.",
      ],
      tag: "LEADERSHIP & OPERATIONS",
    },
    {
      role: "Cultural Representative / Team Member",
      organization: "PROTON NMAMIT",
      location: "Nitte, Karnataka",
      period: "Jul 2026 – Present",
      status: "Active",
      type: "Department Committee",
      details: [
        "Official student representative in PROTON — the specialized Cyber Security Department Committee.",
        "Conducting and coordinating premier technical and non-technical flagship department events.",
      ],
      tag: "DEPT. COMMITTEE",
    },
  ];

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A] scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
            <span>02 // OPERATIONAL CHRONOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            EXPERIENCE &amp; LEADERSHIP TIMELINE
          </h2>
          <p className="text-sm font-mono text-cyber-muted max-w-xl">
            Verified industry training, institutional leadership, and cyber security department committee tenures.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Glowing Vertical Axis Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -ml-[1px] bg-gradient-to-b from-cyber-crimson via-cyber-crimson/40 to-transparent pointer-events-none" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.role + exp.organization}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8`}
                >
                  {/* Timeline Node Center Marker */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 rounded-full bg-[#05070A] border-2 border-cyber-crimson flex items-center justify-center z-10 shadow-cyber-glow">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-crimson animate-pulse" />
                  </div>

                  {/* Spacer for other side on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content (half width) */}
                  <div className="w-full pl-12 md:pl-0 md:w-1/2">
                    <TiltCard maxTilt={8}>
                      <div
                        className={`cyber-glass rounded-2xl p-6 sm:p-7 border ${
                          exp.highlight ? "border-cyber-crimson/50 shadow-cyber-glow" : "border-white/10"
                        } relative overflow-hidden`}
                      >
                        {/* Header badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded bg-cyber-crimson/15 border border-cyber-crimson/30 text-[10px] font-mono text-cyber-crimson font-bold">
                            {exp.tag}
                          </span>
                          <span className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{exp.status}</span>
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <h4 className="text-base font-semibold text-cyber-crimson font-mono mt-0.5">
                          {exp.organization}
                        </h4>

                        {/* Meta: Period & Location */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyber-muted mt-3 pb-4 border-b border-white/5">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Bullet Details */}
                        <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-300">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-cyber-crimson font-mono font-bold mt-0.5">›</span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Certificate link if present */}
                        {exp.certUrl && (
                          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-cyber-dim">
                              DOCUMENT SIGNED: SHAILESH SHETTY
                            </span>
                            <a
                              href={exp.certUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor-text="VIEW"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyber-crimson/20 border border-cyber-crimson/50 text-white text-xs font-mono hover:bg-cyber-crimson transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>VIEW CREDENTIAL</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
