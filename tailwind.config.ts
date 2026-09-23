import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8eeff",
          200: "#b9e0ff",
          300: "#89cdff",
          400: "#52afff",
          500: "#278cff",
          600: "#106cf5",
          700: "#0b54e0",
          800: "#0f44b5",
          900: "#133c8e",
          950: "#0c2457",
        },
      },
    },
  },
  plugins: [],
};
export default config;
