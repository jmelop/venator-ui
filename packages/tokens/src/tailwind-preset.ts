import { bg, fg, accent, semantic, border, colors } from './colors';
import { typography } from './typography';
import { borderRadius, shadows, breakpoints } from './scales';
import plugin from 'tailwindcss/plugin';

export const venatorPreset = {
  theme: {
    extend: {
      colors: {
        // New semantic tokens
        bg: {
          DEFAULT: 'var(--bg)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          2: 'var(--fg-2)',
          3: 'var(--fg-3)',
          4: 'var(--fg-4)',
          5: 'var(--fg-5)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)',
        },
        success: 'var(--success)',
        warn:    'var(--warn)',
        danger:  'var(--danger)',
        info:    'var(--info)',
        // Legacy
        primary: colors.primary,
        neutral: colors.neutral,
      },
      borderColor: {
        subtle:  'var(--border-subtle)',
        default: 'var(--border-default)',
      },
      fontFamily: {
        sans: [typography.fontFamily.sans],
        mono: [typography.fontFamily.mono],
      },
      fontSize:     typography.fontSize,
      fontWeight:   typography.fontWeight,
      borderRadius,
      boxShadow:    shadows,
      screens:      breakpoints,
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        // Obsidian dark (default)
        ':root': {
          '--bg':   bg.DEFAULT,
          '--bg-1': bg[1],
          '--bg-2': bg[2],
          '--bg-3': bg[3],
          '--fg':   fg.DEFAULT,
          '--fg-2': fg[2],
          '--fg-3': fg[3],
          '--fg-4': fg[4],
          '--fg-5': fg[5],
          '--accent':     accent.DEFAULT,
          '--accent-ink': accent.ink,
          '--success': semantic.success,
          '--warn':    semantic.warn,
          '--danger':  semantic.danger,
          '--info':    semantic.info,
          '--border-subtle':  border.subtle,
          '--border-default': border.default,
        },
        // Obsidian light
        ':root[data-theme="light"], html.light': {
          '--bg':   '#fafafa',
          '--bg-1': '#ffffff',
          '--bg-2': '#f4f4f5',
          '--bg-3': '#e9e9ec',
          '--fg':   '#0a0a0c',
          '--fg-2': '#222428',
          '--fg-3': '#5b6069',
          '--fg-4': '#8a8f98',
          '--fg-5': '#b5b8bf',
          '--accent':     '#0a0a0c',
          '--accent-ink': '#ffffff',
          '--success': '#059669',
          '--warn':    '#d97706',
          '--danger':  '#dc2626',
          '--info':    '#2563eb',
          '--border-subtle':  'rgba(0,0,0,0.08)',
          '--border-default': 'rgba(0,0,0,0.14)',
        },
        // Slate dark
        ':root[data-theme="slate-dark"]': {
          '--bg':   '#0d1117',
          '--bg-1': '#151b23',
          '--bg-2': '#1c232c',
          '--bg-3': '#262e38',
          '--fg':   '#e6edf3',
          '--fg-2': '#c9d1d9',
          '--fg-3': '#8b949e',
          '--fg-4': '#6e7681',
          '--fg-5': '#484f58',
          '--accent':     '#6366f1',
          '--accent-ink': '#ffffff',
          '--success': '#3fb950',
          '--warn':    '#d29922',
          '--danger':  '#f85149',
          '--info':    '#58a6ff',
          '--border-subtle':  'rgba(160,180,210,0.10)',
          '--border-default': 'rgba(160,180,210,0.18)',
        },
        // Slate light
        ':root[data-theme="slate-light"]': {
          '--bg':   '#f6f8fa',
          '--bg-1': '#ffffff',
          '--bg-2': '#f0f3f6',
          '--bg-3': '#e4e8ec',
          '--fg':   '#0f172a',
          '--fg-2': '#1e293b',
          '--fg-3': '#475569',
          '--fg-4': '#64748b',
          '--fg-5': '#94a3b8',
          '--accent':     '#4f46e5',
          '--accent-ink': '#ffffff',
          '--success': '#16a34a',
          '--warn':    '#ca8a04',
          '--danger':  '#dc2626',
          '--info':    '#2563eb',
          '--border-subtle':  'rgba(31,41,55,0.08)',
          '--border-default': 'rgba(31,41,55,0.16)',
        },
      });
    }),
  ],
};

export type VenatorPreset = typeof venatorPreset;
