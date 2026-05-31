import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseSafeMarkdown, parseSafeMarkdownInline } from "./safeMarkdown";

describe("safe markdown parsing", () => {
  it("parses supported markdown without creating raw HTML output", () => {
    const blocks = parseSafeMarkdown([
      "# Title `code`",
      "1. First step",
      "- Bullet with `token`",
      "```ts",
      "const value = '<script>alert(1)</script>';",
      "```",
    ].join("\n"));

    expect(blocks).toEqual([
      {
        type: "heading",
        level: 1,
        segments: [
          { type: "text", text: "Title " },
          { type: "code", text: "code" },
        ],
      },
      {
        type: "list-item",
        marker: "1.",
        ordered: true,
        segments: [{ type: "text", text: "First step" }],
      },
      {
        type: "list-item",
        marker: "-",
        ordered: false,
        segments: [
          { type: "text", text: "Bullet with " },
          { type: "code", text: "token" },
        ],
      },
      {
        type: "code",
        language: "ts",
        text: "const value = '<script>alert(1)</script>';",
      },
    ]);
  });

  it("treats inline html and event handlers as inert text", () => {
    expect(parseSafeMarkdownInline("<img src=x onerror=alert(1)>")).toEqual([
      { type: "text", text: "<img src=x onerror=alert(1)>" },
    ]);
  });

  it("keeps CardGrid off raw HTML injection paths", () => {
    const source = readFileSync(path.resolve(import.meta.dirname, "CardGrid.tsx"), "utf8");

    expect(source).not.toContain("dangerouslySetInnerHTML");
    expect(source).not.toContain("formatContent(");
    expect(source).toContain("SafeMarkdownContent");
  });

  it("keeps empty-state filter reset synchronized with SearchBar input", () => {
    const cardGridSource = readFileSync(path.resolve(import.meta.dirname, "CardGrid.tsx"), "utf8");
    const searchBarSource = readFileSync(path.resolve(import.meta.dirname, "SearchBar.tsx"), "utf8");

    expect(cardGridSource).toContain("searchResetSignal");
    expect(cardGridSource).toContain("resetSignal={searchResetSignal}");
    expect(searchBarSource).toContain("resetSignal");
    expect(searchBarSource).toContain("setQuery('')");
    expect(searchBarSource).toContain("suppressSuggestionsOnNextFocus");
  });
});
