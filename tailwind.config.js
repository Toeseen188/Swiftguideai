/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C35',
        accent: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        background: '#F8FAFC',
        text: '#111827'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'system-ui',
          'sans-serif'
        ]
      },
      keyframes: {
        'pulse-strong': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'pulse-strong': 'pulse-strong 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards'
      }
    }
  },
  plugins: []
};

