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
        className="flex-1 resize-none rounded-lg border border-[var(--border-subtle)] bg-bg-1 px-4 py-3 text-sm text-fg placeholder:text-fg-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />
      <Button variant="primary" onClick={() => { onSubmit?.(value); setValue(''); }}>
        Submit
      </Button>
    </div>
  );
}
