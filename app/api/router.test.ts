import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { appRouter } from "./router";

const routerFiles = [
  "prompts-router.ts",
  "skills-router.ts",
  "workflows-router.ts",
];

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      return listSourceFiles(fullPath);
    }
    return /\.(ts|tsx)$/.test(entry) ? [fullPath] : [];
  });
}

describe("appRouter", () => {
  it("keeps DB and unused tRPC client packages out of production dependencies", () => {
    const pkg = JSON.parse(
      readFileSync(path.resolve(import.meta.dirname, "../package.json"), "utf-8"),
    ) as { dependencies?: Record<string, string> };

    for (const packageName of [
      "@tanstack/react-query",
      "@trpc/client",
      "@trpc/react-query",
      "dotenv",
      "drizzle-orm",
      "mysql2",
      "zod",
    ]) {
      expect(pkg.dependencies ?? {}).not.toHaveProperty(packageName);
    }
  });

  it("does not expose legacy DB-backed catalog routers publicly", () => {
    const source = readFileSync(path.join(import.meta.dirname, "router.ts"), "utf-8");

    expect(source).not.toContain("promptsRouter");
    expect(source).not.toContain("skillsRouter");
    expect(source).not.toContain("workflowsRouter");
    expect(source).not.toMatch(/\b(prompts|skills|workflows):/);
  });

  it("keeps the public API surface read-only", () => {
    for (const fileName of routerFiles) {
      const source = readFileSync(path.join(import.meta.dirname, fileName), "utf-8");

      expect(source).not.toContain(".mutation(");
      expect(source).not.toMatch(/\b(create|update|delete):\s*publicQuery/);
    }
  });

  it("responds to ping without database access", async () => {
    const caller = appRouter.createCaller({
      req: new Request("http://localhost/api/trpc"),
      resHeaders: new Headers(),
    });

    const result = await caller.ping();

    expect(result.ok).toBe(true);
    expect(typeof result.ts).toBe("number");
  });

  it("keeps the React app on the static-first catalog path", () => {
    const srcRoot = path.resolve(import.meta.dirname, "../src");
    const files = listSourceFiles(srcRoot).filter((file) => !file.endsWith("providers/trpc.tsx"));

    for (const file of files) {
      const source = readFileSync(file, "utf8");

      expect(source).not.toContain("@/providers/trpc");
      expect(source).not.toContain("@trpc/react-query");
      expect(source).not.toContain("@trpc/client");
      expect(source).not.toMatch(/\btrpc\./);
    }
  });
});
