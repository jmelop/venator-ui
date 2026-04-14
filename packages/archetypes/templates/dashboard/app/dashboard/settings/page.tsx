import { PageHeader } from '@venator-ui/patterns';
import { Card, CardContent, CardHeader, Input, Label, Button, Separator } from '@venator-ui/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your workspace preferences." />
      <Card>
        <CardHeader title="General" description="Basic workspace settings." />
        <CardContent className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="app-name">Application name</Label>
            <Input id="app-name" placeholder="My App" defaultValue="My App" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="app-url">Application URL</Label>
            <Input id="app-url" placeholder="https://myapp.com" />
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button variant="primary" size="sm">Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
