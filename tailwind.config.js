/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#10b981', // Emerald 500
          darkGreen: '#047857', // Emerald 700
          lightGreen: '#d1fae5', // Emerald 100
          orange: '#f97316', // Orange 500
          darkOrange: '#c2410c', // Orange 700
          lightOrange: '#ffedd5', // Orange 100
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
