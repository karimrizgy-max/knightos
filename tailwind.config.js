/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'chess-darker',
    'chess-dark',
    'chess-light',
    'chess-accent',
    'chess-accent-dark',
    'bg-chess-darker',
    'from-chess-darker',
    'via-chess-dark',
    'to-black',
    'text-chess-darker',
    'bg-chess-accent',
    'text-chess-accent',
    'border-chess-accent',
    'hover:bg-chess-accent',
    'hover:text-chess-darker',
    'from-chess-accent',
    'to-chess-accent-dark',
  ],
  theme: {
    extend: {
      colors: {
        'chess-dark': '#1a1a1a',
        'chess-darker': '#0f0f0f',
        'chess-light': '#2a2a2a',
        'chess-accent': '#ffd700',
        'chess-accent-dark': '#b8860b',
      },
      fontFamily: {
        'chess': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
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
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}