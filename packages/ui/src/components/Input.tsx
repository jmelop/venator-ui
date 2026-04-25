import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  /** Icon rendered on the left inside the input */
  leftIcon?: React.ReactNode;
  /** Icon rendered on the right inside the input */
  rightIcon?: React.ReactNode;
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a red asterisk to indicate a required field */
  required?: boolean;
}

const sizeStyles: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-3 py-2',
  lg: 'text-lg px-4 py-3',
};

const iconPaddingLeft: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
};

const iconPaddingRight: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'pr-8',
  md: 'pr-9',
  lg: 'pr-10',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      'w-full border rounded transition focus:outline-none focus:ring-2 focus:ring-offset-0';

    const stateStyles = error
      ? 'border-error-DEFAULT focus:border-error-DEFAULT focus:ring-error-DEFAULT'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';

    const colorStyles = 'bg-white dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const leftPad = leftIcon ? iconPaddingLeft[size] : '';
    const rightPad = rightIcon ? iconPaddingRight[size] : '';

    const classes = `${base} ${stateStyles} ${colorStyles} ${disabledStyles} ${sizeStyles[size]} ${leftPad} ${rightPad} ${className}`.trim();

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
            {leftIcon}
          </span>
        )}
        <input ref={ref} className={classes} disabled={disabled} {...props} />
        {rightIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500">
            {rightIcon}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className = '', children, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium text-neutral-700 dark:text-neutral-300 ${className}`.trim()}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error-DEFAULT" aria-hidden="true">*</span>}
    </label>
  ),
);
Label.displayName = 'Label';
