/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1150': '1150px',
        '970': '970px',
        '740':'740px',
        '780':'760px'
      }
    },
  },
  plugins: [],
}

