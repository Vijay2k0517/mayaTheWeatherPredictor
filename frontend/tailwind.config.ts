import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glow: {
          blue: "#5B9DF9",
          pink: "#FF7AD9",
          purple: "#9B8CFF",
          orange: "#FFAA5B",
          teal: "#4CE0B3",
        },
      },
      backgroundImage: {
        'glass': 'linear-gradient(120deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
      },
      boxShadow: {
        glow: "0 0 20px rgba(91,157,249,0.35), 0 0 60px rgba(155,140,255,0.25)",
      },
      animation: {
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        typing: 'typing 1.5s steps(20, end)',
        caret: 'blink 1s step-end infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(91,157,249,0.35), 0 0 60px rgba(155,140,255,0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(255,122,217,0.35), 0 0 80px rgba(76,224,179,0.25)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' }
        }
      }
    }
  },
  plugins: [],
};

export default config;
