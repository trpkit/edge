import { Client, ClientEvents } from 'discord.js';

export interface Event<E extends keyof ClientEvents> {
  /**
   * Event execution
   *
   * @param client The Discord.js client
   * @param args The arguments passed to the event
   */
  (client: Client, ...args: ClientEvents[E]): Promise<unknown> | unknown;
}
