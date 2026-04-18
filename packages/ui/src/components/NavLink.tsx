import { forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
}

const base = [
  'text-sm transition-colors',
  'text-neutral-500 dark:text-neutral-400',
  'hover:text-neutral-900 dark:hover:text-neutral-100',
].join(' ');

const activeClass = 'text-neutral-900 dark:text-neutral-100';

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, active = false, children, className = '' }, ref) => (
    <a
      ref={ref}
      href={href}
      className={[base, active ? activeClass : '', className].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  ),
);
NavLink.displayName = 'NavLink';
