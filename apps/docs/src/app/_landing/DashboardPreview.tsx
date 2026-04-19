'use client';

import { Button } from '@venator-ui/ui';
import { STATS } from './constants';

function Sparkline({ data, color = 'var(--fg)', height = 24, width = 60 }: { data: readonly number[]; color?: string; height?: number; width?: number }) {
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
          <stop offset="0%" stopColor="var(--fg)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--fg)" stopOpacity="0" />
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
      <path d={p1.line} fill="none" stroke="var(--fg)" strokeWidth="1.8" />
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
            <rect x={x} y={10 + (h - 30) - bh} width={bw} height={bh} fill="var(--fg)" opacity={0.2 + (v / max) * 0.5} rx="2" />
            <text x={x + bw / 2} y={h - 4} fill="var(--fg-4)" fontSize="9" fontFamily="monospace" textAnchor="middle">{'MTWTFSS'[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <section style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
          Archetypes · 02
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3">
          <span style={{ color: 'var(--fg)' }}>Run the CLI.</span><br />
          <span style={{ color: 'var(--fg-4)' }}>Ship this on Monday.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          One command scaffolds a complete architecture. Sidebar navigation, header, module grid, tokens wired in. The output is yours — extend it, delete half of it, it's code, not config.
        </p>

        {/* Browser frame */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line-2)', background: 'var(--bg-1)', boxShadow: '0 60px 120px -40px rgba(0,0,0,0.3)' }}>
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid var(--line)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 rounded-md px-3 py-1 font-mono text-[11.5px]" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)' }}>https://</span>dashboard.venator.app<span style={{ color: 'var(--fg-4)' }}>/analytics</span>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              </Button>
              <Button variant="ghost" size="sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
              </Button>
            </div>
          </div>

          {/* Desktop: full sidebar + main */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: '220px 1fr', minHeight: 560 }}>
            {/* Sidebar */}
            <aside style={{ borderRight: '1px solid var(--line)', background: 'var(--bg-1)', padding: 12 }}>
              <div className="flex items-center gap-2 px-2 pb-3 mb-1" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--bg-3)' }}>
                  <img src="/venator-logo-icon.png" className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-medium" style={{ color: 'var(--fg-2)' }}>Acme Inc.</span>
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
                <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] cursor-pointer transition-colors"
                  style={{ background: item.active ? 'var(--bg-3)' : 'transparent', color: item.active ? 'var(--fg)' : 'var(--fg-3)' }}>
                  {item.label}
                </div>
              ))}
            </aside>

            {/* Main */}
            <div className="p-7 overflow-hidden">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-[22px] font-medium tracking-tight mb-1" style={{ color: 'var(--fg)' }}>Analytics</h3>
                  <p className="font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>Last 30 days · updated just now</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Filter</Button>
                  <Button variant="outline" size="sm">Export</Button>
                  <Button variant="accent" size="sm">New report</Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {STATS.map(s => (
                  <div key={s.label} className="rounded-lg p-3.5" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                    <div className="font-mono text-[10.5px] uppercase tracking-wider mb-1" style={{ color: 'var(--fg-4)' }}>{s.label}</div>
                    <div className="text-[26px] font-medium tracking-tight mb-1" style={{ color: 'var(--fg)' }}>{s.value}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11.5px]" style={{ color: s.down ? '#f87171' : '#5eead4' }}>{s.delta}</span>
                      <Sparkline data={[...s.data]} color={s.down ? '#f87171' : 'var(--fg)'} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid gap-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="rounded-lg p-4" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="text-[14px] font-medium" style={{ color: 'var(--fg-2)' }}>Sessions over time</h4>
                      <p className="font-mono text-[12px] mb-3" style={{ color: 'var(--fg-4)' }}>Apr 01 – Apr 17 · 2026</p>
                    </div>
                    <div className="flex gap-3 font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>
                      <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-px" style={{ background: 'var(--fg)' }} /> This period</span>
                      <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-px" style={{ background: 'var(--fg-4)' }} /> Previous</span>
                    </div>
                  </div>
                  <AreaChart />
                </div>
                <div className="rounded-lg p-4" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                  <h4 className="text-[14px] font-medium" style={{ color: 'var(--fg-2)' }}>Sign-ups / day</h4>
                  <p className="font-mono text-[12px] mb-3" style={{ color: 'var(--fg-4)' }}>Weekly average · 62</p>
                  <BarChart />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: simplified view — chrome, stats, and sessions chart */}
          <div className="md:hidden p-4" style={{ background: 'var(--bg-1)' }}>
            <div className="mb-3">
              <h3 className="text-[18px] font-medium tracking-tight" style={{ color: 'var(--fg)' }}>Analytics</h3>
              <p className="font-mono text-[11px]" style={{ color: 'var(--fg-4)' }}>Last 30 days · updated just now</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STATS.map(s => (
                <div key={s.label} className="rounded-lg p-3" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                  <div className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: 'var(--fg-4)' }}>{s.label}</div>
                  <div className="text-[20px] font-medium tracking-tight" style={{ color: 'var(--fg)' }}>{s.value}</div>
                  <div className="font-mono text-[10px] mt-0.5" style={{ color: s.down ? '#f87171' : '#5eead4' }}>{s.delta}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg p-3" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              <div className="font-mono text-[10px] mb-2" style={{ color: 'var(--fg-4)' }}>Sessions over time · Apr 01 – Apr 17</div>
              <svg width="100%" viewBox="0 0 300 80" aria-hidden="true" focusable="false" style={{ display: 'block' }}>
                <defs>
                  <linearGradient id="mg1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--fg)" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="var(--fg)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0 70 L12 65 L25 60 L37 55 L50 48 L62 42 L75 38 L87 32 L100 28 L112 24 L125 20 L137 17 L150 14 L162 11 L175 9 L187 7 L200 5 L212 4 L225 3 L237 3 L250 2 L262 2 L275 2 L287 2 L300 1 L300 80 L0 80 Z"
                  fill="url(#mg1)"
                />
                <path
                  d="M0 70 L12 65 L25 60 L37 55 L50 48 L62 42 L75 38 L87 32 L100 28 L112 24 L125 20 L137 17 L150 14 L162 11 L175 9 L187 7 L200 5 L212 4 L225 3 L237 3 L250 2 L262 2 L275 2 L287 2 L300 1"
                  fill="none"
                  stroke="var(--fg)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
