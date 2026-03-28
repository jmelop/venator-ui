'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  duration?: number;
}

export type ToastVariant = NonNullable<ToastData['variant']>;

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ToastContext = createContext<ToastContextValue | null>(null);

// ---------------------------------------------------------------------------
// ToastProvider
// ---------------------------------------------------------------------------

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (data: Omit<ToastData, 'id'>) => {
      const id = Math.random().toString(36).slice(2);
      const duration = data.duration ?? 4000;
      setToasts((prev) => [...prev, { ...data, id, duration }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// useToast
// ---------------------------------------------------------------------------

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

// ---------------------------------------------------------------------------
// ToastViewport (internal)
// ---------------------------------------------------------------------------

interface ToastViewportProps {
  toasts: ToastData[];
  dismiss: (id: string) => void;
}

function ToastViewport({ toasts, dismiss }: ToastViewportProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <Toast key={t.id} data={t} onDismiss={dismiss} />
      ))}
    </div>,
    document.body,
  );
}

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

const variantMap: Record<ToastVariant, string> = {
  default: 'border-neutral-200 text-neutral-800',
  success: 'border-green-200 text-green-800',
  warning: 'border-yellow-200 text-yellow-800',
  error: 'border-red-200 text-red-800',
};

// ---------------------------------------------------------------------------
// Toast (individual)
// ---------------------------------------------------------------------------

interface ToastProps {
  data: ToastData;
  onDismiss: (id: string) => void;
}

function Toast({ data, onDismiss }: ToastProps) {
  const { id, title, description, variant = 'default' } = data;

  return (
    <div
      className={`relative flex gap-3 items-start p-4 rounded-lg border shadow-md bg-white text-sm ${variantMap[variant]}`}
    >
      <div className="flex-1 min-w-0">
        <p className="font-semibold leading-none tracking-tight mb-1">{title}</p>
        {description && <p className="opacity-80">{description}</p>}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(id)}
        className="shrink-0 text-neutral-400 hover:text-neutral-700 transition-colors focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
