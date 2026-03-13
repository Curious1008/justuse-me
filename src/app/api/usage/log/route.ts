import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { anon_id, tool_id } = await request.json();

  if (!anon_id || !tool_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  const { error } = await supabase.from("usage_log").insert({
    anon_id,
    tool_id,
    user_id: null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to log usage" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
