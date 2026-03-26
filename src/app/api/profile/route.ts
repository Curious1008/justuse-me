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

  // Input length validation
  if (typeof safeUpdate.display_name === "string" && safeUpdate.display_name.length > 100) {
    return NextResponse.json({ error: "Display name must be 100 characters or less" }, { status: 400 });
  }
  if (typeof safeUpdate.avatar_url === "string" && safeUpdate.avatar_url.length > 500) {
    return NextResponse.json({ error: "Avatar URL must be 500 characters or less" }, { status: 400 });
  }

  if (safeUpdate.avatar_url) {
    try {
      const url = new URL(safeUpdate.avatar_url as string);
      if (url.protocol !== "https:") {
        return NextResponse.json({ error: "Avatar URL must use HTTPS" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid avatar URL" }, { status: 400 });
    }
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
