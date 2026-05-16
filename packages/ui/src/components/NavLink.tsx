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
  'text-fg-3',
  'hover:text-fg',
].join(' ');

const activeClass = 'text-fg';

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
