import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lima: {
          DEFAULT: '#CDD917',
          50: '#F7F8E0',
          100: '#F2F4C7',
          200: '#E8EB96',
          300: '#DEE265',
          400: '#D5DA3E',
          500: '#CDD917',
          600: '#A3AC12',
          700: '#7A810D',
          800: '#515609',
          900: '#292B04',
        },
        carbon: {
          DEFAULT: '#2B2B23',
          50: '#F5F5F3',
          100: '#E5E5E0',
          200: '#C5C5BA',
          300: '#A5A594',
          400: '#85856E',
          500: '#656549',
          600: '#4B4B38',
          700: '#3B3B2E',
          800: '#2B2B23',
          900: '#1B1B16',
        },
        arena: {
          DEFAULT: '#FAF8F3',
          dark: '#D6D0C4',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        'work-sans': ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
