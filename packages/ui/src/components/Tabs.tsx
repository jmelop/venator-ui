'use client';

import { createContext, forwardRef, useContext, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: 'pill' | 'underline';
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>');
  return ctx;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  variant?: 'pill' | 'underline';
}

export function Tabs({ defaultValue = '', value, onValueChange, children, variant = 'pill' }: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : uncontrolled;

  const setActiveTab = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      {children}
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className = '', ...props }, ref) => {
    const { variant } = useTabsContext();
    return (
      <div
        ref={ref}
        className={[
          'inline-flex items-center',
          variant === 'pill'
            ? 'gap-1 bg-bg-2 p-1 rounded-lg'
            : 'gap-0 border-b border-[var(--border-subtle)]',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      />
    );
  },
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  disableFocusRing?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, disableFocusRing = false, className = '', ...props }, ref) => {
    const { activeTab, setActiveTab, variant } = useTabsContext();
    const isActive = activeTab === value;

    const pillStyles = isActive
      ? 'bg-bg-3 text-fg shadow-sm rounded-md'
      : 'text-fg-4 hover:text-fg-2 rounded-md';

    const underlineStyles = isActive
      ? 'text-fg border-b-2 border-[var(--accent)] -mb-px'
      : 'text-fg-4 hover:text-fg-2 border-b-2 border-transparent -mb-px';

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={() => setActiveTab(value)}
        className={[
          'px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none',
          disableFocusRing ? '' : 'focus:ring-2 focus:ring-[var(--accent)]',
          variant === 'pill' ? pillStyles : underlineStyles,
          disabled ? 'opacity-50 pointer-events-none' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    if (activeTab !== value) return null;
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';
