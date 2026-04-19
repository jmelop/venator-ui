import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;

  /** Show a loading spinner and disable the button */
  isLoading?: boolean;
}

/**
 * A foundational button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    className = '',
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500',
      outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50 focus:ring-neutral-500 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-800',
      ghost: 'bg-transparent text-[var(--fg,theme(colors.neutral.900))] border border-[var(--line-2,theme(colors.neutral.200))] dark:text-neutral-100 dark:border-neutral-700 hover:bg-[var(--bg-2,theme(colors.neutral.100))] dark:hover:bg-neutral-800 transition-colors',
      accent: 'bg-[var(--accent)] text-[var(--accent-ink)] border border-[var(--accent)] hover:opacity-90 transition-opacity',
    };

    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 rounded',
      md: 'text-base px-4 py-2 rounded-md',
      lg: 'text-lg px-6 py-3 rounded-lg',
    };

    const spinnerSizeStyles = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    return (
      <button ref={ref} className={classes} disabled={isLoading || disabled} aria-busy={isLoading} {...props}>
        {isLoading && (
          <svg
            className={`animate-spin mr-2 ${spinnerSizeStyles[size]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
