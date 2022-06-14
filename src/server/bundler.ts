import { EDGE_DIRECTORY } from "../shared/constants.ts";

const map: { [key: string]: string } = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
  8: "i",
  9: "j",
  10: "k",
  11: "l",
  12: "m",
  13: "n",
  14: "o",
  15: "p",
  16: "q",
  17: "r",
  18: "s",
  19: "t",
  20: "u",
  21: "v",
  22: "w",
  23: "x",
  24: "y",
  25: "z",
  26: "0",
  27: "1",
  28: "2",
  29: "3",
  30: "4",
  31: "5",
  32: "6",
  33: "7",
  34: "8",
  35: "9",
};

const sig = (): string => {
  let x = 1 + Math.round(Math.random() * ((-1 >>> 0) - 1));
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  let y = x >>> 1;
  return map[y % 36] + map[(y >> 18) % 36];
};

export const createHash = (): string => {
  return sig() + sig();
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
  await import(`file:///${commandBundle.replaceAll('\\', '/')}`);

  // Generate events bundle
  const eventBundle = bundleDirectory("events");
  await import(`file:///${eventBundle.replaceAll('\\', '/')}`);

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
