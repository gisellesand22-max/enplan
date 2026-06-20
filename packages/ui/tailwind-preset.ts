import type { Config } from "tailwindcss";

const preset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        lima: {
          50: "#FAFDE6",
          100: "#F5FACC",
          200: "#EBF59A",
          300: "#E1F067",
          400: "#D7EB35",
          500: "#CDD917",
          DEFAULT: "#CDD917",
          600: "#A4AE12",
          700: "#7B820E",
          800: "#525709",
          900: "#292B05",
          950: "#151602",
        },
        carbon: {
          50: "#F5F5F3",
          100: "#EBEBEA",
          200: "#D1D1CD",
          300: "#B8B8B0",
          400: "#717168",
          500: "#2B2B23",
          DEFAULT: "#2B2B23",
          600: "#26261F",
          700: "#1F1F19",
          800: "#191914",
          900: "#14140F",
          950: "#0A0A08",
        },
        arena: {
          DEFAULT: "#FAF8F3",
          dark: "#D6D0C4",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
        chip: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(43, 43, 35, 0.06), 0 1px 2px -1px rgba(43, 43, 35, 0.06)",
        "card-hover":
          "0 4px 6px -1px rgba(43, 43, 35, 0.08), 0 2px 4px -2px rgba(43, 43, 35, 0.06)",
      },
    },
  },
  plugins: [],
};

export default preset;
