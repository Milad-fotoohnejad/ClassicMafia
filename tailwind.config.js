/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navBack': '#000000',
        'backgr': '#353535',
        'gold': '#ffd700',
        'scarlet':'#811923',
        'dark': '#2c2c2cbf',
      },
      fontFamily: {
        'nav-font': ['monospace', 'Scopeone'],
      },
    },
  },
  plugins: [],
}