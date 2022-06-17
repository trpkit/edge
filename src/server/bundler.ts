import { EDGE_DIRECTORY } from "../shared/constants.ts";

export const createHash = (): string => {
  return (+new Date()).toString(36);
};

export const bundleFiles = async (): Promise<void> => {
  // Generate .edge directory
  Deno.mkdirSync(EDGE_DIRECTORY, { recursive: true });

  const files = Deno.readDirSync(EDGE_DIRECTORY);
  const bundles: string[] = [];

  // Check to see if bundles exist
  for await (const file of files) {
    if (
      file.isFile && file.name.startsWith("bundle.") &&
      file.name.endsWith(".ts")
    ) {
      bundles.push(file.name);
    }
  }

  if (bundles) {
    for (const bundle of bundles) {
      Deno.removeSync(`${EDGE_DIRECTORY}/${bundle}`);
    }
  }

  console.log("Compiling bundles");

  // Generate commands bundle
  const commandBundle = bundleDirectory("commands");
  await import(`file:///${commandBundle.replaceAll("\\", "/")}`);

  // Generate events bundle
  const eventBundle = bundleDirectory("events");
  await import(`file:///${eventBundle.replaceAll("\\", "/")}`);

  console.log("Compiled bundles");
};

const bundleDirectory = (dir: string) => {
  const sig = createHash();

  Deno.createSync(`${EDGE_DIRECTORY}/bundle.${sig}.ts`);

  const files = new Set<string>();
  findFiles(files, dir);

  Deno.writeTextFileSync(
    `${EDGE_DIRECTORY}/bundle.${sig}.ts`,
    [...files].map((file) => file).join("\n").replaceAll("\\", "/"),
  );

  return `${EDGE_DIRECTORY}/bundle.${sig}.ts`;
};

const findFiles = (files: Set<string>, dir: string) => {
  for (const file of Deno.readDirSync(dir)) {
    if (file.isDirectory) {
      findFiles(files, `${dir}/${file.name}`);
      continue;
    }

    // todo check default export is type of T, where T is EdgeCommand or EdgeEvent
    const filePath = `import "file:///${Deno.cwd()}/${dir}/${file.name}";`;
    files.add(filePath);
  }
};