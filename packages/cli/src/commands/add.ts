import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';

const PATTERNS_MAP = {
  'dashboard-layout': 'layouts/DashboardLayout.tsx',
  'page-header': 'components/PageHeader.tsx',
  'module-grid': 'components/ModuleGrid.tsx',
  'sidebar-nav': 'components/SidebarNav.tsx',
  'topbar': 'components/Topbar.tsx',
  'stat-card': 'components/StatCard.tsx',
} as const;

type PatternSlug = keyof typeof PATTERNS_MAP;

function isKnownPattern(name: string): name is PatternSlug {
  return name in PATTERNS_MAP;
}

const PATTERNS_SRC_DIR = path.resolve(__dirname, '../../patterns/src');

export async function addCommand(pattern: string): Promise<void> {
  if (!isKnownPattern(pattern)) {
    const available = Object.keys(PATTERNS_MAP).join(', ');
    console.error(pc.red(`Unknown pattern "${pattern}". Available patterns: ${available}`));
    process.exit(1);
  }

  try {
    const { dest } = await prompts({
      type: 'text',
      name: 'dest',
      message: 'Where do you want to add the pattern? (relative path)',
      initial: './src/components/patterns',
    });

    if (!dest) {
      process.exit(0);
    }

    const destination = path.resolve(process.cwd(), dest);
    await fs.ensureDir(destination);

    const sourceFile = path.join(PATTERNS_SRC_DIR, PATTERNS_MAP[pattern]);
    const fileName = path.basename(PATTERNS_MAP[pattern]);
    await fs.copy(sourceFile, path.join(destination, fileName));

    const rel = path.relative(process.cwd(), destination);
    const componentName = fileName.replace(/\.tsx$/, '');
    const importPath = rel.replace(/\\/g, '/').replace(/^(?!\.)/, './');

    console.log();
    console.log(pc.green(`✓ ${componentName} added to ${rel}`));
    console.log();
    console.log(`  import hint:`);
    console.log(`    import { ${componentName} } from '${importPath}/${componentName}';`);
    console.log();
  } catch (err) {
    console.error(pc.red(`Error: ${err instanceof Error ? err.message : String(err)}`));
    process.exit(1);
  }
}
