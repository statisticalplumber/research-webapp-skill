/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'academic-blue': '#1a365d',
        'academic-dark': '#0f172a',
        'academic-light': '#f8fafc',
        'academic-accent': '#3b82f6',
        'academic-warning': '#f59e0b',
        'academic-success': '#10b981',
        'academic-danger': '#ef4444',
      },
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
