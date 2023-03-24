/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "3+9": "3fr 9fr",
      },
      gridTemplateRows: {
        full: "1fr",
      },
    },
  },
  plugins: [],
};
