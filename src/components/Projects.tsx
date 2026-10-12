"use client";

import React, { useState } from "react";
import { FolderGit2, BarChart3, Coffee, ShieldAlert, CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";
import { playSound } from "@/lib/audio";

interface ProjectData {
  id: string;
  title: string;
  type: string;
  year: string;
  client: string;
  overview: string;
  keyMetrics: string[];
  skills: string[];
  status: "Completed" | "In Active Development";
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: ProjectData[] = [
    {
      id: "campco-survey",
      title: "Employee Job Satisfaction Survey",
      type: "Community Engagement Project",
      year: "2025",
      client: "CAMPCO Ltd. (Puttur)",
      overview:
        "Conducted an empirical survey-based research study involving 50 active industrial employees at CAMPCO Ltd. Collected, parsed, and interpreted data across workload pressures, institutional recognition, professional growth trajectories, workplace safety culture, and work-life balance.",
      keyMetrics: [
        "Sample size: 50 active industrial employees",
        "Key vectors: Workload, recognition, growth, work-life balance",
        "Deliverable: Comprehensive analytical research report with actionable findings",
        "Core competencies: Research methodology, statistical analysis, professional communication",
      ],
      skills: ["Data Collection", "Statistical Analysis", "Research Methodology", "Organizational Psychology"],
      status: "Completed",
    },
    {
      id: "campco-manufacturing",
      title: "History & Industrial Processing of Chocolate Products",
      type: "Personal Learning & Industrial Research Project",
      year: "2025",
      client: "CAMPCO Ltd. Manufacturing Division",
      overview:
        "Independent academic and industrial research exploring the evolution of cocoa processing and CAMPCO's automated confectionery manufacturing pipelines. Investigated bean grading, roasting, conching, refining, and rigorous food quality-assurance benchmarks.",
      keyMetrics: [
        "In-depth investigation of automated confectionery manufacturing pipelines",
        "Mapped end-to-end processing: Roasting, refining, conching, tempering, packaging",
        "Documented quality control practices, temperature modulation, and hygiene compliance",
        "Synthesized technical observations into an educational monograph",
      ],
      skills: ["Industrial Workflow Mapping", "Quality Control Auditing", "Technical Documentation", "Independent Research"],
      status: "Completed",
    },
    {
      id: "cyber-research-lab",
      title: "Cyber Security Lab & CTF Writeup Vault",
      type: "Applied Security Research",
      year: "2026",
      client: "Independent / NMAMIT Cybersecurity Dept",
      overview:
        "Personal security testing ground focused on reproducing Null Origin CTF vectors, configuring defensive SIEM detection rules, analyzing Wireshark traffic PCAPs, and authoring reproducible penetration testing lab reports.",
      keyMetrics: [
        "Configured Kali Linux vulnerability analysis testbeds",
        "Documented step-by-step methodologies for crypto, reverse engineering, and web challenges",
        "Tested traffic analysis scripts and log parsers in Python",
        "Staging real GitHub repositories and reproducible technical writeups",
      ],
      skills: ["Penetration Testing", "Wireshark PCAP Analysis", "SIEM Detection", "Vulnerability Documentation"],
      status: "In Active Development",
    },
  ];

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A]/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson" />
            <span>06 // CASE STUDIES &amp; RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            PROJECTS &amp; FIELD INITIATIVES
          </h2>
          <p className="text-sm font-mono text-cyber-muted max-w-xl">
            Empirical community research, industrial manufacturing studies, and active cybersecurity lab environments.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <TiltCard key={proj.id} maxTilt={8} className="h-full">
              <div className="cyber-glass rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyber-crimson/50 transition-all flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                      {proj.year} • {proj.client}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        proj.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  {/* Title & Type */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyber-crimson transition-colors">
                      {proj.title}
                    </h3>
                    <div className="text-xs font-mono text-cyber-muted mt-1">
                      {proj.type}
                    </div>
                  </div>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {proj.overview}
                  </p>

                  {/* Key Highlights list */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {proj.keyMetrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-400">
                        <span className="text-cyber-crimson font-mono">›</span>
                        <span className="leading-snug">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Skills Tags */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
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
