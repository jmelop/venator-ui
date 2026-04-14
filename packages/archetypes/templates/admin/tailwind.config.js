const { venatorPreset } = require('@venator-ui/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx,md,mdx}',
    './node_modules/@venator-ui/ui/dist/**/*.{js,mjs}',
    './node_modules/@venator-ui/patterns/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
