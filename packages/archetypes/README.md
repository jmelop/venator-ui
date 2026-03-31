# @venator/archetypes

Complete application architectures deployed via the Venator CLI and owned entirely by the developer — not installed as a dependency.

Each archetype is a full project scaffold: components, layouts, pages and configuration wired together and ready to extend.

## Planned archetypes

- **dashboard** — Modular admin dashboard with sidebar navigation, header and a grid-based module system
- **landing** — Marketing landing page with hero, features section, and footer
- **blog** — Content site with index and post pages, MDX support, and navigation

## Usage

Archetypes are deployed via the CLI, not imported as a package:

```bash
npx venator new dashboard
```

The CLI copies the archetype files into your project. You own the code from that point forward.
