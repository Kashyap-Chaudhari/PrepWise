/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0eb',
          100: '#ffd3c2',
          200: '#ffb599',
          300: '#ff9870',
          400: '#ff7a47',
          500: '#FF4500', // Neo-Brutalist Orange/Red
          600: '#e63e00',
          700: '#cc3700',
          800: '#b33000',
          900: '#992900',
          950: '#4d1400',
        },
        secondary: {
          50: '#e5fcff',
          100: '#b3f5ff',
          200: '#80efff',
          300: '#4de8ff',
          400: '#1ae2ff',
          500: '#00E5FF', // Pure Cyan
          600: '#00cc-e6',
          700: '#00b3cc',
          800: '#0099b3',
          900: '#008099',
        },
        accent: {
          50: '#fffdeb',
          100: '#fff9c2',
          200: '#fff599',
          300: '#fff170',
          400: '#ffed47',
          500: '#FFE600', // Brutalist Yellow
          600: '#e6cf00',
          700: '#ccb800',
        },
        dark: {
          50: '#EAE5DF', // Brutalist Light Bg
          100: '#FFFFFF', // Light Card
          200: '#111111', // Brutalist Border Light
          300: '#555555', 
          400: '#888888', // Dark Muted
          500: '#999999', // Light Muted
          600: '#333333',
          700: '#e5e5e5', // Dark border
          800: '#171717', // Dark Cards
          900: '#121212', // Dark Surface
          950: '#0a0a0a', // Dark Bg
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0',
        DEFAULT: '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '0', // Overrides all pills to be sharp blocks
      },
      boxShadow: {
        'sm': '2px 2px 0 0 var(--color-border)',
        DEFAULT: '4px 4px 0 0 var(--color-border)',
        'md': '6px 6px 0 0 var(--color-border)',
        'lg': '8px 8px 0 0 var(--shadow-color)',
        'xl': '12px 12px 0 0 var(--color-border)',
        '2xl': '16px 16px 0 0 var(--color-border)',
        'inner': 'inset 2px 2px 0 0 var(--color-border)',
      },
      backgroundImage: {
        'gradient-to-t': 'none',
        'gradient-to-tr': 'none',
        'gradient-to-r': 'none',
        'gradient-to-br': 'none',
        'gradient-to-b': 'none',
        'gradient-to-bl': 'none',
        'gradient-to-l': 'none',
        'gradient-to-tl': 'none',
      },
      animation: {
        'fade-in': 'none',
        'fade-in-up': 'none',
        'fade-in-down': 'none',
        'slide-in-left': 'none',
        'slide-in-right': 'none',
        'scale-in': 'none',
        'bounce-in': 'none',
        'pulse-glow': 'none',
        'float': 'none',
        'shimmer': 'none',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
