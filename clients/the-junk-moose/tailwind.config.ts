import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['"Clash Display"', "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        dark: "#080808",
        "warm-gray": "#111110",
        elevated: "#1a1917",
        stone: "#A8A29E",
        "stone-dim": "#78736E",
        gold: "#C8A44E",
        "gold-light": "#E8D5A0",
        "gold-dim": "rgba(200,164,78,0.08)",
        "gold-muted": "rgba(200,164,78,0.25)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical":
          "marquee-vertical var(--duration) linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-in": "slideIn 1s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
        "clip-reveal": "clipReveal 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "blur-in": "blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-up": "scaleUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-right": "slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        clipReveal: {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0% 0 0)" },
        },
        blurIn: {
          from: { opacity: "0", filter: "blur(12px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        scaleUp: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
