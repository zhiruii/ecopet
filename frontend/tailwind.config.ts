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
        sans: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
