import { Client } from 'discord.js';

export interface EdgeClient {
  client: Client;
}

export const defaultClient = (): EdgeClient => {
  // TODO: Automatically determine intents based on events the developer is using.
  const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
  });

  return {
    client
  };
};
