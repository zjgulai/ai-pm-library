import { z } from "zod";
import { eq, like, or, and, sql } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { prompts } from "@db/schema";

export const promptsRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        role: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(100),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.role && input.role !== "all") {
        conditions.push(eq(prompts.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(prompts.title, q),
            like(prompts.titleEn, q),
            like(prompts.description, q),
            like(prompts.descriptionEn, q),
            like(prompts.scenario, q),
            like(prompts.scenarioEn, q),
            like(prompts.problemFocus, q),
            like(prompts.problemFocusEn, q),
            like(prompts.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const results = await db.query.prompts.findMany({
        where,
        orderBy: (prompts, { desc }) => [desc(prompts.createdAt)],
        limit: input?.limit ?? 100,
        offset: input?.offset ?? 0,
      });

      return results;
    }),

  count: publicQuery
    .input(
      z.object({
        role: z.string().optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.role && input.role !== "all") {
        conditions.push(eq(prompts.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(prompts.title, q),
            like(prompts.titleEn, q),
            like(prompts.description, q),
            like(prompts.descriptionEn, q),
            like(prompts.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const result = await db.select({ count: sql<number>`count(*)` }).from(prompts).where(where);
      return result[0]?.count ?? 0;
    }),

  roleStats: publicQuery
    .query(async () => {
      const db = getDb();
      const results = await db.select({
        role: prompts.role,
        count: sql<number>`count(*)`,
      }).from(prompts).groupBy(prompts.role);
      return results;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.query.prompts.findFirst({
        where: eq(prompts.id, input.id),
      });
      return result ?? null;
    }),

  create: publicQuery
    .input(
      z.object({
        title: z.string().min(1),
        titleEn: z.string().min(1),
        role: z.string().min(1),
        tags: z.array(z.string()),
        tagsEn: z.array(z.string()),
        content: z.string().min(1),
        description: z.string().min(1),
        descriptionEn: z.string().min(1),
        scenario: z.string().min(1),
        scenarioEn: z.string().min(1),
        problemFocus: z.string().min(1),
        problemFocusEn: z.string().min(1),
        author: z.string().default(""),
        likes: z.number().default(0),
        views: z.string().default(""),
        comments: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(prompts).values(input) as unknown as { insertId: bigint };
      return { id: Number(result.insertId) };
    }),

  update: publicQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEn: z.string().optional(),
        role: z.string().optional(),
        tags: z.array(z.string()).optional(),
        tagsEn: z.array(z.string()).optional(),
        content: z.string().optional(),
        description: z.string().optional(),
        descriptionEn: z.string().optional(),
        scenario: z.string().optional(),
        scenarioEn: z.string().optional(),
        problemFocus: z.string().optional(),
        problemFocusEn: z.string().optional(),
        author: z.string().optional(),
        likes: z.number().optional(),
        views: z.string().optional(),
        comments: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const filtered = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined)
      );
      if (Object.keys(filtered).length === 0) return { updated: 0 };
      await db.update(prompts).set(filtered).where(eq(prompts.id, id));
      return { updated: 1 };
    }),

  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(prompts).where(eq(prompts.id, input.id));
      return { deleted: 1 };
    }),
});
