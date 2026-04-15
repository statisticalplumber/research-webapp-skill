/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stone-900': '#1C1917',
        'stone-800': '#292524',
        'stone-600': '#57534E',
        'stone-400': '#A8A29E',
        'stone-100': '#F5F5F4',
      },
    },
  },
  plugins: [],
}
