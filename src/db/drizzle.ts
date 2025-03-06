import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import schema from "./schema.ts";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});

const db = drizzle({
  client: pool,
  schema: { ...schema },
  logger: false,
});

export default db;
