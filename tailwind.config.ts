import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "ui-monospace", "SFMono", "Menlo", "monospace"]
      },
      colors: {
        void: "#03050b",
        ink: "#070a12",
        cyan: "#39d8ff",
        violet: "#9b5cff",
        plasma: "#6476ff"
      },
      boxShadow: {
        glow: "0 0 42px rgba(57, 216, 255, 0.22)",
        violet: "0 0 55px rgba(155, 92, 255, 0.22)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at center, rgba(57,216,255,.18) 0 1px, transparent 1px)"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "25%": { opacity: ".6" },
          "100%": { transform: "translateY(300%)", opacity: "0" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(12px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(12px) rotate(-360deg)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        scan: "scan 4s linear infinite",
        orbit: "orbit 9s linear infinite",
        shimmer: "shimmer 7s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
