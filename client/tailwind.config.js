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
          DEFAULT: '#02b290',
          50: '#e6f9f4',
          100: '#ccf3e9',
          200: '#99e7d3',
          300: '#66dbbd',
          400: '#33cfa7',
          500: '#02b290',
          600: '#029a7d',
          700: '#01826a',
          800: '#016a57',
          900: '#015244',
        },
        heading: '#1a1a2e',
        body: '#6b7280',
        border: '#e5e7eb',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '4rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
