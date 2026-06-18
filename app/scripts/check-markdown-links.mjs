import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, isAbsolute, relative, resolve } from "node:path";

const cwd = process.cwd();
const appDir = cwd.endsWith("/app") || cwd.split("/").at(-1) === "app" ? cwd : resolve(cwd, "app");
const repoRoot = resolve(appDir, "..");

const ignoreDirs = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "tmp",
  "archive",
  "tmp/outputs",
  ".history",
]);

const markdownFiles = [];
const linkRegex = /\[[^\]]*\]\(([^)\s]+)(?:\s+["']([^"')]+)["'])?\)/g;
const referenceLinkRegex = /^\s*\[[^\]]+\]:\s*(\S+)/gm;

function shouldIgnorePath(pathname) {
  return ignoreDirs.has(pathname) || pathname.startsWith(".git/");
}

function collectMarkdownFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      if (shouldIgnorePath(entry.name)) {
        continue;
      }
      collectMarkdownFiles(fullPath);
      continue;
    }
    if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
      markdownFiles.push(fullPath);
    }
  }
}

function isExternalOrFragOnly(target) {
  if (!target) return true;
  if (target.startsWith("http://") || target.startsWith("https://")) return true;
  if (target.startsWith("mailto:") || target.startsWith("tel:")) return true;
  if (target.startsWith("#")) return true;
  if (target.startsWith("/")) return true;
  return false;
}

function splitTarget(target) {
  const [pathPart] = target.split("#", 1);
  return pathPart;
}

function resolveLinkPath(markdownFile, target) {
  const rawTarget = target.trim();
  if (!rawTarget) {
    return null;
  }
  if (isExternalOrFragOnly(rawTarget)) {
    return null;
  }
  if (rawTarget.includes("?")) {
    return null;
  }
  const withoutFragment = splitTarget(rawTarget);
  const cleanedTarget = withoutFragment.replace(/^<|>$/g, "");
  if (!cleanedTarget) {
    return null;
  }
  if (cleanedTarget.endsWith("/")) {
    return null;
  }
  const anchorOnly = cleanedTarget.startsWith("#");
  if (anchorOnly) return null;

  if (/^[a-z][a-z0-9+.-]*:/.test(cleanedTarget)) {
    return null;
  }
  if (/\.[a-z0-9]+$/i.test(cleanedTarget)) {
    if (!cleanedTarget.toLowerCase().endsWith(".md")) {
      return null;
    }
  }

  const resolved = isAbsolute(cleanedTarget)
    ? resolve(repoRoot, cleanedTarget.replace(/^\/+/, ""))
    : resolve(dirname(markdownFile), cleanedTarget);

  return resolved;
}

function findLinkIssues(filePath, content) {
  const issues = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[1];
    const resolvedTarget = resolveLinkPath(filePath, target);
    if (!resolvedTarget) continue;
    if (existsSync(resolvedTarget)) continue;
    const line = content.slice(0, match.index).split("\n").length;
    issues.push({
      file: filePath,
      line,
      target,
      resolved: relative(repoRoot, resolvedTarget),
    });
  }
  while ((match = referenceLinkRegex.exec(content)) !== null) {
    const target = match[1];
    const resolvedTarget = resolveLinkPath(filePath, target);
    if (!resolvedTarget) continue;
    if (existsSync(resolvedTarget)) continue;
    const line = content.slice(0, match.index).split("\n").length;
    issues.push({
      file: filePath,
      line,
      target,
      resolved: relative(repoRoot, resolvedTarget),
    });
  }
  return issues;
}

collectMarkdownFiles(repoRoot);

const allIssues = [];
for (const file of markdownFiles) {
  const content = readFileSync(file, "utf8");
  const issues = findLinkIssues(file, content);
  if (issues.length > 0) {
    allIssues.push(...issues);
  }
}

if (allIssues.length > 0) {
  for (const issue of allIssues) {
    const relativeFile = relative(repoRoot, issue.file);
    process.stdout.write(`[BROKEN_LINK] ${relativeFile}:${issue.line} -> ${issue.target} (resolved: ${issue.resolved})\n`);
  }
  process.stdout.write(`\nmarkdown docs link check failed: ${allIssues.length} broken link(s)\n`);
  process.exit(1);
}

process.stdout.write(`markdown docs link check passed: ${markdownFiles.length} files scanned\n`);
