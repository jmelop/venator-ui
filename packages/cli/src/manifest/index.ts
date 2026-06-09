/**
 * `buildManifest()` — composes the data core for `venator manifest`.
 *
 * Orchestrates the four extractors into the VenatorManifest contract. This is
 * the data layer only: no markdown rendering, no `--target` logic, no file
 * writing.
 */
import { resolveUiPackage } from './ui-source';
import { extractTokens } from './tokens';
import { extractComponentNames, extractComponentExample } from './components';
import { extractProps } from './props';
import { extractPresetFlags } from './preset';
import type { ComponentInfo, VenatorManifest } from './types';

export function buildManifest(): VenatorManifest {
  const { version } = resolveUiPackage();

  const components: ComponentInfo[] = extractComponentNames().map((name) => {
    const props = extractProps(name);
    const example = extractComponentExample(name);
    return example ? { name, props, example } : { name, props };
  });

  return {
    version,
    tokens: extractTokens(),
    components,
    presetFlags: extractPresetFlags(),
  };
}

export type {
  VenatorManifest,
  TokenGroup,
  ComponentInfo,
  PropInfo,
  PresetFlag,
} from './types';
