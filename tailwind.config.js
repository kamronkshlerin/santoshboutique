/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boutique: {
          bg: "#120407",
          wine: "#200810",
          card: "rgba(34, 10, 18, 0.65)",
          rose: "#d85c72",
          gold: "#f3cf98",
          darkgold: "#c59b27",
          ivory: "#fff7f2",
          muted: "#d1b8b8"
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'serif']
      }
    },
  },
  plugins: [],
}
