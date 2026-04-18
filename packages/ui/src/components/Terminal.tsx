'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

export type TerminalLineType = 'command' | 'success' | 'error' | 'muted' | 'dim' | 'accent';

export interface TerminalLine {
  type: TerminalLineType;
  text: string;
  delay?: number;
}

export interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  loop?: boolean;
  loopDelay?: number;
  className?: string;
}

const lineClass: Record<TerminalLineType, string> = {
  command: '',
  success: 'text-green-400',
  error: 'text-red-400',
  muted: 'text-neutral-500',
  dim: 'text-neutral-600',
  accent: 'text-blue-400',
};

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      lines,
      title = 'terminal',
      loop = true,
      loopDelay = 2000,
      className = '',
    },
    ref,
  ) => {
    const [visible, setVisible] = useState<TerminalLine[]>([]);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
      const clear = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
      };

      const run = () => {
        setVisible([]);
        lines.forEach((line, i) => {
          const t = setTimeout(() => {
            setVisible((prev) => [...prev, line]);
          }, line.delay ?? 0);
          timers.current.push(t);

          if (i === lines.length - 1 && loop) {
            const maxDelay = Math.max(...lines.map((l) => l.delay ?? 0));
            const restart = setTimeout(() => run(), maxDelay + loopDelay);
            timers.current.push(restart);
          }
        });
      };

      run();
      return clear;
    }, [lines, loop, loopDelay]);

    return (
      <div
        ref={ref}
        className={[
          'rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden font-mono text-sm',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-neutral-500 text-xs">{title}</span>
          <div className="w-[52px]" />
        </div>

        <div className="px-4 py-4 space-y-1 min-h-[200px]">
          {visible.map((line, i) => (
            <div key={i}>
              {line.type === 'command' ? (
                <>
                  <span className="text-neutral-400 mr-2">$</span>
                  <span className="text-neutral-100">{line.text}</span>
                </>
              ) : (
                <span className={lineClass[line.type]}>{line.text}</span>
              )}
            </div>
          ))}
          <span className="inline-block w-2 h-4 bg-neutral-500 animate-pulse" />
        </div>
      </div>
    );
  },
);
Terminal.displayName = 'Terminal';
