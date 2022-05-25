import {
  ApplicationCommandData,
  BaseCommandInteraction,
  Client
} from 'discord.js';

export interface Command {
  /**
   * Command execution
   *
   * @param client  The Discord.js client
   * @param interaction The interaction object
   */
  (client: Client, interaction: BaseCommandInteraction<'cached'>):
    | Promise<unknown>
    | unknown;

  /**
   * Command data
   */
  options: ApplicationCommandData;
}
