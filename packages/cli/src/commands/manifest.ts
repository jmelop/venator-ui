import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import { buildManifest } from '../manifest';
import { renderManifest } from '../manifest/render';
import { resolveTargetFilename } from '../manifest/targets';

interface ManifestOptions {
  target?: string;
  force?: boolean;
}

export async function manifestCommand(options: ManifestOptions = {}): Promise<void> {
  let filename: string;
  try {
    filename = resolveTargetFilename(options.target);
  } catch (err) {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  }

  const destination = path.resolve(process.cwd(), filename);

  if ((await fs.pathExists(destination)) && !options.force) {
    console.error(
      pc.red(`${filename} already exists.`) +
        pc.white(' It may contain your own rules — re-run with ') +
        pc.cyan('--force') +
        pc.white(' to overwrite.'),
    );
    process.exit(1);
  }

  let markdown: string;
  try {
    markdown = renderManifest(buildManifest());
  } catch (err) {
    console.error(
      pc.red(
        `Could not build the manifest: ${err instanceof Error ? err.message : String(err)}`,
      ) + pc.white('\nIs @venator-ui/ui installed in this project?'),
    );
    process.exit(1);
  }

  await fs.writeFile(destination, markdown, 'utf8');

  const rel = path.relative(process.cwd(), destination) || filename;
  console.log(pc.green(`✓ Wrote Venator manifest to ${rel}`));
}
