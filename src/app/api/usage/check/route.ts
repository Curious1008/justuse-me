import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const DAILY_LIMIT = 3;

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("anon_id", anon_id)
    .is("user_id", null)
    .gte("used_at", today.toISOString());

  const used = count ?? 0;

  return NextResponse.json({
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
  });
}
