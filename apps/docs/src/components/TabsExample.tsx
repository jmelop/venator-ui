'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@venator-ui/ui';

export function TabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p className="text-sm text-neutral-600">
          The overview shows a high-level summary of your project's current status, recent activity,
          and key metrics at a glance.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p className="text-sm text-neutral-600">
          Analytics provides detailed breakdowns of usage trends, performance data, and user
          behaviour over the selected time period.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <p className="text-sm text-neutral-600">
          Settings lets you configure project preferences, manage team access, and update
          notification rules for this workspace.
        </p>
      </TabsContent>
    </Tabs>
  );
}
