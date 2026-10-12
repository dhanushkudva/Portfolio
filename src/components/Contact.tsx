"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Linkedin,
  Github,
  Clock,
  ArrowUp,
  FileDown,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import Magnetic from "./Magnetic";
import { playSound } from "@/lib/audio";
import confetti from "canvas-confetti";

export default function Contact() {
  const [istTime, setIstTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC + 5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setIstTime(now.toLocaleTimeString("en-GB", options) + " IST");
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playSound("click");

    // Construct mailto link
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:dhanushkudvaofficial@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSound("access");

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#FF2A3D", "#00F5A0", "#FFFFFF"],
        });
      } catch {
        // fallback
      }

      // Open mail client fallback
      window.location.href = mailtoLink;
    }, 600);
  };

  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative py-28 px-4 sm:px-8 border-t border-white/5 bg-[#030508] overflow-hidden scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-crimson/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Giant Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-fast" />
            <span>OPEN TO CYBER SECURITY INTERNSHIPS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95]">
            LET&apos;S SECURE <br />
            <span className="text-cyber-crimson">THE FUTURE.</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base font-mono text-cyber-muted">
            Looking for offensive &amp; defensive cybersecurity internships, research collaborations, or technical challenges.
          </p>
        </div>

        {/* Form & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="cyber-glass rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="text-xs font-mono text-cyber-crimson font-bold uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT TRANSMISSION CHANNELS</span>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="text-xs font-mono text-cyber-muted">DIRECT EMAIL</div>
                <a
                  href="mailto:dhanushkudvaofficial@gmail.com"
                  className="font-mono text-base sm:text-lg text-white hover:text-cyber-crimson transition-colors font-semibold break-all"
                >
                  dhanushkudvaofficial@gmail.com
                </a>
              </div>

              {/* Location & IST Clock */}
              <div className="space-y-1">
                <div className="text-xs font-mono text-cyber-muted">BASE OF OPERATIONS</div>
                <div className="text-white font-mono text-sm">Karnataka, India</div>
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>LOCAL TIME: {istTime || "12:00:00 IST"}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono text-cyber-muted">EXTERNAL PROFILES</div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/kdhanushkudva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="LINKEDIN"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-crimson hover:text-cyber-crimson text-white font-mono text-xs transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-cyber-crimson" />
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href="https://github.com/dhanushkudva"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="GITHUB"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-crimson hover:text-cyber-crimson text-white font-mono text-xs transition-all"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

              {/* Resume download button */}
              <div className="pt-2">
                <a
                  href="/resume/K_Dhanush_Kudva_Resume.pdf"
                  download="K_Dhanush_Kudva_Resume.pdf"
                  data-cursor-text="RESUME"
                  className="w-full py-3 px-4 rounded-xl bg-cyber-crimson text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-cyber-crimsonGlow transition-all shadow-cyber-glow"
                >
                  <FileDown className="w-4 h-4" />
                  <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="cyber-glass rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="text-xs font-mono text-cyber-muted mb-6 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyber-crimson" />
                <span>SECURE DISPATCH FORM // MAILTO PROTOCOL</span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 font-mono">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">DISPATCH INITIATED</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Your message draft has been routed to your default email client for transmission to{" "}
                    <span className="text-white font-semibold">dhanushkudvaofficial@gmail.com</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-300">YOUR NAME / ENTITY *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lead Security Architect"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-crimson focus:ring-1 focus:ring-cyber-crimson"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-300">RETURN EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-crimson focus:ring-1 focus:ring-cyber-crimson"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-300">SUBJECT LINE *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Cyber Security Internship Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-crimson focus:ring-1 focus:ring-cyber-crimson"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-300">MESSAGE CONTENT *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your team, the internship scope, or security challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-crimson focus:ring-1 focus:ring-cyber-crimson resize-none"
                    />
                  </div>

                  <Magnetic strength={0.2} className="w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor-text="DISPATCH"
                      className="w-full py-4 rounded-xl bg-cyber-crimson text-white font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-cyber-crimsonGlow transition-all shadow-cyber-glow disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}</span>
                    </button>
                  </Magnetic>

                  <div className="text-[11px] text-gray-500 text-center pt-2">
                    Direct mailbox delivery to dhanushkudvaofficial@gmail.com
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} K Dhanush Kudva. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-cyber-dim">NMAMIT CYBER SECURITY</span>
            <button
              onClick={scrollToTop}
              data-cursor-text="TOP"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-cyber-crimson transition-all"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyber-crimson" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
