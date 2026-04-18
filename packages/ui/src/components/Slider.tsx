'use client';

import { forwardRef, useCallback, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function snapToStep(v: number, min: number, step: number): number {
  return Math.round((v - min) / step) * step + min;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className = '',
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const isControlled = value !== undefined;
    const current = isControlled ? value : uncontrolled;

    const trackRef = useRef<HTMLDivElement>(null);

    const setValue = useCallback(
      (next: number) => {
        const snapped = clamp(snapToStep(next, min, step), min, max);
        if (!isControlled) setUncontrolled(snapped);
        onValueChange?.(snapped);
      },
      [isControlled, min, max, step, onValueChange],
    );

    const computeFromClientX = useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track) return;
        const { left, width } = track.getBoundingClientRect();
        const ratio = (clientX - left) / width;
        setValue(min + ratio * (max - min));
      },
      [min, max, setValue],
    );

    const handleTrackMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      computeFromClientX(e.clientX);

      const onMouseMove = (ev: globalThis.MouseEvent) => computeFromClientX(ev.clientX);
      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setValue(current + step);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setValue(current - step);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setValue(min);
      } else if (e.key === 'End') {
        e.preventDefault();
        setValue(max);
      }
    };

    const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={['flex items-center w-full', disabled ? 'opacity-50 pointer-events-none' : '', className]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          ref={trackRef}
          onMouseDown={handleTrackMouseDown}
          className="relative w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary-600"
            style={{ width: `${percent}%` }}
          />
          <div
            role="slider"
            aria-valuenow={current}
            aria-valuemin={min}
            aria-valuemax={max}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary-600 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ left: `${percent}%` }}
          />
        </div>
      </div>
    );
  },
);
Slider.displayName = 'Slider';
