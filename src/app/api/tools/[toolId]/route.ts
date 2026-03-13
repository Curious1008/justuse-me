import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getToolById } from "@/tools/registry";
import { processServerTool } from "@/lib/tools/server-process";

const DAILY_LIMIT = 3;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool || tool.runtime !== "server") {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Usage check
  const serviceClient = await createServiceClient();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let plan: string | null = null;

  if (user) {
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    plan = profile?.plan ?? null;
  }

  if (plan !== "pro") {
    const anonId = request.headers.get("x-anon-id");
    const identifier = user
      ? { user_id: user.id }
      : anonId
        ? { anon_id: anonId }
        : null;

    if (!identifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const query = serviceClient
      .from("usage_log")
      .select("*", { count: "exact", head: true })
      .gte("used_at", today.toISOString());

    if ("user_id" in identifier) {
      query.eq("user_id", identifier.user_id);
    } else {
      query.eq("anon_id", identifier.anon_id).is("user_id", null);
    }

    const { count } = await query;

    if ((count ?? 0) >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily usage limit reached", used: count, limit: DAILY_LIMIT },
        { status: 429 }
      );
    }
  }

  // Process
  try {
    const formData = await request.formData();
    const fileEntries = formData.getAll("files") as File[];
    const optionsStr = formData.get("options") as string | null;
    const options = optionsStr ? JSON.parse(optionsStr) : undefined;

    const result = await processServerTool(toolId, fileEntries, options);

    // Log usage
    const anonId = request.headers.get("x-anon-id");
    await serviceClient.from("usage_log").insert({
      user_id: user?.id ?? null,
      anon_id: user ? null : anonId,
      tool_id: toolId,
    });

    return new NextResponse(result.blob, {
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `attachment; filename="${result.filename}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
