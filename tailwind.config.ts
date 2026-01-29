import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F3F6',
          100: '#DDE4EB',
          200: '#C0CEDC',
          300: '#99B0C8',
          400: '#728FB0',
          500: '#537192',
          600: '#3E5676',
          700: '#2F4156', // Navy
          800: '#233245',
          900: '#151F2D',
          950: '#0C121B',
        },
        secondary: {
          50: '#F2F6F8',
          100: '#E1E9ED',
          200: '#C5D6DE',
          300: '#9FBCC9',
          400: '#7A9EB0',
          500: '#567C8D',
          600: '#436170',
          700: '#344A56',
          800: '#293943',
          900: '#222E36',
          950: '#141C21',
        },
        accent: {
          50: '#FCFBF9',
          100: '#F5EFEB',
          200: '#EADCD5',
          300: '#DBC5B8',
          400: '#C9A998',
          500: '#B68D79',
          600: '#966F5C',
          700: '#785647',
          800: '#5E4439',
          900: '#4C3831',
          950: '#2B1F1B',
        },
        sky: {
          50: '#F6F9FB',
          100: '#EBF2F6',
          200: '#C8D9E6',
          300: '#A4BFD6',
          400: '#80A5C6',
          500: '#5E8BB6',
          600: '#476D92',
          700: '#35516D',
          800: '#2A3F55',
          900: '#1F2E3E',
          950: '#121B24',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'ping-slow': 'pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pingSlow: {
          '75%, 100%': {
            transform: 'scale(1.3)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
