import { forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

const base = [
  'inline-flex items-center justify-center rounded',
  'border border-[var(--border-default)]',
  'bg-bg-2',
  'text-fg-3',
  'font-mono text-[11px] px-1.5 py-0.5 leading-none',
].join(' ');

export const Kbd = forwardRef<HTMLElement, KbdProps>(({ children, className }, ref) => (
  <kbd
    ref={ref}
    className={className ? `${base} ${className}` : base}
  >
    {children}
  </kbd>
));
Kbd.displayName = 'Kbd';
