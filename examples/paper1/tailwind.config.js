/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#242435',
          500: '#303045',
        },
        starlight: {
          gold: '#f5d388',
          blue: '#7ec8e3',
          purple: '#9d8bc9',
          pink: '#e59ac9',
        },
        plasma: {
          teal: '#4ade80',
          cyan: '#22d3ee',
          violet: '#a78bfa',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
