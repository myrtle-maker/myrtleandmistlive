/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
        geo: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        myrtle: {
          bg: '#F9F8F6',
          text: '#1F1F1F',
          accent: '#08503C',
          secondary: '#E8E6E1',
        },
        mist: {
          bg: '#1C1C1C',
          text: '#F0F0F0',
          accent: '#B099D0',
          secondary: '#2A2A2A',
        }
      },
      transitionDuration: {
        '600': '600ms',
      },
      animation: {
        blob: "blob 10s infinite",
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    }
  },
  plugins: [],
}
