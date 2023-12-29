/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color-lighter": "#7950f2",
        "primary-color": "#6741d9",
        "text-color": "#dee2e6",
        "text-dark-color": "#adb5bd",
        "bg-color-lighter": "#343a40",
        "bg-color": "#2b3035",
        "bg-color-darker": "#212529",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
        obitron: "Orbitron, sans-serif",
      },
    },
  },
  plugins: [],
};
