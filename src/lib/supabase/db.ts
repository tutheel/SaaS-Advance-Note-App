import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";
import postgress from "postgres";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "🔴 Cannot find Database URL, DATABASE_URL in Env file is required"
  );
}

const client = postgress(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("🟠 Migrating Database");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Database Migrated");
  } catch (error) {
    console.log("🔴 Error Migrating Database",error);
  }
};
migrateDb();
export default db;
