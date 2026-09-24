/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#EEEADF",
        "primary-2": "#F6F3EC",
        "secondary-1": "#BF9553",
        "secondary-2": "#3A3A3A",
        "accent-1": "#800020",
        "accent-2": "#016064",
        "cream-1": "#E4DDCF",
      },
      fontFamily: {
        aboreto: ["Aboreto", "cursive"],
        forum: ["Forum", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        trap: ["Outfit", "Montserrat", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
    },
  },
  plugins: [],
}
