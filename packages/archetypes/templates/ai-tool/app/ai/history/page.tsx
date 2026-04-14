import { Card, CardContent, Separator } from '@venator-ui/ui';
import { PageHeader } from '@venator-ui/patterns';

const historyItems = [
  { id: 1, title: 'What are the key principles of good software architecture?', timestamp: 'Today at 14:32' },
  { id: 2, title: 'Explain the difference between REST and GraphQL', timestamp: 'Today at 11:05' },
  { id: 3, title: 'How do I optimise a slow SQL query with joins?', timestamp: 'Yesterday at 18:47' },
  { id: 4, title: 'Write a TypeScript utility type for deep partial objects', timestamp: 'Yesterday at 09:14' },
  { id: 5, title: 'Summarise the CAP theorem in simple terms', timestamp: '12 Apr at 16:22' },
];

export default function HistoryPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <PageHeader
        title="History"
        description="Your previous prompts and sessions."
      />

      <Card>
        <CardContent>
          {historyItems.map((item, index) => (
            <div key={item.id}>
              <div className="py-3">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.timestamp}</p>
              </div>
              {index < historyItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
