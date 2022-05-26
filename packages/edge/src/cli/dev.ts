#!/usr/bin/env node
import arg from 'arg';
import { server } from '../server';

export const dev = (argv: string[]) => {
  const validArgs = {
    '--token': String,
    '-t': '--token'
  };

  let args;
  try {
    args = arg(validArgs, { argv });
  } catch (e) {
    console.warn('Invalid arguments.');
    process.exit(0);
  }

  // check to see if discord token is set
  if (!args['--token'] && !('DISCORD_TOKEN' in process.env)) {
    console.warn(
      '-t or DISCORD_TOKEN is not set. Please use -t argument or set DISCORD_TOKEN environment variable.'
    );
    process.exit(0);
  }

  const token = args['--token'] || (process.env.DISCORD_TOKEN as string);

  // start server
  server(token).catch(console.error);
};
