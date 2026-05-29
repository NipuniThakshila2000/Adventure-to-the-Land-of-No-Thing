import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#07111F",
        deep: "#0D1B2E",
        tealMist: "#2E6F73",
        dustyViolet: "#6D5A88",
        lavenderMist: "#B9A7D8",
        silverBlue: "#B8C8D9",
        parchment: "#E8D8B8",
        antiqueGold: "#C8A45D",
        softWhite: "#F4EFE4"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        label: ["var(--font-label)", "serif"]
      },
      boxShadow: {
        gold: "0 0 28px rgba(200, 164, 93, 0.28)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
