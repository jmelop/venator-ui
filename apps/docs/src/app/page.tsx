'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CodeBlock,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@venator-ui/ui';

const features = [
  {
    pkg: '@venator-ui/ui',
    title: 'UI Components',
    description:
      'Typed, accessible primitives for building consistent interfaces. Buttons, cards, modals, tables and more, built on Tailwind CSS and design tokens.',
  },
  {
    pkg: '@venator-ui/patterns',
    title: 'Patterns',
    description:
      'Reusable structural compositions for recurring application layouts. DashboardLayout, PageHeader and ModuleGrid cover the structures that appear in every real application.',
  },
  {
    pkg: 'venator init',
    title: 'CLI',
    description:
      'Scaffold full application architectures or add patterns directly into your project. You own the output with no runtime dependency and no lock-in.',
  },
] as const;

export default function Home() {
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/venator-logo-icon.png" alt="Venator" className="w-7 h-7 rounded-lg" />
          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Venator UI</span>
        </Link>
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </header>

      <div className="pt-16">
        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-4">
          <Badge variant="default">React · TypeScript · Tailwind CSS</Badge>
          <img src="/venator-logo-icon.png" alt="Venator" className="w-16 h-16 rounded-2xl mb-2" />
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Venator UI
          </h1>
          <p className="max-w-xl text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Build fast. Scale correctly.
          </p>
          <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
            A React + TypeScript UI system built from primitives to patterns to full application architectures.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/docs/getting-started/introduction">
              <Button variant="primary" size="lg">Get Started</Button>
            </Link>
            <Link href="#">
              <Button variant="outline" size="lg">GitHub</Button>
            </Link>
          </div>
          <div className="max-w-md mx-auto w-full mt-2">
            <Tabs defaultValue="quickstart">
              <TabsList>
                <TabsTrigger value="quickstart" disableFocusRing>Quick start</TabsTrigger>
                <TabsTrigger value="manual" disableFocusRing>Install manually</TabsTrigger>
              </TabsList>
              <TabsContent value="quickstart" className="mt-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  Deploy a complete dashboard architecture into your project.
                </p>
                <CodeBlock code="npx venator init dashboard" language="bash" />
              </TabsContent>
              <TabsContent value="manual" className="mt-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  Install UI primitives and patterns as dependencies.
                </p>
                <CodeBlock code="npm install @venator-ui/ui @venator-ui/patterns" language="bash" />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-10">
              Three layers of Venator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map(({ pkg, title, description }) => (
                <Card key={pkg}>
                  <CardHeader>
                    <Badge variant="primary" className="w-fit text-xs font-mono">
                      {pkg}
                    </Badge>
                    <h3 className="mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Component preview */}
        <section className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-10">
              Component preview
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Buttons
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Badges
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Alert
                  </p>
                  <Alert variant="info">
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                      This is an informational alert using the info variant.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Input
                  </p>
                  <div className="space-y-1.5">
                    <Label htmlFor="preview-input">Email address</Label>
                    <Input id="preview-input" type="email" placeholder="you@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
            Built with Venator UI · MIT License
          </p>
        </footer>
      </div>
    </div>
  );
}
