import * as React from 'react';

export interface TopbarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  position?: 'fixed' | 'sticky' | 'static';
  bordered?: boolean;
  className?: string;
}

const positionStyles: Record<NonNullable<TopbarProps['position']>, string> = {
  fixed: 'fixed top-0 left-0 right-0',
  sticky: 'sticky top-0',
  static: '',
};

export const Topbar = React.forwardRef<HTMLDivElement, TopbarProps>(
  (
    {
      left,
      center,
      right,
      title,
      position = 'static',
      bordered = true,
      className = '',
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={[
        'w-full bg-white dark:bg-neutral-900 px-4 h-14 flex items-center justify-between gap-4 z-40',
        positionStyles[position],
        bordered ? 'border-b border-neutral-200 dark:border-neutral-800' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center gap-3 shrink-0">
        {left}
        {title && (
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </span>
        )}
      </div>

      {center && (
        <div className="flex-1 flex items-center justify-center">{center}</div>
      )}

      {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
    </div>
  ),
);
Topbar.displayName = 'Topbar';
