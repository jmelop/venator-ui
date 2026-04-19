'use client';

import Link from 'next/link';
import { Button } from '@venator-ui/ui';

export function FinalCTA() {
  return (
    <section style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-36 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(600px 300px at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
      />
      <div className="max-w-[1200px] mx-auto relative">
        <h2
          className="text-[clamp(40px,6vw,72px)] font-medium tracking-[-0.04em] leading-none mb-5"
          style={{ color: 'var(--fg)' }}
        >
          Stop solving the<br />same problems.
        </h2>
        <p className="text-[18px] max-w-[520px] mx-auto mb-8 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          Deploy an architecture once. Scale it across every project you ship.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/docs/getting-started/introduction">
            <Button variant="accent" size="sm">
              Start with an archetype
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Button>
          </Link>
          <Link href="/docs/getting-started/introduction">
            <Button variant="ghost" size="sm">
              Read the docs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
