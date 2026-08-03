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

  it("pins the patched Hono adapter and blocks moderate audit findings", () => {
    const pkg = JSON.parse(
      readFileSync(path.resolve(import.meta.dirname, "../package.json"), "utf-8"),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      overrides?: Record<string, string>;
      scripts?: Record<string, string>;
    };
    const lock = JSON.parse(
      readFileSync(path.resolve(import.meta.dirname, "../package-lock.json"), "utf-8"),
    ) as {
      packages?: Record<string, { version?: string }>;
    };
    const nodeServerVersions = Object.entries(lock.packages ?? {})
      .filter(([packagePath]) => packagePath.endsWith("node_modules/@hono/node-server"))
      .map(([, entry]) => entry.version);

    expect(pkg.dependencies?.["@hono/node-server"]).toBe("2.0.12");
    expect(pkg.devDependencies?.["@hono/vite-dev-server"]).toBe("0.26.1");
    expect(pkg.overrides?.["@hono/node-server"]).toBe("$@hono/node-server");
    expect(pkg.scripts?.build).toContain("--define:import.meta.env.DEV=false");
    expect(pkg.scripts?.verify).toContain("npm run audit:full");
    expect(pkg.scripts?.["audit:prod"]).toContain("--audit-level=moderate");
    expect(nodeServerVersions).toEqual(["2.0.12"]);
  });

  it("pins the production image and runs the application as a non-root user", () => {
    const dockerfile = readFileSync(
      path.resolve(import.meta.dirname, "../Dockerfile"),
      "utf-8",
    );

    expect(dockerfile).toMatch(
      /^ARG NODE_IMAGE=node:22\.23\.1-alpine3\.24@sha256:[a-f0-9]{64}$/m,
    );
    expect(dockerfile).toContain("USER node");
    expect(dockerfile).toContain('CMD ["node", "dist/boot.js"]');
    expect(dockerfile).not.toContain('CMD ["npm", "start"]');
  });

  it("does not start a second HTTP server when Vite loads the API module", () => {
    const bootSource = readFileSync(
      path.resolve(import.meta.dirname, "boot.ts"),
      "utf-8",
    );

    expect(bootSource).toContain("import.meta.env.DEV");
    expect(bootSource).toMatch(/if \(!isViteDevelopmentRuntime\)/);
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
