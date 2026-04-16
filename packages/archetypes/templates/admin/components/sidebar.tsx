'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from '@venator-ui/patterns';
import Link from 'next/link';

const sections = [
  {
    label: 'Main',
    items: [
      { label: 'Overview', href: '/admin' },
      { label: 'Users', href: '/admin/users' },
    ],
  },
  {
    label: 'Config',
    items: [
      { label: 'Settings', href: '/admin/settings' },
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
      title="My App"
      logo={<img src="/logo.png" alt="Logo" className="w-7 h-7 rounded-lg" />}
    />
  );
}
