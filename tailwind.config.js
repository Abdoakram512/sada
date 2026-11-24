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
        arabic: ['"Alexandria"', '"IBM Plex Sans Arabic"', 'sans-serif'],
        display: ['"Alexandria"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        wave: 'wave 15s linear infinite',
      }
    },
  },
  plugins: [],
}
