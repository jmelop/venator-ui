# Venator — React UI Infrastructure

Venator is a React + TypeScript UI infrastructure for building modern web interfaces, internal tools, dashboards and AI-assisted applications.

The goal of Venator is not to provide hundreds of components, but a small set of well-structured building blocks that can be used to construct real application interfaces.

## Overview

Venator focuses on clear architecture and reusable primitives rather than a large component catalog.

The library is designed to support:

- dashboards and data tools
- admin panels and internal applications
- data-driven interfaces
- AI-assisted workflows

## Architecture

Venator is structured as a monorepo using npm workspaces.

```
venator/
├── apps/
│   └── docs/              # Next.js documentation and playground
├── packages/
│   ├── tokens/            # Design tokens (colors, spacing, typography)
│   ├── ui/                # Core UI components
│   └── patterns/          # Higher-level layouts and UI patterns
```

### Packages

**@venator/tokens**

Design tokens shared across the system.

Examples:

- colors
- spacing
- typography
- radius
- shadows

**@venator/ui**

Core UI components used to build application interfaces.

Examples:

- Button
- Card
- Input
- Badge

**@venator/patterns**

Higher-level UI structures built using the base components.

Examples:

- DashboardLayout
- PageHeader
- StatCard
- ActivityFeed

These patterns are designed to simplify building real application screens.

## Getting Started

### Requirements

- Node.js >= 18
- npm >= 7

### Install dependencies

```bash
npm install
```

### Development

```bash
# Run docs site (http://localhost:3000)
npm run dev

# Build all packages
npm run build

# Type check all packages
npm run type-check

# Lint all packages
npm run lint

# Clean build artifacts
npm run clean
```

## Example

```tsx
import { Button } from "@venator/ui";
import { DashboardLayout } from "@venator/patterns";

function App() {
  return (
    <DashboardLayout
      sidebar={<Navigation />}
      header={<Header />}
    >
      <Button variant="primary">Click me</Button>
    </DashboardLayout>
  );
}
```

---

## Design Goals

Venator is built around a few simple principles:

**Small but extensible**

Focus on a minimal set of primitives and components that can scale into larger interfaces.

**Clear separation**

Tokens, components and UI patterns are separated to keep the architecture maintainable.

**Application-first**

Components are designed to support real interfaces such as dashboards, tools and data applications.

**Type-safe**

All packages are written in TypeScript.

---

## License

MIT
