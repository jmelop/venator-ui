import path from 'path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';

const SUPPORTED_ARCHETYPES = ['dashboard', 'admin', 'ai-tool'] as const;
type Archetype = (typeof SUPPORTED_ARCHETYPES)[number];

function isSupportedArchetype(name: string): name is Archetype {
  return (SUPPORTED_ARCHETYPES as readonly string[]).includes(name);
}

function createSpinner(message: string): () => void {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  process.stdout.write('\n');
  const interval = setInterval(() => {
    process.stdout.write(`\r${pc.cyan(frames[i++ % frames.length])} ${message}`);
  }, 80);
  return () => {
    clearInterval(interval);
    process.stdout.write('\r\x1b[K');
  };
}

export async function initCommand(archetype: string): Promise<void> {
  let templatesDir: string;
  try {
    templatesDir = path.resolve(
      path.dirname(require.resolve('@venator-ui/archetypes/package.json')),
      'templates'
    );
  } catch {
    console.error(pc.red('Could not locate @venator-ui/archetypes. Run npm install first.'));
    process.exit(1);
  }

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
      const entries = await fs.readdir(destination);
      if (entries.length > 0) {
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'Directory already exists. Overwrite? (y/N)',
          initial: false,
        });

        if (!overwrite) {
          console.log(pc.white('Aborted.'));
          process.exit(0);
        }
      }
    }

    const stopSpinner = createSpinner('Copying files...');
    const templateDir = path.join(templatesDir, archetype);
    await fs.copy(templateDir, destination);
    stopSpinner();

    const rel = path.relative(process.cwd(), destination);
    console.log(pc.green(`✓ ${archetype} deployed to ${rel}`));
    console.log();
    console.log(pc.white('  Next steps:'));
    console.log(`    ${pc.cyan(`cd ${rel}`)}`);
    console.log(`    ${pc.cyan('npm install')}`);
    console.log(`    ${pc.cyan('npm run dev')}`);
    console.log();
  } catch (err) {
    console.error(pc.red(`Error: ${err instanceof Error ? err.message : String(err)}`));
    process.exit(1);
  }
}
