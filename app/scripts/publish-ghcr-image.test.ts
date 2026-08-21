import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const sourceScript = resolve(import.meta.dirname, "publish-ghcr-image.sh");
const workflowPath = resolve(
  import.meta.dirname,
  "../../.github/workflows/ci.yml"
);
const sourceRevision = "a".repeat(40);
const sourceImageId = `sha256:${"b".repeat(64)}`;
const publishedDigest = `sha256:${"c".repeat(64)}`;
const publishedTag = `ghcr.io/zjgulai/ai-pm-library:sha-${sourceRevision}-run-123-1`;
const publishedRef = `ghcr.io/zjgulai/ai-pm-library@${publishedDigest}`;
const temporaryRoots: string[] = [];

function writeExecutable(path: string, contents: string) {
  writeFileSync(path, contents, "utf8");
  chmodSync(path, 0o700);
}

function createFixture(envOverrides: Record<string, string> = {}) {
  const root = mkdtempSync(join(tmpdir(), "promptforge-ghcr-publish-"));
  temporaryRoots.push(root);
  const scriptDir = join(root, "app", "scripts");
  const fakeBin = join(root, "fake-bin");
  mkdirSync(scriptDir, { recursive: true });
  mkdirSync(fakeBin, { recursive: true });
  const fixtureScript = join(scriptDir, "publish-ghcr-image.sh");
  writeFileSync(fixtureScript, readFileSync(sourceScript, "utf8"), "utf8");
  chmodSync(fixtureScript, 0o700);

  const dockerLog = join(root, "docker.log");
  const buildReceiptPath = join(root, "docker-build-receipt.json");
  writeFileSync(
    buildReceiptPath,
    `${JSON.stringify({
      buildAttempt: 1,
      imageId: sourceImageId,
      imageTag: "promptforge-app:ci",
      outcome: "built",
      platform: "linux/amd64",
      relevantWorktreeClean: true,
      scope: "ci",
      sourceRevision,
    })}\n`,
    "utf8"
  );
  writeExecutable(
    join(fakeBin, "docker"),
    `#!/bin/sh
set -eu
printf '%s\n' "$*" >> "$PROMPTFORGE_TEST_DOCKER_LOG"
case "$*" in
  "image inspect --format {{.Id}}|{{.Os}}/{{.Architecture}} promptforge-app:ci")
    if [ "$FAKE_SOURCE_INSPECT_MODE" = fail ]; then exit 1; fi
    printf '%s|%s\n' '${sourceImageId}' "$FAKE_SOURCE_PLATFORM"
    ;;
  "tag promptforge-app:ci ${publishedTag}")
    if [ "$FAKE_TAG_MODE" = fail ]; then exit 1; fi
    ;;
  "push ${publishedTag}")
    if [ "$FAKE_PUSH_MODE" = fail ]; then exit 1; fi
    if [ "$FAKE_PUSH_MODE" = missing-digest ]; then printf '%s\n' 'push completed without digest'; exit 0; fi
    printf '%s\n' '${publishedTag}: digest: ${publishedDigest} size: 1987'
    ;;
  "pull --platform linux/amd64 ${publishedRef}")
    if [ "$FAKE_PULL_MODE" = fail ]; then exit 1; fi
    ;;
  "image inspect --format {{.Id}}|{{.Os}}/{{.Architecture}} ${publishedRef}")
    printf '%s|linux/amd64\n' "$FAKE_PUBLISHED_IMAGE_ID"
    ;;
  *) exit 2 ;;
esac
`
  );

  return {
    dockerLog,
    env: {
      ...process.env,
      PATH: `${fakeBin}:${process.env.PATH ?? ""}`,
      GITHUB_EVENT_NAME: "push",
      GITHUB_REF: "refs/heads/codex/catalog-plugin-refresh-202608",
      GITHUB_REPOSITORY: "zjgulai/ai-pm-library",
      GITHUB_RUN_ATTEMPT: "1",
      GITHUB_RUN_ID: "123",
      GITHUB_SHA: sourceRevision,
      FAKE_PUSH_MODE: "success",
      FAKE_SOURCE_INSPECT_MODE: "success",
      FAKE_SOURCE_PLATFORM: "linux/amd64",
      FAKE_TAG_MODE: "success",
      FAKE_PULL_MODE: "success",
      FAKE_PUBLISHED_IMAGE_ID: sourceImageId,
      PROMPTFORGE_GHCR_RUN_ID: "ghcr-123-1",
      PROMPTFORGE_BUILD_RECEIPT_PATH: buildReceiptPath,
      PROMPTFORGE_TEST_DOCKER_LOG: dockerLog,
      ...envOverrides,
    },
    buildReceiptPath,
    root,
    script: fixtureScript,
  };
}

afterEach(() => {
  while (temporaryRoots.length > 0) {
    rmSync(temporaryRoots.pop()!, { force: true, recursive: true });
  }
});

describe("GHCR publish contract", () => {
  it("publishes the smoke-verified exact-SHA image once and writes a restricted digest receipt", () => {
    const fixture = createFixture();
    const result = spawnSync("/bin/bash", [fixture.script], {
      cwd: fixture.root,
      encoding: "utf8",
      env: fixture.env,
    });

    expect(result.status).toBe(0);
    expect(readFileSync(fixture.dockerLog, "utf8").trim().split("\n")).toEqual([
      "image inspect --format {{.Id}}|{{.Os}}/{{.Architecture}} promptforge-app:ci",
      `tag promptforge-app:ci ${publishedTag}`,
      `push ${publishedTag}`,
      `pull --platform linux/amd64 ${publishedRef}`,
      `image inspect --format {{.Id}}|{{.Os}}/{{.Architecture}} ${publishedRef}`,
    ]);

    const receiptPath = join(
      fixture.root,
      "tmp",
      "outputs",
      "ghcr-publish-receipt-ghcr-123-1.json"
    );
    const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
    expect(receipt).toMatchObject({
      buildRunId: "123",
      buildRunAttempt: 1,
      eventName: "push",
      outcome: "published",
      platform: "linux/amd64",
      publishedDigest,
      publishedRef,
      publishedTag,
      pushAttempt: 1,
      sourceImageId,
      sourceImageTag: "promptforge-app:ci",
      sourceRef: "refs/heads/codex/catalog-plugin-refresh-202608",
      sourceRevision,
      verificationPullAttempt: 1,
    });
    expect(statSync(receiptPath).mode & 0o777).toBe(0o600);
  });

  it("rejects a non-push or non-exact source identity before Docker", () => {
    for (const envOverrides of [
      { GITHUB_EVENT_NAME: "pull_request" },
      { GITHUB_REPOSITORY: "other/repository" },
      { GITHUB_SHA: "not-a-full-sha" },
      { GITHUB_RUN_ID: "not-numeric" },
      { GITHUB_RUN_ATTEMPT: "0" },
      { GITHUB_REF: "refs/heads/codex/unapproved-branch" },
      { PROMPTFORGE_GHCR_RUN_ID: "../../unsafe" },
    ]) {
      const fixture = createFixture(envOverrides);
      const result = spawnSync("/bin/bash", [fixture.script], {
        cwd: fixture.root,
        encoding: "utf8",
        env: fixture.env,
      });

      expect(result.status, JSON.stringify(envOverrides)).not.toBe(0);
      expect(result.stderr, JSON.stringify(envOverrides)).toContain(
        "INVALID_CONTEXT"
      );
      expect(existsSync(fixture.dockerLog), JSON.stringify(envOverrides)).toBe(
        false
      );
    }
  });

  it("pins workflow actions immutably and restricts package publication branches", () => {
    const workflow = readFileSync(workflowPath, "utf8");

    expect(workflow).not.toMatch(
      /uses: actions\/(?:checkout|setup-node|upload-artifact|download-artifact)@v\d+/
    );
    expect(workflow).toContain("github.repository == 'zjgulai/ai-pm-library'");
    expect(workflow).toContain("github.ref == 'refs/heads/main'");
    expect(workflow).toContain(
      "github.ref == 'refs/heads/codex/catalog-plugin-refresh-202608'"
    );
    expect(workflow).toContain(
      "uses: actions/attest@508db95dd578ae2727ebd6217d5ba78e4fbda05d # v4.2.1"
    );
    expect(workflow).toContain("id-token: write");
    expect(workflow).toContain("attestations: write");
    expect(workflow).toContain("artifact-metadata: write");
  });

  it("rejects a non-linux-amd64 source image before tag or push and records the failure", () => {
    const fixture = createFixture({ FAKE_SOURCE_PLATFORM: "linux/arm64" });
    const result = spawnSync("/bin/bash", [fixture.script], {
      cwd: fixture.root,
      encoding: "utf8",
      env: fixture.env,
    });

    expect(result.status).not.toBe(0);
    expect(readFileSync(fixture.dockerLog, "utf8").trim().split("\n")).toEqual([
      "image inspect --format {{.Id}}|{{.Os}}/{{.Architecture}} promptforge-app:ci",
    ]);
    const receiptPath = join(
      fixture.root,
      "tmp",
      "outputs",
      "ghcr-publish-receipt-ghcr-123-1.json"
    );
    const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
    expect(receipt).toMatchObject({
      errorCode: "SOURCE_IMAGE_INVALID",
      failedPhase: "preflight",
      outcome: "failed",
      platform: "linux/arm64",
      pushAttempt: 0,
    });
    expect(statSync(receiptPath).mode & 0o777).toBe(0o600);
  });

  it("records one attempted push when GHCR rejects the upload", () => {
    const fixture = createFixture({ FAKE_PUSH_MODE: "fail" });
    const result = spawnSync("/bin/bash", [fixture.script], {
      cwd: fixture.root,
      encoding: "utf8",
      env: fixture.env,
    });

    expect(result.status).not.toBe(0);
    const calls = readFileSync(fixture.dockerLog, "utf8").trim().split("\n");
    expect(calls.filter(call => call === `push ${publishedTag}`)).toHaveLength(
      1
    );
    const receiptPath = join(
      fixture.root,
      "tmp",
      "outputs",
      "ghcr-publish-receipt-ghcr-123-1.json"
    );
    const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
    expect(receipt).toMatchObject({
      errorCode: "PUSH_FAILED",
      failedPhase: "push_started",
      outcome: "failed",
      pushAttempt: 1,
      publishedDigest: "",
      publishedRef: "",
    });
    expect(statSync(receiptPath).mode & 0o777).toBe(0o600);
  });

  it.each([
    [
      "source inspect",
      { FAKE_SOURCE_INSPECT_MODE: "fail" },
      "SOURCE_INSPECT_FAILED",
      "preflight",
    ],
    ["tag", { FAKE_TAG_MODE: "fail" }, "TAG_FAILED", "preflight"],
    [
      "verification pull",
      { FAKE_PULL_MODE: "fail" },
      "PUBLISHED_IMAGE_PULL_FAILED",
      "digest_verification",
    ],
    [
      "verification mismatch",
      { FAKE_PUBLISHED_IMAGE_ID: `sha256:${"d".repeat(64)}` },
      "PUBLISHED_IMAGE_MISMATCH",
      "digest_verification",
    ],
  ])(
    "writes a stable receipt when %s fails",
    (_name, overrides, errorCode, failedPhase) => {
      const fixture = createFixture(overrides);
      const result = spawnSync("/bin/bash", [fixture.script], {
        cwd: fixture.root,
        encoding: "utf8",
        env: fixture.env,
      });

      expect(result.status).not.toBe(0);
      const receiptPath = join(
        fixture.root,
        "tmp",
        "outputs",
        "ghcr-publish-receipt-ghcr-123-1.json"
      );
      expect(existsSync(receiptPath)).toBe(true);
      expect(JSON.parse(readFileSync(receiptPath, "utf8"))).toMatchObject({
        errorCode,
        failedPhase,
      });
      expect(statSync(receiptPath).mode & 0o777).toBe(0o600);
    }
  );

  it("does not claim publication when a successful push omits the immutable digest", () => {
    const fixture = createFixture({ FAKE_PUSH_MODE: "missing-digest" });
    const result = spawnSync("/bin/bash", [fixture.script], {
      cwd: fixture.root,
      encoding: "utf8",
      env: fixture.env,
    });

    expect(result.status).not.toBe(0);
    const receiptPath = join(
      fixture.root,
      "tmp",
      "outputs",
      "ghcr-publish-receipt-ghcr-123-1.json"
    );
    const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
    expect(receipt).toMatchObject({
      errorCode: "PUBLISHED_DIGEST_INVALID",
      externalWrite: "occurred",
      failedPhase: "push_completed",
      outcome: "verification_failed",
      publishedDigest: "",
      publishedRef: "",
      pushAttempt: 1,
    });
  });

  it("rejects a build receipt that is not bound to the exact source image and revision", () => {
    const fixture = createFixture();
    writeFileSync(
      fixture.buildReceiptPath,
      `${JSON.stringify({
        buildAttempt: 1,
        imageId: sourceImageId,
        imageTag: "promptforge-app:ci",
        outcome: "built",
        platform: "linux/amd64",
        relevantWorktreeClean: true,
        scope: "ci",
        sourceRevision: "d".repeat(40),
      })}\n`,
      "utf8"
    );

    const result = spawnSync("/bin/bash", [fixture.script], {
      cwd: fixture.root,
      encoding: "utf8",
      env: fixture.env,
    });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("BUILD_RECEIPT_INVALID");
    expect(existsSync(fixture.dockerLog)).toBe(false);
    const receiptPath = join(
      fixture.root,
      "tmp",
      "outputs",
      "ghcr-publish-receipt-ghcr-123-1.json"
    );
    expect(JSON.parse(readFileSync(receiptPath, "utf8"))).toMatchObject({
      errorCode: "BUILD_RECEIPT_INVALID",
      failedPhase: "preflight",
      outcome: "failed",
      pushAttempt: 0,
    });
  });
});
