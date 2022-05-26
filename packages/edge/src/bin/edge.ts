#!/usr/bin/env node
import arg from 'arg';

// ensure discord.js is installed
try {
  require.resolve('discord.js');
} catch (err) {
  console.warn(
    'Discord.js is not installed. Please run `npm install discord.js`'
  );
}

const args = arg(
  {
    '--version': Boolean,
    '-v': '--version'
  },
  {
    permissive: true
  }
);

if (args['--version']) {
  console.log(`Edge v${require('../../package.json').version}`);
  process.exit(0);
}

const command = args._[0];
const commandArgs = args._.slice(1);

// available commands
const commands: { [command: string]: () => Promise<(argv: string[]) => void> } =
  {
    dev: () => Promise.resolve(require('../cli/dev').dev)
  };

// allow for graceful termination
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));

// execute command
commands[command]().then((c) => c(commandArgs));
