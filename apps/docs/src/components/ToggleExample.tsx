'use client';

import { useState } from 'react';
import { Toggle } from '@venator/ui';

export function ToggleExample() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Bold
      </Toggle>
      <span className="text-sm text-neutral-500">
        {pressed ? 'On' : 'Off'}
      </span>
    </div>
  );
}
