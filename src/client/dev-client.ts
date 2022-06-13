import {
  Bot,
  Collection,
  createBot,
  GatewayIntents,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";
import { Command } from "./command.ts";
import { ClientEvents } from "./event.ts";

export const devCommandCache = new Collection<string, Command>();

export const devEventCache = new Collection<keyof ClientEvents, Event[]>();

export const devClient = (token: string, applicationId: bigint): Bot => {
  return createBot({
    token,
    intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
    botId: applicationId,
  });
};
