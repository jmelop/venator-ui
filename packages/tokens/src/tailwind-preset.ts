import { colors, typography, borderRadius, shadows, breakpoints } from './index';

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
} as const;

export type VenatorPreset = typeof venatorPreset;
