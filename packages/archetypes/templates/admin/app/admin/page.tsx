import { PageHeader, StatCard, ModuleGrid } from '@venator-ui/patterns';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Overview" description="Your admin workspace at a glance." />
      <ModuleGrid columns={3}>
        <StatCard title="Total users" value="1,284" trend={4.2} trendLabel="vs last month" />
        <StatCard title="Active today" value="43" trend={-2.1} trendLabel="vs yesterday" />
        <StatCard title="Pending" value="12" variant="warning" />
      </ModuleGrid>
    </div>
  );
}
