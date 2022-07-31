/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          alfa: "rgba(0,0,0)",
        },
        secondary: {
          alfa: "#ff9200", //"#31D7A0",
          beta: "#ffa93a", //"rgb(0, 208, 146)",
        },
        tertiary: { alfa: "rgb(29,29,29)" },
      },
      backgroundImage: {
        heroBGLG: "url('/assets/icons/HeroBGLG.png')",
        heroBGSM: "url('/assets/icons/HeroBGSM.png')",
      },
      fontFamily: {
        barlow: ["'Barlow'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
