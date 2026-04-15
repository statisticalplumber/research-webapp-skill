/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        elisa: {
          blue: '#1e40af',
          lightBlue: '#3b82f6',
          teal: '#14b8a6',
          green: '#10b981',
          purple: '#8b5cf6',
          gold: '#f59e0b',
          light: '#f0f9ff',
          dark: '#0c4a6e',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
