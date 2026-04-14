'use client';

import { useState } from 'react';
import { Topbar } from '@venator-ui/patterns';
import { Button } from '@venator-ui/ui';

export function Header() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };
  return (
    <Topbar
      right={
        <Button variant="ghost" size="sm" onClick={toggleDark}>
          {dark ? '☀️' : '🌙'}
        </Button>
      }
    />
  );
}
