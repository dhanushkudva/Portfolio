"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Flashlight from "@/components/Flashlight";
import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CredentialsVault from "@/components/CredentialsVault";
import MissionLog from "@/components/MissionLog";
import SkillsMatrix from "@/components/SkillsMatrix";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import TerminalModal from "@/components/TerminalModal";
import KonamiBreach from "@/components/KonamiBreach";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  React.useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  return (
    <SmoothScroll>
      {/* Boot sequence CRT loader */}
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

      {/* Interactive Cursor and Spotlight Layer */}
      <Cursor />
      <Flashlight />
      <ScrollProgress />

      {/* Global Interactive Easter Eggs */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <KonamiBreach />

      {/* Main App Container */}
      <div className="relative min-h-screen bg-cyber-bg cyber-grid-bg text-foreground selection:bg-cyber-crimson selection:text-white">
        {/* Navigation Bar */}
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Semantic Main Content */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <CredentialsVault />
          <MissionLog />
          <SkillsMatrix />
          <Projects />
          <Education />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
