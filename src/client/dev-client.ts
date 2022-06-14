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
  EdgeEvent<any>[]
>();

export const devClient = (token: string, applicationId: bigint): Bot => {
  return createBot({
    token,
    intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
    botId: applicationId,
  });
};
