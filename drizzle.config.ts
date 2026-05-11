import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Drizzle CLI does not auto-load .env.local (Next.js convention).
// We load it explicitly so `npm run db:push / db:migrate / db:studio`
// all work out-of-the-box without manually exporting DATABASE_URL.
config({ path: '.env.local' })

export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
