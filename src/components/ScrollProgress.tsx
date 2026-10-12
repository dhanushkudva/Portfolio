"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("HERO");

  useEffect(() => {
    const sections = [
      { id: "hero", label: "00 // HERO" },
      { id: "about", label: "01 // ABOUT" },
      { id: "experience", label: "02 // EXP" },
      { id: "credentials", label: "03 // VAULT" },
      { id: "missions", label: "04 // MISSIONS" },
      { id: "skills", label: "05 // SKILLS" },
      { id: "projects", label: "06 // PROJECTS" },
      { id: "education", label: "07 // EDU" },
      { id: "contact", label: "08 // CONTACT" },
    ];

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(s.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Laser Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[9990] pointer-events-none">
        <div
          className="h-full bg-cyber-crimson transition-all duration-75 shadow-cyber-glow"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Side Active Section Indicator (Desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end space-y-4 pointer-events-none font-mono text-[10px]">
        <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-cyber-muted tracking-widest backdrop-blur-md">
          <span className="text-cyber-crimson font-bold">{activeSection}</span>
        </div>
      </div>
    </>
  );
}
