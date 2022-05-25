#!/usr/bin/env node
import arg from 'arg';
import { server } from '../server';

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

if (command === 'dev') {
  server().catch(console.error);
}

// Allow for graceful termination
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
