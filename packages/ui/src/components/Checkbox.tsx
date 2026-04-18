'use client';

import { forwardRef, useState } from 'react';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
}

const sizeMap: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      size = 'md',
      className = '',
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : uncontrolled;

    const handleClick = () => {
      const next = !isChecked;
      if (!isControlled) setUncontrolled(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleClick}
        className={[
          'inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
          sizeMap[size],
          isChecked
            ? 'bg-primary-600 border border-primary-600 text-white'
            : 'border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900',
          disabled ? 'opacity-50 pointer-events-none' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isChecked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full p-0.5"
          >
            <path d="M4 12l5 5L20 6" />
          </svg>
        )}
      </button>
    );
  },
);
Checkbox.displayName = 'Checkbox';
