import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
      },
      colors: {
        nes: {
          bg: "#1a1c2c",
          card: "#fff1e8",
          pink: "#ff77a8",
          red: "#e43b44",
          yellow: "#feae34",
          green: "#63c74d",
          blue: "#3978a8",
          dark: "#262b44",
          cream: "#feeed8",
          shadow: "#262b44",
        },
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        flameDance: {
          "0%,100%": { transform: "scaleY(1) translateX(0)" },
          "25%": { transform: "scaleY(1.1) translateX(-1px)" },
          "75%": { transform: "scaleY(0.95) translateX(1px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        pulseTitle: {
          "0%,100%": { transform: "scale(1)", filter: "hue-rotate(0deg)" },
          "50%": { transform: "scale(1.04)", filter: "hue-rotate(20deg)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateY(-260px) translateX(var(--drift,0px))",
            opacity: "0",
          },
        },
      },
      animation: {
        flicker: "flicker 2.4s steps(2,end) infinite",
        bob: "bob 2.2s ease-in-out infinite",
        flame: "flameDance 0.4s steps(3,end) infinite",
        scanline: "scanline 6s linear infinite",
        pulseTitle: "pulseTitle 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
