import { z } from "zod";
import { eq, like, or, and, sql } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { skills } from "@db/schema";

export const skillsRouter = createRouter({
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
        conditions.push(eq(skills.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(skills.title, q),
            like(skills.titleEn, q),
            like(skills.description, q),
            like(skills.descriptionEn, q),
            like(skills.scenario, q),
            like(skills.scenarioEn, q),
            like(skills.problemFocus, q),
            like(skills.problemFocusEn, q),
            like(skills.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const results = await db.query.skills.findMany({
        where,
        orderBy: (skills, { desc }) => [desc(skills.createdAt)],
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
        conditions.push(eq(skills.role, input.role));
      }

      if (input?.search) {
        const q = `%${input.search}%`;
        conditions.push(
          or(
            like(skills.title, q),
            like(skills.titleEn, q),
            like(skills.description, q),
            like(skills.descriptionEn, q),
            like(skills.content, q)
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const result = await db.select({ count: sql<number>`count(*)` }).from(skills).where(where);
      return result[0]?.count ?? 0;
    }),

  roleStats: publicQuery
    .query(async () => {
      const db = getDb();
      const results = await db.select({
        role: skills.role,
        count: sql<number>`count(*)`,
      }).from(skills).groupBy(skills.role);
      return results;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.query.skills.findFirst({
        where: eq(skills.id, input.id),
      });
      return result ?? null;
    }),

});
