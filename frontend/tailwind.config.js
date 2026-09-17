/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EE",
        offwhite: "#FBFAF7",
        charcoal: "#231F1C",
        espresso: "#3A2E27",
        bronze: "#A9793D",
        gold: "#C9A25C",
        sand: "#E7DFD1",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
