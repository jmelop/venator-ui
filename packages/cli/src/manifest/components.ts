/**
 * Component discovery: lightweight parsing of the bundled `@venator-ui/ui`
 * declaration file. We list exported component names and, when present, pull a
 * usage snippet from each component's `@example` JSDoc. Prop extraction is
 * intentionally NOT done here — see props.ts (the swappable seam).
 */
import { readUiDeclarations } from './ui-source';

/**
 * Returns PascalCase value exports (components), skipping `type` re-exports and
 * hooks (`useX`, which are camelCase and thus excluded by the PascalCase rule).
 */
export function extractComponentNames(): string[] {
  const dts = readUiDeclarations();
  const names = new Set<string>();

  const exportBlock = /export\s*\{([\s\S]*?)\}/g;
  let block: RegExpExecArray | null;
  while ((block = exportBlock.exec(dts)) !== null) {
    for (const rawEntry of block[1].split(',')) {
      const entry = rawEntry.trim();
      if (!entry || entry.startsWith('type ')) continue;
      // Handle `Original as Alias` — the exported name is the alias.
      const exported = entry.split(/\s+as\s+/).pop()!.trim();
      if (/^[A-Z][A-Za-z0-9]*$/.test(exported)) {
        names.add(exported);
      }
    }
  }

  return [...names];
}

/**
 * Extracts the fenced code from a component's leading `@example` JSDoc block,
 * or undefined if the component has none.
 */
export function extractComponentExample(name: string): string | undefined {
  const dts = readUiDeclarations();
  const re = new RegExp(
    `\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*declare const ${name}\\b`,
  );
  const match = re.exec(dts);
  if (!match) return undefined;

  const example = /@example([\s\S]*?)(?:@\w+\s|$)/.exec(match[1]);
  if (!example) return undefined;

  const text = example[1]
    .split('\n')
    .map((line) => line.replace(/^\s*\*?\s?/, ''))
    .join('\n')
    .trim();

  const fenced = /```(?:[\w-]+)?\n([\s\S]*?)```/.exec(text);
  const snippet = (fenced ? fenced[1] : text).trim();
  return snippet || undefined;
}
