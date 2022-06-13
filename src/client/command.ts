import {
  ApplicationCommandOption,
  Bot,
  Interaction,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";

export interface Command {
  (bot: Bot, interaction: Interaction): Promise<void> | void;
  options: ApplicationCommandOption[];
}
