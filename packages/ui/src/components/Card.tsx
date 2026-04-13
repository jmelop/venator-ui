import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  /** Right-aligned slot for actions (buttons, badges, etc.) */
  action?: React.ReactNode;
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
      className={`bg-white border border-neutral-200 rounded-lg shadow-sm dark:bg-neutral-800 dark:border-neutral-800 ${paddingStyles[padding]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-start justify-between gap-4 ${className}`.trim()}
      {...props}
    >
      <div className="min-w-0">
        {title && <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">{title}</h3>}
        {description && <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`dark:text-neutral-100 ${className}`.trim()} {...props}>
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
