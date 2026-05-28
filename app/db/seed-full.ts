import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

import staticData from "../src/data/staticData";
import { prompts, skills } from "./schema";

const BATCH_SIZE = 50;

async function seedFull() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  const connection = await mysql.createConnection(url);
  const db = drizzle(connection);

  console.log("Seeding from staticData (full 803 records)...");

  const data = staticData as {
    prompts_full?: Record<string, unknown>[];
    skills_full?: Record<string, unknown>[];
  };

  const promptItems = data.prompts_full || [];
  const skillItems = data.skills_full || [];

  if (promptItems.length > 0) {
    console.log(`Inserting ${promptItems.length} prompts...`);
    for (let i = 0; i < promptItems.length; i += BATCH_SIZE) {
      const batch = promptItems.slice(i, i + BATCH_SIZE);
      for (const item of batch) {
        const r = item as Record<string, unknown>;
        await db.insert(prompts).values({
          title: (r.title as string) || "",
          titleEn: (r.title_en as string) || (r.titleEn as string) || "",
          role: (r.role as string) || "",
          tags: (r.tags as string[]) || [],
          tagsEn: (r.tags_en as string[]) || (r.tagsEn as string[]) || [],
          content: (r.content as string) || "",
          description: (r.description as string) || "",
          descriptionEn:
            (r.description_en as string) || (r.descriptionEn as string) || "",
          scenario: (r.scenario as string) || "",
          scenarioEn:
            (r.scenario_en as string) || (r.scenarioEn as string) || "",
          problemFocus:
            (r.problem_focus as string) || (r.problemFocus as string) || "",
          problemFocusEn:
            (r.problem_focus_en as string) ||
            (r.problemFocusEn as string) ||
            "",
          author: (r.author as string) || "",
          likes: (r.likes as number) || 0,
          views: String(r.views || ""),
          comments: (r.comments as number) || 0,
        });
      }
      console.log(
        `  prompts: ${Math.min(i + BATCH_SIZE, promptItems.length)}/${promptItems.length}`
      );
    }
  }

  if (skillItems.length > 0) {
    console.log(`Inserting ${skillItems.length} skills...`);
    for (let i = 0; i < skillItems.length; i += BATCH_SIZE) {
      const batch = skillItems.slice(i, i + BATCH_SIZE);
      for (const item of batch) {
        const r = item as Record<string, unknown>;
        await db.insert(skills).values({
          title: (r.title as string) || "",
          titleEn: (r.title_en as string) || (r.titleEn as string) || "",
          role: (r.role as string) || "",
          tags: (r.tags as string[]) || [],
          tagsEn: (r.tags_en as string[]) || (r.tagsEn as string[]) || [],
          content: (r.content as string) || "",
          description: (r.description as string) || "",
          descriptionEn:
            (r.description_en as string) || (r.descriptionEn as string) || "",
          scenario: (r.scenario as string) || "",
          scenarioEn:
            (r.scenario_en as string) || (r.scenarioEn as string) || "",
          problemFocus:
            (r.problem_focus as string) || (r.problemFocus as string) || "",
          problemFocusEn:
            (r.problem_focus_en as string) ||
            (r.problemFocusEn as string) ||
            "",
          author: (r.author as string) || "",
          likes: (r.likes as number) || 0,
          views: String(r.views || ""),
          comments: (r.comments as number) || 0,
        });
      }
      console.log(
        `  skills: ${Math.min(i + BATCH_SIZE, skillItems.length)}/${skillItems.length}`
      );
    }
  }

  console.log(
    `Done. Inserted ${promptItems.length} prompts + ${skillItems.length} skills.`
  );
  await connection.end();
  process.exit(0);
}

seedFull().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
