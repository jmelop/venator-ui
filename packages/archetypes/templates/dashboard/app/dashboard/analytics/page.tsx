import { PageHeader, ModuleGrid, StatCard, ChartCard } from '@venator-ui/patterns';
import { AreaChart, BarChart, Button, ButtonGroup, Card, CardContent, CardHeader } from '@venator-ui/ui';

const revenueSparkline = [88, 92, 85, 98, 94, 105, 110, 102, 118, 115, 122, 128];
const usersSparkline = [180, 195, 188, 210, 205, 220, 215, 232, 228, 240, 248, 249];
const sessionsSparkline = [720, 750, 735, 780, 760, 810, 830, 815, 855, 870, 880, 892];
const convSparkline = [3.8, 3.5, 3.9, 3.2, 3.6, 3.4, 3.3, 3.5, 3.2, 3.4, 3.5, 3.42];

const sessionLabels = ['Apr 01','Apr 03','Apr 05','Apr 07','Apr 09','Apr 11','Apr 13','Apr 15','Apr 17'];
const sessionThisPeriod = [18, 24, 31, 27, 38, 35, 44, 52, 48, 61, 57, 69, 74, 81, 88, 92, 85];
const sessionPrevPeriod = [10, 14, 18, 16, 22, 20, 26, 30, 28, 35, 33, 40, 43, 47, 51, 54, 50];

const sessionSeriesData = sessionLabels.map((label, i) => ({ label, value: sessionThisPeriod[i] ?? 0 }));
const sessionPrevData = sessionLabels.map((label, i) => ({ label, value: sessionPrevPeriod[i] ?? 0 }));

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Last 30 days · updated just now"
      />
      <ModuleGrid columns={4}>
        <StatCard title="Revenue" value="$128,402" trend={12.4} variant="success" sparkline={revenueSparkline} />
        <StatCard title="Active users" value="24,891" trend={8.1} variant="primary" sparkline={usersSparkline} />
        <StatCard title="Sessions" value="89,233" trend={4.7} sparkline={sessionsSparkline} />
        <StatCard title="Conv. rate" value="3.42%" trend={-0.6} variant="error" sparkline={convSparkline} />
      </ModuleGrid>
      <ModuleGrid columns={2}>
        <ChartCard
          title="Sessions over time"
          description="Apr 01 – Apr 17 · 2026"
          chart={
            <AreaChart
              series={[
                { label: 'This period', data: sessionSeriesData, color: '#ffffff' },
                { label: 'Previous', data: sessionPrevData, color: '#6b7280' },
              ]}
              showXAxis
              showYAxis
              showGrid
              height={180}
            />
          }
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
    </div>
  );
}
