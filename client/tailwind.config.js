/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          primary: '#5B5CF6',
          secondary: '#22D3EE',
          accent: '#F59E0B',
          bg: '#09090B',
          surface: '#111114',
          surfaceElevated: '#17171C',
          text: '#FAFAFA',
          muted: '#A1A1AA',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#5B5CF6', // Aurora Primary
          600: '#4F50E2',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffaff',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22D3EE', // Secondary Accent
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B', // Accent Gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50: '#FAFAFA',
          100: '#F4F4F6',
          200: '#E4E4E7',
          300: '#A1A1AA', // Muted text
          400: '#71717A',
          500: '#52525B',
          600: '#27272A',
          700: 'rgba(255, 255, 255, 0.08)', // Border default
          800: 'rgba(255, 255, 255, 0.04)', // Card default
          850: '#17171C',
          900: '#111114', // Surface
          950: '#09090B', // Background
        },
      },
      borderRadius: {
        'aurora': '24px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'aurora-glow': 'auroraGlow 14s ease infinite alternate',
        'aurora-flow': 'auroraFlow 12s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate',
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
      },
      keyframes: {
        auroraGlow: {
          '0%': { opacity: '0.25', transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
          '33%': { opacity: '0.35', transform: 'translate(40px, -30px) rotate(120deg) scale(1.15)' },
          '66%': { opacity: '0.2', transform: 'translate(-30px, 20px) rotate(240deg) scale(0.9)' },
          '100%': { opacity: '0.25', transform: 'translate(0px, 0px) rotate(360deg) scale(1)' },
        },
        auroraFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'aurora-glass': '0 20px 50px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'aurora-glow': '0 0 50px -5px rgba(91, 92, 246, 0.35)',
        'aurora-cyan': '0 0 40px -5px rgba(34, 211, 238, 0.35)',
        'apple-button': '0 4px 20px -2px rgba(91, 92, 246, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'apple-card': '0 8px 32px 0 rgba(0, 0, 0, 0.36), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        '20px': '20px',
      },
    },
  },
  plugins: [],
};
