import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");
const appRoot = resolve(repoRoot, "app");
const legacyRouterFiles = [
  "app/api/prompts-router.ts",
  "app/api/skills-router.ts",
  "app/api/workflows-router.ts",
];

function readRepoFile(path: string): string {
  return readFileSync(resolve(repoRoot, path), "utf8");
}

function runAndCaptureFailure(command: string, args: string[], cwd: string): string {
  try {
    execFileSync(command, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return "";
  } catch (error) {
    const result = error as { stdout?: string; stderr?: string };
    return `${result.stdout ?? ""}${result.stderr ?? ""}`;
  }
}

describe("ops boundary", () => {
  it("supports deploy dry-run without remote side effects", () => {
    const output = execFileSync("bash", ["deploy/deploy.sh", "--dry-run", "--smoke"], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    expect(output).toContain("=== PromptForge Deploy Dry Run ===");
    expect(output).toContain("Would run: rsync app/");
    expect(output).toContain(
      "Would run remotely: app/scripts/verified-production-build.sh --source dockerhub --scope deploy --mode compose",
    );
    expect(output).toContain("Would run local production E2E smoke");
    expect(output).toContain(
      "No SSH, rsync, Registry, Docker, production smoke, or provider call executed.",
    );
  });

  it("guards db:push behind explicit local-only confirmation", () => {
    const pkg = JSON.parse(readRepoFile("app/package.json")) as {
      scripts: Record<string, string>;
    };
    const guard = readRepoFile("app/scripts/guard-db-push.mjs");
    const failure = runAndCaptureFailure(process.execPath, ["scripts/guard-db-push.mjs"], appRoot);

    expect(pkg.scripts["db:push"]).toBe("node scripts/guard-db-push.mjs");
    expect(pkg.scripts["db:push"]).not.toContain("drizzle-kit push");
    expect(pkg.scripts["db:push:local"]).toContain("PROMPTFORGE_ALLOW_DB_PUSH=local-only");
    expect(guard).toContain("PROMPTFORGE_ALLOW_DB_PUSH");
    expect(guard).toContain("local-only");
    expect(guard).toContain("allowedHosts");
    expect(failure).toContain("db:push is blocked by default");
    expect(failure).toContain("missing explicit local-only confirmation");
  });

  it("keeps legacy DB-backed routers marked as non-public", () => {
    for (const file of legacyRouterFiles) {
      const source = readRepoFile(file);

      expect(source, file).toContain("DB_BACKED_ROUTE_NOT_PUBLIC");
      expect(source, file).toContain("without auth, rate limiting, and audit logging");
    }
  });
});
