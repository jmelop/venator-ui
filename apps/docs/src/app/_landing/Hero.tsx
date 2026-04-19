'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Button } from '@venator-ui/ui';
import { TERMINAL_LINES, LAYER_DATA, ARCHETYPES } from './constants';

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard?.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="w-full flex items-center justify-between rounded-lg px-4 py-2.5 cursor-pointer font-mono text-[13px]"
      style={{ border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--fg)' }}
    >
      <span style={{ color: 'var(--fg-4)' }}>$</span>
      <span className="flex-1 text-left mx-3">{command}</span>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-3)' }}><polyline points="20 6 9 17 4 12"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-4)' }}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      )}
    </button>
  );
}

function ArchetypeCLI() {
  const [active, setActive] = useState('dashboard');
  const current = ARCHETYPES.find(a => a.key === active)!;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
        {ARCHETYPES.map(a => (
          <button key={a.key} type="button" onClick={() => setActive(a.key)}
            className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors"
            style={{
              background: active === a.key ? 'var(--bg-3)' : 'transparent',
              color: active === a.key ? 'var(--fg)' : 'var(--fg-4)',
              border: active === a.key ? '1px solid var(--line-2)' : '1px solid transparent',
              cursor: 'pointer',
            }}>
            {a.key}
          </button>
        ))}
      </div>
      <CopyCommand command={current.cmd} />
    </div>
  );
}

function LayersVisual() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % LAYER_DATA.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-[480px] overflow-hidden" style={{ perspective: '900px' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />
      {LAYER_DATA.map((layer, i) => {
        const offset = i - active;
        const transform = `translate(-50%, -50%) translateX(${offset * 200}px) translateZ(${-Math.abs(offset) * 120}px) rotateY(${offset * -22}deg)`;
        return (
          <div key={layer.key} onClick={() => setActive(i)}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 300, minHeight: 260,
              transform,
              zIndex: 10 - Math.abs(offset),
              opacity: i === active ? 1 : 0.45,
              transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
              cursor: i !== active ? 'pointer' : 'default',
            }}>
            <div className="rounded-xl p-5 h-full" style={{ background: 'var(--bg-1)', border: '1px solid var(--line-2)', minHeight: 260 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-4)' }}>{layer.pkg}</span>
                <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-5)' }}>{layer.index}</span>
              </div>
              <p className="text-[15px] font-medium mb-1 tracking-tight" style={{ color: 'var(--fg)' }}>{layer.title}</p>
              <p className="text-[12.5px] mb-4" style={{ color: 'var(--fg-4)' }}>{layer.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map(item => (
                  <span key={item} className="font-mono text-[11px] rounded-md px-2 py-0.5"
                    style={{ color: 'var(--fg-4)', border: '1px solid var(--line)' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 20 }}>
        {LAYER_DATA.map((layer, i) => (
          <button key={layer.key} onClick={() => setActive(i)}
            className="font-mono text-[11px] px-3 py-1 rounded-md transition-colors"
            style={{
              background: i === active ? 'var(--bg-3)' : 'transparent',
              color: i === active ? 'var(--fg-2)' : 'var(--fg-5)',
              border: i === active ? '1px solid var(--line-2)' : '1px solid transparent',
              cursor: 'pointer',
            }}>
            {layer.key}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroVisual() {
  const [tab, setTab] = useState<'terminal' | 'layers'>('terminal');
  const tabStyle = (active: boolean) => ({
    background: active ? 'var(--bg-2)' : 'transparent',
    color: active ? 'var(--fg-2)' : 'var(--fg-4)',
    border: active ? '1px solid var(--line-2)' : '1px solid transparent',
    cursor: 'pointer',
  });
  return (
    <div style={{ width: '100%', maxWidth: 850, margin: '24px auto 0' }}>
      <div className="flex items-center gap-1 mb-3 justify-center">
        {[
          { key: 'terminal' as const, label: 'CLI scaffold', icon: <path d="M4 17l6-6-6-6M12 19h8"/> },
          { key: 'layers'   as const, label: 'Architecture', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/> },
        ].map(({ key, label, icon }) => (
          <button key={key} type="button" onClick={() => setTab(key)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors"
            style={tabStyle(tab === key)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
            {label}
          </button>
        ))}
      </div>
      {tab === 'terminal' ? (
        <Terminal lines={TERMINAL_LINES} title="venator — zsh — 100×28" loop loopDelay={2000} className="h-[420px] overflow-hidden" />
      ) : (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}>
          <LayersVisual />
        </div>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 gap-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[520px] pointer-events-none" style={{
        background: 'radial-gradient(600px 300px at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
      }} />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-mono"
          style={{ border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--fg-2)' }}>
          <span>React</span>
          <span style={{ color: 'var(--fg-4)' }}>·</span>
          <span>TypeScript</span>
          <span style={{ color: 'var(--fg-4)' }}>·</span>
          <span>Tailwind CSS</span>
        </div>

        {/* Logo + heading */}
        <div className="flex flex-col items-center gap-2">
          <img src="/venator-logo-icon.png" alt="Venator" style={{ width: 120, height: 120, display: 'block' }} className="rounded-xl mb-4 mx-auto" />
          <h1 className="text-[clamp(56px,8vw,88px)] font-medium tracking-[-0.04em] leading-[0.95] m-0" style={{ color: 'var(--fg)' }}>
            Build fast.
          </h1>
          <h1 className="text-[clamp(56px,8vw,88px)] font-medium tracking-[-0.04em] leading-[0.95] m-0" style={{ color: 'var(--fg-4)' }}>
            Scale correctly.
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-[17px] max-w-[480px] leading-relaxed m-0" style={{ color: 'var(--fg-4)' }}>
          A React + TypeScript UI system. Primitives, structural patterns, and full application architectures — all layered, all opt-in, shipped via CLI.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href="/docs/getting-started/introduction">
            <Button variant="accent" size="sm">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Button>
          </Link>
          <a href="https://github.com/jmelop/venator-ui" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
              GitHub
            </Button>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md mx-auto mt-2" style={{ borderTop: '1px solid var(--line)' }} />

        {/* Hero visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
