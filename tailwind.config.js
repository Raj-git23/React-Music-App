/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'silver': '#a7a7a7',
      },
    },
  },
  plugins: [],
}