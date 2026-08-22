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
        sans: ["var(--font-bricolage)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
