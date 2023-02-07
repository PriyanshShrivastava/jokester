/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: "#38CCB2",
        dark: "#3B3561",
        mid: "#5B5296",
        light: "#FFFFFF",
        black: "#000",
        orange: "#F94A29",
      },
      fontFamily: {
        poppins: ["Poppins", "sans"],
      },
    },
  },
  plugins: [],
};
