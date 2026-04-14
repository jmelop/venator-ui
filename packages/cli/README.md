# @venator-ui/cli

CLI for deploying Venator archetypes and patterns into your project.

## Commands

### `venator init <archetype>`

Deploys a complete application architecture into the current directory. The files are copied into your project and are fully owned by you — there is no runtime dependency on `@venator-ui/cli` after deployment.

```bash
venator init dashboard
```

### `venator add <pattern>`

Adds a single Venator pattern to your project.

```bash
venator add DashboardLayout
venator add PageHeader
venator add ModuleGrid
```

## Usage

```bash
# Run directly without installing
npx venator init dashboard

# Or install globally
npm install -g @venator-ui/cli
venator init dashboard
venator add PageHeader
```
