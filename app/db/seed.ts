import { getDb } from "../api/queries/connection";
import { prompts, skills, workflows } from "./schema";
import { prompts as promptItems } from "../src/data/prompts";
import { skills as skillItems } from "../src/data/skills";
import { workflows as workflowItems } from "../src/data/workflows";
import type { Prompt } from "../src/types/prompt";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Insert prompts
  if (promptItems && promptItems.length > 0) {
    console.log(`Inserting ${promptItems.length} prompts...`);
    for (const item of promptItems) {
      await db.insert(prompts).values({
        title: item.title,
        titleEn: item.titleEn,
        role: item.role,
        tags: item.tags,
        tagsEn: item.tagsEn,
        content: item.content,
        description: item.description,
        descriptionEn: item.descriptionEn,
        scenario: item.scenario,
        scenarioEn: item.scenarioEn,
        problemFocus: item.problemFocus,
        problemFocusEn: item.problemFocusEn,
        author: item.author,
        likes: item.likes,
        views: item.views,
        comments: item.comments,
      });
    }
  }

  // Insert skills
  if (skillItems && skillItems.length > 0) {
    console.log(`Inserting ${skillItems.length} skills...`);
    for (const item of skillItems) {
      await db.insert(skills).values({
        title: item.title,
        titleEn: item.titleEn,
        role: item.role,
        tags: item.tags,
        tagsEn: item.tagsEn,
        content: item.content,
        description: item.description,
        descriptionEn: item.descriptionEn,
        scenario: item.scenario,
        scenarioEn: item.scenarioEn,
        problemFocus: item.problemFocus,
        problemFocusEn: item.problemFocusEn,
        author: item.author,
        likes: item.likes,
        views: item.views,
        comments: item.comments,
      });
    }
  }

  // Insert workflows
  if (workflowItems && workflowItems.length > 0) {
    console.log(`Inserting ${workflowItems.length} workflows...`);
    for (const item of workflowItems as Prompt[]) {
      await db.insert(workflows).values({
        title: item.title,
        titleEn: item.titleEn,
        role: item.role,
        tags: item.tags,
        tagsEn: item.tagsEn,
        content: item.content,
        description: item.description,
        descriptionEn: item.descriptionEn,
        scenario: item.scenario,
        scenarioEn: item.scenarioEn,
        problemFocus: item.problemFocus,
        problemFocusEn: item.problemFocusEn,
        steps: (item as unknown as { steps?: unknown[] }).steps ?? [],
        author: item.author,
        likes: item.likes,
        views: item.views,
        comments: item.comments,
      });
    }
  }

  console.log("Done.");
  process.exit(0);
}

seed();
