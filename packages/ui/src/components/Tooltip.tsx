import * as React from 'react';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const bubblePosition: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
};

const arrowBase = 'absolute w-0 h-0 border-[4px] border-transparent';

const arrowStyles: Record<TooltipSide, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-neutral-900 border-b-0',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-900 border-t-0',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-neutral-900 border-r-0',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-neutral-900 border-l-0',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  delay = 300,
  children,
  className,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  };

  return (
    <div
      className={`relative inline-block${className ? ` ${className}` : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={[
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-neutral-900 rounded whitespace-nowrap pointer-events-none',
            bubblePosition[side],
          ].join(' ')}
        >
          {content}
          <span className={`${arrowBase} ${arrowStyles[side]}`} />
        </span>
      )}
    </div>
  );
};
Tooltip.displayName = 'Tooltip';
