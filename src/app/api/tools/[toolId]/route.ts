import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getToolById } from "@/tools/registry";
import { processServerTool } from "@/lib/tools/server-process";

const DAILY_LIMIT = 3;

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

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

    if (user) {
      // Logged-in non-pro user: check by user_id
      const { count } = await serviceClient
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("used_at", today.toISOString());

      if ((count ?? 0) >= DAILY_LIMIT) {
        return NextResponse.json(
          { error: "Daily usage limit reached", used: count, limit: DAILY_LIMIT },
          { status: 429 }
        );
      }
    } else {
      // Anonymous user: check both anon_id AND IP to prevent incognito bypass
      const ip = getClientIp(request);
      const ipAnonId = `ip_${ip}`;

      const checks = [
        serviceClient
          .from("usage_log")
          .select("*", { count: "exact", head: true })
          .eq("anon_id", ipAnonId)
          .is("user_id", null)
          .gte("used_at", today.toISOString()),
      ];

      if (anonId) {
        checks.push(
          serviceClient
            .from("usage_log")
            .select("*", { count: "exact", head: true })
            .eq("anon_id", anonId)
            .is("user_id", null)
            .gte("used_at", today.toISOString())
        );
      }

      const results = await Promise.all(checks);
      const used = Math.max(...results.map((r) => r.count ?? 0));

      if (used >= DAILY_LIMIT) {
        return NextResponse.json(
          { error: "Daily usage limit reached", used, limit: DAILY_LIMIT },
          { status: 429 }
        );
      }
    }
  }

  // Process
  try {
    const formData = await request.formData();
    const fileEntries = formData.getAll("files") as File[];

    // Server-side file validation
    if (fileEntries.length > tool.maxFiles) {
      return NextResponse.json({ error: `Too many files (max ${tool.maxFiles})` }, { status: 400 });
    }
    if (tool.maxFileSize) {
      const tooBig = fileEntries.find((f) => f.size > tool.maxFileSize!);
      if (tooBig) {
        return NextResponse.json({ error: `File too large (max ${Math.round(tool.maxFileSize / 1024 / 1024)}MB)` }, { status: 400 });
      }
    }
    if (fileEntries.some((f) => f.size === 0)) {
      return NextResponse.json({ error: "Empty file uploaded" }, { status: 400 });
    }

    const optionsStr = formData.get("options") as string | null;
    const options = optionsStr ? JSON.parse(optionsStr) : undefined;

    const result = await processServerTool(toolId, fileEntries, options);

    // Log usage
    const anonId = request.headers.get("x-anon-id");
    if (user) {
      await serviceClient.from("usage_log").insert({
        user_id: user.id,
        anon_id: null,
        tool_id: toolId,
      });
    } else {
      const ip = getClientIp(request);
      const ipAnonId = `ip_${ip}`;
      // Log both anon_id and IP-based id to prevent incognito bypass
      const rows = [{ anon_id: ipAnonId, tool_id: toolId, user_id: null }];
      if (anonId) rows.push({ anon_id: anonId, tool_id: toolId, user_id: null });
      await serviceClient.from("usage_log").insert(rows);
    }

    return new NextResponse(result.blob, {
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `attachment; filename="${result.filename.replace(/["\r\n]/g, "_")}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
