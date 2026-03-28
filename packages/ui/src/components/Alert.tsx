import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

const variantMap = {
  default: 'bg-neutral-50 border-neutral-200 text-neutral-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
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

export interface AlertTitleProps extends HTMLAttributes<HTMLParagraphElement> {}

export const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={`font-semibold text-sm leading-none tracking-tight mb-1 ${className}`}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className = '', ...props }, ref) => (
    <p ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';
