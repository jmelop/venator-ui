import * as React from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => {
    const classes = [
      orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
      'bg-neutral-200',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        {...(decorative ? { 'aria-hidden': true } : { role: 'separator', 'aria-orientation': orientation })}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';
