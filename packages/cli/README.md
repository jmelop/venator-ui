# @venator-ui/cli

CLI for deploying full application architectures and composing your UI system.

Scaffold a complete app or add individual patterns in seconds.

## Usage

```bash
# Deploy a complete application architecture
npx @venator-ui/cli init dashboard
npx @venator-ui/cli init admin
npx @venator-ui/cli init ai-tool

# Add a single pattern to an existing project
npx @venator-ui/cli add dashboard-layout
npx @venator-ui/cli add page-header
npx @venator-ui/cli add sidebar-nav
npx @venator-ui/cli add topbar
npx @venator-ui/cli add stat-card
npx @venator-ui/cli add module-grid
```

## Themes

Deploy an archetype with a specific theme using the `--theme` flag:

```bash
npx @venator-ui/cli init dashboard --theme slate
npx @venator-ui/cli init dashboard --theme obsidian-light
```

Available themes:

| Theme | Description |
|---|---|
| `obsidian` | Obsidian Dark — default, no attribute injected |
| `obsidian-light` | Obsidian Light |
| `slate` | Slate Dark |
| `slate-light` | Slate Light |

If `--theme` is omitted, the archetype deploys with Obsidian Dark.

## After deploying an archetype

```bash
cd my-app
npm install
npm run dev
```

Your project is now ready to run locally.

## Docs

[www.venatorui.com](https://www.venatorui.com)
