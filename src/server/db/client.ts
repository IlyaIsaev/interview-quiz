import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";

export function createDb(): ReturnType<typeof drizzle> {
  return drizzle(env.DB);
}
