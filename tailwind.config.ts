import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B2A",
          mid: "#162436",
          soft: "#1D3048",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8CC7A",
          dim: "rgba(201,168,76,0.08)",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          dim: "rgba(245,240,232,0.55)",
        },
        slate: {
          DEFAULT: "#4A6080",
          light: "#8DA5BC",
        },
        // Module accent palette (from the platform architecture schema)
        module: {
          eti: "#2D6A4F",
          amc: "#C9A84C",
          fund: "#1B5E6E",
          vc: "#4A3560",
          alt: "#8B2E2E",
        },
        success: "#52B788",
        line: "rgba(201,168,76,0.25)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.25), 0 16px 40px rgba(0,0,0,.30)",
        gold: "0 8px 28px rgba(201,168,76,.18)",
      },
      backgroundImage: {
        "hero-navy":
          "radial-gradient(1200px 600px at 70% -10%, rgba(201,168,76,.10), transparent 60%), linear-gradient(160deg,#0D1B2A 0%,#0D1B2A 55%,#162436 100%)",
      },
      letterSpacing: {
        wide2: ".15em",
        wide3: ".2em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.2,.7,.2,1) both",
        blink: "blink 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
