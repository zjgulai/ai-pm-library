import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";

let instance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is required for DB-backed API routes");
  }

  if (!instance) {
    instance = drizzle(env.databaseUrl, {
      schema,
      mode: "default",
    });
  }
  return instance;
}
