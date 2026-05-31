import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const appRoot = process.cwd();
const sourcePath = path.join(appRoot, "src/data/staticData.ts");
const outputDir = path.join(appRoot, "public/catalog");
const categories = ["prompt", "skill", "hook", "mcp", "agent", "github"];

function readStaticData(source) {
  const match = source.match(/const staticData = ([\s\S]*);\s*export default staticData;/);
  if (!match) {
    throw new Error("Unable to parse src/data/staticData.ts");
  }
  return vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 });
}

function itemsForCategory(data, category) {
  if (category === "prompt") {
    return data.prompts_full ?? [];
  }
  return (data.skills_full ?? []).filter((item) => item.category === category);
}

const source = await readFile(sourcePath, "utf8");
const data = readStaticData(source);

await mkdir(outputDir, { recursive: true });

for (const category of categories) {
  const items = itemsForCategory(data, category);
  await writeFile(
    path.join(outputDir, `${category}.json`),
    `${JSON.stringify(items)}\n`,
    "utf8",
  );
  console.log(`catalog/${category}.json ${items.length}`);
}
