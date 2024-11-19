const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem"
      }
    },
    extend: {},
    colors: {
      transparent: "transparent",
      primary: "#173540",
      ...colors
    }
  },
  plugins: [flowbite.plugin()]
};
