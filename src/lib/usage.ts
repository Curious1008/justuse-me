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

  if (userId) {
    const res = await fetch("/api/usage/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool_id: toolId }),
    });
    if (res.ok) return res.json();
    return { allowed: true, used: 0, limit: DAILY_LIMIT };
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
    await fetch("/api/usage/log-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool_id: toolId }),
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
