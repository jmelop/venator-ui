import * as React from 'react';

export interface DashboardLayoutProps {
  /** Content for the sidebar */
  sidebar?: React.ReactNode;

  /** Content for the header */
  header?: React.ReactNode;

  /** Main content area */
  children: React.ReactNode;

  /** Collapse the sidebar to icon-width (desktop only) */
  sidebarCollapsed?: boolean;

  /** Controls the mobile drawer (controlled mode); omit to let the component manage its own state */
  mobileOpen?: boolean;

  /** Called when the component wants to open or close the mobile drawer */
  onMobileOpenChange?: (open: boolean) => void;
}

/**
 * A foundational dashboard layout with sidebar and header.
 *
 * - Desktop (lg+): sidebar is static, collapsible via `sidebarCollapsed`
 * - Mobile (<lg): sidebar is hidden by default, opens as a drawer overlay
 *
 * @example
 * ```tsx
 * <DashboardLayout
 *   sidebar={<Navigation />}
 *   header={<Header />}
 * >
 *   <DashboardContent />
 * </DashboardLayout>
 * ```
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  header,
  children,
  sidebarCollapsed = false,
  mobileOpen,
  onMobileOpenChange,
}) => {
  const [internalMobileOpen, setInternalMobileOpen] = React.useState(false);

  const isControlled = mobileOpen !== undefined;
  const isMobileOpen = isControlled ? mobileOpen : internalMobileOpen;

  const setMobileOpen = React.useCallback(
    (open: boolean) => {
      if (isControlled) {
        onMobileOpenChange?.(open);
      } else {
        setInternalMobileOpen(open);
      }
    },
    [isControlled, onMobileOpenChange],
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar && (
        <>
          {isMobileOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
          )}

          <aside
            className={[
              'bg-white border-r border-gray-200 transition-all duration-300',
              // Desktop: static, respects sidebarCollapsed
              'lg:relative lg:translate-x-0 lg:flex lg:flex-col',
              sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
              // Mobile: fixed drawer
              'fixed inset-y-0 left-0 z-30 flex flex-col',
              isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full',
              'lg:translate-x-0',
            ].join(' ')}
          >
            <button
              type="button"
              aria-label="Close sidebar"
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex-1 h-full overflow-y-auto">
              {sidebar}
            </div>
          </aside>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {header && (
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            {header}
          </header>
        )}

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
