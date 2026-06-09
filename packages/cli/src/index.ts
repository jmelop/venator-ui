#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join } from 'path';
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { manifestCommand } from './commands/manifest';

// works from both src/ (tsx) and dist/ (tsup CJS build)
const { version } = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
) as { version: string };

const program = new Command();

program
  .name('venator')
  .version(version)
  .description('CLI for deploying Venator archetypes and patterns');

program
  .command('init <archetype>')
  .description('Deploy a complete application architecture into the current directory')
  .option('--theme <theme>', 'Set the default theme (obsidian | obsidian-light | slate | slate-light)', 'obsidian')
  .action((archetype: string, options: { theme: string }) => {
    initCommand(archetype, options.theme).catch((err: unknown) => {
      console.error(err);
      process.exit(1);
    });
  });

program
  .command('add <pattern>')
  .description('Add a single Venator pattern to your project')
  .action((pattern: string) => {
    addCommand(pattern).catch((err: unknown) => {
      console.error(err);
      process.exit(1);
    });
  });

program
  .command('manifest')
  .description('Generate an AI context manifest describing the Venator library')
  .option('--target <target>', 'Output convention (claude | cursor | agents); defaults to venator.md')
  .option('--force', 'Overwrite the output file if it already exists')
  .action((options: { target?: string; force?: boolean }) => {
    manifestCommand(options).catch((err: unknown) => {
      console.error(err);
      process.exit(1);
    });
  });

program.parse();
