/**
 * Runnable check for the manifest data core.
 *
 * Prints `buildManifest()` as JSON so the real output can be inspected.
 * Run with: `npm run manifest --workspace=@venator-ui/cli`
 */
import { buildManifest } from './index';

const manifest = buildManifest();

process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);

const propCount = manifest.components.reduce((sum, c) => sum + c.props.length, 0);
const exampleCount = manifest.components.filter((c) => c.example).length;

process.stderr.write(
  `\n✔ venator manifest (v${manifest.version}): ` +
    `${manifest.tokens.length} token groups, ` +
    `${manifest.components.length} components ` +
    `(${propCount} props, ${exampleCount} examples), ` +
    `${manifest.presetFlags.length} preset flags\n`,
);

