import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';

const SUPPORTED_ARCHETYPES = ['dashboard', 'admin'] as const;
type Archetype = (typeof SUPPORTED_ARCHETYPES)[number];

function isSupportedArchetype(name: string): name is Archetype {
  return (SUPPORTED_ARCHETYPES as readonly string[]).includes(name);
}

const TEMPLATES_DIR = path.resolve(__dirname, '../../archetypes/templates');

export async function initCommand(archetype: string): Promise<void> {
  if (!isSupportedArchetype(archetype)) {
    console.error(
      pc.red(
        `Unknown archetype "${archetype}". Supported archetypes: ${SUPPORTED_ARCHETYPES.join(', ')}`,
      ),
    );
    process.exit(1);
  }

  try {
    const { dest } = await prompts({
      type: 'text',
      name: 'dest',
      message: `Where do you want to deploy the ${archetype}? (relative path)`,
      initial: `./${archetype}`,
    });

    if (!dest) {
      process.exit(0);
    }

    const destination = path.resolve(process.cwd(), dest);

    if (await fs.pathExists(destination)) {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${dest} already exists. Overwrite?`,
        initial: false,
      });

      if (!overwrite) {
        process.exit(0);
      }
    }

    const templateDir = path.join(TEMPLATES_DIR, archetype);
    await fs.copy(templateDir, destination);

    const rel = path.relative(process.cwd(), destination);
    console.log();
    console.log(pc.green(`✓ Dashboard deployed to ${rel}`));
    console.log();
    console.log(`  next steps:`);
    console.log(`    cd ${rel}`);
    console.log(`    npm install`);
    console.log(`    npm run dev`);
    console.log();
  } catch (err) {
    console.error(pc.red(`Error: ${err instanceof Error ? err.message : String(err)}`));
    process.exit(1);
  }
}
