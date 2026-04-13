'use client';

import { forwardRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  children: ReactNode;
}

const toggleSizeMap: Record<ToggleSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed,
      defaultPressed = false,
      onPressedChange,
      disabled = false,
      size = 'md',
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isPressed = isControlled ? pressed : uncontrolled;

    const handleClick = () => {
      const next = !isPressed;
      if (!isControlled) setUncontrolled(next);
      onPressedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={disabled}
        onClick={handleClick}
        className={[
          'inline-flex items-center justify-center border rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
          toggleSizeMap[size],
          isPressed
            ? 'bg-primary-100 text-primary-700 border-primary-200'
            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50',
          disabled ? 'opacity-50 pointer-events-none' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Toggle.displayName = 'Toggle';

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      label,
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
      <label className="inline-flex items-center gap-2">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={[
            'relative inline-flex items-center w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
            isChecked ? 'bg-primary-600' : 'bg-neutral-200',
            disabled ? 'opacity-50 pointer-events-none' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span
            className={[
              'bg-white rounded-full shadow-sm transition-transform w-4 h-4',
              isChecked ? 'translate-x-4' : 'translate-x-1',
            ].join(' ')}
          />
        </button>
        {label && (
          <span className="text-sm text-neutral-700 dark:text-neutral-300 select-none">{label}</span>
        )}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
