# @venator-ui/patterns

Structural layout compositions for React applications. Built on top of `@venator-ui/ui`.

## Installation

```bash
npm install @venator-ui/patterns
```

## Patterns

- `DashboardLayout` — full-screen layout with collapsible sidebar and header slot
- `SidebarNav` — composable sidebar navigation with sections and active state
- `Topbar` — top navigation bar with left, center and right slots
- `PageHeader` — page title, description, actions and breadcrumb slots
- `ModuleGrid` — responsive CSS grid for dashboard modules
- `StatCard` — KPI card with trend indicator and variant accents

## Usage

```tsx
import { DashboardLayout, SidebarNav, PageHeader } from '@venator-ui/patterns';

export default function App() {
  return (
    <DashboardLayout
      sidebar={<SidebarNav sections={sections} pathname={pathname} />}
      header={<Header />}
    >
      <PageHeader title="Dashboard" description="Welcome back." />
    </DashboardLayout>
  );
}
```

## Docs

[venator-ui-docs.vercel.app/docs/patterns](https://venator-ui-docs.vercel.app/docs/patterns)
