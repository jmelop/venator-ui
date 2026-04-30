import * as React from 'react';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stackAt?: 'sm' | 'md' | 'lg' | 'never';
  gap?: 'none' | 'sm' | 'md';
  children: React.ReactNode;
}

const gapStyles = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-3',
};

export function ButtonGroup({
  stackAt = 'never',
  gap = 'sm',
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={[
        'inline-flex items-center',
        stackAt === 'sm' ? 'flex-col sm:flex-row' :
        stackAt === 'md' ? 'flex-col md:flex-row' :
        stackAt === 'lg' ? 'flex-col lg:flex-row' : 'flex-row',
        gapStyles[gap],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
