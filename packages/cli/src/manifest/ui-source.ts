/**
 * Locates the installed `@venator-ui/ui` package and reads its bundled type
 * declarations. We deliberately read `dist/index.d.ts` (not the monorepo
 * `src/`) because that is the only artifact the package ships, and tsup
 * preserves JSDoc + every prop interface in it — so the manifest works the
 * same whether run in-repo or from a consumer project.
 */
import * as fs from 'fs';
import * as path from 'path';

interface UiPackage {
  /** Absolute path to the package root. */
  dir: string;
  /** Version string from the package's package.json. */
  version: string;
  /** Absolute path to the bundled declaration file. */
  dtsPath: string;
}

let cachedPackage: UiPackage | null = null;
let cachedDeclarations: string | null = null;

/**
 * Resolves `@venator-ui/ui` via its `require` entry point and derives the
 * package root from there, sidestepping `exports` restrictions on reading
 * `package.json` directly.
 */
export function resolveUiPackage(): UiPackage {
  if (cachedPackage) return cachedPackage;

  const entry = require.resolve('@venator-ui/ui'); // .../@venator-ui/ui/dist/index.js
  const distDir = path.dirname(entry);
  const dir = path.dirname(distDir);

  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(dir, 'package.json'), 'utf8'),
  ) as { version?: string; types?: string };

  const typesRel = pkgJson.types ?? 'dist/index.d.ts';

  cachedPackage = {
    dir,
    version: pkgJson.version ?? '0.0.0',
    dtsPath: path.join(dir, typesRel),
  };
  return cachedPackage;
}

/** Reads (and memoizes) the bundled `dist/index.d.ts` contents. */
export function readUiDeclarations(): string {
  if (cachedDeclarations !== null) return cachedDeclarations;
  const { dtsPath } = resolveUiPackage();
  cachedDeclarations = fs.readFileSync(dtsPath, 'utf8');
  return cachedDeclarations;
}
