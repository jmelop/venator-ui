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
    400: '#8a8f98',
    500: '#6e7380',
    600: '#5b6069',
    700: '#3a3e46',
    800: '#22252c',
    900: '#15181d',
    950: '#08090b',
  },
  success: {
    light: '#22c55e',
    DEFAULT: '#16a34a',
    dark: '#15803d',
  },
  warning: {
    light: '#fbbf24',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
  },
  error: {
    light: '#ef4444',
    DEFAULT: '#dc2626',
    dark: '#b91c1c',
  },
} as const;

export const border = {
  subtle:  'rgba(255,255,255,0.08)',
  default: 'rgba(255,255,255,0.14)',
} as const;
