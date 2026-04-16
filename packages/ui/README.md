# @venator-ui/ui

Typed React UI primitives built on Tailwind CSS. Dark mode supported.

## Installation

```bash
npm install @venator-ui/ui
```

## Components

Alert, Avatar, Badge, Breadcrumb, Button, Card, CodeBlock, Input, Label, Modal, Nav, Select, Separator, Skeleton, Switch, Table, Tabs, Toast, Toggle, Tooltip

## Usage

```tsx
import { Button, Card, CardContent, Badge } from '@venator-ui/ui';

export function Example() {
  return (
    <Card>
      <CardContent>
        <Badge variant="success">Live</Badge>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## Requirements

- React 18+
- Tailwind CSS 3+ configured with `@venator-ui/tokens` preset
- Next.js App Router: components include `'use client'` and work out of the box

## Docs

[venator-ui-docs.vercel.app](https://venator-ui-docs.vercel.app)
