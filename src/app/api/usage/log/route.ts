import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usageLog } from "@/lib/db/schema";

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const ipAnonId = `ip_${ip}`;

  try {
    await db.insert(usageLog).values([
      { anonId: anon_id, toolId: tool_id, userId: null },
      { anonId: ipAnonId, toolId: tool_id, userId: null },
    ]);
  } catch {
    return NextResponse.json({ error: "Failed to log usage" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
