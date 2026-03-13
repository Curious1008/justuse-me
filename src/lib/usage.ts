import { createClient } from "@/lib/supabase/client";
import { getAnonId } from "@/lib/anon-id";

const DAILY_LIMIT = 3;

interface UsageCheck {
  allowed: boolean;
  used: number;
  limit: number;
}

export async function checkUsage(
  toolId: string,
  userId: string | null,
  plan: string | null
): Promise<UsageCheck> {
  if (plan === "pro") {
    return { allowed: true, used: 0, limit: Infinity };
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (userId) {
    const supabase = createClient();
    const { count } = await supabase
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("used_at", today.toISOString());

    const used = count ?? 0;
    return { allowed: used < DAILY_LIMIT, used, limit: DAILY_LIMIT };
  }

  const anonId = getAnonId();
  const res = await fetch("/api/usage/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anon_id: anonId, tool_id: toolId }),
  });
  return res.json();
}

export async function logUsage(
  toolId: string,
  userId: string | null
): Promise<void> {
  if (userId) {
    const supabase = createClient();
    await supabase.from("usage_log").insert({
      user_id: userId,
      tool_id: toolId,
    });
    return;
  }

  const anonId = getAnonId();
  await fetch("/api/usage/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ anon_id: anonId, tool_id: toolId }),
  });
}
