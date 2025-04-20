// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#asdasdsd', // Midnight Blue
        accent: '#10b981',  // Emerald
        light: '#f8fafc',   // Off-white
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
export default config;
