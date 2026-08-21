import {
  chmodSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const sourceScript = resolve(import.meta.dirname, "verified-production-build.sh");
const expectedDigest = `sha256:${"1".repeat(64)}`;
const otherDigest = `sha256:${"2".repeat(64)}`;
const sourceRevision = "a".repeat(40);
const temporaryRoots: string[] = [];

type FixtureOptions = {
  dockerfile?: string;
  curlMode?: "match" | "mismatch" | "unreachable";
  dockerMode?: "ok" | "build-fail" | "inspect-fail";
  proxy?: string;
  relevantWorktreeClean?: "true" | "false";
};

function writeExecutable(path: string, contents: string) {
  writeFileSync(path, contents, "utf8");
  chmodSync(path, 0o700);
}

function exposeRequiredHostTools(targetDirectory: string) {
  for (const tool of ["awk", "cat", "chmod", "date", "dirname", "grep", "mkdir", "mv", "sed"]) {
    const resolved = spawnSync("/bin/sh", ["-c", `command -v ${tool}`], { encoding: "utf8" });
    if (resolved.status !== 0 || resolved.stdout.trim() === "") {
      throw new Error(`required test host tool is unavailable: ${tool}`);
    }
    symlinkSync(resolved.stdout.trim(), join(targetDirectory, tool));
  }
}

function createFixture(options: FixtureOptions = {}) {
  const root = mkdtempSync(join(tmpdir(), "promptforge-verified-build-"));
  temporaryRoots.push(root);
  const appDir = join(root, "app");
  const scriptDir = join(appDir, "scripts");
  const fakeBin = join(root, "fake-bin");
  mkdirSync(scriptDir, { recursive: true });
  mkdirSync(fakeBin, { recursive: true });

  const fixtureScript = join(scriptDir, "verified-production-build.sh");
  writeFileSync(fixtureScript, readFileSync(sourceScript, "utf8"), "utf8");
  chmodSync(fixtureScript, 0o700);
  writeFileSync(
    join(appDir, "Dockerfile"),
    options.dockerfile ?? `ARG NODE_IMAGE=node:22-alpine@${expectedDigest}\nFROM \${NODE_IMAGE} AS production\n`,
    "utf8",
  );
  writeFileSync(join(root, "docker-compose.yml"), "services:\n  app:\n    build: ./app\n", "utf8");

  writeExecutable(
    join(fakeBin, "git"),
    `#!/bin/sh
case " $* " in
  *" rev-parse HEAD "*) printf '%s\\n' "${sourceRevision}" ;;
  *" status --porcelain "*) [ "\${FAKE_RELEVANT_DIRTY:-0}" = 1 ] && printf '%s\\n' ' M app/package.json' ;;
  *) exit 1 ;;
esac
`,
  );

  writeExecutable(
    join(fakeBin, "curl"),
    `#!/bin/sh
headers=''
previous=''
for argument in "$@"; do
  if [ "$previous" = '-D' ]; then headers="$argument"; fi
  previous="$argument"
done
case " $* " in
  *"auth.docker.io/token"*) printf '%s\\n' '{"token":"test-secret-token"}' ;;
  *)
    case "\${FAKE_CURL_MODE:-match}" in
      unreachable) exit 22 ;;
      mismatch) observed='${otherDigest}' ;;
      *) observed='${expectedDigest}' ;;
    esac
    [ -n "$headers" ] || exit 2
    printf 'HTTP/1.1 200 OK\\r\\nDocker-Content-Digest: %s\\r\\n\\r\\n' "$observed" > "$headers"
    ;;
esac
`,
  );

  writeExecutable(
    join(fakeBin, "docker"),
    `#!/bin/sh
printf '%s\\n' "$*" >> "$DOCKER_ARGS_FILE"
case " $* " in
  *" build "*|" build "*)
    count=0
    [ ! -f "$BUILD_COUNT_FILE" ] || count=$(sed -n '1p' "$BUILD_COUNT_FILE")
    count=$((count + 1))
    printf '%s\\n' "$count" > "$BUILD_COUNT_FILE"
    [ "\${FAKE_DOCKER_MODE:-ok}" != build-fail ]
    ;;
  *" image inspect "*)
    [ "\${FAKE_DOCKER_MODE:-ok}" != inspect-fail ] || exit 1
    printf '%s|linux/amd64\\n' 'sha256:${"b".repeat(64)}'
    ;;
  *) exit 2 ;;
esac
`,
  );

  const buildCountFile = join(root, "build-count");
  const dockerArgsFile = join(root, "docker-args");
  const env = {
    ...process.env,
    PATH: `${fakeBin}:${process.env.PATH ?? ""}`,
    BUILD_COUNT_FILE: buildCountFile,
    DOCKER_ARGS_FILE: dockerArgsFile,
    FAKE_CURL_MODE: options.curlMode ?? "match",
    FAKE_DOCKER_MODE: options.dockerMode ?? "ok",
    PROMPTFORGE_BUILD_RUN_ID: "contract-20260821-001",
    PROMPTFORGE_SOURCE_REVISION: sourceRevision,
    PROMPTFORGE_RELEVANT_WORKTREE_CLEAN: options.relevantWorktreeClean ?? "true",
    ...(options.proxy ? { PROMPTFORGE_REGISTRY_PROXY: options.proxy } : {}),
  };

  return { appDir, buildCountFile, dockerArgsFile, env, fakeBin, root, script: fixtureScript };
}

function runBuild(
  fixture: ReturnType<typeof createFixture>,
  args: string[] = ["--source", "gcr", "--scope", "local", "--mode", "docker"],
) {
  return spawnSync("/bin/bash", [fixture.script, ...args], {
    cwd: fixture.root,
    encoding: "utf8",
    env: fixture.env,
  });
}

function getReceipt(fixture: ReturnType<typeof createFixture>) {
  const path = join(fixture.root, "tmp", "outputs", "docker-build-receipt-contract-20260821-001.json");
  return { path, receipt: JSON.parse(readFileSync(path, "utf8")) };
}

function buildCount(fixture: ReturnType<typeof createFixture>) {
  try {
    return Number(readFileSync(fixture.buildCountFile, "utf8").trim());
  } catch {
    return 0;
  }
}

afterEach(() => {
  while (temporaryRoots.length > 0) {
    rmSync(temporaryRoots.pop()!, { force: true, recursive: true });
  }
});

describe("verified production build contract", () => {
  it("bounds Registry probes and never retries them", () => {
    const source = readFileSync(sourceScript, "utf8");

    expect(source).toContain("--connect-timeout 10 --max-time 30 --retry 0");
  });

  it("defaults to the bounded Docker Hub local Docker build contract", () => {
    const fixture = createFixture();
    const result = runBuild(fixture, []);

    expect(result.status).toBe(0);
    expect(buildCount(fixture)).toBe(1);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildMode: "docker",
      imageTag: "promptforge-app:verified-local",
      scope: "local",
      source: "dockerhub",
    });
  });

  it("rejects unknown arguments before any build", () => {
    const fixture = createFixture();
    const result = runBuild(fixture, ["--scope", "local", "--mode", "docker", "--arbitrary", "value"]);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("INVALID_ARGUMENT");
    expect(buildCount(fixture)).toBe(0);
  });

  it.each([
    [["--source", "other", "--scope", "local", "--mode", "docker"], "source"],
    [["--source", "gcr", "--scope", "other", "--mode", "docker"], "scope"],
    [["--source", "gcr", "--scope", "local", "--mode", "compose"], "mode"],
  ])("rejects an invalid %s selection", (args) => {
    const fixture = createFixture();
    const result = runBuild(fixture, args as string[]);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("INVALID_ARGUMENT");
    expect(buildCount(fixture)).toBe(0);
  });

  it("rejects duplicate canonical NODE_IMAGE declarations and records the failure", () => {
    const canonical = `ARG NODE_IMAGE=node:22-alpine@${expectedDigest}`;
    const fixture = createFixture({ dockerfile: `${canonical}\n${canonical}\nFROM \${NODE_IMAGE}\n` });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 0,
      errorCode: "DOCKERFILE_CONTRACT_INVALID",
      failedPhase: "preflight",
      outcome: "failed",
    });
  });

  it("rejects a canonical image without a complete lowercase SHA-256 digest", () => {
    const fixture = createFixture({
      dockerfile: "ARG NODE_IMAGE=node:22-alpine@sha256:1234\nFROM ${NODE_IMAGE}\n",
    });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt.errorCode).toBe("DOCKERFILE_CONTRACT_INVALID");
  });

  it("rejects a Dockerfile where NODE_IMAGE is not the first ARG", () => {
    const fixture = createFixture({
      dockerfile: `ARG OTHER=value\nARG NODE_IMAGE=node:22-alpine@${expectedDigest}\nFROM \${NODE_IMAGE}\n`,
    });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt.errorCode).toBe("DOCKERFILE_CONTRACT_INVALID");
  });

  it("builds exactly once after a matching mirror digest and writes a restricted receipt", () => {
    const fixture = createFixture();
    const result = runBuild(fixture);

    expect(result.status).toBe(0);
    expect(buildCount(fixture)).toBe(1);
    const { path, receipt } = getReceipt(fixture);
    expect(receipt).toMatchObject({
      buildAttempt: 1,
      canonicalRef: `node:22-alpine@${expectedDigest}`,
      effectiveRef: `mirror.gcr.io/library/node@${expectedDigest}`,
      expectedDigest,
      observedDigest: expectedDigest,
      imageTag: "promptforge-app:verified-local",
      outcome: "built",
      proxyConfigured: false,
      source: "gcr",
    });
    expect(statSync(path).mode & 0o777).toBe(0o600);
  });

  it("uses the canonical Docker Hub reference without changing its digest", () => {
    const fixture = createFixture();
    const result = runBuild(fixture, ["--source", "dockerhub", "--scope", "local", "--mode", "docker"]);

    expect(result.status).toBe(0);
    expect(buildCount(fixture)).toBe(1);
    expect(getReceipt(fixture).receipt).toMatchObject({
      canonicalRef: `node:22-alpine@${expectedDigest}`,
      effectiveRef: `node:22-alpine@${expectedDigest}`,
      expectedDigest,
      observedDigest: expectedDigest,
      source: "dockerhub",
    });
  });

  it("does not build when the observed digest mismatches", () => {
    const fixture = createFixture({ curlMode: "mismatch" });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 0,
      errorCode: "DIGEST_MISMATCH",
      failedPhase: "manifest_verified",
      observedDigest: otherDigest,
    });
  });

  it("records an unreachable manifest without leaking remote response data", () => {
    const fixture = createFixture({ curlMode: "unreachable" });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 0,
      errorCode: "MANIFEST_UNREACHABLE",
      failedPhase: "preflight",
    });
  });

  it("records one attempted build when Docker fails", () => {
    const fixture = createFixture({ dockerMode: "build-fail" });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(1);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 1,
      errorCode: "BUILD_FAILED",
      failedPhase: "build_started",
    });
  });

  it("records an inspect failure after one successful build invocation", () => {
    const fixture = createFixture({ dockerMode: "inspect-fail" });
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(1);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 1,
      errorCode: "IMAGE_INSPECT_FAILED",
      failedPhase: "build_started",
    });
  });

  it("records a missing Docker tool without starting a build", () => {
    const fixture = createFixture();
    exposeRequiredHostTools(fixture.fakeBin);
    rmSync(join(fixture.fakeBin, "docker"));
    fixture.env.PATH = fixture.fakeBin;
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(getReceipt(fixture).receipt).toMatchObject({
      buildAttempt: 0,
      errorCode: "TOOL_MISSING",
      failedPhase: "preflight",
    });
  });

  it("records proxy configuration only as a boolean", () => {
    const proxy = "http://user:secret@example.invalid:8080";
    const fixture = createFixture({ proxy });
    const result = runBuild(fixture);
    const rawReceipt = readFileSync(getReceipt(fixture).path, "utf8");

    expect(result.status).toBe(0);
    expect(getReceipt(fixture).receipt.proxyConfigured).toBe(true);
    expect(rawReceipt).not.toContain(proxy);
    expect(rawReceipt).not.toContain("test-secret-token");
    expect(`${result.stdout}\n${result.stderr}`).not.toContain(proxy);
    expect(`${result.stdout}\n${result.stderr}`).not.toContain("test-secret-token");
  });

  it("fails closed for deploy scope when relevant worktree cleanliness is not affirmed", () => {
    const fixture = createFixture({ relevantWorktreeClean: "false" });
    const result = runBuild(fixture, ["--source", "gcr", "--scope", "deploy", "--mode", "compose"]);

    expect(result.status).not.toBe(0);
    expect(buildCount(fixture)).toBe(0);
    expect(result.stderr).toContain("WORKTREE_NOT_CLEAN");
  });

  it("runs one controlled compose build for an affirmed deploy revision", () => {
    const fixture = createFixture({ relevantWorktreeClean: "true" });
    const result = runBuild(fixture, ["--source", "gcr", "--scope", "deploy", "--mode", "compose"]);

    expect(result.status).toBe(0);
    expect(buildCount(fixture)).toBe(1);
    const receiptPath = join(fixture.root, ".deploy-receipts", "docker-build-receipt-contract-20260821-001.json");
    const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
    expect(receipt).toMatchObject({
      buildAttempt: 1,
      imageTag: "promptforge_app",
      relevantWorktreeClean: true,
      scope: "deploy",
      sourceRevision,
    });
    expect(statSync(receiptPath).mode & 0o777).toBe(0o600);
    expect(readFileSync(fixture.dockerArgsFile, "utf8")).toContain(
      `compose -f ${join(fixture.root, "docker-compose.yml")} build`,
    );
  });

  it("does not require Git on the already-attested remote deploy host", () => {
    const fixture = createFixture({ relevantWorktreeClean: "true" });
    rmSync(join(fixture.root, "fake-bin", "git"));
    fixture.env.PATH = `${join(fixture.root, "fake-bin")}:/usr/bin:/bin`;
    const result = runBuild(fixture, ["--source", "gcr", "--scope", "deploy", "--mode", "compose"]);

    expect(result.status).toBe(0);
    expect(buildCount(fixture)).toBe(1);
  });

  it("rejects an unsafe caller-supplied run id", () => {
    const fixture = createFixture();
    fixture.env.PROMPTFORGE_BUILD_RUN_ID = "../../unsafe";
    const result = runBuild(fixture);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("INVALID_ARGUMENT");
    expect(buildCount(fixture)).toBe(0);
  });

  it("dry-run performs no Registry or Docker call and creates no receipt", () => {
    const fixture = createFixture({ curlMode: "unreachable", dockerMode: "build-fail" });
    const result = runBuild(fixture, ["--source", "gcr", "--scope", "ci", "--mode", "docker", "--dry-run"]);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(`effectiveRef=mirror.gcr.io/library/node@${expectedDigest}`);
    expect(result.stdout).toContain("imageTag=promptforge-app:ci");
    expect(buildCount(fixture)).toBe(0);
    expect(() => getReceipt(fixture)).toThrow();
  });
});
