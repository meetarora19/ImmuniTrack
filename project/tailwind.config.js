/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF9933',  // Saffron from Indian flag
        secondary: '#138808',  // Green from Indian flag
        navy: '#1E3A8A',
        accent: '#6366F1',
        warning: '#FBBF24',
        error: '#EF4444',
        success: '#10B981',
        background: '#F9FAFB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};