import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

export type SkeletonRounded = keyof typeof roundedMap;

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: SkeletonRounded;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', width, height, rounded = 'md', style, ...props }, ref) => (
    <div
      ref={ref}
      className={`animate-pulse bg-neutral-200 ${roundedMap[rounded]} ${className}`}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
