'use client';

import { useState } from 'react';
import { Switch } from '@venator-ui/ui';

export function SwitchExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm text-neutral-500">{checked ? 'On' : 'Off'}</span>
    </div>
  );
}
