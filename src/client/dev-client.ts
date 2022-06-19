import {
  Bot,
  Collection,
  createBot,
  GatewayIntents,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";
import { EdgeCommand } from "./command.ts";
import { ClientEvents, EdgeEvent } from "./event.ts";

export const devCommandCache = new Collection<string, EdgeCommand>();

export const devEventCache = new Collection<
  keyof ClientEvents,
  // deno-lint-ignore no-explicit-any
  EdgeEvent<any>[]
>();

export const addEvent = (
  event: keyof ClientEvents,
  // deno-lint-ignore no-explicit-any
  handler: EdgeEvent<any>,
) => {
  if (!devEventCache.has(event)) {
    devEventCache.set(event, [handler]);
  } else {
    devEventCache.get(event)!.push(handler);
  }
};

export const devClient = (token: string, applicationId: bigint): Bot => {
  return createBot({
    token,
    intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
    botId: applicationId,
  });
};
