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
        // Main is the primary color of the site
        "main-bg": "#3b064d",
        "main-text": colors.gray[300],
        "main-header": colors.gray[200],

        // Secondary is for text fields
        // Ideally this should be a light background with dark text
        "secondary-bg": "#fff0f0",
        "secondary-text": colors.black,

        // Other backgrounds
        "footer-bg": "#3b064d",
        "nav-bg": "#3b064d",

        // Other text colors
        link: colors.blue[300],
        "correct-guess": colors.emerald[300],
        "incorrect-guess": colors.rose[300],
        error: colors.red[300],

        // Colors
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
      typography: ({ theme }) => ({
        custom: {
          css: {
            "--tw-prose-body": theme("colors.main-text"),
            "--tw-prose-headings": theme("colors.main-header"),
            // "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.link"),
            "--tw-prose-bold": theme("colors.white"),
            // "--tw-prose-counters": theme("colors.pink[600]"),
            // "--tw-prose-bullets": theme("colors.pink[400]"),
            // "--tw-prose-hr": theme("colors.pink[300]"),
            // "--tw-prose-quotes": theme("colors.pink[900]"),
            // "--tw-prose-quote-borders": theme("colors.pink[300]"),
            // "--tw-prose-captions": theme("colors.pink[700]"),
            // "--tw-prose-code": theme("colors.pink[900]"),
            // "--tw-prose-pre-code": theme("colors.pink[100]"),
            // "--tw-prose-pre-bg": theme("colors.pink[900]"),
            // "--tw-prose-th-borders": theme("colors.pink[300]"),
            // "--tw-prose-td-borders": theme("colors.pink[200]"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
