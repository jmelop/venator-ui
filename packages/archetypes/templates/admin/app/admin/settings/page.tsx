import { PageHeader } from '@venator/patterns';
import { Button, Card, CardContent, CardHeader, Input, Label, Separator } from '@venator/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your organization preferences." />
      <Card>
        <CardHeader title="General" description="Basic organization settings." />
        <CardContent className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="org-name">Organization name</Label>
            <Input id="org-name" placeholder="Acme Inc." defaultValue="Acme Inc." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="org-email">Email</Label>
            <Input id="org-email" type="email" placeholder="admin@acme.com" defaultValue="admin@acme.com" />
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
