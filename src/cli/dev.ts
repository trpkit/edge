import { Args } from "https://deno.land/std/flags/mod.ts";
import {
  createBot,
  GatewayIntents,
  startBot,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";

export const dev = (argv: Args) => {
  if (!argv["token"] && !Deno.env.get("DISCORD_TOKEN")) {
    console.warn(
      "Please provide a token using the --token flag or DISCORD_TOKEN environment variable.",
    );
    Deno.exit();
  }

  if (!argv["applicationId"] && !Deno.env.get("DISCORD_APPLICATION_ID")) {
    console.warn(
      "Please provide an applicationId using the --applicationId flag or DISCORD_APPLICATION_ID environment variable.",
    );
    Deno.exit();
  }

  const token = argv["token"] || Deno.env.get("DISCORD_TOKEN");
  const applicationId = argv["applicationId"] ||
    Deno.env.get("DISCORD_APPLICATION_ID");

  // TODO: Move this to separate file
  const bot = createBot({
    token,
    intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
    botId: applicationId,
    events: {
      ready() {
        console.log("Successfully connected to gateway");
      },
    },
  });

  startBot(bot).catch(console.error);
};
