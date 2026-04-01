const { venatorPreset } = require('@venator/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    './node_modules/@venator/ui/dist/**/*.{js,mjs}',
    './node_modules/@venator/patterns/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
