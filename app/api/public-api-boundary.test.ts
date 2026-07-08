import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");
const catalogCategories = ["prompt", "skill", "hook", "mcp", "agent", "github"] as const;
const archivedLegacyTsSources = {
  "app/src/data/staticData.ts": "archive/snapshots/catalog-static-data-ts-legacy-archived-20260614.ts",
  "app/src/data/prompts.ts": "archive/snapshots/data-prompts-legacy-archived-20260614.ts",
  "app/src/data/skills.ts": "archive/snapshots/data-skills-legacy-archived-20260614.ts",
  "app/src/data/workflows.ts": "archive/snapshots/data-workflows-legacy-archived-20260614.ts",
} as const;

function readRepoFile(path: string): string {
  return readFileSync(resolve(repoRoot, path), "utf8");
}

function listFiles(path: string): string[] {
  const absolutePath = resolve(repoRoot, path);
  const entries = readdirSync(absolutePath);
  return entries.flatMap(entry => {
    const child = `${path}/${entry}`;
    const stat = statSync(resolve(repoRoot, child));
    return stat.isDirectory() ? listFiles(child) : [child];
  });
}

describe("phase 0 public boundary", () => {
  it("does not expose public catalog write mutations", () => {
    const routerFiles = [
      "app/api/prompts-router.ts",
      "app/api/skills-router.ts",
      "app/api/workflows-router.ts",
    ];

    for (const file of routerFiles) {
      const source = readRepoFile(file);
      expect(source, file).not.toMatch(/\b(create|update|delete)\s*:\s*publicQuery/);
      expect(source, file).not.toContain(".mutation(");
    }
  });

  it("keeps the public runtime static-first", () => {
    const router = readRepoFile("app/api/router.ts");
    const main = readRepoFile("app/src/main.tsx");
    const sourceFiles = listFiles("app/src")
      .filter(file => /\.(ts|tsx)$/.test(file));

    expect(router).toContain("ping:");
    expect(router).not.toContain("promptsRouter");
    expect(router).not.toContain("skillsRouter");
    expect(router).not.toContain("workflowsRouter");
    expect(main).not.toContain("TRPCProvider");
    for (const file of sourceFiles) {
      expect(readRepoFile(file), file).not.toMatch(/from\s+["'][^"']*(staticData|prompts|skills|workflows)["']/);
      expect(readRepoFile(file), file).not.toContain("/data.json");
    }
  });

  it("publishes category catalog assets with manifest counts", () => {
    const manifest = JSON.parse(readRepoFile("app/public/catalog/manifest.json")) as {
      generatedFrom: string;
      categories: Record<string, { count: number; path: string }>;
    };
    const catalogSource = JSON.parse(readRepoFile("app/src/data/catalogSource.json")) as {
      prompts_full?: unknown[];
      skills_full?: unknown[];
    };

    expect(manifest.generatedFrom).toBe("src/data/catalogSource.json");
    expect(catalogSource.prompts_full).toHaveLength(manifest.categories.prompt.count);
    expect(catalogSource.skills_full?.length).toBeGreaterThan(0);
    for (const category of catalogCategories) {
      const entry = manifest.categories[category];
      const items = JSON.parse(readRepoFile(`app/public/catalog/${category}.json`)) as unknown[];

      expect(entry.path).toBe(`/catalog/${category}.json`);
      expect(items).toHaveLength(entry.count);
      expect(entry.count).toBeGreaterThan(0);
    }
  });

  it("does not expose the legacy public data snapshot", () => {
    const archivedPath = "archive/snapshots/public-data-legacy-archived-20260614.json";
    const archivedSnapshot = JSON.parse(readRepoFile(archivedPath)) as {
      prompts?: unknown[];
      skills?: unknown[];
      workflows?: unknown[];
    };

    expect(existsSync(resolve(repoRoot, "app/public/data.json"))).toBe(false);
    expect(archivedSnapshot.prompts).toHaveLength(123);
    expect(archivedSnapshot.skills).toHaveLength(260);
    expect(archivedSnapshot.workflows).toHaveLength(5);
  });

  it("keeps deprecated TypeScript data sources out of runtime src", () => {
    const legacySeed = readRepoFile("app/db/seed.ts");
    const legacyScriptSeed = readRepoFile("app/scripts/seed-data.ts");
    const fullSeed = readRepoFile("app/db/seed-full.ts");
    const generator = readRepoFile("app/scripts/generate-catalog.mjs");

    for (const [runtimePath, archivePath] of Object.entries(archivedLegacyTsSources)) {
      expect(existsSync(resolve(repoRoot, runtimePath)), runtimePath).toBe(false);
      expect(existsSync(resolve(repoRoot, archivePath)), archivePath).toBe(true);
    }
    expect(existsSync(resolve(repoRoot, "app/src/data/catalogSource.json"))).toBe(true);
    expect(legacySeed).toContain("deprecated");
    expect(legacySeed).not.toMatch(/src\/data\/(prompts|skills|workflows)/);
    expect(legacyScriptSeed).toContain("deprecated");
    expect(legacyScriptSeed).not.toMatch(/src\/data\/(prompts|skills|workflows)/);
    expect(fullSeed).toContain("catalogSource.json");
    expect(fullSeed).not.toContain("staticData");
    expect(generator).toContain("catalogSource.json");
    expect(generator).not.toContain("staticData");
  });

  it("keeps local secrets and agent state out of git", () => {
    const gitignore = readRepoFile(".gitignore");

    expect(gitignore).toContain("*.pem");
    expect(gitignore).toContain("deploy/.env.prod");
    expect(gitignore).toContain("deploy/secrets.env");
    expect(gitignore).toContain(".kiro/");
    expect(gitignore).toContain(".sisyphus/");
    expect(gitignore).toContain(".codegraph/");
    expect(existsSync(resolve(repoRoot, "ai_video.pem"))).toBe(false);
  });

  it("keeps the default compose path static-first and app-only", () => {
    const compose = readRepoFile("deploy/docker-compose.yml");

    expect(compose).toContain("app:");
    expect(compose).not.toMatch(/\n\s+mysql:/);
    expect(compose).not.toMatch(/\n\s+migrate:/);
    expect(compose).not.toMatch(/\n\s+seed:/);
    expect(compose).not.toContain("promptforge_net");
  });
});
