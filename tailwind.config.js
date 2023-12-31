/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRow: {
        "span-11": "span 11 / span 11",
      },
      boxShadow: {
        equal: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
        "equal-md": "0 0 4px 4px rgba(0, 0, 0, 0.1)",
        "equal-lg": "0 0 10px 10px rgba(0, 0, 0, 0.1)",
        "equal-xl": "0 0 20px 20px rgba(0, 0, 0, 0.1)",
        "equal-2xl": "0 0 25px 25px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("odd-child", "& > *:nth-child(odd)");
      addVariant("even-child", "& > *:nth-child(even)");
    },
  ],
};
