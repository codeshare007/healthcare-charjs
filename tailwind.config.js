/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "indigo-custom": "#675FF7",
      },
      height: {
        128: "42rem",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
