import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazily initialise the DB client so this module can be statically
// analysed by Webpack during the client-side build without attempting
// to resolve Node-only modules (net, tls, fs, perf_hooks).
// The actual connection is only created when `db` is first accessed,
// which only happens inside Server Components / API Routes.

function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

let _db: ReturnType<typeof createDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    if (!_db) _db = createDb();
    return (_db as any)[prop];
  },
});
