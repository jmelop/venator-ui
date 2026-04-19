'use client';

import { useState } from 'react';
import { Button, Badge, Input, Switch, Checkbox, Slider, Progress, Kbd } from '@venator-ui/ui';

export function ComponentsShowcase() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [ck1, setCk1] = useState(true);
  const [ck2, setCk2] = useState(false);
  const [ck3, setCk3] = useState(true);
  const [sliderVal, setSliderVal] = useState(62);
  const [activeTab, setActiveTab] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  const tileStyle = { background: 'var(--bg-1)', border: '1px solid var(--line)' };

  return (
    <section style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
          Primitives · 03
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3">
          <span style={{ color: 'var(--fg)' }}>Every primitive you'll need.</span><br />
          <span style={{ color: 'var(--fg-4)' }}>None you won't.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          Accessible, composable, typed primitives. Built with Tailwind CSS and design tokens.
        </p>

        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
          {/* Buttons */}
          <div className="col-span-6 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Button</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="primary" size="sm" className="opacity-40 pointer-events-none">Disabled</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="col-span-6 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Badge</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Failed</Badge>
            </div>
          </div>

          {/* Input */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Input</p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Search components..." />
              <Input placeholder="you@acme.com" />
            </div>
          </div>

          {/* Switch */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
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

          {/* Checkbox */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Checkbox</p>
            <div className="flex flex-col gap-2.5">
              {([['Accessible', ck1, setCk1], ['Composable', ck2, setCk2], ['Typed', ck3, setCk3]] as const).map(([label, val, set]) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: 'var(--fg-2)' }} onClick={() => set(!val)}>
                  <Checkbox checked={val} onCheckedChange={set} /> {label}
                </label>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Slider</p>
            <Slider value={sliderVal} onValueChange={setSliderVal} />
            <div className="flex justify-between font-mono text-[11px] mt-2" style={{ color: 'var(--fg-4)' }}>
              <span>0</span>
              <span style={{ color: 'var(--fg)' }}>{sliderVal}</span>
              <span>100</span>
            </div>
          </div>

          {/* Progress */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Progress</p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-mono text-[11px] mb-1" style={{ color: 'var(--fg-4)' }}>
                <span>Building</span><span>67%</span>
              </div>
              <Progress value={67} />
              <div className="flex justify-between font-mono text-[11px] mb-1" style={{ color: 'var(--fg-4)' }}>
                <span>Deploying</span><span>24%</span>
              </div>
              <Progress value={24} />
            </div>
          </div>

          {/* Kbd + Tooltip */}
          <div className="col-span-4 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Kbd · Tooltip</p>
            <div className="flex flex-col gap-3">
              <div className="relative inline-block" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
                {tooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-mono rounded-md whitespace-nowrap"
                    style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
                    Copy to clipboard
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: 'var(--fg)' }} />
                  </div>
                )}
                <Button variant="outline" size="sm">Hover me</Button>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]" style={{ color: 'var(--fg-4)' }}>
                Press <Kbd className="mx-1">⌘</Kbd><Kbd>K</Kbd> to search
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="col-span-6 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Tabs</p>
            <div className="flex gap-6 mb-3" style={{ borderBottom: '1px solid var(--line)' }}>
              {['Overview', 'Usage', 'Theming', 'API'].map((t, i) => (
                <button key={t} onClick={() => setActiveTab(i)}
                  className="pb-2.5 text-[13px] border-b-2 transition-colors -mb-px"
                  style={{
                    borderBottomColor: activeTab === i ? 'var(--fg)' : 'transparent',
                    color: activeTab === i ? 'var(--fg)' : 'var(--fg-4)',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === i ? '2px solid var(--fg)' : '2px solid transparent',
                    marginBottom: -1,
                    cursor: 'pointer',
                  }}>
                  {t}
                </button>
              ))}
            </div>
            <p className="font-mono text-[12px]" style={{ color: 'var(--fg-3)' }}>
              {['Primitives are accessible by default.', 'Import from @venator-ui/ui.', 'Tokens drive all visual properties.', 'All props are strictly typed.'][activeTab]}
            </p>
          </div>

          {/* Table */}
          <div className="col-span-6 rounded-xl p-5" style={tileStyle}>
            <p className="font-mono text-[10.5px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Table</p>
            <table className="w-full font-mono text-[12.5px] border-collapse">
              <thead>
                <tr>
                  {['Package', 'Version', 'Status'].map(h => (
                    <th key={h} className="text-left text-[11px] uppercase tracking-wider pb-2 font-normal"
                      style={{ color: 'var(--fg-4)', borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: 'tokens',     version: '0.1.2', status: 'ready',   variant: 'success'  as const },
                  { pkg: 'ui',         version: '0.1.3', status: 'ready',   variant: 'success'  as const },
                  { pkg: 'patterns',   version: '0.1.1', status: 'beta',    variant: 'warning'  as const },
                  { pkg: 'archetypes', version: '0.1.7', status: 'beta',    variant: 'warning'  as const },
                ].map(row => (
                  <tr key={row.pkg} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="py-2" style={{ color: 'var(--fg-2)' }}>{row.pkg}</td>
                    <td className="py-2" style={{ color: 'var(--fg-4)' }}>{row.version}</td>
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
