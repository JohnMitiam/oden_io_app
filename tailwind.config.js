/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(-10%, 10%)' },
          '90%': { transform: 'translate(15%, 4%)' },
        },
      },
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