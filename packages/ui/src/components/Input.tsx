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
      ? 'border-danger focus:border-danger focus:ring-danger'
      : 'border-[var(--border-default)] focus:border-[var(--accent)] focus:ring-[var(--accent)]';

    const colorStyles = 'bg-bg-2 text-fg border-[var(--border-default)] placeholder:text-fg-4';
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const leftPad = leftIcon ? iconPaddingLeft[size] : '';
    const rightPad = rightIcon ? iconPaddingRight[size] : '';

    const classes = `${base} ${stateStyles} ${colorStyles} ${disabledStyles} ${sizeStyles[size]} ${leftPad} ${rightPad} ${className}`.trim();

    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-4">
            {leftIcon}
          </span>
        )}
        <input ref={ref} className={classes} disabled={disabled} {...props} />
        {rightIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-fg-4">
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
      className={`text-sm font-medium text-fg-2 ${className}`.trim()}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-danger" aria-hidden="true">*</span>}
    </label>
  ),
);
Label.displayName = 'Label';
