import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllCounts, getItemsByCategory, type Category } from "./dataUtils";

const expectedCounts: Record<Category, number> = {
  prompt: 193,
  skill: 306,
  hook: 72,
  mcp: 72,
  agent: 73,
  github: 87,
};

describe("dataUtils", () => {
  it("keeps category counts aligned with the public catalog", () => {
    expect(getAllCounts()).toEqual(expectedCounts);
  });

  it("returns unique item ids within each category", () => {
    for (const category of Object.keys(expectedCounts) as Category[]) {
      const ids = getItemsByCategory(category).map((item) => item.id);

      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.length).toBe(expectedCounts[category]);
    }
  });

  it("keeps generated public catalog files aligned with category counts", () => {
    for (const category of Object.keys(expectedCounts) as Category[]) {
      const filePath = path.resolve(import.meta.dirname, "../../public/catalog", `${category}.json`);
      const items = JSON.parse(readFileSync(filePath, "utf8")) as unknown[];

      expect(items).toHaveLength(expectedCounts[category]);
    }
  });
});
