'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavGroup, NavItem } from '@venator/ui';
import { DashboardLayout } from '@venator/patterns';

const components = [
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'CodeBlock',
  'Input',
  'Label',
  'Modal',
  'Nav',
  'Select',
  'Separator',
  'Skeleton',
  'Switch',
  'Table',
  'Tabs',
  'Toast',
  'Toggle',
  'Tooltip',
] as const;

const patterns = [
  { label: 'DashboardLayout', slug: 'dashboard-layout' },
  { label: 'PageHeader', slug: 'page-header' },
  { label: 'ModuleGrid', slug: 'module-grid' },
] as const;

function toSlug(name: string): string {
  return name.replace(/([A-Z])/g, (m, l, o) => (o === 0 ? l.toLowerCase() : `-${l.toLowerCase()}`));
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-6 p-4 h-full">
      <div className="px-3 py-2">
        <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Venator UI</span>
      </div>

      <NavGroup label="Getting Started">
        <NavItem
          label="Introduction"
          href="/docs/getting-started/introduction"
          active={pathname === '/docs/getting-started/introduction'}
        />
        <NavItem
          label="Installation"
          href="/docs/getting-started/installation"
          active={pathname === '/docs/getting-started/installation'}
        />
      </NavGroup>

      <NavGroup label="Components">
        {components.map((name) => {
          const slug = toSlug(name);
          const href = `/docs/components/${slug}`;
          return (
            <NavItem
              key={name}
              label={name}
              href={href}
              active={pathname === href}
            />
          );
        })}
      </NavGroup>

      <NavGroup label="Patterns">
        {patterns.map(({ label, slug }) => {
          const href = `/docs/patterns/${slug}`;
          return (
            <NavItem
              key={slug}
              label={label}
              href={href}
              active={pathname === href}
            />
          );
        })}
      </NavGroup>
    </nav>
  );
}

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

function Header({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
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
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <DashboardLayout
      sidebar={<Sidebar pathname={pathname} />}
      header={<Header dark={dark} onToggleDark={toggleDark} />}
    >
      {children}
    </DashboardLayout>
  );
}
