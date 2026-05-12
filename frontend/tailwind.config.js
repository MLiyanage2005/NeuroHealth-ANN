/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0c14",
        card: "#121624",
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        secondary: {
          DEFAULT: "#ef4444",
          dark: "#b91d1d",
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
