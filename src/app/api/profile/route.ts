import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const ALLOWED_FIELDS = new Set(["display_name", "avatar_url"]);

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const safeUpdate: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) {
      safeUpdate[key] = value;
    }
  }

  if (Object.keys(safeUpdate).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  safeUpdate.updated_at = new Date().toISOString();

  const serviceClient = await createServiceClient();
  const { data, error } = await serviceClient
    .from("profiles")
    .update(safeUpdate)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json(data);
}
