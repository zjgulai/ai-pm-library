import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");
const appRoot = resolve(repoRoot, "app");

describe("catalog source boundary", () => {
  it("rejects malformed catalog contract before checking source assets", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "promptforge-invalid-contract-"));
    const tempContractPath = join(tempDir, "catalog-source-contract.json");
    writeFileSync(tempContractPath, JSON.stringify({ schemaVersion: "1.0.0" }), "utf8");

    try {
      let stderr = "";

      try {
        execFileSync("node", ["scripts/generate-catalog.mjs", "--check"], {
          cwd: appRoot,
          encoding: "utf8",
          env: { ...process.env, CATALOG_SOURCE_CONTRACT_PATH: tempContractPath },
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (error) {
        stderr = String((error as { stderr?: string }).stderr ?? "");
      }

      expect(stderr).toContain("Invalid catalog source");
      expect(stderr).toContain("contract must satisfy schema");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("validates catalog source before checking generated assets", () => {
    const output = execFileSync("node", ["scripts/generate-catalog.mjs", "--check"], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(output).toContain("catalog:check passed");
  });

  it("rejects malformed catalog source before publishing assets", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "promptforge-invalid-catalog-"));
    const tempSourcePath = join(tempDir, "catalogSource.json");
    writeFileSync(
      tempSourcePath,
      JSON.stringify({
        prompts_full: [{ id: 1, title: "Broken prompt" }],
        skills_full: [{ id: 1, title: "Broken skill" }],
      }),
      "utf8"
    );

    try {
      let stderr = "";

      try {
        execFileSync("node", ["scripts/generate-catalog.mjs", "--check"], {
          cwd: appRoot,
          encoding: "utf8",
          env: { ...process.env, CATALOG_SOURCE_PATH: tempSourcePath },
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (error) {
        stderr = String((error as { stderr?: string }).stderr ?? "");
      }

      expect(stderr).toContain("Invalid catalog source");
      expect(stderr).toContain("prompts_full[0].likes");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("loads contract from external file and validates with it", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "promptforge-contract-catalog-"));
    const tempSourcePath = join(tempDir, "catalogSource.json");
    const tempContractPath = join(tempDir, "catalog-source-contract.json");
    const tempOutputDir = join(tempDir, "catalog");
    const tempOutputContract = {
      schemaVersion: "1.0.0",
      generatedFrom: "catalogSource.json",
      collections: {
        prompts_full: {
          name: "prompts",
          requiredCategory: "prompt",
          publiclyVisible: true,
        },
      },
      validations: {
        nonNegativeIntegerFields: ["id", "likes", "comments"],
        requiredStringFields: [
          "title",
          "role",
          "content",
          "description",
          "scenario",
          "author",
          "views",
          "titleEn",
          "descriptionEn",
          "scenarioEn",
          "problemFocus",
          "problemFocusEn",
          "createdAt",
          "category",
        ],
        requiredStringArrayFields: ["tags", "tagsEn"],
        requiredTopLevelCollections: ["prompts_full"],
        sourceSkillCategories: ["prompt"],
        publicCatalogCategories: ["prompt"],
      },
    };
    writeFileSync(tempSourcePath, JSON.stringify({
      prompts_full: [
        {
          id: 1,
          title: "Test prompt",
          role: "测试角色",
          content: "测试正文",
          description: "测试描述",
          scenario: "测试场景",
          author: "tester",
          views: "1,000",
          titleEn: "Test prompt",
          descriptionEn: "desc",
          scenarioEn: "scenario",
          problemFocus: "problem",
          problemFocusEn: "problem",
          createdAt: "2026-06-14",
          category: "prompt",
          tags: ["a"],
          tagsEn: ["b"],
          likes: 0,
          comments: 0,
        },
      ],
    }));
    writeFileSync(tempContractPath, JSON.stringify(tempOutputContract));

    try {
      const stdout = execFileSync("node", ["scripts/generate-catalog.mjs"], {
        cwd: appRoot,
        encoding: "utf8",
        env: {
          ...process.env,
          CATALOG_SOURCE_PATH: tempSourcePath,
          CATALOG_SOURCE_CONTRACT_PATH: tempContractPath,
          CATALOG_OUTPUT_DIR: tempOutputDir,
        },
      });

      expect(stdout).toContain('"prompt": {\n    "count": 1,');
      expect(stdout).toContain("path");
      const outputFiles = readdirSync(tempOutputDir).sort();
      expect(outputFiles).toEqual(["manifest.json", "prompt.json"]);
      const manifest = JSON.parse(readFileSync(join(tempOutputDir, "manifest.json"), "utf8"));
      expect(manifest.categories).toHaveProperty("prompt");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("rejects contracts with unsupported major schemaVersion", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "promptforge-contract-version-"));
    const tempSourcePath = join(tempDir, "catalogSource.json");
    const tempContractPath = join(tempDir, "catalog-source-contract.json");
    const tempContract = {
      schemaVersion: "2.0.0",
      generatedFrom: "catalogSource.json",
      collections: {
        prompts_full: {
          name: "prompts",
          requiredCategory: "prompt",
          publiclyVisible: true,
        },
      },
      validations: {
        nonNegativeIntegerFields: ["id", "likes", "comments"],
        requiredStringFields: [
          "title",
          "role",
          "content",
          "description",
          "scenario",
          "author",
          "views",
          "titleEn",
          "descriptionEn",
          "scenarioEn",
          "problemFocus",
          "problemFocusEn",
          "createdAt",
          "category",
        ],
        requiredStringArrayFields: ["tags", "tagsEn"],
        requiredTopLevelCollections: ["prompts_full"],
        sourceSkillCategories: ["prompt"],
        publicCatalogCategories: ["prompt"],
      },
    };

    writeFileSync(tempSourcePath, JSON.stringify({
      prompts_full: [
        {
          id: 1,
          title: "Test prompt",
          role: "测试角色",
          content: "测试正文",
          description: "测试描述",
          scenario: "测试场景",
          author: "tester",
          views: "1,000",
          titleEn: "Test prompt",
          descriptionEn: "desc",
          scenarioEn: "scenario",
          problemFocus: "problem",
          problemFocusEn: "problem",
          createdAt: "2026-06-14",
          category: "prompt",
          tags: ["a"],
          tagsEn: ["b"],
          likes: 0,
          comments: 0,
        },
      ],
    }));
    writeFileSync(tempContractPath, JSON.stringify(tempContract));

    let stderr = "";
    try {
      execFileSync("node", ["scripts/generate-catalog.mjs", "--check"], {
        cwd: appRoot,
        encoding: "utf8",
        env: {
          ...process.env,
          CATALOG_SOURCE_PATH: tempSourcePath,
          CATALOG_SOURCE_CONTRACT_PATH: tempContractPath,
        },
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      stderr = String((error as { stderr?: string }).stderr ?? "");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }

    expect(stderr).toContain("Invalid catalog source: contract schemaVersion major must be 1, got 2.0.0");
  });

  it("accepts contracts matching supported major override via environment", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "promptforge-contract-version-override-"));
    const tempSourcePath = join(tempDir, "catalogSource.json");
    const tempContractPath = join(tempDir, "catalog-source-contract.json");
    const tempOutputDir = join(tempDir, "catalog");
    const tempContract = {
      schemaVersion: "2.0.0",
      generatedFrom: "catalogSource.json",
      collections: {
        prompts_full: {
          name: "prompts",
          requiredCategory: "prompt",
          publiclyVisible: true,
        },
      },
      validations: {
        nonNegativeIntegerFields: ["id", "likes", "comments"],
        requiredStringFields: [
          "title",
          "role",
          "content",
          "description",
          "scenario",
          "author",
          "views",
          "titleEn",
          "descriptionEn",
          "scenarioEn",
          "problemFocus",
          "problemFocusEn",
          "createdAt",
          "category",
        ],
        requiredStringArrayFields: ["tags", "tagsEn"],
        requiredTopLevelCollections: ["prompts_full"],
        sourceSkillCategories: ["prompt"],
        publicCatalogCategories: ["prompt"],
      },
    };
    writeFileSync(tempSourcePath, JSON.stringify({
      prompts_full: [
        {
          id: 1,
          title: "Test prompt",
          role: "测试角色",
          content: "测试正文",
          description: "测试描述",
          scenario: "测试场景",
          author: "tester",
          views: "1,000",
          titleEn: "Test prompt",
          descriptionEn: "desc",
          scenarioEn: "scenario",
          problemFocus: "problem",
          problemFocusEn: "problem",
          createdAt: "2026-06-14",
          category: "prompt",
          tags: ["a"],
          tagsEn: ["b"],
          likes: 0,
          comments: 0,
        },
      ],
    }));
    writeFileSync(tempContractPath, JSON.stringify(tempContract));

    let output = "";
    try {
      output = execFileSync("node", ["scripts/generate-catalog.mjs"], {
        cwd: appRoot,
        encoding: "utf8",
        env: {
          ...process.env,
          CATALOG_SOURCE_PATH: tempSourcePath,
          CATALOG_SOURCE_CONTRACT_PATH: tempContractPath,
          CATALOG_OUTPUT_DIR: tempOutputDir,
          CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR: "2",
        },
      });
      const outputFiles = readdirSync(tempOutputDir).sort();
      expect(outputFiles).toEqual(["manifest.json", "prompt.json"]);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }

    expect(output).toContain('"prompt": {\n    "count": 1,');
    expect(output).toContain("\"path\": \"/catalog/prompt.json\"");
  });

  it("rejects unsupported major override values", () => {
    let stderr = "";
    try {
      execFileSync("node", ["scripts/generate-catalog.mjs", "--check"], {
        cwd: appRoot,
        encoding: "utf8",
        env: {
          ...process.env,
          CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR: "NaN",
        },
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      stderr = String((error as { stderr?: string }).stderr ?? "");
    }

    expect(stderr).toContain("Invalid catalog source: supported contract schema major must be a positive integer, got NaN");
  });
});
