'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from '@venator-ui/patterns';
import Link from 'next/link';

const sections = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/dashboard/analytics' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Settings', href: '/dashboard/settings' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <SidebarNav
      sections={sections}
      pathname={pathname}
      linkComponent={Link}
      title="Dashboard"
      logo={<img src="https://venator-ui-docs.vercel.app/venator-logo-icon.png" alt="Venator" className="w-7 h-7 rounded-lg" />}
    />
  );
}
