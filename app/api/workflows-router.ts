import { z } from "zod";
import { eq, like, or, and, sql } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { workflows } from "@db/schema";

export const workflowsRouter = createRouter({
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
        conditions.push(eq(workflows.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(workflows.title, q),
            like(workflows.titleEn, q),
            like(workflows.description, q),
            like(workflows.descriptionEn, q),
            like(workflows.scenario, q),
            like(workflows.scenarioEn, q),
            like(workflows.problemFocus, q),
            like(workflows.problemFocusEn, q),
            like(workflows.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const results = await db.query.workflows.findMany({
        where,
        orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
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
        conditions.push(eq(workflows.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(workflows.title, q),
            like(workflows.titleEn, q),
            like(workflows.description, q),
            like(workflows.descriptionEn, q),
            like(workflows.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const result = await db.select({ count: sql<number>`count(*)` }).from(workflows).where(where);
      return result[0]?.count ?? 0;
    }),

  roleStats: publicQuery
    .query(async () => {
      const db = getDb();
      const results = await db.select({
        role: workflows.role,
        count: sql<number>`count(*)`,
      }).from(workflows).groupBy(workflows.role);
      return results;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.query.workflows.findFirst({
        where: eq(workflows.id, input.id),
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
        steps: z.array(z.any()).optional(),
        author: z.string().default(""),
        likes: z.number().default(0),
        views: z.string().default(""),
        comments: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(workflows).values(input) as unknown as { insertId: bigint };
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
        steps: z.array(z.any()).optional(),
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
      await db.update(workflows).set(filtered).where(eq(workflows.id, id));
      return { updated: 1 };
    }),

  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(workflows).where(eq(workflows.id, input.id));
      return { deleted: 1 };
    }),
});
