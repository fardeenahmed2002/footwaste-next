/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          dancing: ['"Dancing Script"', 'cursive'],
          knewave: ['Knewave', 'cursive'],
          robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
          parkinsans: ['Parkinsans', 'sans-serif'],
          arbutus: ['"Arbutus Slab"', 'serif'],
        },
      },
    },
    plugins: [],
  }
  