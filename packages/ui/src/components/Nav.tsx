import * as React from 'react';

// ---------------------------------------------------------------------------
// NavItem
// ---------------------------------------------------------------------------

export interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
}

const navItemBase = 'w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0';
const navItemActive = 'bg-primary-50 text-primary-700 font-medium';
const navItemInactive = 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900';
const navItemDisabled = 'opacity-50 pointer-events-none';

export const NavItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, NavItemProps>(
  ({ label, icon, active = false, disabled = false, onClick, href }, ref) => {
    const classes = [
      navItemBase,
      active ? navItemActive : navItemInactive,
      disabled ? navItemDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && <span className="mr-3 shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{label}</span>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-disabled={disabled}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      >
        {content}
      </button>
    );
  },
);
NavItem.displayName = 'NavItem';

// ---------------------------------------------------------------------------
// NavGroup
// ---------------------------------------------------------------------------

export interface NavGroupProps {
  label: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const NavGroup: React.FC<NavGroupProps> = ({
  label,
  children,
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const labelClasses =
    'text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-1';

  if (collapsible) {
    return (
      <div>
        <button
          type="button"
          className={`${labelClasses} w-full flex items-center justify-between hover:text-neutral-600 transition-colors focus:outline-none`}
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
        >
          <span>{label}</span>
          <Chevron open={!collapsed} />
        </button>
        {!collapsed && <div>{children}</div>}
      </div>
    );
  }

  return (
    <div>
      <p className={labelClasses}>{label}</p>
      <div>{children}</div>
    </div>
  );
};
NavGroup.displayName = 'NavGroup';
