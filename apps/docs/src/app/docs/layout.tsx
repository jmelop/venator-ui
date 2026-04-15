'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import { SidebarNav, DashboardLayout } from '@venator-ui/patterns';

const sections = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs/getting-started/introduction' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Alert', href: '/docs/components/alert' },
      { label: 'Avatar', href: '/docs/components/avatar' },
      { label: 'Badge', href: '/docs/components/badge' },
      { label: 'Breadcrumb', href: '/docs/components/breadcrumb' },
      { label: 'Button', href: '/docs/components/button' },
      { label: 'Card', href: '/docs/components/card' },
      { label: 'CodeBlock', href: '/docs/components/code-block' },
      { label: 'Input', href: '/docs/components/input' },
      { label: 'Label', href: '/docs/components/label' },
      { label: 'Modal', href: '/docs/components/modal' },
      { label: 'Nav', href: '/docs/components/nav' },
      { label: 'Select', href: '/docs/components/select' },
      { label: 'Separator', href: '/docs/components/separator' },
      { label: 'Skeleton', href: '/docs/components/skeleton' },
      { label: 'Switch', href: '/docs/components/switch' },
      { label: 'Table', href: '/docs/components/table' },
      { label: 'Tabs', href: '/docs/components/tabs' },
      { label: 'Toast', href: '/docs/components/toast' },
      { label: 'Toggle', href: '/docs/components/toggle' },
      { label: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  },
  {
    label: 'Patterns',
    items: [
      { label: 'DashboardLayout', href: '/docs/patterns/dashboard-layout' },
      { label: 'PageHeader', href: '/docs/patterns/page-header' },
      { label: 'ModuleGrid', href: '/docs/patterns/module-grid' },
      { label: 'SidebarNav', href: '/docs/patterns/sidebar-nav' },
      { label: 'Topbar', href: '/docs/patterns/topbar' },
      { label: 'StatCard', href: '/docs/patterns/stat-card' },
    ],
  },
  {
    label: 'Archetypes',
    items: [
      { label: 'Dashboard', href: '/docs/archetypes/dashboard' },
      { label: 'Admin', href: '/docs/archetypes/admin' },
      { label: 'AI Tool', href: '/docs/archetypes/ai-tool' },
    ],
  },
];

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function Header({ dark, onToggleDark, onMenuOpen }: { dark: boolean; onToggleDark: () => void; onMenuOpen: () => void }) {
  return (
    <div className="flex items-center justify-between w-full">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hidden lg:block">
        Documentation
      </span>
      <button
        type="button"
        aria-label="Toggle dark mode"
        onClick={onToggleDark}
        className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const ClosingLink = useCallback(
    ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
      <Link href={href} onClick={() => setMobileOpen(false)} {...props}>
        {children}
      </Link>
    ),
    [setMobileOpen]
  );

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <DashboardLayout
      sidebar={
        <SidebarNav
          sections={sections}
          pathname={pathname}
          linkComponent={ClosingLink}
          logo={<img src="/venator-logo-icon.png" alt="Venator" className="w-7 h-7 rounded-lg" />}
          title="Venator UI"
          titleHref="/"
        />
      }
      header={<Header dark={dark} onToggleDark={toggleDark} onMenuOpen={() => setMobileOpen(true)} />}
      mobileOpen={mobileOpen}
      onMobileOpenChange={setMobileOpen}
    >
      <div className="max-w-4xl pb-16">
        {children}
      </div>
    </DashboardLayout>
  );
}
