import type { TerminalLine } from '@venator-ui/ui';

export const TERMINAL_LINES: TerminalLine[] = [
  { type: 'command', text: 'npx @venator-ui/cli init dashboard', delay: 0 },
  { type: 'muted',   text: '✓ Fetching archetype manifest',             delay: 800 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/tokens@0.1',        delay: 1200 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/ui@0.1',            delay: 1500 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/patterns@0.1',      delay: 1800 },
  { type: 'muted',   text: '→ Scaffolding into ./apps/dashboard',       delay: 2200 },
  { type: 'dim',     text: '   ├── app/',                                delay: 2500 },
  { type: 'dim',     text: '   ├── components/modules/',                delay: 2700 },
  { type: 'dim',     text: '   ├── lib/navigation.ts',                  delay: 2900 },
  { type: 'dim',     text: '   └── tailwind.config.ts',                 delay: 3100 },
  { type: 'success', text: '✓ Architecture deployed. 12 files written.', delay: 3500 },
  { type: 'accent',  text: '→ cd apps/dashboard && npm run dev',        delay: 3900 },
];

export const LAYER_DATA = [
  {
    key: 'ui',
    pkg: '@venator-ui/ui',
    title: 'UI primitives',
    desc: 'Accessible, typed React components.',
    items: ['Button', 'Card', 'Input', 'Badge', 'Modal', 'Table', 'Checkbox', 'Slider', 'Progress', 'Kbd', 'Terminal', 'Switch'],
    index: '01 / 03',
  },
  {
    key: 'patterns',
    pkg: '@venator-ui/patterns',
    title: 'Structural patterns',
    desc: 'Reusable compositional layouts.',
    items: ['DashboardLayout', 'PageHeader', 'ModuleGrid'],
    index: '02 / 03',
  },
  {
    key: 'archetypes',
    pkg: '@venator-ui/archetypes',
    title: 'Architectures',
    desc: 'Full app scaffolds deployed via CLI.',
    items: ['dashboard', 'admin', 'ai-tool'],
    index: '03 / 03',
  },
] as const;

export const ARCHETYPES = [
  { key: 'dashboard', cmd: 'npx @venator-ui/cli init dashboard' },
  { key: 'admin',     cmd: 'npx @venator-ui/cli init admin' },
  { key: 'ai-tool',  cmd: 'npx @venator-ui/cli init ai-tool' },
] as const;

export const LAYERS = [
  {
    pkg: '@venator-ui/ui',
    title: 'UI primitives',
    desc: 'Typed, accessible, composable React components. Import what you need, extend with className. Nothing opinionated about composition.',
    meta: '28 components · 0 dependencies',
    index: '01',
  },
  {
    pkg: '@venator-ui/patterns',
    title: 'Structural patterns',
    desc: 'Reusable compositions that define how UI is arranged into pages. Layout scaffolds, not content. You fill them in.',
    meta: '9 patterns · 0 opinions',
    index: '02',
  },
  {
    pkg: '@venator-ui/archetypes',
    title: 'Application architectures',
    desc: 'Complete architectures deployed via CLI. Once scaffolded the code is yours — no runtime dependency, no lock-in.',
    meta: '3 archetypes · CLI-deployed',
    index: '03',
  },
] as const;

export const FEATURES = [
  {
    title: 'Zero runtime weight',
    desc: 'Tree-shakeable, no CSS-in-JS, no provider.',
  },
  {
    title: 'Fully typed',
    desc: 'Strict TypeScript in every package.',
  },
  {
    title: 'CLI-deployed archetypes',
    desc: 'Scaffold complete architectures in one command.',
  },
  {
    title: 'Four adoption levels',
    desc: 'Start with a Button. Scale to a full app.',
  },
  {
    title: 'No lock-in',
    desc: 'Archetypes are copied — the code is yours.',
  },
  {
    title: 'Accessible by default',
    desc: 'WAI-ARIA patterns wired in from the primitive layer.',
  },
] as const;

export const STATS = [
  { label: 'Revenue',      value: '$128,402', delta: '+12.4%', down: false, data: [12,18,22,20,28,34,32,38,42] },
  { label: 'Active users', value: '24,891',   delta: '+8.1%',  down: false, data: [14,16,14,20,22,28,24,26,32] },
  { label: 'Sessions',     value: '89,233',   delta: '+4.7%',  down: false, data: [20,22,18,24,28,24,30,28,34] },
  { label: 'Conv. rate',   value: '3.42%',    delta: '-0.6%',  down: true,  data: [30,28,32,26,24,28,22,20,18] },
] as const;

export const NAV_LINKS = [
  { label: 'Docs',        href: '/docs/getting-started/introduction', base: '/docs/getting-started' },
  { label: 'Components',  href: '/docs/components/button',            base: '/docs/components' },
  { label: 'Patterns',    href: '/docs/patterns/dashboard-layout',    base: '/docs/patterns' },
  { label: 'Archetypes',  href: '/docs/archetypes/dashboard',         base: '/docs/archetypes' },
  { label: 'Changelog',   href: 'https://github.com/jmelop/venator-ui/releases', base: 'https://github.com' },
] as const;
