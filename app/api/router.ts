import { createRouter, publicQuery } from "./middleware";
import { promptsRouter } from "./prompts-router";
import { skillsRouter } from "./skills-router";
import { workflowsRouter } from "./workflows-router";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  prompts: promptsRouter,
  skills: skillsRouter,
  workflows: workflowsRouter,
});

export type AppRouter = typeof appRouter;
