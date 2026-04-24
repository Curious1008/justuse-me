import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const ALLOWED_FIELDS = new Set(["display_name", "avatar_url"]);

export async function PATCH(request: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const safeUpdate: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) safeUpdate[key] = value;
  }

  if (Object.keys(safeUpdate).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  if (typeof safeUpdate.display_name === "string" && safeUpdate.display_name.length > 100) {
    return NextResponse.json({ error: "Display name must be 100 characters or less" }, { status: 400 });
  }
  if (typeof safeUpdate.avatar_url === "string" && safeUpdate.avatar_url.length > 500) {
    return NextResponse.json({ error: "Avatar URL must be 500 characters or less" }, { status: 400 });
  }

  if (safeUpdate.avatar_url) {
    try {
      const url = new URL(safeUpdate.avatar_url as string);
      if (url.protocol !== "https:") {
        return NextResponse.json({ error: "Avatar URL must use HTTPS" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid avatar URL" }, { status: 400 });
    }
  }

  const updateRow: Partial<typeof users.$inferInsert> = { updatedAt: new Date() };
  if (typeof safeUpdate.display_name === "string") updateRow.displayName = safeUpdate.display_name;
  if (typeof safeUpdate.avatar_url === "string") updateRow.avatarUrl = safeUpdate.avatar_url;

  const [row] = await db
    .update(users)
    .set(updateRow)
    .where(eq(users.id, user.id))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({
    id: row.id,
    email: row.email,
    display_name: row.displayName,
    avatar_url: row.avatarUrl,
    plan: row.plan,
  });
}
