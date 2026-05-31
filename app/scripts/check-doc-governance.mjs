import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");

const ignoredDirectories = new Set([
  ".git",
  ".kiro",
  ".sisyphus",
  "app/dist",
  "app/node_modules",
  "archive",
  "tmp",
]);

const markdownLinkPattern =
  /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const htmlReferencePattern = /\b(?:href|src)=["']([^"']+)["']/g;

const markdownFiles = [];

function shouldSkip(relativePath) {
  return [...ignoredDirectories].some(
    (directory) =>
      relativePath === directory || relativePath.startsWith(`${directory}${path.sep}`),
  );
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath);

    if (entry.isDirectory()) {
      if (!shouldSkip(relativePath)) {
        walk(absolutePath);
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      markdownFiles.push(absolutePath);
    }
  }
}

function isLocalReference(reference) {
  if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(reference)) {
    return false;
  }

  return (
    reference.startsWith("./") ||
    reference.startsWith("../") ||
    reference.startsWith("/")
  );
}

function resolveReference(filePath, reference) {
  const withoutAnchor = reference.split("#")[0].split("?")[0];
  if (!withoutAnchor) {
    return null;
  }

  const decoded = decodeURI(withoutAnchor);
  if (decoded.startsWith("/")) {
    return path.join(repoRoot, decoded.slice(1));
  }

  return path.resolve(path.dirname(filePath), decoded);
}

function collectReferences(line) {
  const references = [];

  for (const pattern of [markdownLinkPattern, htmlReferencePattern]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(line)) !== null) {
      references.push(match[1]);
    }
  }

  return references;
}

walk(repoRoot);

const missingFrontmatter = [];
const brokenReferences = [];

for (const filePath of markdownFiles) {
  const relativePath = path.relative(repoRoot, filePath);
  const text = fs.readFileSync(filePath, "utf8");

  if (
    (relativePath.startsWith(`docs${path.sep}`) ||
      relativePath.startsWith(`drafts${path.sep}`)) &&
    !text.startsWith("---\n")
  ) {
    missingFrontmatter.push(relativePath);
  }

  let inFencedCodeBlock = false;
  const lines = text.split("\n");
  for (const [index, line] of lines.entries()) {
    if (line.trimStart().startsWith("```")) {
      inFencedCodeBlock = !inFencedCodeBlock;
      continue;
    }

    if (inFencedCodeBlock) {
      continue;
    }

    for (const reference of collectReferences(line)) {
      if (!isLocalReference(reference)) {
        continue;
      }

      const targetPath = resolveReference(filePath, reference);
      if (targetPath && !fs.existsSync(targetPath)) {
        brokenReferences.push({
          file: relativePath,
          line: index + 1,
          reference,
          target: path.relative(repoRoot, targetPath),
        });
      }
    }
  }
}

if (missingFrontmatter.length > 0 || brokenReferences.length > 0) {
  if (missingFrontmatter.length > 0) {
    console.error("Markdown files missing required frontmatter:");
    for (const filePath of missingFrontmatter) {
      console.error(`- ${filePath}`);
    }
  }

  if (brokenReferences.length > 0) {
    console.error("Broken local Markdown references:");
    for (const { file, line, reference, target } of brokenReferences) {
      console.error(`- ${file}:${line} ${reference} -> ${target}`);
    }
  }

  process.exit(1);
}

console.log(
  `Document governance check passed: ${markdownFiles.length} Markdown files scanned.`,
);
