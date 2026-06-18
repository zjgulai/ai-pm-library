import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");

function readRepoFile(path: string): string {
  return readFileSync(resolve(repoRoot, path), "utf8");
}

describe("public api write boundary", () => {
  it("does not mount catalog routers on the public app router", () => {
    const router = readRepoFile("app/api/router.ts");

    expect(router).toContain("ping:");
    expect(router).not.toContain("promptsRouter");
    expect(router).not.toContain("skillsRouter");
    expect(router).not.toContain("workflowsRouter");
  });

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
});
