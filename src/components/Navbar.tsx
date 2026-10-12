"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Volume2, VolumeX, Shield, FileDown, Menu, X } from "lucide-react";
import { getSoundEnabled, setSoundEnabled, playSound } from "@/lib/audio";
import Magnetic from "./Magnetic";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // hide on scroll down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // show on scroll up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playSound("access");
  };

  const triggerLogoGlitch = () => {
    playSound("glitch");
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 600);
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Missions", href: "#missions" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-8 py-2.5 sm:py-3.5 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto cyber-glass rounded-2xl px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border border-white/10 shadow-2xl">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={triggerLogoGlitch}
            data-cursor-text="GLITCH"
            className="flex items-center space-x-2 text-left group focus:outline-none focus:ring-1 focus:ring-cyber-crimson rounded-lg p-0.5"
            aria-label="K Dhanush Kudva portfolio logo with glitch effect"
          >
            <div className="w-8 h-8 rounded-lg bg-cyber-crimson/15 border border-cyber-crimson/40 flex items-center justify-center text-cyber-crimson group-hover:bg-cyber-crimson group-hover:text-white transition-all shadow-cyber-glow shrink-0">
              <Shield className={`w-4 h-4 ${isGlitching ? "animate-glitch text-white" : ""}`} />
            </div>
            <div>
              <span
                className={`font-mono text-xs sm:text-base font-bold tracking-tight text-white block ${
                  isGlitching ? "glitch-hover" : ""
                }`}
              >
                K.DHANUSH<span className="text-cyber-crimson">.KUDVA</span>
              </span>
              <span className="hidden sm:block font-mono text-[9px] text-cyber-muted tracking-widest uppercase">
                CYBER SECURITY @NMAMIT
              </span>
            </div>
          </button>

          {/* Status Pill */}
          <div className="hidden lg:flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-fast shadow-cyber-emerald" />
            <span className="tracking-wide">OPEN TO INTERNSHIPS</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6 text-xs font-mono tracking-wider text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyber-crimson transition-colors relative py-1 group"
              data-cursor-text="GOTO"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-crimson group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            data-cursor-text="AUDIO"
            className={`p-2 sm:p-2.5 rounded-lg border transition-all ${
              soundOn
                ? "bg-cyber-crimson/20 border-cyber-crimson text-cyber-crimson shadow-cyber-glow"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
            aria-label={soundOn ? "Mute cyber audio effects" : "Enable cyber audio effects"}
            title="Toggle cyber audio feedback"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mini Terminal Trigger */}
          <button
            onClick={() => {
              playSound("terminal");
              onOpenTerminal();
            }}
            data-cursor-text="CLI"
            className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg border border-cyber-crimson/30 bg-cyber-crimson/10 text-cyber-crimson hover:bg-cyber-crimson hover:text-white transition-all text-xs font-mono"
            aria-label="Open mini terminal (Press ~)"
            title="Press ~ or ` to open cyber terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-bold">~</span>
          </button>

          {/* Resume CTA Button */}
          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <a
              href="/resume/K_Dhanush_Kudva_Resume.pdf"
              download="K_Dhanush_Kudva_Resume.pdf"
              data-cursor-text="PDF"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-cyber-crimson text-white text-xs font-mono font-bold hover:bg-cyber-crimsonGlow transition-all shadow-cyber-glow"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
          </Magnetic>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden border border-white/10 rounded-lg text-gray-300 hover:text-white bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 cyber-glass rounded-2xl p-6 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 font-mono text-sm">
            <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-400 w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-fast" />
              <span>OPEN TO INTERNSHIPS</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-cyber-crimson py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <a
                href="/resume/K_Dhanush_Kudva_Resume.pdf"
                download="K_Dhanush_Kudva_Resume.pdf"
                className="flex items-center justify-center space-x-2 py-2 rounded-lg bg-cyber-crimson text-white text-xs font-bold"
              >
                <FileDown className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center space-x-2 py-2 rounded-lg border border-cyber-crimson/40 text-cyber-crimson text-xs"
              >
                <Terminal className="w-4 h-4" />
                <span>OPEN MINI CLI TERMINAL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
