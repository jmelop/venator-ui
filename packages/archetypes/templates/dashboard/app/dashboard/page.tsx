import { ModuleGrid, PageHeader, StatCard, ChartCard } from '@venator-ui/patterns';
import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Button } from '@venator-ui/ui';
import { AreaChart } from '@venator-ui/ui';

const revenueSparkline = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35, 30, 38];
const sessionsSparkline = [80, 72, 88, 65, 90, 78, 95, 85, 100, 92, 88, 97];
const usersSparkline = [120, 132, 128, 145, 139, 158, 152, 167, 171, 165, 180, 192];
const errorsSparkline = [8, 12, 6, 15, 9, 4, 11, 7, 13, 5, 8, 3];

const recentActivity = [
  { user: 'Sarah Chen', action: 'Exported Q1 report', time: '2 min ago', status: 'success' },
  { user: 'James Okafor', action: 'Invited 3 team members', time: '14 min ago', status: 'success' },
  { user: 'Mia Karlsson', action: 'Deleted workspace backup', time: '1 hr ago', status: 'warning' },
  { user: 'Luis Herrera', action: 'Connected Stripe integration', time: '3 hr ago', status: 'success' },
  { user: 'Priya Nair', action: 'Failed login attempt', time: '5 hr ago', status: 'error' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const sessionData = [
  { label: 'Apr 01', value: 18 }, { label: 'Apr 03', value: 24 },
  { label: 'Apr 05', value: 31 }, { label: 'Apr 07', value: 27 },
  { label: 'Apr 09', value: 38 }, { label: 'Apr 11', value: 35 },
  { label: 'Apr 13', value: 44 }, { label: 'Apr 15', value: 52 },
  { label: 'Apr 17', value: 48 }, { label: 'Apr 19', value: 61 },
  { label: 'Apr 21', value: 57 }, { label: 'Apr 23', value: 69 },
  { label: 'Apr 25', value: 74 }, { label: 'Apr 27', value: 81 },
  { label: 'Apr 29', value: 88 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome to your workspace." />
      <ModuleGrid columns={4}>
        <StatCard title="Total users" value="4,821" trend={12.5} trendLabel="vs last month" variant="primary" sparkline={usersSparkline} />
        <StatCard title="Active sessions" value="312" trend={-3.2} trendLabel="vs last month" variant="error" sparkline={sessionsSparkline} />
        <StatCard title="Revenue" value="$18,400" trend={8.1} trendLabel="vs last month" variant="success" sparkline={revenueSparkline} />
        <StatCard title="Errors" value="23" trend={-15} trendLabel="vs last month" variant="warning" sparkline={errorsSparkline} />
      </ModuleGrid>
      <ModuleGrid columns={2}>
        <ChartCard
          title="Sessions over time"
          description="Apr 01 – Apr 29 · Last 30 days"
          chart={<AreaChart data={sessionData} showXAxis showGrid color="#3b82f6" height={140} />}
        />
        <Card>
          <CardHeader title="Quick actions" description="Common tasks." />
          <CardContent className="mt-4 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export report
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              Invite team member
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
              Connect integration
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View documentation
            </Button>
          </CardContent>
        </Card>
      </ModuleGrid>
      <Card>
        <CardHeader title="Recent activity" description="Latest events in your workspace." />
        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((event, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{event.user}</TableCell>
                  <TableCell>{event.action}</TableCell>
                  <TableCell><Badge variant={statusVariant[event.status]}>{event.status}</Badge></TableCell>
                  <TableCell className="text-neutral-400">{event.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
