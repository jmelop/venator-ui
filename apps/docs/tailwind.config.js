const { venatorPreset } = require('@venator-ui/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './src/**/*.{ts,tsx,md,mdx,css}',
    './mdx-components.tsx',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/patterns/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
