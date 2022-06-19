import {
  addEvent,
  devClient,
  devCommandCache,
  devEventCache,
} from "../client/dev-client.ts";
import { startBot } from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";
import { ClientEvents, EdgeEvent } from "../client/event.ts";
import { bundleFiles } from "./bundler.ts";
import { startHmr } from "./hmr.ts";

const startupHandler: EdgeEvent<"ready"> = (bot) => {
  console.log(`Successfully logged into ${bot.id}`);
};

const commandHandler: EdgeEvent<"interactionCreate"> = async (
  bot,
  interaction,
) => {
  if (!interaction.data) return;
  if (interaction.type !== 2) return; // comparing to InteractionTypes.ApplicationCommand seems broken

  const commandName = interaction.data.name;
  const command = devCommandCache.get(commandName);

  if (!command) return;
  await command?.(bot, interaction);
};

export const startServer = async (token: string, applicationId: bigint) => {
  await bundleFiles();

  const bot = devClient(token, applicationId);

  addEvent("ready", startupHandler);
  addEvent("interactionCreate", commandHandler);

  for (const [event, handlers] of devEventCache) {
    bot.events[event] = function () {
      const args: ClientEvents[typeof event][] = Array.from(arguments);

      for (const handler of handlers) {
        handler(...args);
      }
    };
  }

  console.log(
    `Successfully loaded ${devCommandCache.size} commands`,
  );

  console.log(
    `Successfully loaded ${devEventCache.size} events`,
  );

  await startBot(bot);
  await startHmr(["commands", "events"]);
};
