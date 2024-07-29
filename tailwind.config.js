/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}", ".src/*.css"],
  theme: {
    extend: {
      colors: {
        darkNavy: "#242742",
        paleNavy: "#36384D",
        vermellion: "#FF6155",
        vermellionInput: "rgba(255, 97, 85, 15%)",
        paleGrey: "rgba(25, 24, 43, 25%)",
        gradientOrange: "#FF6A3A",
        gradientPink: "#FF527B",
      },
      fontSize: {
        mobHeading: "2.5rem",
        desktopHeading: "3.5rem",
      },
      lineHeight: {
        primHeading: "100%",
      },
      margin: {
        listItemSm: "0.625rem",
      },
      maxWidth: {
        card: "58rem",
        formPage: "23.5rem",
      },
      boxShadow: {
        btnGradient: "0 16px 32px rgba(255, 97, 85, 50%)",
      },
      borderRadius: {
        card: "2.25rem",
      },
    },
  },
  plugins: [],
};
