import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { usageLog } from "@/lib/db/schema";

export async function POST(request: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tool_id } = await request.json();
  if (!tool_id) {
    return NextResponse.json({ error: "Missing tool_id" }, { status: 400 });
  }

  await db.insert(usageLog).values({
    userId: user.id,
    anonId: null,
    toolId: tool_id,
  });

  return NextResponse.json({ ok: true });
}
