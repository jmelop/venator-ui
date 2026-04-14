export const aiToolArchetype = {
  name: 'ai-tool',
  description: 'A prompt-based AI interface with input, response view, history and settings',
  framework: 'next-app-router',
  templateDir: './template',
  dependencies: ['@venator-ui/ui', '@venator-ui/patterns'],
  patterns: ['DashboardLayout', 'SidebarNav', 'Topbar', 'PageHeader'],
  components: ['Button', 'Card', 'Input', 'Label', 'Separator'],
} as const;
