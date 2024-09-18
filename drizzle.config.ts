import { Config, defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./lib/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
}) satisfies Config
