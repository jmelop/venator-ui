import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  /** Right-aligned slot for actions (buttons, badges, etc.) */
  action?: React.ReactNode;
  /** Renders a bottom border separator between header and body */
  separator?: boolean;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-bg-1 border border-[var(--border-subtle)] rounded-lg shadow-sm ${paddingStyles[padding]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, separator = false, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex items-start justify-between gap-4',
        separator ? 'border-b border-[var(--border-subtle)] pb-4 mb-4' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="min-w-0">
        {title && <h3 className="text-base font-semibold text-fg truncate">{title}</h3>}
        {description && <p className="mt-1 text-sm text-fg-3">{description}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`text-fg ${className}`.trim()} {...props}>
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';
