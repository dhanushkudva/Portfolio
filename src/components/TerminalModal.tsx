"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { playSound } from "@/lib/audio";
import confetti from "canvas-confetti";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      response: (
        <div className="space-y-1 text-cyber-muted">
          <div>// SECURE INTERACTIVE CLI v3.8 — K DHANUSH KUDVA [NMAMIT]</div>
          <div>Type <span className="text-cyber-crimson font-bold">help</span> to view available commands. Press <span className="text-white font-bold">ESC</span> or click [X] to exit.</div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playSound("terminal");
    setCmdHistory((prev) => [...prev, cmd]);
    setCmdHistoryIndex(-1);

    const lower = cmd.toLowerCase();
    let res: React.ReactNode = null;

    switch (lower) {
      case "help":
        res = (
          <div className="space-y-1 text-gray-300">
            <div className="text-cyber-crimson font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="text-white font-bold">whoami</span> — Display operator identity &amp; credentials</div>
              <div><span className="text-white font-bold">about</span> — Read student dossier and focus areas</div>
              <div><span className="text-white font-bold">skills</span> — Enumerate offensive, defensive, and dev skills</div>
              <div><span className="text-white font-bold">certs</span> — List verified security certificates</div>
              <div><span className="text-white font-bold">ctf</span> — Null Origin CTF 2026 participation telemetry</div>
              <div><span className="text-white font-bold">contact</span> — Retrieve transmission channels &amp; email</div>
              <div><span className="text-white font-bold">sudo hire-me</span> — Unlock executive recruitment protocol</div>
              <div><span className="text-white font-bold">date</span> — Display current IST timestamp</div>
              <div><span className="text-white font-bold">clear</span> — Purge terminal history</div>
              <div><span className="text-white font-bold">exit</span> — Close CLI session</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        res = (
          <div className="space-y-1 text-gray-300">
            <div>NAME: <span className="text-white font-bold">K Dhanush Kudva</span></div>
            <div>STATUS: <span className="text-emerald-400 font-bold">B.Tech CSE (Cyber Security) @ NMAMIT Nitte</span></div>
            <div>CGPA: <span className="text-white">8.24 (2025 - 2029)</span></div>
            <div>LOCATION: <span className="text-white">Karnataka, India</span></div>
            <div>SECURITY FOCUS: <span className="text-cyber-crimson">Penetration Testing, Threat Hunting &amp; SIEM</span></div>
          </div>
        );
        break;

      case "about":
        res = (
          <div className="text-gray-300 leading-relaxed">
            B.Tech CSE (Cyber Security) student at NMAM Institute of Technology, Nitte (Aug 2025 - Jul 2029), CGPA 8.24. Focused on pentesting, threat hunting, and SIEM monitoring. Strengthening DSA with Python, Java, C++, and C. Eager to learn, join technical events, and grow teamwork, leadership and communication skills.
          </div>
        );
        break;

      case "skills":
        res = (
          <div className="space-y-1 text-gray-300">
            <div><span className="text-cyber-crimson font-bold">OFFENSIVE:</span> Kali Linux, Penetration Testing, Wireshark, Ubuntu</div>
            <div><span className="text-emerald-400 font-bold">DEFENSIVE:</span> SIEM, Threat Hunting, Log Analysis, Incident Response</div>
            <div><span className="text-cyber-cyan font-bold">LANGUAGES:</span> Python, Java, C++, C</div>
            <div><span className="text-amber-400 font-bold">TOOLS:</span> GitHub, VS Code, Linux Shell</div>
          </div>
        );
        break;

      case "certs":
        res = (
          <div className="space-y-1 text-gray-300">
            <div>1. <span className="text-white font-bold">Null Origin CTF 2026</span> (CyberHX) — ID: NO-2026-6606C3 (Participant)</div>
            <div>2. <span className="text-white font-bold">Build for Billions Hackathon</span> (NITK Surathkal) — Offline Finalist</div>
            <div>3. <span className="text-white font-bold">Thaniya Technologies</span> — 8-Week Cyber Security Internship</div>
            <div>4. <span className="text-white font-bold">Deloitte Australia</span> (Forage) — Cyber Job Simulation (Log Analysis)</div>
            <div>5. <span className="text-white font-bold">Hero Campus Challenge Season 10</span> — Online Assessment</div>
          </div>
        );
        break;

      case "ctf":
        res = (
          <div className="space-y-1 text-gray-300">
            <div className="text-cyber-crimson font-bold">NULL ORIGIN CTF 2026 TELEMETRY:</div>
            <div>Organizer: CyberHX (In collaboration with OffSec, INE, Render)</div>
            <div>Certificate ID: <span className="text-white font-bold">NO-2026-6606C3</span></div>
            <div>Role: <span className="text-emerald-400 font-bold">Participant</span></div>
            <div>Verify at: <span className="text-cyber-cyan">https://creds.cyberhx.com</span></div>
          </div>
        );
        break;

      case "contact":
        res = (
          <div className="space-y-1 text-gray-300">
            <div>EMAIL: <a href="mailto:dhanushkudvaofficial@gmail.com" className="text-cyber-crimson underline">dhanushkudvaofficial@gmail.com</a></div>
            <div>LINKEDIN: <a href="https://www.linkedin.com/in/kdhanushkudva/" target="_blank" rel="noreferrer" className="text-cyber-cyan underline">linkedin.com/in/kdhanushkudva/</a></div>
            <div>GITHUB: <a href="https://github.com/dhanushkudva" target="_blank" rel="noreferrer" className="text-white underline">github.com/dhanushkudva</a></div>
          </div>
        );
        break;

      case "sudo hire-me":
      case "hire-me":
      case "hire":
        playSound("access");
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            colors: ["#FF2A3D", "#00F5A0", "#FFFFFF"],
          });
        } catch {}
        res = (
          <div className="p-3 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 font-bold space-y-1">
            <div>[SUCCESS] ROOT CLEARANCE GRANTED!</div>
            <div className="text-white font-normal text-xs">
              Candidate K Dhanush Kudva is open to internships. Transmission link initialized: send message to <a href="mailto:dhanushkudvaofficial@gmail.com" className="underline text-emerald-300">dhanushkudvaofficial@gmail.com</a>.
            </div>
          </div>
        );
        break;

      case "date":
        res = (
          <div className="text-white">
            {new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST [Karnataka, India]
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        res = (
          <div className="text-red-400">
            bash: command not found: {cmd}. Type &apos;help&apos; for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, response: res }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdHistoryIndex(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIndex > 0) {
        const nextIdx = cmdHistoryIndex - 1;
        setCmdHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (cmdHistoryIndex === 0) {
        setCmdHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10002] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[560px] max-h-[85vh] bg-[#070B13] border border-cyber-crimson/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="bg-[#0D1424] px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-4 h-4 text-cyber-crimson" />
            <span className="text-white font-bold">KDK-TERMINAL // ROOT@NMAMIT</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-cyber-muted hidden sm:inline">
              [PRESS ~ OR ESC TO CLOSE]
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Close terminal modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal History Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command !== "welcome" && (
                <div className="flex items-center space-x-2 text-cyber-crimson font-bold">
                  <span>root@nmamit:~#</span>
                  <span className="text-white font-normal">{item.command}</span>
                </div>
              )}
              <div>{item.response}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt Form */}
        <form
          onSubmit={handleCommand}
          className="border-t border-white/10 bg-black/60 px-4 py-3 flex items-center space-x-2"
        >
          <span className="text-cyber-crimson font-bold shrink-0">root@nmamit:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'whoami', 'skills', 'certs', 'sudo hire-me'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
