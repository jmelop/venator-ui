'use client';

import { useState } from 'react';
import { Button, Switch, Kbd } from '@venator-ui/ui';

export function Playground() {
  const [variant, setVariant] = useState<'primary' | 'ghost' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [label, setLabel] = useState('Get started');
  const [withIcon, setWithIcon] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsx = `import { Button } from "@venator-ui/ui";\n\n<Button\n  variant="${variant}"${size !== 'md' ? `\n  size="${size}"` : ''}${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  fullWidth' : ''}\n>${withIcon ? '\n  <ArrowRightIcon />' : ''}\n  ${label}\n</Button>`;

  function copyJsx() {
    navigator.clipboard?.writeText(jsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const segStyle = (active: boolean) => ({
    background: active ? 'var(--bg-3)' : 'transparent',
    color: active ? 'var(--fg)' : 'var(--fg-4)',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: 12,
    fontFamily: 'var(--font-geist-mono, monospace)',
    transition: 'all 0.15s',
  });

  return (
    <section style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
          Live · 04
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3">
          <span style={{ color: 'var(--fg)' }}>A playground, not a docs page.</span><br />
          <span style={{ color: 'var(--fg-4)' }}>Try it before you install.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          Every primitive is tweakable in-browser. Props on the left, rendered component in the middle, generated JSX on the right.
        </p>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line-2)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[12px]"
            style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)', color: 'var(--fg-4)' }}>
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
          <div
            className="flex flex-col md:grid"
            style={{ minHeight: 360, gridTemplateColumns: '280px 1fr 1fr' }}
          >
            {/* Controls */}
            <div className="flex flex-col gap-5 p-5 order-2 md:order-1 border-t md:border-t-0 md:border-r" style={{ borderColor: 'var(--line)', background: 'var(--bg-1)' }}>
              {[
                { label: 'variant', options: ['primary', 'ghost', 'outline'] as const, value: variant, set: setVariant },
                { label: 'size', options: ['sm', 'md'] as const, value: size, set: setSize },
              ].map(({ label, options, value, set }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>{label}</label>
                  <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                    {options.map((o, i) => (
                      <button key={o} onClick={() => (set as (v: typeof o) => void)(o)}
                        style={{ ...segStyle(value === o), flex: 1, borderRight: i < options.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>children</label>
                <input value={label} onChange={e => setLabel(e.target.value)}
                  className="rounded-md px-3 py-1.5 text-[13px] font-mono focus:outline-none"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', color: 'var(--fg)' }} />
              </div>
              {[
                { label: 'leftIcon',  value: withIcon,  set: setWithIcon },
                { label: 'disabled',  value: disabled,  set: setDisabled },
                { label: 'fullWidth', value: fullWidth, set: setFullWidth },
              ].map(({ label, value, set }) => (
                <div key={label} className="flex items-center justify-between">
                  <label className="font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--fg-4)' }}>{label}</label>
                  <Switch checked={value} onCheckedChange={set} />
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="flex items-center justify-center p-8 order-1 md:order-2 md:[border-right:1px_solid_var(--line)]"
              style={{ background: 'var(--bg-2)', backgroundImage: 'radial-gradient(400px 200px at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}>
              <Button variant={variant} size={size === 'sm' ? 'sm' : undefined} disabled={disabled} className={fullWidth ? 'w-full' : ''}>
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
            <div className="relative p-5 font-mono text-[12.5px] leading-relaxed overflow-auto order-3" style={{ background: 'var(--bg-1)', minHeight: 180 }}>
              <Button variant="ghost" size="sm" onClick={copyJsx} className="absolute top-3 right-3">
                {copied ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                )}
              </Button>
              <div className="mb-4" style={{ color: 'var(--fg-4)' }}>{'// Generated JSX — copy-paste ready'}</div>
              <div>
                <span style={{ color: '#c678dd' }}>import</span>
                <span style={{ color: 'var(--fg-3)' }}>{' { '}</span>
                <span style={{ color: 'var(--fg)' }}>Button</span>
                <span style={{ color: 'var(--fg-3)' }}>{' } '}</span>
                <span style={{ color: '#c678dd' }}>from</span>
                <span style={{ color: '#98c379' }}> "@venator-ui/ui"</span>
                <span style={{ color: 'var(--fg-3)' }}>;</span>
              </div>
              <div className="mt-4">
                <span style={{ color: 'var(--fg-3)' }}>&lt;</span>
                <span style={{ color: '#e5c07b' }}>Button</span>{'\n'}
                <span style={{ color: 'var(--fg-3)' }}>{'  '}</span>
                <span style={{ color: '#d19a66' }}>variant</span>
                <span style={{ color: 'var(--fg-3)' }}>=</span>
                <span style={{ color: '#98c379' }}>"{variant}"</span>
                {size !== 'md' && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span style={{ color: '#d19a66' }}>size</span><span style={{ color: 'var(--fg-3)' }}>=</span><span style={{ color: '#98c379' }}>"{size}"</span></>}
                {disabled && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span style={{ color: '#d19a66' }}>disabled</span></>}
                {fullWidth && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span style={{ color: '#d19a66' }}>fullWidth</span></>}
                {'\n'}<span style={{ color: 'var(--fg-3)' }}>&gt;</span>
                {withIcon && <><br/><span style={{ color: 'var(--fg-3)' }}>{'  '}</span><span style={{ color: 'var(--fg-3)' }}>&lt;</span><span style={{ color: '#e5c07b' }}>ArrowRightIcon</span><span style={{ color: 'var(--fg-3)' }}> /&gt;</span></>}
                {'\n'}<span style={{ color: 'var(--fg-3)' }}>{'  '}</span>
                <span style={{ color: 'var(--fg)' }}>{label || 'Button'}</span>
                {'\n'}<span style={{ color: 'var(--fg-3)' }}>&lt;/</span>
                <span style={{ color: '#e5c07b' }}>Button</span>
                <span style={{ color: 'var(--fg-3)' }}>&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
