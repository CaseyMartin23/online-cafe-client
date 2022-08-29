/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "creamy-beige": "#E8D1C1",
        "light-brown": "#B6642E",
        "deep-brown": "#773415",
        "dark-brown": "#4D190C",
        "accent-color": "#004DE8",
      },
    },
  },
  plugins: [],
};
