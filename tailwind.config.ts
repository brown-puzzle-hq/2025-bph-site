import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors"; // Change this line

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        link: colors.gray[500],
        secondary: "#808080",
        nav: "#3b064d", // ripe-plum-950

        "ripe-plum": {
          "50": "#fbf4ff",
          "100": "#f6e9fe",
          "200": "#ebd1fd",
          "300": "#e0adfa",
          "400": "#ce7cf6",
          "500": "#b64aeb",
          "600": "#9b2bce",
          "700": "#8320ab",
          "800": "#6d1c8c",
          "900": "#5d1c73",
          "950": "#3b064d",
        },

        crimson: {
          "50": "#fff0f0",
          "100": "#ffdddd",
          "200": "#ffc0c0",
          "300": "#ff9494",
          "400": "#ff5758",
          "500": "#ff2324",
          "600": "#ec0001",
          "700": "#d70001",
          "800": "#b10304",
          "900": "#920a0b",
          "950": "#500000",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
