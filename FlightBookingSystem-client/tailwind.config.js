/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  // darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Montserrat", "Sans-serif"],
      inter: ["Inter", "Sans-serif"]
    },
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
      primary: "#FF9D13",
      secondary: "#173540",
      ...colors
    }
  },
  plugins: [flowbite.plugin()]
};
