import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        card: 'var(--card)',
        accent: 'var(--accent)',
        info: 'var(--info)',
        good: 'var(--good)',
        warn: 'var(--warn)',
        bad: 'var(--bad)',
        credit: 'var(--credit)',
      },
      fontFamily: {
        sans: ['Silkscreen', 'monospace'],
        display: ['"Press Start 2P"', 'Silkscreen', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
    },
  },
  plugins: [],
} satisfies Config
