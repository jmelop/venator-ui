'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Topbar } from '@venator-ui/patterns';
import { NavLink } from '@venator-ui/ui';

const btnClass =
  'p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors';

const navLinks = [
  { label: 'Docs', href: '/docs/getting-started/introduction', base: '/docs/getting-started' },
  { label: 'Components', href: '/docs/components/button', base: '/docs/components' },
  { label: 'Patterns', href: '/docs/patterns/dashboard-layout', base: '/docs/patterns' },
  { label: 'Archetypes', href: '/docs/archetypes/dashboard', base: '/docs/archetypes' },
  { label: 'Changelog', href: 'https://github.com/jmelop/venator-ui/releases', base: 'https://github.com' },
] as const;

export function LandingNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('venator-theme');
    const isDark = stored ? stored === 'dark' : true;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('venator-theme', next ? 'dark' : 'light');
  }

  const left = (
    <Link href="/" className="flex items-center gap-2">
      <img src="/venator-logo-icon.png" alt="Venator" className="w-7 h-7 rounded-lg" />
      <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">Venator UI</span>
      <span className="font-mono text-[11px] text-neutral-400 ml-1">v0.1</span>
    </Link>
  );

  const center = (
    <nav className="hidden md:flex items-center gap-6">
      {navLinks.map(({ label, href, base }) =>
        href.startsWith('https://') ? (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
            {label}
          </a>
        ) : (
          <NavLink key={href} href={href} active={pathname.startsWith(base)}>
            {label}
          </NavLink>
        )
      )}
    </nav>
  );

  const right = (
    <div className="flex items-center gap-1">
      <button aria-label="Search" className={btnClass}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      <button aria-label="Toggle dark mode" onClick={toggleDark} className={btnClass} suppressHydrationWarning>
        <span suppressHydrationWarning>
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </span>
      </button>

      <a
        href="https://github.com/jmelop/venator-ui"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={btnClass}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      </a>
    </div>
  );

  return <Topbar left={left} center={center} right={right} position="fixed" bordered className="![background:var(--bg-2)] ![border-bottom-color:var(--line)]" />;
}
