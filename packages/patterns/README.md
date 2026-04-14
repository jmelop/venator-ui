# @venator-ui/patterns

Higher-level UI patterns and compositions for the Venator library.

## Installation

```bash
npm install @venator-ui/patterns
```

## Patterns

### DashboardLayout

A foundational dashboard layout with sidebar and header.

```tsx
import { DashboardLayout } from '@venator-ui/patterns';

<DashboardLayout
  sidebar={<Navigation />}
  header={<Header />}
>
  <DashboardContent />
</DashboardLayout>
```

#### Props

- `sidebar`: `React.ReactNode` - Content for the sidebar
- `header`: `React.ReactNode` - Content for the header
- `children`: `React.ReactNode` - Main content area
- `sidebarCollapsed`: `boolean` (default: `false`) - Whether the sidebar should be collapsed

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```
