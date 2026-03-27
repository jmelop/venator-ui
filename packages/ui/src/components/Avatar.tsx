import * as React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

const PlaceholderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[60%] h-[60%] text-neutral-400"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = 'md',
      shape = 'circle',
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);

    const wrapperClasses = [
      'inline-flex items-center justify-center shrink-0 overflow-hidden',
      sizeStyles[size],
      shapeStyles[shape],
      !src || imgError ? (fallback ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-neutral-200') : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showImage = src && !imgError;
    const showFallback = (!src || imgError) && fallback;
    const showPlaceholder = !showImage && !showFallback;

    return (
      <span ref={ref} className={wrapperClasses} {...props}>
        {showImage && (
          <img
            src={src}
            alt={alt ?? ''}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {showFallback && (
          <span aria-label={alt}>{fallback.slice(0, 2)}</span>
        )}
        {showPlaceholder && <PlaceholderIcon />}
      </span>
    );
  },
);
Avatar.displayName = 'Avatar';
