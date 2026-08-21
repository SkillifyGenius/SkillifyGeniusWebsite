import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
          hover: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#0F172A",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#EEF2FF",
          foreground: "#6366F1",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#2563EB",
        brand: {
          blue: "#2563EB",
          deepBlue: "#1E40AF",
          indigo: "#6366F1",
          emerald: "#10B981",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          heading: "#0F172A",
          body: "#475569",
          muted: "#64748B",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 20px 40px rgba(15, 23, 42, 0.12)",
        subtle: "0 2px 8px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        card: "20px",
        btn: "12px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
