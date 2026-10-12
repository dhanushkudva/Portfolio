"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  hoverTrigger?: boolean;
}

const CYBER_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF";

export default function DecryptedText({
  text,
  className = "",
  scrambleOnMount = true,
  hoverTrigger = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, 30);
  }, [text, isScrambling]);

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scrambleOnMount, startScramble]);

  return (
    <span
      className={`inline-block select-none cursor-default font-mono ${className}`}
      onMouseEnter={() => {
        if (hoverTrigger) startScramble();
      }}
    >
      {displayText}
    </span>
  );
}
