"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Flashlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [isSupported, setIsSupported] = useState(true);
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -500, y: -500 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsSupported(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      setPos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isSupported) return null;

  const hexLines = [
    "0x00401000 55 89 E5 53 83 EC 14 E8 00 00 00 00 5B 81 C3 A8 2F [PORT:443_SSL]",
    "0x00401010 B8 01 00 00 00 89 44 24 04 C7 04 24 01 00 00 00 [TLS_ECDHE_RSA]",
    "0x00401020 E8 8B FE FF FF 83 C4 14 5B 5D C3 90 90 90 90 90 [THREAT_NULL_OK]",
    "0x00401030 48 83 EC 28 48 8D 0D C5 2F 00 00 E8 4A 00 00 00 [SIEM_INGEST_RUN]",
    "0x00401040 48 89 C1 48 8D 15 1B 1E 00 00 E8 64 00 00 00 48 [SURICATA_RULE_0]",
    "0x00401050 31 C0 48 83 C4 28 C3 90 90 90 90 90 90 90 90 90 [SELINUX_ENFORCE]",
    "0x00401060 55 48 89 E5 48 83 EC 20 89 7D EC 48 89 75 E0 48 [KALI_PENTEST_PWN]",
    "0x00401070 8B 45 E0 48 8B 00 48 89 45 F8 48 8B 45 F8 48 8B [NMAMIT_CYB_SEC]",
    "0x00401080 40 10 48 89 45 F0 48 8B 45 F0 FF D0 48 83 C4 20 [WIRESHARK_CAP_OK]",
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage: `radial-gradient(circle 320px at ${pos.x}px ${pos.y}px, black 15%, transparent 80%)`,
        WebkitMaskImage: `radial-gradient(circle 320px at ${pos.x}px ${pos.y}px, black 15%, transparent 80%)`,
      }}
    >
      {/* Hidden Dense Grid Revealed by Spotlight */}
      <div className="absolute inset-0 cyber-grid-dense opacity-40" />

      {/* Hidden Hex and Telemetry Code Revealed by Spotlight */}
      <div className="absolute inset-0 p-8 font-mono text-[11px] leading-relaxed text-cyber-crimson/50 select-none flex flex-col justify-around overflow-hidden opacity-60">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap tracking-wider">
            {hexLines[i % hexLines.length]}
          </div>
        ))}
      </div>

      {/* Center Spotlight Laser Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "480px",
          height: "480px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 42, 61, 0.12) 0%, rgba(255, 42, 61, 0) 70%)",
        }}
      />
    </div>
  );
}
