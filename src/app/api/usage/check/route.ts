import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usageLog } from "@/lib/db/schema";
import { and, eq, gte, isNull, sql } from "drizzle-orm";

const DAILY_LIMIT = 3;

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function countByAnon(anonId: string, since: Date) {
  const [row] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(usageLog)
    .where(
      and(
        eq(usageLog.anonId, anonId),
        isNull(usageLog.userId),
        gte(usageLog.usedAt, since)
      )
    );
  return row?.c ?? 0;
}

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const ip = getClientIp(request);
  const ipAnonId = `ip_${ip}`;

  const [byAnon, byIp] = await Promise.all([
    countByAnon(anon_id, today),
    countByAnon(ipAnonId, today),
  ]);

  const used = Math.max(byAnon, byIp);

  return NextResponse.json({
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
  });
}
