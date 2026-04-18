import { colors, border } from './colors';
import { typography } from './typography';
import { borderRadius, shadows, breakpoints } from './scales';

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
        subtle:  border.subtle,
        default: border.default,
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
};

export type VenatorPreset = typeof venatorPreset;
