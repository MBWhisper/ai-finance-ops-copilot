import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function createUser(data: { id: string; email: string; name?: string; avatarUrl?: string }) {
  return db.insert(users).values({
    id: data.id,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatarUrl,
  }).onConflictDoNothing();
}
