import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        half: "45vh",
        onehalf: "9.9vh",
        144: "33.99rem",
        112: "28rem",
        88: "22rem",
        164: "41rem",
      },
    },
  },
  mode: "jit",
  plugins: [
    nextui(),
  ],
};
