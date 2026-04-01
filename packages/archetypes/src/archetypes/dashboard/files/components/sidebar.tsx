'use client';

import { usePathname } from 'next/navigation';
import { NavGroup, NavItem } from '@venator/ui';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 p-4 h-full">
      <div className="px-3 py-2">
        <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">My App</span>
      </div>
      <NavGroup label="Navigation">
        <NavItem
          label="Dashboard"
          href="/dashboard"
          active={pathname === '/dashboard'}
        />
        <NavItem
          label="Settings"
          href="/dashboard/settings"
          active={pathname === '/dashboard/settings'}
        />
        <NavItem
          label="Profile"
          href="/dashboard/profile"
          active={pathname === '/dashboard/profile'}
        />
      </NavGroup>
    </nav>
  );
}
