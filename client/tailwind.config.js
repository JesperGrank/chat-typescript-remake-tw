/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'skyGrey': '#f4ddc272',
        'skyOrange': 'rgb(255, 166, 0)',
        'skyGreen': '#1ad421'
      },
    },
  },
  plugins: [],
}
