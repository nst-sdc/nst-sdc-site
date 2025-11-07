import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        accent: {
          light: '#3b82f6',      // Blue for light mode
          dark: '#ffeb3b',       // Yellow for dark mode
          neon: '#3b82f6',
          cyan: '#3b82f6',
          deep: '#1e293b',
        },
        glass: 'rgba(255, 255, 255, 0.6)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(59, 130, 246, 0.25)',
        glowDark: '0 0 30px rgba(255, 235, 59, 0.25)',
        innerGlow: 'inset 0 0 20px rgba(15, 23, 42, 0.1)',
      },
      backdropBlur: {
        xs: '6px',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'grid-dots':
          'radial-gradient(circle at center, rgba(59, 130, 246, 0.18) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-dots': '38px 38px',
      },
    },
  },
  plugins: [],
}

export default config
