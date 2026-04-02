import { venatorPreset } from '@venator/tokens';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/patterns/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
