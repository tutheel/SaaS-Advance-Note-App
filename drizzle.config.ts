import type { Config as OriginalConfig } from "drizzle-kit";

type Config = OriginalConfig & {
  driver: "pg" | "pglite";
  dbCredentials: {
    connectionString: string;
  };
};
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Cannot find Database URL, DATABASE_URL in Env file is required"
  );
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;