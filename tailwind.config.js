/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mui/material/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#707c3e',
          50: '#f0f3e8',
          100: '#e0e7d1',
          200: '#c1d19f',
          300: '#a2bb6d',
          400: '#83a43b',
          500: '#707c3e',
          600: '#5c6432',
          700: '#484b26',
          800: '#343f1a',
          900: '#202f0d',
          950: '#101f05',
        },
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}