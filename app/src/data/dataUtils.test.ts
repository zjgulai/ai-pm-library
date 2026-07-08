import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  filterItems,
  getRoleCounts,
  getUniqueTags,
  type Category,
  type Item,
} from "./dataUtils";
import { CATEGORY_COUNTS } from "./catalogMeta";

const expectedCounts: Record<Category, number> = {
  prompt: 203,
  skill: 316,
  hook: 81,
  mcp: 81,
  agent: 84,
  github: 99,
};

const sampleItems: Item[] = [
  {
    id: 1,
    title: "Amazon prompt",
    role: "ecommerce",
    tags: ["Amazon", "Listing"],
    content: "Optimize listing content",
    description: "Marketplace listing helper",
    scenario: "Cross-border ecommerce",
    problemFocus: "Listing quality varies across marketplaces",
    author: "PromptForge",
    likes: 1,
    views: "1K",
    comments: 0,
  },
  {
    id: 2,
    title: "Developer workflow",
    role: "developer",
    tags: ["Workflow"],
    content: "Debug with evidence",
    description: "Engineering workflow helper",
    scenario: "Code review",
    problemFocus: "Reviews need reproducible evidence",
    author: "PromptForge",
    likes: 2,
    views: "2K",
    comments: 1,
  },
];

describe("dataUtils", () => {
  it("keeps generated public catalog files aligned with expected counts", () => {
    for (const category of CATEGORIES) {
      const filePath = path.resolve(import.meta.dirname, "../../public/catalog", `${category}.json`);
      const items = JSON.parse(readFileSync(filePath, "utf8")) as unknown[];

      expect(items).toHaveLength(expectedCounts[category]);
      expect(CATEGORY_COUNTS[category]).toBe(expectedCounts[category]);
    }
  });

  it("filters items by role and search text", () => {
    expect(filterItems(sampleItems, "amazon", "all").map((item) => item.id)).toEqual([1]);
    expect(filterItems(sampleItems, "", "developer").map((item) => item.id)).toEqual([2]);
    expect(filterItems(sampleItems, "evidence", "developer").map((item) => item.id)).toEqual([2]);
  });

  it("derives role counts and unique tags", () => {
    expect(getRoleCounts(sampleItems)).toEqual({ all: 2, ecommerce: 1, developer: 1 });
    expect(getUniqueTags(sampleItems)).toEqual(["Amazon", "Listing", "Workflow"]);
  });
});
