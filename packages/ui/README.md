# @venator/ui

Core UI components for the Venator library.

## Installation

```bash
npm install @venator/ui
```

## Components

### Button

A foundational button component with multiple variants and sizes.

```tsx
import { Button } from '@venator/ui';

<Button variant="primary" size="md">
  Click me
</Button>
```

#### Props

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `fullWidth`: `boolean` (default: `false`)

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```
