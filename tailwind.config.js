/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        foreground: "#F8FAFC",
        cyber: {
          bg: "#05070A",
          surface: "#0B101B",
          surfaceLight: "#131B2E",
          border: "rgba(255, 42, 61, 0.18)",
          borderMuted: "rgba(255, 255, 255, 0.08)",
          crimson: "var(--accent, #FF2A3D)",
          crimsonGlow: "#FF4D5E",
          emerald: "#00F5A0",
          cyan: "#38BDF8",
          amber: "#F59E0B",
          muted: "#94A3B8",
          dim: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 1s infinite linear alternate-reverse",
        "radar-sweep": "radar 4s linear infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      boxShadow: {
        "cyber-glow": "0 0 25px rgba(255, 42, 61, 0.35)",
        "cyber-emerald": "0 0 25px rgba(0, 245, 160, 0.3)",
        "cyber-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
