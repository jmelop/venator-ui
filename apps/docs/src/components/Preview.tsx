import type { ReactNode } from 'react';

export interface PreviewProps {
  children: ReactNode;
}

export function Preview({ children }: PreviewProps) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-bg-1 p-6">
      {children}
    </div>
  );
}

export default Preview;
