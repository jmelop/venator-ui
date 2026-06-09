/**
 * Maps `--target` values to the output filename each AI tool expects. The file
 * is always written to the project root (the directory the command is run in).
 *
 * No `--flag` falls back to a neutral `venator.md` so we never touch a
 * tool-owned file unless the user explicitly asks for that target.
 */

export const MANIFEST_TARGETS = ['claude', 'cursor', 'agents'] as const;
export type ManifestTarget = (typeof MANIFEST_TARGETS)[number];

const TARGET_FILENAMES: Record<ManifestTarget, string> = {
  claude: 'CLAUDE.md',
  cursor: '.cursorrules',
  agents: 'AGENTS.md',
};

/** Filename used when no `--target` is given. */
export const DEFAULT_FILENAME = 'venator.md';

export function isManifestTarget(value: string): value is ManifestTarget {
  return (MANIFEST_TARGETS as readonly string[]).includes(value);
}

/**
 * Resolves the output filename for a target. Throws on an unknown target so the
 * command can report it clearly; an undefined target yields the default file.
 */
export function resolveTargetFilename(target?: string): string {
  if (target === undefined) return DEFAULT_FILENAME;
  if (!isManifestTarget(target)) {
    throw new Error(
      `Unknown target "${target}". Supported targets: ${MANIFEST_TARGETS.join(', ')}`,
    );
  }
  return TARGET_FILENAMES[target];
}
