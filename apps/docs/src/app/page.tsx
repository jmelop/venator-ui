'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Input,
  Label,
} from '@venator-ui/ui';

const geist = Inter({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <button
      type="button"
      aria-label="Copy command"
      className="flex items-center justify-between rounded-md bg-neutral-900 border border-default px-3 py-2 cursor-pointer group w-full"
      onClick={async () => {
        if (!navigator.clipboard?.writeText) return;
        try {
          await navigator.clipboard.writeText(command);
          if (timerRef.current) clearTimeout(timerRef.current);
          setCopied(true);
          timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
          // ignore
        }
      }}
    >
      <span className="flex items-center">
        <span className="text-neutral-600 font-mono mr-2">$</span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[13px] text-neutral-100">{command}</span>
      </span>
      <span className="text-neutral-600 group-hover:text-neutral-200 transition-colors ml-2 shrink-0">
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}

const ARCHETYPES = [
  { key: 'dashboard', cmd: 'npx @venator-ui/cli init dashboard' },
  { key: 'admin',     cmd: 'npx @venator-ui/cli init admin' },
  { key: 'ai-tool',  cmd: 'npx @venator-ui/cli init ai-tool' },
] as const;

function ArchetypeCLI() {
  const [active, setActive] = useState<string>('dashboard');
  const current = ARCHETYPES.find(a => a.key === active)!;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 bg-neutral-900 border border-subtle rounded-lg p-1">
        {ARCHETYPES.map(a => (
          <button
            key={a.key}
            type="button"
            onClick={() => setActive(a.key)}
            className={[
              'flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors',
              active === a.key
                ? 'bg-neutral-800 border border-default text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200',
            ].join(' ')}
          >
            {a.key}
          </button>
        ))}
      </div>
      <CopyCommand command={current.cmd} />
    </div>
  );
}


export default function Home() {
  return (
    <div className={`${geist.variable} ${geistMono.variable}`}>
      <div className="min-h-screen bg-neutral-950 text-white font-[family-name:var(--font-geist)]">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 gap-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-default rounded-full px-4 py-1.5 text-sm text-neutral-200">
            <span>React</span>
            <span className="text-neutral-600">·</span>
            <span>TypeScript</span>
            <span className="text-neutral-600">·</span>
            <span>Tailwind CSS</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-1">
            <img src="/venator-logo-icon.png" alt="Venator" className="w-16 h-16 rounded-2xl mb-6" />
            <h1 className="text-[clamp(56px,8vw,96px)] font-medium tracking-[-0.04em] leading-[0.95] text-white">
              Build fast.
            </h1>
            <h1 className="text-[clamp(56px,8vw,96px)] font-medium tracking-[-0.04em] leading-[0.95] text-neutral-600">
              Scale correctly.
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-[17px] text-neutral-400 max-w-[480px] leading-relaxed">
            A React + TypeScript UI system. Primitives, structural patterns, and full application
            architectures — all layered, all opt-in, shipped via CLI.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/docs/getting-started/introduction">
              <button className="inline-flex items-center gap-2 bg-white text-black font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors">
                Get started
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </Link>
            <a href="https://github.com/jmelop/venator-ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-default text-neutral-200 hover:text-white hover:border-neutral-600 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Archetype CLI tabs */}
          <div className="w-full max-w-md mt-2">
            <ArchetypeCLI />
          </div>
        </section>

        {/* Three layers */}
        <section className="border-t border-subtle px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-neutral-600 mb-4">
              Architecture · 01
            </p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight text-neutral-50 mb-3">
              Three layers.<br />
              <span className="text-neutral-700">Adopt any one of them.</span>
            </h2>
            <p className="text-[15px] text-neutral-500 max-w-[560px] mb-12 leading-relaxed">
              A strict, one-way dependency chain: ui → patterns → architectures.
              Each layer works on its own. None of them force the next.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800 border border-subtle rounded-xl overflow-hidden">
              {[
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
              ].map(({ pkg, title, desc, meta, index }) => (
                <div key={pkg} className="bg-neutral-900 p-7 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 border border-subtle rounded-md flex items-center justify-center text-neutral-500">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12" />
                      </svg>
                    </div>
                    <span className="font-mono text-[10.5px] text-neutral-700">{index}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] text-neutral-600 mb-2">{pkg}</p>
                    <p className="text-[15px] font-medium text-neutral-100 mb-2 tracking-tight">{title}</p>
                    <p className="text-[13.5px] text-neutral-500 leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-subtle">
                    <span className="font-mono text-[11px] text-neutral-600">{meta}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Archetypes */}
        <section className="px-6 py-20 bg-neutral-950 border-t border-subtle">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">CLI</p>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Deploy a complete architecture
              </h2>
              <p className="text-[13px] text-neutral-400">
                Three production-ready starting points, deployed in one command.
              </p>
            </div>
            <div className="max-w-2xl mx-auto flex flex-col divide-y divide-subtle">
              {[
                {
                  title: 'Dashboard',
                  description: 'A modular dashboard with KPI cards, analytics and settings.',
                  command: 'npx @venator-ui/cli init dashboard',
                },
                {
                  title: 'Admin',
                  description: 'A backoffice interface with user table, roles and organization settings.',
                  command: 'npx @venator-ui/cli init admin',
                },
                {
                  title: 'AI Tool',
                  description: 'A prompt-based interface with chat input, history and model settings.',
                  command: 'npx @venator-ui/cli init ai-tool',
                },
              ].map(({ title, description, command }) => (
                <div key={title} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6">
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-white mb-1">{title}</p>
                    <p className="text-[13px] text-neutral-400">{description}</p>
                  </div>
                  <div className="w-full md:w-auto md:min-w-[340px]">
                    <CopyCommand command={command} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Component preview */}
        <section className="px-6 py-20 bg-neutral-950 border-t border-subtle">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">Components</p>
              <h2 className="text-2xl font-semibold text-white">
                Component preview
              </h2>
            </div>
            <div className="bg-neutral-900 border border-subtle rounded-xl p-6 space-y-6">
              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">Buttons</p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">Badges</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">Alert</p>
                <Alert variant="info">
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    This is an informational alert using the info variant.
                  </AlertDescription>
                </Alert>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-600 mb-3">Input</p>
                <div className="space-y-1.5">
                  <Label htmlFor="preview-input">Email address</Label>
                  <Input id="preview-input" type="email" placeholder="you@example.com" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-subtle">
          <p className="text-center text-[13px] text-neutral-600">
            Built with Venator UI · MIT License
          </p>
        </footer>
      </div>
    </div>
  );
}
