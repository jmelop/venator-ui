'use client';

import { Button, ToastProvider, useToast } from '@venator/ui';

function ToastTriggers() {
  const { toast } = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: 'Note', variant: 'default' })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: 'Saved successfully', variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: 'Proceed with caution', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast({ title: 'Something went wrong', variant: 'error' })}
      >
        Error
      </Button>
    </div>
  );
}

export function ToastExample() {
  return (
    <ToastProvider>
      <ToastTriggers />
    </ToastProvider>
  );
}
