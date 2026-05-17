export const bg = {
  DEFAULT: '#08090b',
  1: '#0c0d10',
  2: '#111317',
  3: '#1c2028',
} as const;

export const fg = {
  DEFAULT: '#f5f6f7',
  2: '#c7cad1',
  3: '#8a8f98',
  4: '#8B9099',
  5: '#3a3e46',
} as const;

export const accent = {
  DEFAULT: '#ffffff',
  ink: '#000000',
} as const;

export const semantic = {
  success: '#5eead4',
  warn:    '#fbbf24',
  danger:  '#f87171',
  info:    '#93c5fd',
} as const;

export const border = {
  subtle:  'rgba(255,255,255,0.08)',
  default: 'rgba(255,255,255,0.14)',
} as const;

// Legacy — keep temporarily for backward compat during migration
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  neutral: {
    50:  '#f5f6f7',
    100: '#e8eaed',
    200: '#c7cad1',
    300: '#a0a5b0',
    400: '#8B9099',
    500: '#6e7380',
    600: '#5b6069',
    700: '#3a3e46',
    800: '#22252c',
    900: '#15181d',
    950: '#08090b',
  },
  success: { light: '#5eead4', DEFAULT: '#2dd4bf', dark: '#14b8a6' },
  warning: { light: '#fbbf24', DEFAULT: '#f59e0b', dark: '#d97706' },
  error:   { light: '#f87171', DEFAULT: '#ef4444', dark: '#dc2626' },
} as const;
