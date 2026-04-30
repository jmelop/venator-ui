import { ModuleGrid, PageHeader, StatCard, ChartCard } from '@venator-ui/patterns';
import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Button, ButtonGroup, AreaChart, BarChart } from '@venator-ui/ui';

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

const signupData = [
  { label: 'M', value: 48 },
  { label: 'T', value: 62 },
  { label: 'W', value: 71 },
  { label: 'T', value: 58 },
  { label: 'F', value: 80 },
  { label: 'S', value: 91 },
  { label: 'S', value: 67 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your workspace."
        actions={
          <ButtonGroup>
            <Button variant="ghost" size="sm">Filter</Button>
            <Button variant="ghost" size="sm">Export</Button>
            <Button variant="primary" size="sm">New report</Button>
          </ButtonGroup>
        }
      />
      <ModuleGrid columns={4}>
        <StatCard title="Total users" value="4,821" trend={12.5} variant="primary" sparkline={usersSparkline} />
        <StatCard title="Active sessions" value="312" trend={-3.2} variant="error" sparkline={sessionsSparkline} />
        <StatCard title="Revenue" value="$18,400" trend={8.1} variant="success" sparkline={revenueSparkline} />
        <StatCard title="Errors" value="23" trend={-15} variant="warning" sparkline={errorsSparkline} />
      </ModuleGrid>
      <ModuleGrid columns={2}>
        <ChartCard
          title="Sessions over time"
          description="Apr 01 – Apr 29 · Last 30 days"
          chart={<AreaChart data={sessionData} showXAxis showYAxis showGrid height={220} />}
        />
        <ChartCard
          title="Sign-ups / day"
          description="Weekly average · 62"
          chart={<BarChart data={signupData} color="#6b7280" showXAxis showGrid height={220} />}
        />
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
