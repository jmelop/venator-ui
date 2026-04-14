import { PageHeader, ModuleGrid, StatCard } from '@venator-ui/patterns';
import { Card, CardContent, CardHeader } from '@venator-ui/ui';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track performance and usage metrics." />
      <ModuleGrid columns={3}>
        <StatCard title="Page views" value="124,300" trend={22.4} trendLabel="vs last month" />
        <StatCard title="Unique visitors" value="38,210" trend={11.2} trendLabel="vs last month" variant="primary" />
        <StatCard title="Bounce rate" value="42.3%" trend={-5.1} trendLabel="vs last month" variant="success" />
      </ModuleGrid>
      <Card>
        <CardHeader title="Traffic overview" description="Visits over the last 30 days." />
        <CardContent className="mt-4">
          <p className="text-sm text-neutral-500">Chart placeholder — connect your data source.</p>
        </CardContent>
      </Card>
    </div>
  );
}
