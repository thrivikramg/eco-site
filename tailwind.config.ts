import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#effef7",
          100: "#d9fceb",
          200: "#b3f8d6",
          300: "#72f0b8",
          400: "#38e595",
          500: "#18cc76",
          600: "#10a75c",
          700: "#13864b",
          800: "#166b3f",
          900: "#145836",
          950: "#033019",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Emerald color palette
        emerald: {
          50: "#ecfef6",
          100: "#d3fce8",
          200: "#a5f7d2",
          300: "#6aeeb3",
          400: "#2de28e",
          500: "#0cc671",
          600: "#04a259",
          700: "#078249",
          800: "#0a673c",
          900: "#0a5632",
          950: "#003120",
        },
        // Cream color palette
        cream: {
          50: "#fefdf9",
          100: "#f8f6f0",
          200: "#f3efe1",
          300: "#e9e2c8",
          400: "#d4c9a8",
          500: "#c2b28a",
          600: "#b09b73",
          700: "#97815f",
          800: "#7c6a51",
          900: "#665845",
          950: "#352e23",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shine: "shine 5s linear infinite",
      },
      boxShadow: {
        "soft-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
        "soft-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)",
      },
      backgroundImage: {
        "emerald-gradient": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "cream-gradient": "linear-gradient(135deg, #f8f6f0 0%, #f3efe1 100%)",
        "emerald-cream-gradient": "linear-gradient(135deg, #f5f5dc 0%, #f0fff4 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
