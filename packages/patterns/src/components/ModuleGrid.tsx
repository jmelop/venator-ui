import * as React from 'react';

export interface ModuleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  /** Arbitrary Tailwind gap class (e.g. 'gap-2', 'gap-3'). Overrides `gap` when set. */
  gapValue?: string;
}

// Static class maps — Tailwind requires full class names to be present at build time
const columnStyles: Record<NonNullable<ModuleGridProps['columns']>, string> = {
  1: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const gapStyles: Record<NonNullable<ModuleGridProps['gap']>, string> = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-7',
};

export const ModuleGrid = React.forwardRef<HTMLDivElement, ModuleGridProps>(
  ({ columns = 3, gap = 'md', gapValue, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={['grid', columnStyles[columns], gapValue ?? gapStyles[gap], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  ),
);
ModuleGrid.displayName = 'ModuleGrid';
