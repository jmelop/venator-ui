import { Card, CardContent } from '@venator-ui/ui';

export function ChatMessage({ content }: { content: string }) {
  return (
    <Card className="w-full">
      <CardContent className="pt-4">
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}
