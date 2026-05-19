import * as React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pill?: boolean;
  /**
   * Arbitrary CSS color applied to the text and dot.
   * When set, overrides the variant color tokens.
   * Pass any valid CSS color: hex, hsl(), or CSS variable.
   */
  color?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-2 text-fg-2',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-green-950 text-success',
  warning: 'bg-yellow-950 text-warn',
  error:   'bg-red-950 text-danger',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-fg-3',
  primary: 'bg-primary-500',
  success: 'bg-success',
  warning: 'bg-warn',
  error:   'bg-danger',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
};

const roundedStyles: Record<'pill' | 'rect', string> = {
  pill: 'rounded-full',
  rect: 'rounded',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, pill = true, color, className, children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center font-medium',
      variantStyles[variant],
      sizeStyles[size],
      pill ? roundedStyles.pill : roundedStyles.rect,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} style={{ ...(color ? { color } : {}), ...props.style }} {...props}>
        {dot && (
          <span
            className={`rounded-full w-1.5 h-1.5 mr-1.5 shrink-0 ${color ? '' : dotStyles[variant]}`}
            style={color ? { backgroundColor: color } : undefined}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';
