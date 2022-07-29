/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          alfa: "rgba(0,0,0)",
        },
        secondary: { alfa: "#31D7A0" },
        tertiary: { alfa: "rgb(29,29,29)" },
      },
      backgroundImage: {
        heroBGLG: "url('/assets/icons/HeroBGLG.png')",
        heroBGSM: "url('/assets/icons/HeroBGSM.png')",
      }
    },
  },
  plugins: [require("daisyui")],
};
