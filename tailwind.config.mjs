/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        greek: ['Cardo', 'GFS Didot', 'serif'],
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ancient: {
          50: '#faf7f2',
          100: '#f5ede1',
          200: '#e8dcc8',
          300: '#dccaa8',
          400: '#cbaf81',
          500: '#b8925a',
          600: '#a67a45',
          700: '#85623b',
          800: '#654c32',
          900: '#4a382a',
        },
      },
    },
  },
  plugins: [],
};
