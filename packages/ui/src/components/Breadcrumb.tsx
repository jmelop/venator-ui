import { createContext, forwardRef, useContext } from 'react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';

interface BreadcrumbContextValue {
  separator: ReactNode;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({ separator: '/' });

function useBreadcrumbContext(): BreadcrumbContextValue {
  return useContext(BreadcrumbContext);
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, separator = '/', className = '', ...props }, ref) => (
    <BreadcrumbContext.Provider value={{ separator }}>
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-0 text-sm ${className}`}
        {...props}
      >
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps {
  href?: string;
  active?: boolean;
  children: ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbItemProps>(
  ({ href, active = false, children }, ref) => {
    const { separator } = useBreadcrumbContext();

    const activeClasses = 'text-neutral-900 font-medium pointer-events-none';
    const inactiveClasses = 'text-neutral-500 hover:text-neutral-700 transition-colors';

    const inner = href ? (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={active ? activeClasses : inactiveClasses}
      >
        {children}
      </a>
    ) : (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        aria-current={active ? 'page' : undefined}
        className={active ? activeClasses : inactiveClasses}
      >
        {children}
      </span>
    );

    return (
      <>
        {inner}
        {!active && (
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        )}
      </>
    );
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbSeparatorProps {
  children?: ReactNode;
}

export function BreadcrumbSeparator({ children }: BreadcrumbSeparatorProps) {
  const { separator } = useBreadcrumbContext();
  return (
    <span aria-hidden="true" className="text-neutral-400 mx-1.5 text-sm select-none">
      {children ?? separator}
    </span>
  );
}
