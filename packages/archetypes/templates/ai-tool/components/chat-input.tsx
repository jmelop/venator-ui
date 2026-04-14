'use client';

import { useState } from 'react';
import { Button } from '@venator-ui/ui';

export function ChatInput({ onSubmit }: { onSubmit?: (value: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-3 items-end">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything..."
        rows={3}
        className="flex-1 resize-none rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <Button variant="primary" onClick={() => { onSubmit?.(value); setValue(''); }}>
        Submit
      </Button>
    </div>
  );
}
