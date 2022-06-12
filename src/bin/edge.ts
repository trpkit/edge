import { Args, parse } from "https://deno.land/std/flags/mod.ts";

const args = parse(Deno.args);

if (args["version"]) {
  // TODO: Move version to a constant
  console.log(`Edge v0.1.0`);
  Deno.exit();
}

const command = args._[0];

// available commands
const commands: { [command: string]: (argv: Args) => void } = {
  dev: async (argv) => (await import("../cli/dev.ts")).dev(argv),
};

// OS signals not available on Windows
try {
  Deno.addSignalListener("SIGTERM", () => Deno.exit());
  Deno.addSignalListener("SIGINT", () => Deno.exit());
} catch (_e) {
  console.warn("OS signals not available.");
}

await commands[command](args);
