/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d9bf0",
        secondary: "#d9d9d9",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
