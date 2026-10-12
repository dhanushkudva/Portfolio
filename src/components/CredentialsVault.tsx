"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Award,
  ExternalLink,
  Eye,
  Download,
  X,
  RotateCw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import TiltCard from "./TiltCard";
import { playSound } from "@/lib/audio";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: "CTF" | "HACKATHON" | "INTERNSHIP" | "SIMULATION" | "ASSESSMENT";
  date: string;
  role: string;
  credentialId?: string;
  verifyUrl?: string;
  previewImage: string;
  pdfUrl?: string;
  description: string;
  skills: string[];
}

export default function CredentialsVault() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const certificates: CertificateItem[] = [
    {
      id: "null-origin-ctf",
      title: "Null Origin CTF 2026",
      issuer: "CyberHX (International 24-Hour CTF)",
      category: "CTF",
      date: "19 September 2026",
      role: "Participant",
      credentialId: "NO-2026-6606C3",
      verifyUrl: "https://creds.cyberhx.com",
      previewImage: "/certs/null-origin-ctf-2026.webp",
      pdfUrl: "/certs/null-origin-ctf-2026.jpg",
      description:
        "Successfully participated in the international 24-hour Null Origin CTF 2026 competition organized by CyberHX in collaboration with INE, OffSec, Render, Altered Security, and Unstop. (Strictly Participant; no rank implied).",
      skills: ["Reverse Engineering", "Web Security", "Cryptography", "Forensics", "OSINT"],
    },
    {
      id: "nitk-hackathon-offline",
      title: "Build for Billions — NITK Surathkal",
      issuer: "NITK Surathkal (WEC, Incubate, IET NITK)",
      category: "HACKATHON",
      date: "26-27 September 2026",
      role: "Offline Round Finalist — Team StarLight",
      credentialId: "NITK-BFB-2026",
      verifyUrl: "/certs/build-for-billions-nitk.pdf",
      previewImage: "/certs/build-for-billions-nitk.webp",
      pdfUrl: "/certs/build-for-billions-nitk.pdf",
      description:
        "Qualified for the prestigious OFFLINE round and competed on-campus at National Institute of Technology Karnataka (NITK), Surathkal in the 24-hour Build for Billions hackathon as Team StarLight.",
      skills: ["Rapid Prototyping", "Collaborative Engineering", "System Architecture", "Security by Design"],
    },
    {
      id: "thaniya-internship",
      title: "Cyber Security Internship",
      issuer: "Thaniya Technologies (MSME Registered)",
      category: "INTERNSHIP",
      date: "22 Jun 2026 – 22 Aug 2026",
      role: "Cyber Security Intern (8 Weeks)",
      credentialId: "TC-2026-N4MB7N",
      verifyUrl: "/certs/thaniya-technologies-internship.pdf",
      previewImage: "/certs/thaniya-technologies-internship.webp",
      pdfUrl: "/certs/thaniya-technologies-internship.pdf",
      description:
        "Completed an intensive 8-week cybersecurity internship. Actively contributed to projects demonstrating strong analytical proficiency. Completion certificate issued 04 Sep 2026, signed by Director Shailesh Shetty.",
      skills: ["Vulnerability Assessment", "Linux Security", "Network Protocols", "Security Auditing"],
    },
    {
      id: "deloitte-simulation",
      title: "Cyber Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      category: "SIMULATION",
      date: "October 2026",
      role: "Simulation Analyst",
      credentialId: "DELOITTE-AU-FORAGE-2026",
      verifyUrl: "https://www.theforage.com",
      previewImage: "/certs/build-for-billions-unstop.webp", // Clean verified badge
      pdfUrl: "/certs/build-for-billions-unstop.pdf",
      description:
        "Analysed web activity logs to identify suspicious user activity and supported a client in responding to a simulated corporate security breach and incident triage.",
      skills: ["Log Analysis", "Incident Response", "Web Traffic Forensics", "Threat Mitigation"],
    },
    {
      id: "hero-campus-challenge",
      title: "Hero Campus Challenge Season 10",
      issuer: "Hero MotoCorp Limited (via Unstop)",
      category: "ASSESSMENT",
      date: "September 2026",
      role: "Assessment Participant",
      credentialId: "UNSTOP-HCC-S10",
      verifyUrl: "/certs/hero-campus-challenge-s10.pdf",
      previewImage: "/certs/hero-campus-challenge-s10.webp",
      pdfUrl: "/certs/hero-campus-challenge-s10.pdf",
      description:
        "Successfully completed the competitive online assessment round of the flagship national Hero Campus Challenge Season 10 organized by Hero MotoCorp Limited.",
      skills: ["Algorithmic Reasoning", "Problem Solving", "Speed & Accuracy"],
    },
    {
      id: "build-for-billions-unstop",
      title: "Build for Billions (Unstop Credential)",
      issuer: "Unstop & NITK Surathkal",
      category: "HACKATHON",
      date: "September 2026",
      role: "Team StarLight Participant",
      credentialId: "UNSTOP-BFB-640E",
      verifyUrl: "/certs/build-for-billions-unstop.pdf",
      previewImage: "/certs/build-for-billions-unstop.webp",
      pdfUrl: "/certs/build-for-billions-unstop.pdf",
      description:
        "Official Unstop verified certificate acknowledging participation as Team StarLight in Build for Billions hosted by NITK Surathkal.",
      skills: ["Hackathon Sprint", "Team Collaboration"],
    },
  ];

  const toggleFlip = (id: string) => {
    playSound("click");
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  const openLightbox = (cert: CertificateItem) => {
    playSound("click");
    setActiveModalCert(cert);
  };

  return (
    <section id="credentials" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#05070A] scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-cyber-crimson font-mono text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyber-crimson animate-ping" />
              <span>03 // CRYPTOGRAPHIC VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              CREDENTIALS &amp; COMPETITIONS VAULT
            </h2>
            <p className="text-sm font-mono text-cyber-muted max-w-2xl">
              Authentic participation certificates, hackathon offline qualifications, industry internships, and breach simulations.
            </p>
          </div>

          {/* Carousel Arrows & Mobile Swipe Hint */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            <span className="md:hidden text-[10px] font-mono text-cyber-crimson font-bold uppercase tracking-widest animate-pulse">
              ← SWIPE CARDS →
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={scrollLeft}
                data-cursor-text="PREV"
                className="p-3 rounded-xl cyber-glass border border-white/10 hover:border-cyber-crimson hover:text-cyber-crimson text-white transition-all"
                aria-label="Scroll credentials left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                data-cursor-text="NEXT"
                className="p-3 rounded-xl cyber-glass border border-white/10 hover:border-cyber-crimson hover:text-cyber-crimson text-white transition-all"
                aria-label="Scroll credentials right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {certificates.map((cert, index) => {
            const isFlipped = !!flippedCards[cert.id];

            return (
              <div
                key={cert.id}
                className="w-[300px] sm:w-[380px] shrink-0 snap-start"
              >
                <TiltCard maxTilt={8} className="h-full">
                  <div className="min-h-[470px] w-full cyber-glass rounded-2xl border border-white/10 hover:border-cyber-crimson/50 transition-all shadow-cyber-card relative flex flex-col justify-between p-5 overflow-hidden group">
                    {/* Background Subtle Gradient */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyber-crimson/5 rounded-full blur-2xl pointer-events-none" />

                    {!isFlipped ? (
                      /* FRONT SIDE */
                      <div className="flex flex-col h-full justify-between space-y-4">
                        <div>
                          {/* Top Card Bar */}
                          <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <span className="px-2 py-0.5 rounded bg-cyber-crimson/15 border border-cyber-crimson/40 text-[10px] font-mono text-cyber-crimson font-bold">
                              {cert.category}
                            </span>
                            <button
                              onClick={() => toggleFlip(cert.id)}
                              className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1"
                              title="Flip for security telemetry"
                            >
                              <RotateCw className="w-3 h-3 text-cyber-crimson" />
                              <span>METADATA</span>
                            </button>
                          </div>

                          {/* High-res Image Preview */}
                          <div
                            onClick={() => openLightbox(cert)}
                            className="mt-3 relative aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer group/img"
                            data-cursor-text="ZOOM"
                          >
                            <Image
                              src={cert.previewImage}
                              alt={`${cert.title} Certificate`}
                              fill
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                              className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 300px, 380px"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-3 py-1.5 rounded-lg bg-cyber-crimson text-white text-xs font-mono font-bold flex items-center space-x-1 shadow-cyber-glow">
                                <Eye className="w-3.5 h-3.5" />
                                <span>INSPECT LIGHTBOX</span>
                              </span>
                            </div>
                          </div>

                          {/* Title & Metadata */}
                          <div className="mt-4">
                            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyber-crimson transition-colors line-clamp-1">
                              {cert.title}
                            </h3>
                            <div className="text-xs font-mono text-cyber-muted mt-0.5 line-clamp-1">
                              {cert.issuer}
                            </div>
                            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center space-x-1">
                              <ShieldCheck className="w-3 h-3 shrink-0" />
                              <span className="truncate">ROLE: {cert.role}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <button
                            onClick={() => openLightbox(cert)}
                            data-cursor-text="PREVIEW"
                            className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white text-center transition-all flex items-center justify-center space-x-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyber-crimson" />
                            <span>VIEW</span>
                          </button>

                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor-text="VERIFY"
                              className="flex-1 py-2 px-3 rounded-lg bg-cyber-crimson/20 hover:bg-cyber-crimson border border-cyber-crimson/50 text-xs font-mono text-white text-center transition-all flex items-center justify-center space-x-1.5 font-bold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>VERIFY</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* BACK SIDE (METADATA & DETAILS) */
                      <div className="flex flex-col h-full justify-between animate-in fade-in duration-200">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <span className="text-xs font-mono text-cyber-crimson font-bold uppercase">
                              // SECURITY TELEMETRY
                            </span>
                            <button
                              onClick={() => toggleFlip(cert.id)}
                              className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1"
                            >
                              <RotateCw className="w-3 h-3 text-cyber-crimson" />
                              <span>CARD VIEW</span>
                            </button>
                          </div>

                          <div className="mt-4 space-y-3 font-mono text-xs">
                            <div>
                              <div className="text-[10px] text-gray-400">CREDENTIAL ID</div>
                              <div className="text-white font-semibold">
                                {cert.credentialId || "VERIFIED-2026"}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-400">ISSUE DATE</div>
                              <div className="text-white">{cert.date}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-400">CONTEXT &amp; EVIDENCE</div>
                              <p className="text-gray-300 font-sans text-xs leading-relaxed mt-1">
                                {cert.description}
                              </p>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-400 mb-1.5">SKILLS DEMONSTRATED</div>
                              <div className="flex flex-wrap gap-1.5">
                                {cert.skills.map((s) => (
                                  <span
                                    key={s}
                                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Back Bottom */}
                        <div className="pt-3 border-t border-white/10">
                          {cert.pdfUrl && (
                            <a
                              href={cert.pdfUrl}
                              download
                              className="w-full py-2 px-3 rounded-lg bg-cyber-crimson text-white text-xs font-mono font-bold flex items-center justify-center space-x-2"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>DOWNLOAD ORIGINAL ASSET</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="relative max-w-4xl w-full cyber-glass rounded-2xl border border-white/20 p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                  {activeModalCert.title}
                </h3>
                <div className="text-xs font-mono text-cyber-muted mt-0.5">
                  {activeModalCert.issuer} • {activeModalCert.date}
                </div>
              </div>
              <button
                onClick={() => setActiveModalCert(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all"
                aria-label="Close certificate lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-black border border-white/10">
              <Image
                src={activeModalCert.previewImage}
                alt={activeModalCert.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 900px"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="text-gray-400">
                CREDENTIAL ID:{" "}
                <span className="text-cyber-crimson font-bold">
                  {activeModalCert.credentialId}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {activeModalCert.pdfUrl && (
                  <a
                    href={activeModalCert.pdfUrl}
                    download
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center space-x-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Original</span>
                  </a>
                )}
                {activeModalCert.verifyUrl && (
                  <a
                    href={activeModalCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-cyber-crimson hover:bg-cyber-crimsonGlow text-white font-bold flex items-center space-x-2 transition-all shadow-cyber-glow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Credential</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
