/**
 * Preset flags.
 *
 * NOTE — hand-maintained metadata (v1). Unlike tokens and props, the
 * `venatorUIPreset` is a static Tailwind config object, not an options bag with
 * introspectable flags. The only meaningful user-facing "flags" it exposes are
 * the theme variants it defines via `addBase` selectors. Those are listed here
 * by hand and must be kept in sync with `tailwind-preset.ts`. If the preset
 * ever gains a real options surface, this should be replaced with runtime
 * introspection.
 */
import type { PresetFlag } from './types';

const PRESET_FLAGS: PresetFlag[] = [
  {
    name: 'obsidian',
    description:
      'Default dark theme applied at :root. Near-black charcoal surfaces with a white accent.',
  },
  {
    name: 'light',
    description:
      'Light counterpart of obsidian. Activated via [data-theme="light"] or html.light.',
  },
  {
    name: 'slate-dark',
    description:
      'Cool blue-grey dark theme with an indigo accent. Activated via [data-theme="slate-dark"].',
  },
  {
    name: 'slate-light',
    description:
      'Light counterpart of slate. Activated via [data-theme="slate-light"].',
  },
];

export function extractPresetFlags(): PresetFlag[] {
  return PRESET_FLAGS;
}
