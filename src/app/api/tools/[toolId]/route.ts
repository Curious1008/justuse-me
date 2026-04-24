import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, usageLog } from "@/lib/db/schema";
import { and, eq, gte, isNull, sql } from "drizzle-orm";
import { getToolById } from "@/tools/registry";
import { processServerTool } from "@/lib/tools/server-process";

const DAILY_LIMIT = 3;

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

async function countByUser(userId: string, since: Date): Promise<number> {
  const [row] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(usageLog)
    .where(and(eq(usageLog.userId, userId), gte(usageLog.usedAt, since)));
  return row?.c ?? 0;
}

async function countByAnon(anonId: string, since: Date): Promise<number> {
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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool || tool.runtime !== "server") {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const session = await auth();
  const user = session?.user;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let plan: "free" | "pro" | null = null;

  if (user) {
    const [row] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);
    plan = row?.plan ?? null;
  }

  if (plan !== "pro") {
    const anonId = request.headers.get("x-anon-id");

    if (user) {
      const count = await countByUser(user.id, today);
      if (count >= DAILY_LIMIT) {
        return NextResponse.json(
          { error: "Daily usage limit reached", used: count, limit: DAILY_LIMIT },
          { status: 429 }
        );
      }
    } else {
      const ip = getClientIp(request);
      const ipAnonId = `ip_${ip}`;

      const checks: Promise<number>[] = [countByAnon(ipAnonId, today)];
      if (anonId) checks.push(countByAnon(anonId, today));

      const results = await Promise.all(checks);
      const used = Math.max(...results);

      if (used >= DAILY_LIMIT) {
        return NextResponse.json(
          { error: "Daily usage limit reached", used, limit: DAILY_LIMIT },
          { status: 429 }
        );
      }
    }
  }

  try {
    const formData = await request.formData();
    const fileEntries = formData.getAll("files") as File[];

    if (fileEntries.length > tool.maxFiles) {
      return NextResponse.json({ error: `Too many files (max ${tool.maxFiles})` }, { status: 400 });
    }
    if (tool.maxFileSize) {
      const tooBig = fileEntries.find((f) => f.size > tool.maxFileSize!);
      if (tooBig) {
        return NextResponse.json({ error: `File too large (max ${Math.round(tool.maxFileSize / 1024 / 1024)}MB)` }, { status: 400 });
      }
    }
    if (fileEntries.some((f) => f.size === 0)) {
      return NextResponse.json({ error: "Empty file uploaded" }, { status: 400 });
    }

    const optionsStr = formData.get("options") as string | null;
    const options = optionsStr ? JSON.parse(optionsStr) : undefined;

    const result = await processServerTool(toolId, fileEntries, options);

    const anonId = request.headers.get("x-anon-id");
    if (user) {
      await db.insert(usageLog).values({
        userId: user.id,
        anonId: null,
        toolId,
      });
    } else {
      const ip = getClientIp(request);
      const ipAnonId = `ip_${ip}`;
      const rows = [{ anonId: ipAnonId, toolId, userId: null }];
      if (anonId) rows.push({ anonId, toolId, userId: null });
      await db.insert(usageLog).values(rows);
    }

    return new NextResponse(result.blob, {
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `attachment; filename="${result.filename.replace(/["\r\n]/g, "_")}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
