import { bundleFiles } from "./bundler.ts";

export const startHmr = async (paths: string | string[]) => {
  const watcher = Deno.watchFs(paths, { recursive: true });

  for await (const event of watcher) {
    if (["any", "access", "other"].includes(event.kind)) continue;

    await bundleFiles();
  }
};
