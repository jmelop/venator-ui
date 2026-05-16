import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

const variantMap = {
  default: 'bg-bg-2 border-[var(--border-subtle)] text-fg-2',
  info:    'bg-bg-2 border-[var(--info)] text-fg',
  success: 'bg-bg-2 border-[var(--success)] text-fg',
  warning: 'bg-bg-2 border-[var(--warn)] text-fg',
  error:   'bg-bg-2 border-[var(--danger)] text-fg',
} as const;

export type AlertVariant = keyof typeof variantMap;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', icon, children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`relative w-full border rounded-lg p-4 flex gap-3 ${variantMap[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1">{children}</div>
    </div>
  ),
);
Alert.displayName = 'Alert';

export interface AlertTitleProps extends HTMLAttributes<HTMLDivElement> {}

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`font-semibold text-sm leading-none tracking-tight mb-1 ${className}`}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';
