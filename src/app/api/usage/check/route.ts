import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const DAILY_LIMIT = 3;

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Check both by anon_id and by IP to prevent incognito bypass
  const ip = getClientIp(request);
  const ipAnonId = `ip_${ip}`;

  const [byAnon, byIp] = await Promise.all([
    supabase
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .eq("anon_id", anon_id)
      .is("user_id", null)
      .gte("used_at", today.toISOString()),
    supabase
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .eq("anon_id", ipAnonId)
      .is("user_id", null)
      .gte("used_at", today.toISOString()),
  ]);

  // Use the higher count — prevents fresh anon_id from resetting quota
  const used = Math.max(byAnon.count ?? 0, byIp.count ?? 0);

  return NextResponse.json({
    allowed: used < DAILY_LIMIT,
    used,
    limit: DAILY_LIMIT,
  });
}
