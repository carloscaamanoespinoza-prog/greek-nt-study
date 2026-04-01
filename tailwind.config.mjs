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
        academic: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d5ff',
          300: '#a4b9ff',
          400: '#7b93ff',
          500: '#5566ff',
          600: '#3f46e6',
          700: '#3730a3',
          800: '#2e2875',
          900: '#1f1a47',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};
