/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sada: {
          violet: '#7357D9',
          'violet-dark': '#583EB8',
          'violet-light': '#8F75EC',
          teal: '#159D98',
          'teal-dark': '#0E7A76',
          'teal-light': '#32B8B3',
          yellow: '#FFC552',
          'yellow-light': '#FFE39B',
          coral: '#FF886F',
          'coral-dark': '#E86B52',
          cream: '#FFF8ED',
          'cream-warm': '#FBF3E4',
          lavender: '#E9E2FF',
          'lavender-soft': '#F4EFFF',
          ink: '#27213E',
          'ink-deep': '#1B172E',
          'ink-card': '#362E52',
          surface: '#FDFBF7',
          mint: '#55D6BE',
          sky: '#4D96FF'
        }
      },
      fontFamily: {
        arabic: ['"Alexandria"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['"Alexandria"', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        'char-breathe': {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -5px, 0) scale(1.012)' },
        },
        'char-speak': {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0) rotate(0deg) scale(1.03)' },
          '35%': { transform: 'translate3d(0, -6px, 0) rotate(-0.8deg) scale(1.045)' },
          '70%': { transform: 'translate3d(0, -3px, 0) rotate(0.8deg) scale(1.035)' },
        },
      },
      animation: {
        float: 'float 5.5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.4s ease-in-out infinite',
        'char-breathe': 'char-breathe 4.4s ease-in-out infinite',
        'char-speak': 'char-speak 1.15s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
