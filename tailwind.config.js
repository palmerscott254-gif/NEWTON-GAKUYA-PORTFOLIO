/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5'
        }
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '24px'
      }
    }
  },
  plugins: []
};
