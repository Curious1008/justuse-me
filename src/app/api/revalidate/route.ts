import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Accept secret from Authorization header (preferred) or query param (backward compat)
  const authHeader = request.headers.get("authorization")?.replace("Bearer ", "");
  const querySecret = request.nextUrl.searchParams.get("secret");
  const secret = authHeader || querySecret;
  const path = request.nextUrl.searchParams.get("path");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: "Path required" }, { status: 400 });
  }

  // Validate path is a reasonable route pattern
  if (!path.startsWith("/") || path.length > 200) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ revalidated: true });
}
