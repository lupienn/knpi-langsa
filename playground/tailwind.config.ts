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
        },
      },
      backgroundImage: {
        'knpi-gradient': 'linear-gradient(135deg, #1a63c8 0%, #3070f0 100%)',
        'dark-bg': 'linear-gradient(135deg, #0f172a 0%, #131f35 50%, #0f172a 100%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite reverse',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 1s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 40px rgba(26,99,200,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(26,99,200,0.7)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        knpi: '0 8px 25px rgba(26, 99, 200, 0.35)',
        card: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
