#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('venator')
  .version('0.1.0')
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

program.parse();
