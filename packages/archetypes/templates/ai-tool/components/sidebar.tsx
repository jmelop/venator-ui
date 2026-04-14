'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from '@venator-ui/patterns';
import Link from 'next/link';

const sections = [
  {
    label: 'Main',
    items: [
      { label: 'AI', href: '/ai' },
      { label: 'History', href: '/ai/history' },
    ],
  },
  {
    label: 'Config',
    items: [
      { label: 'Settings', href: '/ai/settings' },
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
      title="AI Tool"
    />
  );
}
