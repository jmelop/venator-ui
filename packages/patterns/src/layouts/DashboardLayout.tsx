import * as React from 'react';

export interface DashboardLayoutProps {
  /**
   * Content for the sidebar
   */
  sidebar?: React.ReactNode;
  
  /**
   * Content for the header
   */
  header?: React.ReactNode;
  
  /**
   * Main content area
   */
  children: React.ReactNode;
  
  /**
   * Whether the sidebar should be collapsed by default
   * @default false
   */
  sidebarCollapsed?: boolean;
}

/**
 * A foundational dashboard layout with sidebar and header
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
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar && (
        <aside 
          className={`
            bg-white border-r border-gray-200 transition-all duration-300
            ${sidebarCollapsed ? 'w-16' : 'w-64'}
          `}
        >
          <div className="h-full overflow-y-auto">
            {sidebar}
          </div>
        </aside>
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
