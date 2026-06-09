/**
 * Renders a VenatorManifest into a markdown context document for AI copilots.
 *
 * Principle: the DATA is dynamic (injected from the manifest), while the RULES
 * and document STRUCTURE are a fixed template maintained here in code. The
 * reader is an LLM, not a human — prose is kept minimal and instruction-like.
 */
import type {
  ComponentInfo,
  PresetFlag,
  PropInfo,
  TokenGroup,
  VenatorManifest,
} from './types';

/**
 * FIXED rules template. These are the constraints a copilot must follow when
 * generating components with Venator. Not derived from the manifest — edit here.
 */
const RULES: string[] = [
  'Use design tokens for every visual value. Never hardcode colors or arbitrary Tailwind values (no `bg-[#fff]`, `text-[13px]`, inline hex/rgb).',
  'Style through the Venator Tailwind preset. Extend a component only via `className` delegation — do not fork or reimplement its markup.',
  'Compose from the existing primitives and patterns below before creating any new component.',
];

/** Escapes `|` so union types and prose render correctly inside table cells. */
function escapeCell(value: string): string {
  return value.replace(/\|/g, '\\|');
}

function renderRules(): string {
  const lines = ['## Rules', '', 'When generating UI with Venator, follow these constraints:', ''];
  for (const rule of RULES) lines.push(`- ${rule}`);
  return lines.join('\n');
}

function renderThemes(flags: PresetFlag[]): string {
  const lines = ['## Themes', '', 'Theme variants, selected via the `data-theme` attribute on a root element:', ''];
  for (const flag of flags) {
    lines.push(`- \`${flag.name}\` — ${flag.description}`);
  }
  return lines.join('\n');
}

function renderTokens(groups: TokenGroup[]): string {
  const lines = ['## Tokens', '', 'Token names grouped by category (names only — resolve values from the preset). Reference these, never raw values:', ''];
  for (const group of groups) {
    lines.push(`### ${group.category}`);
    lines.push(group.values.map((name) => `\`${name}\``).join(', '));
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

function renderPropsTable(props: PropInfo[]): string {
  const lines = [
    '| Prop | Type | Required | Description |',
    '| --- | --- | --- | --- |',
  ];
  for (const prop of props) {
    lines.push(
      `| \`${prop.name}\` | \`${escapeCell(prop.type)}\` | ${prop.required ? 'yes' : 'no'} | ${escapeCell(prop.description ?? '')} |`,
    );
  }
  return lines.join('\n');
}

function renderComponent(component: ComponentInfo): string {
  const lines = [`### ${component.name}`, ''];

  if (component.props.length > 0) {
    lines.push(renderPropsTable(component.props), '');
  } else {
    lines.push('No own props — accepts standard HTML attributes.', '');
  }

  if (component.example) {
    lines.push('Example:', '', '```tsx', component.example, '```', '');
  }

  return lines.join('\n').trimEnd();
}

function renderComponents(components: ComponentInfo[]): string {
  const lines = ['## Components', '', 'Available primitives. Props listed are each component\'s own — standard HTML attributes also pass through.', ''];
  lines.push(components.map(renderComponent).join('\n\n'));
  return lines.join('\n');
}

export function renderManifest(manifest: VenatorManifest): string {
  const sections = [
    '# Venator UI — AI context manifest',
    '',
    `Generated for \`@venator-ui/ui\` v${manifest.version}.`,
    '',
    renderRules(),
    '',
    renderThemes(manifest.presetFlags),
    '',
    renderTokens(manifest.tokens),
    '',
    renderComponents(manifest.components),
    '',
  ];
  return sections.join('\n');
}
