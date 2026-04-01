import { Card, CardContent, CardHeader } from '@venator/ui';
import { ModuleGrid, PageHeader } from '@venator/patterns';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your workspace."
      />
      <ModuleGrid>
        <Card>
          <CardHeader title="Module one" description="Placeholder content" />
          <CardContent className="mt-4">
            <p className="text-sm text-neutral-500">Your content goes here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Module two" description="Placeholder content" />
          <CardContent className="mt-4">
            <p className="text-sm text-neutral-500">Your content goes here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Module three" description="Placeholder content" />
          <CardContent className="mt-4">
            <p className="text-sm text-neutral-500">Your content goes here.</p>
          </CardContent>
        </Card>
      </ModuleGrid>
    </div>
  );
}
