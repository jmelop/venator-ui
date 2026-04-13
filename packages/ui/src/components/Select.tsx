import * as React from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
  error?: boolean;
  placeholder?: string;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: 'text-sm px-3 py-1.5 pr-8',
  md: 'text-base px-3 py-2 pr-9',
  lg: 'text-lg px-4 py-3 pr-10',
};

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', error = false, placeholder, disabled, className = '', children, ...props }, ref) => {
    const base =
      'w-full border rounded transition focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none bg-none';

    const stateStyles = error
      ? 'border-error-DEFAULT focus:border-error-DEFAULT focus:ring-error-DEFAULT'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-800' : 'bg-white dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700';

    const classes = [base, stateStyles, disabledStyles, sizeStyles[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="relative w-full">
        <select ref={ref} className={classes} disabled={disabled} {...props}>
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500">
          <ChevronDown />
        </span>
      </div>
    );
  },
);
Select.displayName = 'Select';
