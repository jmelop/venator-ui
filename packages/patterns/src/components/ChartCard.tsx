import * as React from 'react';
import { Card, CardContent, CardHeader } from '@venator-ui/ui';

export interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, description, chart, action, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader title={title} description={description} action={action} />
      <CardContent className="mt-4">
        {chart}
      </CardContent>
    </Card>
  );
}
