import * as React from 'react';
import { NavGroup, NavItem } from '@venator-ui/ui';

export interface SidebarNavItem {
  label: string;
  href: string;
}

export interface SidebarNavSection {
  label: string;
  items: SidebarNavItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface SidebarNavProps {
  sections: SidebarNavSection[];
  pathname: string;
  logo?: React.ReactNode;
  title?: string;
  titleHref?: string;
  linkComponent?: React.ElementType;
  className?: string;
}

export function SidebarNav({
  sections,
  pathname,
  logo,
  title,
  titleHref = '/',
  linkComponent: LinkComponent = 'a',
  className = '',
}: SidebarNavProps) {
  return (
    <nav className={`flex flex-col gap-6 p-4 ${className}`.trim()}>
      {(logo || title) && (
        <div className="px-3 py-4 border-b border-neutral-200 dark:border-neutral-800 mb-2">
          <LinkComponent href={titleHref} className="flex items-center gap-2.5">
            {logo}
            {title && (
              <span className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </span>
            )}
          </LinkComponent>
        </div>
      )}

      {sections.map((section) => (
        <NavGroup key={section.label} label={section.label}>
          {section.items.map((item) => (
            <LinkComponent key={item.href} href={item.href} className="block">
              <NavItem label={item.label} active={pathname === item.href} />
            </LinkComponent>
          ))}
        </NavGroup>
      ))}
    </nav>
  );
}
