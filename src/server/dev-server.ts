import { devClient, devEventCache } from "../client/dev-client.ts";
import { startBot } from "https://deno.land/x/discordeno@13.0.0-rc45/bot.ts";
import { ClientEvents, EdgeEvent } from '../client/event.ts';

const readyEvent: EdgeEvent<'ready'> = (bot) => {
  console.log(`Successfully logged into ${bot.id}`)
}

export const startServer = async (token: string, applicationId: bigint) => {
  const bot = devClient(token, applicationId);

  devEventCache.set('ready', [readyEvent]);

  for (const [event, handlers] of devEventCache) {
    bot.events[event] = function() {
      const args: ClientEvents[typeof event][] = Array.from(arguments);

      for (const handler of handlers) {
        handler(...args);
      }
    };
  }

  await startBot(bot);
};
