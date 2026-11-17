/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Base neutrals
        "dp-black": "#0B0B0C",
        "dp-charcoal": "#1A1A1D",
        "dp-offwhite": "#F5F3EF",
        "dp-white": "#FFFFFF",

        // Accent
        "dp-gold": "#C9A46B",
        "dp-velvet": "#3B1F2B",
      },

      fontFamily: {
        serif: [
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],

        sans: [
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [],
};