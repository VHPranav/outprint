import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: "#FFFFFF",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          hover: "var(--secondary-hover)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        // Dedicated Outprint Brand Tokens
        emerald: {
          50: "#F2F9F5",
          100: "#E3F2EB",
          200: "#C4E4D5",
          300: "#96D0B6",
          400: "#5EB58E",
          500: "#34986C",
          600: "#1A7B52",
          700: "#0B5D3B", // Primary CTA accent
          800: "#084C30", // Primary CTA hover
          900: "#063B26",
          950: "#022014",
        },
        neutral: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E5E5E5", // Neutral border
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#111111", // Text near-black
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)", // ~6px
        DEFAULT: "calc(var(--radius) - 2px)", // 8px
        md: "calc(var(--radius) - 2px)", // 8px
        lg: "var(--radius)", // 10px
        xl: "calc(var(--radius) + 2px)", // 12px
        "2xl": "calc(var(--radius) + 6px)", // 16px
        "3xl": "calc(var(--radius) + 12px)", // 22px
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        display: ["var(--font-fraunces)", "serif"],
        logo: ["var(--font-qwitcher-grypen)", "cursive"],
      },
      spacing: {
        "24": "6rem",     // 96px
        "28": "7rem",     // 112px
        "32": "8rem",     // 128px
        "36": "9rem",     // 144px
        "40": "10rem",    // 160px
        "section-sm": "6rem",  // 96px
        "section": "8rem",     // 128px
        "section-lg": "10rem", // 160px
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 12px 28px -4px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)",
        elevated: "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
