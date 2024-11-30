import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.js", // Path to your schema file
  out: "./drizzle", // Output folder for migrations
  dialect: "postgresql", // Specify your database type
  driver: "pg", // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL, // Use environment variable for security
  },
});
