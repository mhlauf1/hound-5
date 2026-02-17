import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '64px',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'light-tan': '#FEF5EF',
        'dark-brown': '#3B2B28',
        brown: '#703527',
        orange: '#E37C3C',
        grey: '#E6DFDA',
        green: '#B7E1C4',
        white: '#FFFFFF',
        black: '#0b0b0b',
        brand: '#E37C3C',
      },
      fontFamily: {
        serif: ['var(--font-season-mix)', 'Georgia', 'serif'],
        sans: ['var(--font-helvetica-neue)', 'Helvetica Neue', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
