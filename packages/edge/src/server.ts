import { defaultClient } from './client';
import { readdirSync, existsSync } from 'node:fs';
import { Collection } from 'discord.js';
import { Command } from './command';

const findFiles = (dir: string) => {
  return readdirSync(dir, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);
};

export const server = async (token: string) => {
  const { client } = defaultClient();

  const commands = new Collection<string, Command>();

  // get working dir
  const workingDir = process.cwd();

  let eventFiles: string[] | null = null;
  let commandFiles: string[] | null = null;

  if (existsSync(`${workingDir}/events`)) {
    eventFiles = findFiles(`${workingDir}/events`);
  } else {
    console.debug('No events directory found. Skipping...');
  }

  if (existsSync(`${workingDir}/commands`)) {
    commandFiles = findFiles(`${workingDir}/commands`);
  } else {
    console.debug('No commands directory found. Skipping...');
  }

  // load commands
  if (commandFiles) {
    for (const file of commandFiles) {
      // TODO: Look into supporting ts files, will require compiling - possibly esbuild or swc?
      const parts = file.split('.');

      if (!(parts.length === 2 && parts[1] === 'js')) {
        continue;
      }

      const command = (await import(`${workingDir}/commands/${parts[0]}`))
        .default;

      if (!('options' in command)) continue;
      if (typeof command !== 'function') continue;

      // TODO: Add some validation here, such as illegal command names, if the command is already registered, etc.
      commands.set(command.options.name, command);

      console.log(
        `Found '${command.options.name}' command and successfully loaded it.`
      );
    }
  }

  // register basic slash command handler
  if (commands.size > 0) {
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
      if (!interaction.inCachedGuild()) return;

      const command = commands.get(interaction.commandName.toLowerCase());
      if (!command) return;

      await command?.(client, interaction);
    });

    console.debug('Enabling slash command handler for commands.');
  }

  await client.login(token);
};
