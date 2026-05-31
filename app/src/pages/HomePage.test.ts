import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("HomePage navigation", () => {
  it("links category cards to the plural route names used by App routes", () => {
    const source = readFileSync(path.resolve(import.meta.dirname, "HomePage.tsx"), "utf8");

    expect(source).toContain("path: '/prompts'");
    expect(source).toContain("path: '/skills'");
    expect(source).toContain("path: '/hooks'");
    expect(source).toContain("path: '/mcp'");
    expect(source).toContain("path: '/agents'");
    expect(source).toContain("path: '/github'");
    expect(source).not.toContain("key === 'prompt' ? 'prompts' : key");
  });

  it("prevents animated stats from staying at zero in background browser checks", () => {
    const source = readFileSync(path.resolve(import.meta.dirname, "HomePage.tsx"), "utf8");

    expect(source).toContain("window.setTimeout(() => setDisplay(value), 1600)");
    expect(source).toContain("getBoundingClientRect()");
    expect(source).toContain("threshold: 0.1");
  });
});
