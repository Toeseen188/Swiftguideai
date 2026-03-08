/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1e',
        'card-bg': '#111827',
        'card-border': '#1f2937',
        'primary-green': '#10b981',
        'accent-green': '#34d399',
        danger: '#ef4444',
        warning: '#f59e0b',
        'text-primary': '#f9fafb',
        'text-secondary': '#9ca3af',
        'button-bg': '#10b981',
        'button-text': '#ffffff'
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif']
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

