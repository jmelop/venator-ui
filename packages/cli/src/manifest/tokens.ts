/**
 * Token extraction: imports `@venator-ui/tokens` at runtime and reports the
 * token NAMES grouped by category. Raw values are never emitted — the manifest
 * describes the shape of the design system, not its concrete colors.
 */
import * as venatorTokens from '@venator-ui/tokens';
import type { TokenGroup } from './types';

/** Exports that are not token sets and should be skipped. */
const NON_TOKEN_EXPORTS = new Set(['venatorUIPreset', 'default', '__esModule']);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Recursively collects leaf key paths, e.g. `primary.500`, `fontSize.xs`. */
function collectLeafPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  const paths: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) {
      paths.push(...collectLeafPaths(value, pathKey));
    } else {
      paths.push(pathKey);
    }
  }
  return paths;
}

export function extractTokens(): TokenGroup[] {
  const groups: TokenGroup[] = [];

  for (const [category, value] of Object.entries(
    venatorTokens as Record<string, unknown>,
  )) {
    if (NON_TOKEN_EXPORTS.has(category)) continue;
    if (!isPlainObject(value)) continue;

    const values = collectLeafPaths(value);
    if (values.length > 0) {
      groups.push({ category, values });
    }
  }

  return groups;
}
