/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        briem: ["Briem Hand", "cursive"], // Example: Replace 'Roboto' with the Google Font you want to use
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

