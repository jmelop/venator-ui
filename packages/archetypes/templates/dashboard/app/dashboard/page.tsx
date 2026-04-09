import { ModuleGrid, PageHeader, StatCard } from '@venator/patterns';
import { Card, CardContent, CardHeader } from '@venator/ui';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome to your workspace." />
      <ModuleGrid columns={4}>
        <StatCard title="Total users" value="4,821" trend={12.5} trendLabel="vs last month" variant="primary" />
        <StatCard title="Active sessions" value="312" trend={-3.2} trendLabel="vs last month" />
        <StatCard title="Revenue" value="$18,400" trend={8.1} trendLabel="vs last month" variant="success" />
        <StatCard title="Errors" value="23" trend={-15} trendLabel="vs last month" variant="error" />
      </ModuleGrid>
      <ModuleGrid columns={2}>
        <Card>
          <CardHeader title="Recent activity" description="Latest events in your workspace." />
          <CardContent className="mt-4">
            <p className="text-sm text-neutral-500">No recent activity.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Quick actions" description="Common tasks." />
          <CardContent className="mt-4">
            <p className="text-sm text-neutral-500">No actions configured.</p>
          </CardContent>
        </Card>
      </ModuleGrid>
    </div>
  );
}
