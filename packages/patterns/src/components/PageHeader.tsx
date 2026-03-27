import * as React from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title: string;
  /** Supporting description below the title */
  description?: string;
  /** Right-aligned slot for action buttons or controls */
  actions?: React.ReactNode;
  /** Renders above the title, typically a breadcrumb trail */
  breadcrumb?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, breadcrumb, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-start justify-between gap-4 ${className}`.trim()}
      {...props}
    >
      <div className="min-w-0">
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        <h1 className="text-2xl font-semibold text-neutral-900 truncate">{title}</h1>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
      </div>
      {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
    </div>
  ),
);
PageHeader.displayName = 'PageHeader';
