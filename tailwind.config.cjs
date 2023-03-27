/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slow-appear": "slowappear 600ms linear",
      },
      gridTemplateColumns: {
        "3+9": "3fr 9fr",
      },
      gridTemplateRows: {
        full: "1fr",
      },
      keyframes: {
        slowappear: {
          "0%": { opacity: 0 },
          100: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
