import type { ReactNode } from 'react';

export interface PreviewProps {
  children: ReactNode;
}

export function Preview({ children }: PreviewProps) {
  return (
    <div
      className="rounded-xl border border-[var(--border-subtle)] bg-bg-1 px-8 py-6"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.006) 100%)',
      }}
    >
      {children}
    </div>
  );
}

export default Preview;
