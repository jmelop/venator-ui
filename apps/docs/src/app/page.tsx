'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LandingNav } from '../components/LandingNav';
import { Inter, JetBrains_Mono } from 'next/font/google';
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Kbd,
  Progress,
  Slider,
  Switch,
  Terminal,
} from '@venator-ui/ui';

const geist = Inter({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });



const TERMINAL_LINES: import('@venator-ui/ui').TerminalLine[] = [
  { type: 'command', text: 'npx @venator-ui/cli init dashboard', delay: 0 },
  { type: 'muted',   text: '✓ Fetching archetype manifest',               delay: 800 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/tokens@0.1',           delay: 1200 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/ui@0.1',               delay: 1500 },
  { type: 'muted',   text: '✓ Resolving @venator-ui/patterns@0.1',         delay: 1800 },
  { type: 'muted',   text: '→ Scaffolding into ./apps/dashboard',          delay: 2200 },
  { type: 'dim',     text: '   ├── app/',                                   delay: 2500 },
  { type: 'dim',     text: '   ├── components/modules/',                   delay: 2700 },
  { type: 'dim',     text: '   ├── lib/navigation.ts',                     delay: 2900 },
  { type: 'dim',     text: '   └── tailwind.config.ts',                    delay: 3100 },
  { type: 'success', text: '✓ Architecture deployed. 12 files written.',   delay: 3500 },
  { type: 'accent',  text: '→ cd apps/dashboard && npm run dev',           delay: 3900 },
];

const LAYER_DATA = [
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

function LayersVisual() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % LAYER_DATA.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-[480px] overflow-hidden" style={{ perspective: '900px' }}>
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Planes */}
      {LAYER_DATA.map((layer, i) => {
        const offset = i - active;
        const transform = `translate(-50%, -50%) translateX(${offset * 200}px) translateZ(${-Math.abs(offset) * 120}px) rotateY(${offset * -22}deg)`;
        const opacity = i === active ? 1 : 0.45;
        const zIndex = 10 - Math.abs(offset);
        return (
          <div
            key={layer.key}
            onClick={() => setActive(i)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 300,
              minHeight: 280,
              transform,
              zIndex,
              opacity,
              transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
              cursor: i !== active ? 'pointer' : 'default',
            }}
          >
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-1)', minHeight: 260, border: '1px solid var(--line)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-4)' }}>{layer.pkg}</span>
                <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-5)' }}>{layer.index}</span>
              </div>
              <p className="text-[15px] font-medium mb-1 tracking-tight" style={{ color: 'var(--fg)' }}>{layer.title}</p>
              <p className="text-[12.5px] mb-4" style={{ color: 'var(--fg-4)' }}>{layer.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map(item => (
                  <span key={item} className="font-mono text-[11px] rounded-md px-2 py-0.5" style={{ color: 'var(--fg-4)', border: '1px solid var(--line)' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Nav dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 20 }}>
        {LAYER_DATA.map((layer, i) => (
          <button
            key={layer.key}
            onClick={() => setActive(i)}
            className={`font-mono text-[11px] px-3 py-1 rounded-md transition-colors border ${
              i === active
                ? 'border-[var(--line)] text-[var(--fg-2)] bg-[var(--bg-2)]'
                : 'border-transparent text-[var(--fg-4)] hover:text-[var(--fg-3)]'
            }`}
          >
            {layer.key}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroVisual() {
  const [tab, setTab] = useState<'terminal' | 'layers'>('terminal');

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-6">
      <div className="flex items-center gap-1 mb-3 justify-center">
        <button
          type="button"
          onClick={() => setTab('terminal')}
          className={[
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors',
            tab === 'terminal'
              ? 'bg-[var(--bg-2)] text-[var(--fg)] border border-[var(--line)]'
              : 'text-[var(--fg-4)] hover:text-[var(--fg-2)]',
          ].join(' ')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 17l6-6-6-6M12 19h8" />
          </svg>
          CLI scaffold
        </button>
        <button
          type="button"
          onClick={() => setTab('layers')}
          className={[
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors',
            tab === 'layers'
              ? 'bg-[var(--bg-2)] text-[var(--fg)] border border-[var(--line)]'
              : 'text-[var(--fg-4)] hover:text-[var(--fg-2)]',
          ].join(' ')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Architecture
        </button>
      </div>
      {tab === 'terminal' ? (
        <Terminal
          lines={TERMINAL_LINES}
          title="venator — zsh — 100×28"
          loop
          loopDelay={2000}
          className="h-[420px] overflow-hidden"
        />
      ) : (
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--line)' }}>
          <LayersVisual />
        </div>
      )}
    </div>
  );
}

function Sparkline({ data, color = 'var(--accent)', height = 24, width = 60 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * height,
  ]);
  const d = pts.map(([x, y], i) => (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)).join(' ');
  const fill = d + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <path d={fill} fill={color} opacity="0.15" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AreaChart() {
  const data1 = [12,18,15,22,28,24,32,38,34,42,48,45,52,58,54,62,68,64,72,78,74,82,78,85];
  const data2 = [8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54];
  const w = 560, h = 200, max = 100;
  const mkPath = (data: number[]) => {
    const pw = w - 40, ph = h - 30;
    const pts = data.map((v, i) => [30 + (i / (data.length - 1)) * pw, 10 + ph - (v / max) * ph]);
    const line = pts.map(([x, y], i) => (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1)).join(' ');
    return { line, fill: line + ` L ${30 + pw} ${10 + ph} L 30 ${10 + ph} Z` };
  };
  const p1 = mkPath(data1), p2 = mkPath(data2);
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--fg-3)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--fg-3)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <line key={i} x1="30" y1={10 + (h - 30) * p} x2={w - 10} y2={10 + (h - 30) * p} stroke="var(--line)" strokeDasharray="2 4" />
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <text key={i} x="24" y={10 + (h - 30) * (1 - p) + 3} fill="var(--fg-4)" fontSize="9" fontFamily="monospace" textAnchor="end">{Math.round(p * max)}</text>
      ))}
      <path d={p2.fill} fill="url(#g2)" />
      <path d={p2.line} fill="none" stroke="var(--fg-3)" strokeWidth="1.5" />
      <path d={p1.fill} fill="url(#g1)" />
      <path d={p1.line} fill="none" stroke="var(--accent)" strokeWidth="1.8" />
      {['Apr 01','Apr 05','Apr 09','Apr 13','Apr 17'].map((t, i) => (
        <text key={i} x={30 + (i / 4) * (w - 40)} y={h - 4} fill="var(--fg-4)" fontSize="9" fontFamily="monospace" textAnchor="middle">{t}</text>
      ))}
    </svg>
  );
}

function BarChart() {
  const data = [42, 58, 66, 72, 54, 80, 68];
  const max = 100, w = 260, h = 170;
  const bw = (w - 20) / data.length - 6;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {data.map((v, i) => {
        const bh = (v / max) * (h - 30);
        const x = 10 + i * ((w - 20) / data.length) + 3;
        return (
          <g key={i}>
            <rect x={x} y={10 + (h - 30) - bh} width={bw} height={bh} fill="var(--accent)" opacity={0.2 + (v / max) * 0.5} rx="2" />
            <text x={x + bw / 2} y={h - 4} fill="var(--fg-4)" fontSize="9" fontFamily="monospace" textAnchor="middle">{'MTWTFSS'[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ComponentsShowcase() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [ck1, setCk1] = useState(true);
  const [ck2, setCk2] = useState(false);
  const [ck3, setCk3] = useState(true);
  const [sliderVal, setSliderVal] = useState(62);
  const [activeTab, setActiveTab] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  return (
    <section className="px-6 py-20" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>Primitives · 03</p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
          Every primitive you'll need.<br />
          <span style={{ color: 'var(--fg-4)' }}>None you won't.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          Accessible, composable, typed primitives. Built with Tailwind CSS and design tokens.
        </p>

        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>

          {/* Buttons — col 6 */}
          <div className="col-span-6 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Button</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="primary" size="sm" className="opacity-40 pointer-events-none">Disabled</Button>
            </div>
          </div>

          {/* Badges — col 6 */}
          <div className="col-span-6 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Badge</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Failed</Badge>
            </div>
          </div>

          {/* Input — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Input</p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Search components..." />
              <Input placeholder="you@acme.com" />
            </div>
          </div>

          {/* Switch — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Switch</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: 'var(--fg-2)' }}>Notifications</span>
                <Switch checked={sw1} onCheckedChange={setSw1} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: 'var(--fg-2)' }}>Analytics</span>
                <Switch checked={sw2} onCheckedChange={setSw2} />
              </div>
            </div>
          </div>

          {/* Checkbox — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Checkbox</p>
            <div className="flex flex-col gap-2.5">
              {([['Accessible', ck1, setCk1], ['Composable', ck2, setCk2], ['Typed', ck3, setCk3]] as const).map(([label, val, set]) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: 'var(--fg-2)' }} onClick={() => set(!val)}>
                  <Checkbox checked={val} onCheckedChange={set} /> {label}
                </label>
              ))}
            </div>
          </div>

          {/* Slider — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Slider</p>
            <Slider value={sliderVal} onValueChange={setSliderVal} />
            <div className="flex justify-between font-mono text-[11px] mt-2" style={{ color: 'var(--fg-4)' }}>
              <span>0</span><span style={{ color: 'var(--fg-2)' }}>{sliderVal}</span><span>100</span>
            </div>
          </div>

          {/* Progress — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Progress</p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-mono text-[11px] mb-1" style={{ color: 'var(--fg-3)' }}>
                <span>Building</span><span>67%</span>
              </div>
              <Progress value={67} />
              <div className="flex justify-between font-mono text-[11px] mb-1" style={{ color: 'var(--fg-3)' }}>
                <span>Deploying</span><span>24%</span>
              </div>
              <Progress value={24} />
            </div>
          </div>

          {/* Kbd + Tooltip — col 4 */}
          <div className="col-span-4 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Kbd · Tooltip</p>
            <div className="flex flex-col gap-3">
              <div
                className="relative inline-block"
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                {tooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-100 text-neutral-900 text-[11px] font-mono rounded-md whitespace-nowrap">
                    Copy to clipboard
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-100" />
                  </div>
                )}
                <Button variant="outline" size="sm">Hover me</Button>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>
                Press <Kbd className="mx-1">⌘</Kbd><Kbd>K</Kbd> to search
              </div>
            </div>
          </div>

          {/* Tabs — col 6 */}
          <div className="col-span-6 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Tabs</p>
            <div className="flex gap-6 mb-3" style={{ borderBottom: '1px solid var(--line)' }}>
              {['Overview', 'Usage', 'Theming', 'API'].map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(i)}
                  className={`pb-2.5 text-[13px] border-b-2 transition-colors -mb-px ${activeTab === i ? 'border-[var(--accent)] text-[var(--fg)]' : 'border-transparent text-[var(--fg-4)] hover:text-[var(--fg-3)]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="font-mono text-[12px]" style={{ color: 'var(--fg-3)' }}>
              {['Primitives are accessible by default.', 'Import from @venator-ui/ui.', 'Tokens drive all visual properties.', 'All props are strictly typed.'][activeTab]}
            </p>
          </div>

          {/* Table — col 6 */}
          <div className="col-span-6 rounded-xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Table</p>
            <table className="w-full font-mono text-[12.5px] border-collapse">
              <thead>
                <tr>
                  {['Package', 'Version', 'Status'].map(h => (
                    <th key={h} className="text-left text-[11px] uppercase tracking-wider pb-2 font-normal" style={{ color: 'var(--fg-4)', borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: 'tokens', version: '0.1.2', status: 'ready', variant: 'success' as const },
                  { pkg: 'ui', version: '0.1.3', status: 'ready', variant: 'success' as const },
                  { pkg: 'patterns', version: '0.1.1', status: 'beta', variant: 'warning' as const },
                  { pkg: 'archetypes', version: '0.1.7', status: 'beta', variant: 'warning' as const },
                ].map(row => (
                  <tr key={row.pkg} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="py-2" style={{ color: 'var(--fg-2)' }}>{row.pkg}</td>
                    <td className="py-2" style={{ color: 'var(--fg-3)' }}>{row.version}</td>
                    <td className="py-2"><Badge variant={row.variant}>{row.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}

function Playground() {
  const [variant, setVariant] = useState<'primary' | 'ghost' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [label, setLabel] = useState('Get started');
  const [withIcon, setWithIcon] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsx = `import { Button } from "@venator-ui/ui";

<Button
  variant="${variant}"${size !== 'md' ? `\n  size="${size}"` : ''}${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  fullWidth' : ''}
>${withIcon ? '\n  <ArrowRightIcon />' : ''}
  ${label}
</Button>`;

  function copyJsx() {
    navigator.clipboard?.writeText(jsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="px-6 py-20" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>Live · 04</p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
          A playground, not a docs page.<br />
          <span style={{ color: 'var(--fg-4)' }}>Try it before you install.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          Every primitive is tweakable in-browser. Props on the left, rendered component in the middle, generated JSX on the right.
        </p>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[12px]" style={{ background: 'var(--bg-2)', color: 'var(--fg-4)', borderBottom: '1px solid var(--line)' }}>
            <span className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              &lt;Button /&gt;
            </span>
            <span className="flex items-center gap-3">
              <span>@venator-ui/ui</span>
              <Kbd>⌘</Kbd><Kbd>P</Kbd>
            </span>
          </div>

          {/* Body */}
          <div className="grid" style={{ gridTemplateColumns: '280px 1fr 1fr', minHeight: 360 }}>
            {/* Controls */}
            <div className="p-5 flex flex-col gap-5" style={{ background: 'var(--bg-1)', borderRight: '1px solid var(--line)' }}>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>variant</label>
                <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                  {(['primary', 'ghost', 'outline'] as const).map((v, i, arr) => (
                    <button key={v} onClick={() => setVariant(v)}
                      className={`flex-1 py-1.5 text-[12px] font-mono transition-colors ${i < arr.length - 1 ? 'border-r border-[var(--line)]' : ''} ${variant === v ? 'bg-[var(--bg-3)] text-[var(--fg)]' : 'text-[var(--fg-4)] hover:text-[var(--fg-2)]'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>size</label>
                <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                  {(['sm', 'md'] as const).map((v, i, arr) => (
                    <button key={v} onClick={() => setSize(v)}
                      className={`flex-1 py-1.5 text-[12px] font-mono transition-colors ${i < arr.length - 1 ? 'border-r border-[var(--line)]' : ''} ${size === v ? 'bg-[var(--bg-3)] text-[var(--fg)]' : 'text-[var(--fg-4)] hover:text-[var(--fg-2)]'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>children</label>
                <input
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  className="rounded-md px-3 py-1.5 text-[13px] font-mono focus:outline-none" style={{ background: 'var(--bg-2)', color: 'var(--fg)', border: '1px solid var(--line-2)' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>leftIcon</label>
                <Switch checked={withIcon} onCheckedChange={setWithIcon} />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>disabled</label>
                <Switch checked={disabled} onCheckedChange={setDisabled} />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>fullWidth</label>
                <Switch checked={fullWidth} onCheckedChange={setFullWidth} />
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-center p-8" style={{ background: 'radial-gradient(400px 200px at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%), var(--bg-2)', borderRight: '1px solid var(--line)' }}>
              <Button
                variant={variant}
                size={size === 'sm' ? 'sm' : undefined}
                disabled={disabled}
                className={fullWidth ? 'w-full' : ''}
              >
                {withIcon && (
                  <span className="mr-1 flex items-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                )}
                {label || 'Button'}
              </Button>
            </div>

            {/* JSX output */}
            <div className="relative p-5 font-mono text-[12.5px] leading-relaxed overflow-auto" style={{ background: 'var(--bg-1)' }}>
              <button onClick={copyJsx} className="absolute top-3 right-3 p-1.5 transition-colors" style={{ color: 'var(--fg-4)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg-2)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-4)')}>
                {copied ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                )}
              </button>
              <div className="mb-4" style={{ color: 'var(--fg-4)' }}>{'// Generated JSX — copy-paste ready'}</div>
              <div>
                <span className="text-purple-400">import</span>
                <span style={{ color: 'var(--fg-3)' }}> {'{ '}</span>
                <span style={{ color: 'var(--fg-2)' }}>Button</span>
                <span style={{ color: 'var(--fg-3)' }}>{' } '}</span>
                <span className="text-purple-400">from</span>
                <span className="text-green-400"> "@venator-ui/ui"</span>
                <span style={{ color: 'var(--fg-3)' }}>;</span>
              </div>
              <div className="mt-4">
                <span style={{ color: 'var(--fg-3)' }}>&lt;</span>
                <span className="text-yellow-300">Button</span>
                {'\n'}
                <span style={{ color: 'var(--fg-3)' }}>{'  '}</span>
                <span className="text-orange-300">variant</span>
                <span style={{ color: 'var(--fg-3)' }}>=</span>
                <span className="text-green-400">"{variant}"</span>
                {size !== 'md' && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span className="text-orange-300">size</span><span style={{ color: 'var(--fg-3)' }}>=</span><span className="text-green-400">"{size}"</span></>}
                {disabled && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span className="text-orange-300">disabled</span></>}
                {fullWidth && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span className="text-orange-300">fullWidth</span></>}
                {'\n'}
                <span style={{ color: 'var(--fg-3)' }}>&gt;</span>
                {withIcon && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span style={{ color: 'var(--fg-3)' }}>&lt;</span><span className="text-yellow-300">ArrowRightIcon</span><span style={{ color: 'var(--fg-3)' }}> /&gt;</span></>}
                {'\n'}
                <span style={{ color: 'var(--fg-3)' }}>{'  '}</span>
                <span style={{ color: 'var(--fg-2)' }}>{label || 'Button'}</span>
                {'\n'}
                <span style={{ color: 'var(--fg-3)' }}>&lt;/</span>
                <span className="text-yellow-300">Button</span>
                <span style={{ color: 'var(--fg-3)' }}>&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className={`${geist.variable} ${geistMono.variable}`}>
      <LandingNav />
      <div className="min-h-screen font-[family-name:var(--font-geist)]" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 gap-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', color: 'var(--fg-2)' }}>
            <span>React</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>TypeScript</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>Tailwind CSS</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-1">
            <img src="/venator-logo-icon.png" alt="Venator" className="w-40 h-40 rounded-2xl mb-6" />
            <h1 className="text-[clamp(56px,8vw,96px)] font-medium tracking-[-0.04em] leading-[0.95]" style={{ color: 'var(--fg)' }}>
              Build fast.
            </h1>
            <h1 className="text-[clamp(56px,8vw,96px)] font-medium tracking-[-0.04em] leading-[0.95]" style={{ color: 'var(--fg-4)' }}>
              Scale correctly.
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-[17px] max-w-[480px] leading-relaxed" style={{ color: 'var(--fg-4)' }}>
            A React + TypeScript UI system. Primitives, structural patterns, and full application
            architectures — all layered, all opt-in, shipped via CLI.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/docs/getting-started/introduction">
              <button className="inline-flex items-center gap-2 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                Get started
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </Link>
            <a href="https://github.com/jmelop/venator-ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border font-medium text-sm px-5 py-2.5 rounded-lg transition-colors" style={{ borderColor: 'var(--line-2)', color: 'var(--fg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              GitHub
            </a>
          </div>

          <div className="w-full max-w-md mx-auto mt-8">
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </div>

          <HeroVisual />
        </section>

        {/* Three layers */}
        <section className="px-6 py-20" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="max-w-[1200px] mx-auto">
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
              Architecture · 01
            </p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
              Three layers.<br />
              <span style={{ color: 'var(--fg-4)' }}>Adopt any one of them.</span>
            </h2>
            <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
              A strict, one-way dependency chain: ui → patterns → architectures.
              Each layer works on its own. None of them force the next.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  pkg: '@venator-ui/ui',
                  title: 'UI primitives',
                  desc: 'Typed, accessible, composable React components. Import what you need, extend with className. Nothing opinionated about composition.',
                  meta: '28 components · 0 dependencies',
                  index: '01',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/></svg>,
                },
                {
                  pkg: '@venator-ui/patterns',
                  title: 'Structural patterns',
                  desc: 'Reusable compositions that define how UI is arranged into pages. Layout scaffolds, not content. You fill them in.',
                  meta: '9 patterns · 0 opinions',
                  index: '02',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                },
                {
                  pkg: '@venator-ui/archetypes',
                  title: 'Application architectures',
                  desc: 'Complete architectures deployed via CLI. Once scaffolded the code is yours — no runtime dependency, no lock-in.',
                  meta: '3 archetypes · CLI-deployed',
                  index: '03',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.2M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/></svg>,
                },
              ].map(({ pkg, title, desc, meta, index, icon }) => (
                <div key={pkg} className="rounded-xl p-7 flex flex-col gap-4" style={{ background: 'var(--bg-1)', border: '1px solid var(--line-2)' }}>
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ border: '1px solid var(--line-2)', color: 'var(--fg-4)' }}>
                      {icon}
                    </div>
                    <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-5)' }}>{index}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[12px] mb-2" style={{ color: 'var(--fg-4)' }}>{pkg}</p>
                    <p className="text-[15px] font-medium mb-2 tracking-tight" style={{ color: 'var(--fg)' }}>{title}</p>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-4)' }}>{desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--line)' }}>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--fg-4)' }}>{meta}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-5)' }}>
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Archetypes / Dashboard Preview */}
        <section className="px-6 py-20" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="max-w-[1200px] mx-auto">
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>Archetypes · 02</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
              Run the CLI.<br /><span style={{ color: 'var(--fg-4)' }}>Ship this on Monday.</span>
            </h2>
            <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
              One command scaffolds a complete architecture. Sidebar navigation, header, module grid, tokens wired in. The output is yours — extend it, delete half of it, it's code, not config.
            </p>
            {/* Browser frame */}
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-1)', boxShadow: '0 60px 120px -40px rgba(0,0,0,0.7)', border: '1px solid var(--line)' }}>
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-3)', borderRadius: 6, padding: '5px 10px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: 11.5 }}>
                  <span className="text-neutral-700">https://</span>dashboard.venator.app<span className="text-neutral-700">/analytics</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-neutral-800 transition-colors" style={{ color: 'var(--fg-4)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-neutral-800 transition-colors" style={{ color: 'var(--fg-4)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </button>
                </div>
              </div>
              {/* Dashboard grid */}
              <div className="grid" style={{ gridTemplateColumns: '220px 1fr', minHeight: 560 }}>
                {/* Sidebar */}
                <aside className="p-3" style={{ background: 'var(--bg-1)', borderRight: '1px solid var(--line)' }}>
                  <div className="flex items-center gap-2 px-2 pb-3 mb-1" style={{ borderBottom: '1px solid var(--line)' }}>
                    <div className="w-7 h-7 bg-neutral-800 rounded-md flex items-center justify-center">
                      <img src="/venator-logo-icon.png" className="w-4 h-4" />
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: 'var(--fg)' }}>Acme Inc.</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="ml-auto" style={{ color: 'var(--fg-4)' }}><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                  {[
                    { label: 'Workspace', type: 'section' },
                    { label: 'Overview', active: false },
                    { label: 'Analytics', active: true },
                    { label: 'Customers', active: false },
                    { label: 'Products', active: false },
                    { label: 'Settings', type: 'section' },
                    { label: 'Preferences', active: false },
                    { label: 'Notifications', active: false },
                    { label: 'Billing', active: false },
                  ].map((item, i) => item.type === 'section' ? (
                    <div key={i} className="px-2 pt-4 pb-1 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-5)' }}>{item.label}</div>
                  ) : (
                    <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] cursor-pointer transition-colors ${item.active ? 'bg-[var(--bg-3)] text-[var(--fg)]' : 'text-[var(--fg-4)] hover:text-[var(--fg-2)]'}`}>
                      {item.label}
                    </div>
                  ))}
                </aside>
                {/* Main content */}
                <div className="p-7 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-[22px] font-medium tracking-tight mb-1" style={{ color: 'var(--fg)' }}>Analytics</h3>
                      <p className="font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>Last 30 days · updated just now</p>
                    </div>
                    <div className="flex gap-2">
                      {['Filter', 'Export', 'New report'].map((label, i) => (
                        <button key={label} className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12.5px] font-medium border transition-colors ${i === 2 ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-400 border-[var(--line)] hover:text-neutral-200'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Revenue', value: '$128,402', delta: '+12.4%', data: [12,18,22,20,28,34,32,38,42] },
                      { label: 'Active users', value: '24,891', delta: '+8.1%', data: [14,16,14,20,22,28,24,26,32] },
                      { label: 'Sessions', value: '89,233', delta: '+4.7%', data: [20,22,18,24,28,24,30,28,34] },
                      { label: 'Conv. rate', value: '3.42%', delta: '-0.6%', down: true, data: [30,28,32,26,24,28,22,20,18] },
                    ].map(s => (
                      <div key={s.label} className="rounded-lg p-3.5" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                        <div className="font-mono text-[10.5px] uppercase tracking-wider mb-1" style={{ color: 'var(--fg-4)' }}>{s.label}</div>
                        <div className="text-[26px] font-medium tracking-tight mb-1" style={{ color: 'var(--fg)' }}>{s.value}</div>
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[11.5px] ${s.down ? 'text-red-400' : 'text-emerald-400'}`}>{s.delta}</span>
                          <Sparkline data={s.data} color={s.down ? 'var(--danger)' : 'var(--accent)'} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Charts */}
                  <div className="grid gap-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
                    <div className="rounded-lg p-4" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="text-[14px] font-medium" style={{ color: 'var(--fg)' }}>Sessions over time</h4>
                          <p className="font-mono text-[12px] mb-3" style={{ color: 'var(--fg-4)' }}>Apr 01 – Apr 17 · 2026</p>
                        </div>
                        <div className="flex gap-3 font-mono text-[11px]" style={{ color: 'var(--fg-4)' }}>
                          <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-px bg-white" /> This period</span>
                          <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-px bg-neutral-600" /> Previous</span>
                        </div>
                      </div>
                      <AreaChart />
                    </div>
                    <div className="rounded-lg p-4" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                      <h4 className="text-[14px] font-medium" style={{ color: 'var(--fg)' }}>Sign-ups / day</h4>
                      <p className="font-mono text-[12px] mb-3" style={{ color: 'var(--fg-4)' }}>Weekly average · 62</p>
                      <BarChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ComponentsShowcase />

        <Playground />

        {/* Features strip */}
        <section className="px-6 py-20" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="max-w-[1200px] mx-auto">
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>Why Venator · 05</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
              Opinionated about structure.<br />
              <span style={{ color: 'var(--fg-4)' }}>Unopinionated about everything else.</span>
            </h2>
            <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
              Structure is the thing that's hard to change once a project grows. Venator gets it right on day one, so you can change the rest freely.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-xl overflow-hidden" style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
              {[
                {
                  title: 'Zero runtime weight',
                  desc: 'Tree-shakeable, no CSS-in-JS, no provider.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                },
                {
                  title: 'Fully typed',
                  desc: 'Strict TypeScript in every package.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>,
                },
                {
                  title: 'CLI-deployed archetypes',
                  desc: 'Scaffold complete architectures in one command.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6-6-6M12 19h8"/></svg>,
                },
                {
                  title: 'Four adoption levels',
                  desc: 'Start with a Button. Scale to a full app.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                },
                {
                  title: 'No lock-in',
                  desc: 'Archetypes are copied — the code is yours.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/></svg>,
                },
                {
                  title: 'Accessible by default',
                  desc: 'WAI-ARIA patterns wired in from the primitive layer.',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>,
                },
              ].map((f, i) => (
                <div key={i} className="p-7" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
                  <div className="mb-4" style={{ color: 'var(--fg-4)' }}>{f.icon}</div>
                  <p className="text-[15px] font-medium tracking-tight mb-2" style={{ color: 'var(--fg)' }}>{f.title}</p>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-4)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-36 text-center relative overflow-hidden" style={{ borderTop: '1px solid var(--line)' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(600px 300px at 50% 50%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 70%)' }}
          />
          <div className="max-w-[1200px] mx-auto relative">
            <h2 className="text-[clamp(40px,6vw,72px)] font-medium tracking-[-0.04em] leading-none mb-5" style={{ color: 'var(--fg)' }}>
              Stop solving the<br />same problems.
            </h2>
            <p className="text-[18px] max-w-[520px] mx-auto mb-8 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
              Deploy an architecture once. Scale it across every project you ship.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/docs/getting-started/introduction">
                <button className="inline-flex items-center gap-2 font-medium text-[13.5px] px-4 h-9 rounded-md transition-colors" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                  Start with an archetype
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </button>
              </Link>
              <Link href="/docs/getting-started/introduction">
                <button className="inline-flex items-center gap-2 font-medium text-[13.5px] px-4 h-9 rounded-md border transition-colors" style={{ borderColor: 'var(--line-2)', color: 'var(--fg)' }}>
                  Read the docs
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-16" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid gap-10" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/venator-logo-icon.png" className="w-7 h-7 rounded-lg" />
                  <span className="font-semibold text-[15px]" style={{ color: 'var(--fg)' }}>Venator UI</span>
                </div>
                <p className="text-[13.5px] max-w-[280px] leading-relaxed mb-5" style={{ color: 'var(--fg-3)' }}>
                  A React + TypeScript UI system. From primitives to patterns to full application architectures — shipped via CLI.
                </p>
                <div className="flex gap-2">
                  {[
                    { label: 'GitHub', href: 'https://github.com/jmelop/venator-ui', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg> },
                    { label: 'Docs', href: '/docs/getting-started/introduction', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg> },
                    { label: 'CLI', href: '/docs/getting-started/introduction', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6-6-6M12 19h8"/></svg> },
                  ].map(({ label, href, icon }) => (
                    <a key={label} href={href} aria-label={label}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-200 transition-colors" style={{ border: '1px solid var(--line)' }}>
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div>
                <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Packages</h5>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { pkg: '@venator-ui/tokens',     href: 'https://www.npmjs.com/package/@venator-ui/tokens' },
                    { pkg: '@venator-ui/ui',         href: 'https://www.npmjs.com/package/@venator-ui/ui' },
                    { pkg: '@venator-ui/patterns',   href: 'https://www.npmjs.com/package/@venator-ui/patterns' },
                    { pkg: '@venator-ui/archetypes', href: 'https://www.npmjs.com/package/@venator-ui/archetypes' },
                    { pkg: '@venator-ui/cli',        href: 'https://www.npmjs.com/package/@venator-ui/cli' },
                  ].map(({ pkg, href }) => (
                    <li key={pkg}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13.5px] transition-colors font-mono" style={{ color: 'var(--fg-2)' }}>{pkg}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Resources</h5>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { label: 'Documentation', href: '/docs/getting-started/introduction' },
                    { label: 'Components', href: '/docs/components/button' },
                    { label: 'CLI Reference', href: '/docs/getting-started/introduction' },
                    { label: 'Changelog', href: '#' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="text-[13.5px] transition-colors" style={{ color: 'var(--fg-2)' }}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div>
                <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Community</h5>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { label: 'GitHub',     href: 'https://github.com/jmelop/venator-ui' },
                    { label: 'Contribute', href: 'https://github.com/jmelop/venator-ui/pulls' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13.5px] transition-colors" style={{ color: 'var(--fg-2)' }}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
              <span className="font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>MIT © 2026 Venator contributors</span>
              <span className="flex items-center gap-2 font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
                All systems operational
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
