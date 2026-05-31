import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Layout navigation accessibility", () => {
  it("keeps the mobile menu toggle discoverable to browser and assistive tests", () => {
    const source = readFileSync(path.resolve(import.meta.dirname, "Layout.tsx"), "utf8");

    expect(source).toContain("aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}");
    expect(source).toContain("aria-expanded={mobileOpen}");
    expect(source).toContain('aria-controls="mobile-navigation"');
    expect(source).toContain('id="mobile-navigation"');
  });
});
