/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2d5086',
          dark: '#152a47',
          50: '#eef3f9',
          100: '#d4e1f0',
        },
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
          50: '#fffbeb',
        },
        surface: '#f8fafc',
      },
    },
  },
  plugins: [],
};
