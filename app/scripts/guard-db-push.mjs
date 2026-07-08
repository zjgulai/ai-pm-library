import { spawnSync } from "node:child_process";

const CONFIRMATION = "local-only";
const allowedHosts = new Set(["localhost", "127.0.0.1", "::1"]);

function fail(message) {
  console.error([
    `ERROR: ${message}`,
    "",
    "db:push is blocked by default for PromptForge.",
    "Use npm run db:generate and npm run db:migrate for reviewed migrations.",
    `For a local disposable database only, set PROMPTFORGE_ALLOW_DB_PUSH=${CONFIRMATION}`,
    "and make DATABASE_URL point to localhost or 127.0.0.1.",
  ].join("\n"));
  process.exit(1);
}

if (process.env.PROMPTFORGE_ALLOW_DB_PUSH !== CONFIRMATION) {
  fail("missing explicit local-only confirmation");
}

if (!process.env.DATABASE_URL) {
  fail("DATABASE_URL is required for guarded local db push");
}

let databaseUrl;
try {
  databaseUrl = new URL(process.env.DATABASE_URL);
} catch {
  fail("DATABASE_URL is not a valid URL");
}

if (!allowedHosts.has(databaseUrl.hostname)) {
  fail(`DATABASE_URL host ${databaseUrl.hostname} is not an allowed local host`);
}

const result = spawnSync("npx", ["drizzle-kit", "push"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  fail(`failed to launch drizzle-kit: ${result.error.message}`);
}

process.exit(result.status ?? 1);
