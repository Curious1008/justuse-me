import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const locales = ["en", "zh-CN", "zh-TW"];
const defaultLocale = "en";

function getPathnameLocale(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|html|xml|txt|json|ico)$/.test(pathname)
  ) {
    return await updateSession(request);
  }

  // Already has a locale prefix → pass through
  const pathnameLocale = getPathnameLocale(pathname);
  if (pathnameLocale) {
    return await updateSession(request);
  }

  // No locale prefix → rewrite to /en/... internally (URL stays clean)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);

  // Still run Supabase session update
  const sessionResponse = await updateSession(request);
  // Copy session cookies to our rewrite response
  sessionResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      ...cookie,
    });
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|xml|txt|json)$).*)",
  ],
};
