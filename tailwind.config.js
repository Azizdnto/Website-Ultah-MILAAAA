/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        cream: "#fff7f2",
        blush: "#ffd9e3",
        rose: "#ff6f91",
        grape: "#7c5cff",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-30px) rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        pop: "pop 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
