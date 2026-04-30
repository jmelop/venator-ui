import * as React from 'react';
import { Badge, Card, CardContent, Sparkline } from '@venator-ui/ui';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  sparkline?: number[];
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const variantSparklineColor: Record<NonNullable<StatCardProps['variant']>, string> = {
  default: '#9ca3af',
  primary: '#9ca3af',
  success: '#9ca3af',
  warning: '#9ca3af',
  error: '#ef4444',
};

const variantSparklineStroke: Record<NonNullable<StatCardProps['variant']>, string> = {
  default: '#F5F6F7',
  primary: '#F5F6F7',
  success: '#F5F6F7',
  warning: '#F5F6F7',
  error: '#ef4444',
};

const variantStyles: Record<NonNullable<StatCardProps['variant']>, string> = {
  default: '',
  primary: 'border-l-4 border-l-primary-500',
  success: 'border-l-4 border-l-green-500',
  warning: 'border-l-4 border-l-yellow-500',
  error: 'border-l-4 border-l-red-500',
};

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      description,
      icon,
      trend,
      trendLabel,
      sparkline,
      variant = 'default',
      className = '',
    },
    ref,
  ) => (
    <Card ref={ref} className={`${variantStyles[variant]} ${className}`.trim()}>
      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
          {icon && (
            <span className="text-neutral-400 dark:text-neutral-500 shrink-0">{icon}</span>
          )}
        </div>

        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
            {trend !== undefined && (
              <div className="flex items-center gap-1">
                <Badge variant={trend >= 0 ? 'success' : 'error'}>
                  {trend >= 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-0.5">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-0.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                  {Math.abs(trend)}%
                </Badge>
                {trendLabel && (
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">{trendLabel}</span>
                )}
              </div>
            )}
            {description && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            )}
          </div>
          {sparkline && sparkline.length > 0 && (
            <Sparkline
              data={sparkline}
              color={variantSparklineColor[variant]}
              strokeColor={variantSparklineStroke[variant]}
              height={48}
              filled
              className="w-24 shrink-0"
            />
          )}
        </div>
      </CardContent>
    </Card>
  ),
);
StatCard.displayName = 'StatCard';
