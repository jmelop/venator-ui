import * as React from 'react';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stackAt?: 'sm' | 'md' | 'lg' | 'never';
  children: React.ReactNode;
}

const stackStyles: Record<NonNullable<ButtonGroupProps['stackAt']>, string> = {
  sm: 'flex-col sm:flex-row',
  md: 'flex-col md:flex-row',
  lg: 'flex-col lg:flex-row',
  never: 'flex-row',
};

export function ButtonGroup({
  stackAt = 'never',
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={[
        'inline-flex',
        stackStyles[stackAt],
        '[&>*]:rounded-none',
        '[&>*:first-child]:rounded-l-lg',
        '[&>*:last-child]:rounded-r-lg',
        '[&>*:first-child]:rounded-bl-none [&>*:first-child]:rounded-tl-lg',
        'sm:[&>*:first-child]:rounded-l-lg sm:[&>*:first-child]:rounded-bl-none',
        '[&>*+*]:-ml-px',
        'sm:[&>*+*]:-ml-px sm:[&>*+*]:mt-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
