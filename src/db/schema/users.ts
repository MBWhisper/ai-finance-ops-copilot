import { pgTable, uuid, text, date, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  plan: text("plan").default("free").notNull(),
  trialEndsAt: date("trial_ends_at"),
  planExpiresAt: timestamp("plan_expires_at"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  settings: jsonb("settings").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
