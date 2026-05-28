import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";

let instance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!instance) {
    instance = drizzle(env.databaseUrl, {
      schema,
      mode: "default",
    });
  }
  return instance;
}
