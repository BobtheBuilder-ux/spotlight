/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05060A',
          900: '#080B12',
          800: '#0D1120',
          700: '#111827',
        },
        brand: {
          blue: '#1F6FEB',
          'blue-light': '#4D94FF',
          'blue-dark': '#1558C0',
          green: '#00C853',
          'green-dark': '#00A846',
          red: '#FF1744',
        },
        ink: {
          100: '#FFFFFF',
          200: '#E8EDF5',
          300: '#AAB3C5',
          400: '#6B7896',
          500: '#3D4A6B',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(31,111,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,111,235,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'bar-fill': 'barFill 1.2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        barFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
      },
    },
  },
  plugins: [],
};
