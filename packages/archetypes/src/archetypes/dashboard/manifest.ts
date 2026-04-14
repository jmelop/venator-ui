export const dashboardArchetype = {
  name: 'dashboard',
  description: 'A modular dashboard with sidebar navigation, topbar, stat cards, and a grid-based content layout',
  framework: 'next-app-router',
  templateDir: './template',
  dependencies: ['@venator-ui/ui', '@venator-ui/patterns'],
  patterns: ['DashboardLayout', 'SidebarNav', 'Topbar', 'PageHeader', 'ModuleGrid', 'StatCard'],
  components: ['Button', 'Card', 'CardHeader', 'CardContent', 'Input', 'Label', 'Separator', 'Badge'],
} as const;