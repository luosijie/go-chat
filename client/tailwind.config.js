/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
        colors: {
            black:"#0A0B1F",
            // gray: "#DFE0E9",
            "gray-light": "#F8FBFC",

            blue: "#CDE7FE",
            "blue-dark": "#0084FD",
            yellow: "#FFD282",
            green: "#CCE495",
            pink: "#FFCBEA",
            orange: "#FF6E00"
        },
        borderColor: {
            DEFAULT: "#e5e7eb"
        },
        animation: {
          'spin-slow': 'spin 1.5s linear infinite'
        }
    }
  },
  plugins: [],
}