"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch / mobile
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect hovered target
      const target = e.target as HTMLElement | null;
      if (target) {
        const closestInteractable = target.closest("a, button, [data-cursor-text], [data-cursor-hover]");
        if (closestInteractable) {
          setIsHovered(true);
          const label = closestInteractable.getAttribute("data-cursor-text") || "";
          setCursorText(label);
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Spring/lerp loop for trailing ring
    const render = () => {
      // Lerp ring towards mouse position
      const ease = 0.16;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyber-crimson rounded-full pointer-events-none transition-transform duration-75"
        style={{
          boxShadow: "0 0 10px #FF2A3D, 0 0 20px #FF2A3D",
        }}
      />

      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center transition-all duration-200 border ${
          cursorText
            ? "w-20 h-20 -ml-10 -mt-10 bg-cyber-crimson/90 border-white text-white shadow-cyber-glow"
            : isHovered
            ? "w-12 h-12 -ml-6 -mt-6 bg-white/10 border-cyber-crimson scale-125 backdrop-blur-[2px]"
            : isClicking
            ? "w-7 h-7 -ml-3.5 -mt-3.5 bg-cyber-crimson/20 border-cyber-crimson scale-90"
            : "w-9 h-9 -ml-4.5 -mt-4.5 border-white/30"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase select-none animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
