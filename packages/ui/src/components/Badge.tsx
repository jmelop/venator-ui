import * as React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pill?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-2 text-fg-2',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-green-950 text-success',
  warning: 'bg-yellow-950 text-warn',
  error:   'bg-red-950 text-danger',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-400',
  primary: 'bg-primary-500',
  success: 'bg-success',
  warning: 'bg-warn',
  error:   'bg-danger',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
};

const plainStyles: Record<BadgeVariant, string> = {
  default: 'text-fg-3',
  primary: 'text-primary-400',
  success: 'text-success',
  warning: 'text-warn',
  error:   'text-danger',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, pill = true, className, children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center font-medium',
      pill ? 'rounded-full ' + variantStyles[variant] + ' ' + sizeStyles[size] : plainStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span
            className={`rounded-full w-1.5 h-1.5 mr-1.5 shrink-0 ${dotStyles[variant]}`}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';
