import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      // Warna KNPI diambil dari warna biru Graha Pemuda
      colors: {
        knpi: {
          50: '#eef5ff',
          100: '#d9eaff',
          200: '#bcd8ff',
          300: '#8ebdff',
          400: '#5a97fb',
          500: '#3070f0',
          600: '#1a63c8', // ← warna utama biru Graha Pemuda
          700: '#144fa3',
          800: '#163f80',
          900: '#163768',
          950: '#0f2044',
        },
        slate: {
          850: '#172033',
          950: '#090d16',
        },
      },
      backgroundImage: {
        'knpi-gradient': 'linear-gradient(135deg, #1a63c8 0%, #3070f0 100%)',
        'knpi-gradient-hover': 'linear-gradient(135deg, #144fa3 0%, #1a63c8 100%)',
        'dark-bg': 'radial-gradient(ellipse at top, #162a52 0%, #0b1120 70%, #070a14 100%)',
        'glass-radial': 'radial-gradient(circle at 50% 0%, rgba(30, 112, 240, 0.15) 0%, transparent 75%)',
        'grid-pattern': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite reverse',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(15px, -20px) rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 35px rgba(26, 99, 200, 0.35)' },
          '50%': { boxShadow: '0 0 65px rgba(48, 112, 240, 0.65)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideUp': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      boxShadow: {
        'knpi': '0 10px 30px -5px rgba(26, 99, 200, 0.4)',
        'knpi-glow': '0 0 40px rgba(48, 112, 240, 0.3)',
        'card': '0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'card-hover': '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glow': '0 0 25px rgba(30, 112, 240, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config
