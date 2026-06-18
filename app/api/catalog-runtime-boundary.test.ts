import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");
const categories = ["prompt", "skill", "hook", "mcp", "agent", "github"] as const;

function readRepoFile(path: string): string {
  return readFileSync(resolve(repoRoot, path), "utf8");
}

function listSourceFiles(path: string): string[] {
  const absolutePath = resolve(repoRoot, path);
  const entries = readdirSync(absolutePath);
  return entries.flatMap(entry => {
    const child = `${path}/${entry}`;
    const stat = statSync(resolve(repoRoot, child));
    return stat.isDirectory() ? listSourceFiles(child) : [child];
  });
}

describe("catalog runtime boundary", () => {
  it("loads public catalog assets instead of importing bundled static data", () => {
    const sourceFiles = listSourceFiles("app/src")
      .filter(file => /\.(ts|tsx)$/.test(file));

    expect(readRepoFile("app/src/data/dataUtils.ts")).toContain("/catalog/manifest.json");
    for (const file of sourceFiles) {
      const source = readRepoFile(file);
      expect(source, file).not.toMatch(/from\s+["'][^"']*(staticData|prompts|skills|workflows)["']/);
      expect(source, file).not.toContain("/data.json");
    }
  });

  it("publishes category catalog assets with manifest counts", () => {
    const manifest = JSON.parse(readRepoFile("app/public/catalog/manifest.json")) as {
      categories: Record<string, { count: number; path: string }>;
    };

    for (const category of categories) {
      const path = `app/public/catalog/${category}.json`;
      expect(existsSync(resolve(repoRoot, path)), path).toBe(true);

      const items = JSON.parse(readRepoFile(path)) as unknown[];
      const entry = manifest.categories[category];
      expect(entry.path).toBe(`/catalog/${category}.json`);
      expect(items).toHaveLength(entry.count);
      expect(entry.count).toBeGreaterThan(0);
    }
  });
});
