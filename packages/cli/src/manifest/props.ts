/**
 * Prop extraction — THE SEAM.
 *
 * v1 reads props from the JSDoc-annotated `<Name>Props` interface in the
 * bundled declaration file. The signature `extractProps(name): PropInfo[]` is
 * the stable contract: a future v2 can reimplement this with the TypeScript
 * Compiler API without touching any other module. Only the component's OWN
 * declared props are reported — inherited HTML attributes are intentionally
 * excluded. Missing interface or JSDoc never throws; it returns `[]`.
 */
import { readUiDeclarations } from './ui-source';
import type { PropInfo } from './types';

/** Returns the body (between the outermost braces) of `interface <name> { … }`. */
function extractInterfaceBody(dts: string, interfaceName: string): string | null {
  const header = new RegExp(`interface\\s+${interfaceName}\\b[^{]*\\{`);
  const match = header.exec(dts);
  if (!match) return null;

  const start = match.index + match[0].length;
  let depth = 1;
  let i = start;
  while (i < dts.length && depth > 0) {
    const ch = dts[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    i++;
  }
  return depth === 0 ? dts.slice(start, i - 1) : null;
}

/**
 * Splits an interface body into member declarations, treating only a `;` at
 * brace-depth 0 as a separator. This keeps inline object types intact, e.g.
 * `data?: { label: string; value: number }[];` stays a single member rather
 * than leaking its inner fields as phantom props. Braces inside JSDoc blocks
 * are ignored.
 */
function splitMembers(body: string): string[] {
  const members: string[] = [];
  let current = '';
  let depth = 0;
  let inComment = false;

  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    const next = body[i + 1];

    if (!inComment && ch === '/' && next === '*') inComment = true;
    else if (inComment && ch === '*' && next === '/') inComment = false;

    if (!inComment) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      else if (ch === ';' && depth === 0) {
        members.push(current);
        current = '';
        continue;
      }
    }
    current += ch;
  }
  if (current.trim()) members.push(current);
  return members;
}

/** Normalizes a JSDoc comment body into a single-line description. */
function cleanDescription(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const text = raw
    .split('\n')
    .map((line) => line.replace(/^\s*\*?\s?/, '').trimEnd())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text || undefined;
}

export function extractProps(name: string): PropInfo[] {
  const dts = readUiDeclarations();
  const body = extractInterfaceBody(dts, `${name}Props`);
  if (!body) return [];

  const memberPattern =
    /^\s*(?:\/\*\*([\s\S]*?)\*\/)?\s*(?:readonly\s+)?([A-Za-z_$][\w$]*)(\?)?\s*:\s*([\s\S]+)$/;

  const props: PropInfo[] = [];
  for (const member of splitMembers(body)) {
    const match = memberPattern.exec(member);
    if (!match) continue;
    const [, jsdoc, propName, optional, type] = match;
    const description = cleanDescription(jsdoc);
    props.push({
      name: propName,
      type: type.replace(/\s+/g, ' ').trim(),
      required: optional !== '?',
      ...(description ? { description } : {}),
    });
  }

  return props;
}
