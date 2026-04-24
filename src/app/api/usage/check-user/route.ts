import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { usageLog } from "@/lib/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";

const DAILY_LIMIT = 3;

export async function POST() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const [row] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(usageLog)
    .where(and(eq(usageLog.userId, user.id), gte(usageLog.usedAt, today)));

  const used = row?.c ?? 0;
  return NextResponse.json({
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
  });
}
