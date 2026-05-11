import 'dotenv/config'
import * as dotenvLocal from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Drizzle CLI لا يقرأ .env.local تلقائياً — نحمّله يدوياً
dotenvLocal.config({ path: '.env.local' })

export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
