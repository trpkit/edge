import { Args } from "https://deno.land/std/flags/mod.ts";
import { startServer } from "../server/dev-server.ts";

export const dev = (argv: Args) => {
  if (!argv["token"] && !Deno.env.get("DISCORD_TOKEN")) {
    console.warn(
      "Please provide a token using the --token flag or DISCORD_TOKEN environment variable",
    );
    Deno.exit();
  }

  if (!argv["applicationId"] && !Deno.env.get("DISCORD_APPLICATION_ID")) {
    console.warn(
      "Please provide an applicationId using the --applicationId flag or DISCORD_APPLICATION_ID environment variable",
    );
    Deno.exit();
  }

  const token = argv["token"] || Deno.env.get("DISCORD_TOKEN");
  const applicationId = argv["applicationId"] ||
    Deno.env.get("DISCORD_APPLICATION_ID");

  startServer(token, applicationId).catch(console.error);
};
