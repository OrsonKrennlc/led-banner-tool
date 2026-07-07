/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        neon: {
          purple: "#b026ff",
          cyan: "#00f5ff",
          pink: "#ff2d92",
          green: "#39ff14",
          yellow: "#ffff00",
          orange: "#ff6600",
          blue: "#0066ff",
          red: "#ff0040",
        },
        dark: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a25",
          600: "#252535",
          500: "#353550",
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 5px #b026ff, 0 0 10px #b026ff, 0 0 20px #b026ff',
        'neon-cyan': '0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff',
        'neon-pink': '0 0 5px #ff2d92, 0 0 10px #ff2d92, 0 0 20px #ff2d92',
        'neon-green': '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        breathe: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
