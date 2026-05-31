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

});
