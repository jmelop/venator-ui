export const adminArchetype = {
  name: 'admin',
  description: 'An administrative interface with resource tables, forms, and settings pages',
  framework: 'next-app-router',
  templateDir: './template',
  dependencies: ['@venator/ui', '@venator/patterns'],
  patterns: ['DashboardLayout', 'SidebarNav', 'Topbar', 'PageHeader'],
  components: ['Button', 'Card', 'Input', 'Label', 'Modal', 'Table', 'Badge', 'Separator'],
} as const;
