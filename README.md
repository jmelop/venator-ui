# Venator — React Frontend System

Venator is a React + TypeScript frontend system designed to enable scalable, consistent, and maintainable application architectures.

It can be adopted at any level — as a UI component library, as a set of structural patterns, or as a complete frontend architecture system.

At its core, Venator combines UI primitives built on design tokens, compositional patterns that define how UI is structured, and deployable application architectures scaffolded via CLI and fully owned by the developer.

## Overview

Venator is built for teams and developers who need rapid setup with architectural discipline — not just a fast start, but a foundation that stays consistent as the codebase and team grow.

It standardizes structural decisions that are otherwise made differently on every project — including design tokens, component primitives, and layout conventions. This reduces inconsistency across teams, lowers the cost of onboarding new developers, and makes it easier to maintain multiple applications that share the same architecture.

Start with components. Scale with patterns. Standardize with architecture.

Designed for:

- dashboards and internal tools
- admin panels and data-driven interfaces
- projects with rapidly evolving requirements where maintaining structural consistency is critical
- multi-team environments where structural consistency matters
- large-scale frontend applications with multiple surfaces
- any project where you want structure without repeatedly solving the same architectural problems

Venator reduces the cost of building and maintaining frontend systems by making architectural decisions explicit, reusable, and consistent across projects.

## Architecture

Venator is a monorepo using npm workspaces. The packages form a deliberate dependency chain:

tokens → ui → patterns → archetypes

- **tokens** define the design system foundation
- **ui** provides accessible and composable primitives
- **patterns** define reusable structural composition
- **archetypes** assemble everything into deployable application architectures

This layered approach allows Venator to be used incrementally — from individual components to full application structures — while maintaining consistency across projects.

The same conventions apply across every application built on Venator, making it straightforward to move between projects or onboard developers who are already familiar with the system.

```
venator/
├── apps/
│   └── docs/              # Next.js documentation site
├── packages/
│   ├── tokens/            # Design tokens (colors, spacing, typography)
│   ├── ui/                # UI component primitives
│   ├── patterns/          # Structural layouts and UI patterns
│   └── archetypes/        # Complete application architectures (CLI-deployed)
```

### Packages

**@venator-ui/tokens**

Design tokens shared across all layers. Consumed by `@venator-ui/ui` and available as a Tailwind preset.

- colors, spacing, typography, radius, shadows, breakpoints
- `venatorPreset` for `tailwind.config.js`

**@venator-ui/ui**

UI primitives built with Tailwind CSS and design tokens. Typed, composable, accessible.

- Button, Card, Input, Label, Badge, Avatar, Modal, Table, Tabs, Toast, Tooltip, and more

**@venator-ui/patterns**

Structural patterns that define how UI is composed into pages and views. Not full pages — architectural abstractions you fill with your own content.

- `DashboardLayout` — sidebar + header shell, responsive (static on desktop, drawer on mobile)
- `PageHeader` — consistent page title area with description, breadcrumb, and actions slots
- `ModuleGrid` — responsive CSS grid for dashboard modules

**@venator-ui/archetypes**

Complete application architectures deployed via the Venator CLI and owned entirely by the developer. Not installed as a dependency — files are copied into your project and are yours to extend.

- `dashboard` — modular dashboard with sidebar navigation, header, and grid-based module system
- `landing` — marketing landing page with hero, features section, and footer *(planned)*
- `blog` — content site with MDX support, index and post pages *(planned)*

## Three layers

**1. @venator-ui/ui — UI primitives**

Accessible, composable component primitives. Install as a dependency, import directly, extend with `className`.

**2. @venator-ui/patterns — Structural patterns**

Reusable structural abstractions that define how UI is composed into layouts. Use as a dependency or as a reference for your own patterns.

**3. @venator-ui/archetypes — Application architectures**

Complete project scaffolds deployed via CLI. Once deployed, the developer owns the code. No runtime dependency on `@venator-ui/archetypes`.

## CLI

```bash
# Deploy a complete architecture into your project
npx venator init dashboard

# Install UI primitives and patterns as dependencies
npm install @venator-ui/ui @venator-ui/patterns @venator-ui/tokens
```

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
import { Button, Card, CardContent, CardHeader } from "@venator-ui/ui";
import { DashboardLayout, PageHeader } from "@venator-ui/patterns";

function App() {
  return (
    <DashboardLayout
      sidebar={<Navigation />}
      header={<Header />}
    >
      <PageHeader title="Dashboard" description="Welcome back." />
      <Card>
        <CardHeader title="Overview" />
        <CardContent>
          <Button variant="primary">Get started</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
```

---

## Design Goals

- Three-layer architecture: primitives, patterns, archetypes — each independently adoptable.
- One-directional dependency chain: tokens → ui → patterns → archetypes.
- All packages written in TypeScript with strict mode enabled.
- Patterns define structure only — no content, no opinions on what goes inside.
- Archetypes are deployed, not imported — the developer owns the output.
- Compatible with generative UI tools (v0, Lovable) as a structural target for generated components.

---

## License

MIT
