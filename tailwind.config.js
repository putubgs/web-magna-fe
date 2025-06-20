/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      primary: {
        DEFAULT: "var(--color-primary-default)",
      },
    },
  },
  plugins: [],
};
