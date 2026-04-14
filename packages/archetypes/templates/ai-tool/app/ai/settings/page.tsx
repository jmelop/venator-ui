import { Button, Card, CardContent, Input, Label, Select, Separator } from '@venator-ui/ui';
import { PageHeader } from '@venator-ui/patterns';

export default function SettingsPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Configure your AI assistant preferences."
      />

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="model-select">Model</Label>
              <Select id="model-select" defaultValue="gpt-4o">
                <option value="gpt-4o">GPT-4o</option>
                <option value="claude-3.5">Claude 3.5</option>
                <option value="gemini-1.5">Gemini 1.5</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                defaultValue="0.7"
                min="0"
                max="2"
                step="0.1"
              />
            </div>

            <Separator />

            <div>
              <Button variant="primary">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
