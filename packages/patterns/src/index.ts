/**
 * Higher-level UI patterns and compositions
 * 
 * These are opinionated compositions of lower-level components
 * for common dashboard and admin panel use cases
 */

export { DashboardLayout } from './layouts/DashboardLayout';
export type { DashboardLayoutProps } from './layouts/DashboardLayout';

export { PageHeader } from './components/PageHeader';
export type { PageHeaderProps } from './components/PageHeader';

export { ModuleGrid } from './components/ModuleGrid';
export type { ModuleGridProps } from './components/ModuleGrid';

export { SidebarNav } from './components/SidebarNav';
export type { SidebarNavProps, SidebarNavSection, SidebarNavItem } from './components/SidebarNav';
