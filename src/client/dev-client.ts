import {
  Bot,
  createBot,
  GatewayIntents,
  Interaction,
  InteractionTypes,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";

export const devClient = (token: string, applicationId: bigint) => {
  const bot = createBot({
    token,
    intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
    botId: applicationId,
  });

  bot.events.ready = (bot) => readyEvent(bot);
  bot.events.interactionCreate = (bot, interaction) =>
    interactionCreate(bot, interaction);

  return bot;
};

export const readyEvent = (bot: Bot) => {
  console.log(`Successfully connected to ${bot.id}`);
};

export const interactionCreate = (bot: Bot, interaction: Interaction) => {
  if (interaction.type !== InteractionTypes.AApplicationCommand) return;

  const commandName = interaction.data.name.toLowerCase();
  // todo command handling
};
