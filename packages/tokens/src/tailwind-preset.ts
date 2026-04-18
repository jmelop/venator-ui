import { colors } from './colors';
import { typography } from './typography';
import { borderRadius, shadows, breakpoints } from './scales';
import plugin from 'tailwindcss/plugin';

export const venatorPreset = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
      borderColor: {
        subtle:  'var(--border-subtle)',
        default: 'var(--border-default)',
      },
      fontFamily: {
        sans: [typography.fontFamily.sans],
        mono: [typography.fontFamily.mono],
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      borderRadius,
      boxShadow: shadows,
      screens: breakpoints,
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--border-subtle':  'rgba(255,255,255,0.08)',
          '--border-default': 'rgba(255,255,255,0.14)',
        },
      });
    }),
  ],
};

export type VenatorPreset = typeof venatorPreset;
