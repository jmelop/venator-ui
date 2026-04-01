export const dashboardArchetype = {
  name: 'dashboard',
  description: 'A modular dashboard with sidebar navigation, header and a grid-based module system',
  templateDir: 'templates/dashboard',
  patterns: ['DashboardLayout', 'PageHeader', 'ModuleGrid'],
  components: ['Button', 'Card', 'NavItem', 'NavGroup', 'Badge', 'Avatar', 'Separator'],
} as const;
