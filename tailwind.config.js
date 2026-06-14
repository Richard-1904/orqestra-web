/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "rgb(var(--base-950) / <alpha-value>)",
          900: "rgb(var(--base-900) / <alpha-value>)",
          850: "rgb(var(--base-850) / <alpha-value>)",
          800: "rgb(var(--base-800) / <alpha-value>)",
          700: "rgb(var(--base-700) / <alpha-value>)",
          600: "rgb(var(--base-600) / <alpha-value>)",
        },
        ink: {
          100: "rgb(var(--ink-100) / <alpha-value>)",
          300: "rgb(var(--ink-300) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--signal) / <alpha-value>)",
          dim: "rgb(var(--signal-dim) / <alpha-value>)",
        },
        amber: {
          signal: "#F2B872",
        },
      },
      fontFamily: {
        display: ["Geist", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["6rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["4.5rem", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-md": ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1320px",
      },
    },
  },
  plugins: [],
};
