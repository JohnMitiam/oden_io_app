/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf2ff',
          100: '#f5e1ff',
          200: '#edd0ff',
          300: '#dfafff',
          400: '#cc7bff',
          500: '#b211fc',
          600: '#a10ee8',
          700: '#880bc4',
          800: '#710da1',
          900: '#5d0e82',
          950: '#3f005e',
        },
      },
    },
  },
  plugins: [],
}