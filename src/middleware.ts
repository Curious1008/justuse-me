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

function detectLocale(request: NextRequest): string {
  // Check cookie first (user's explicit choice via language switcher)
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  // Parse Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  // e.g. "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"
  const langs = acceptLang
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.trim(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    // Exact match: zh-CN, zh-TW, en
    if (locales.includes(lang)) return lang;
    // zh-Hans → zh-CN, zh-Hant → zh-TW
    if (lang === "zh-Hans" || lang === "zh-Hans-CN") return "zh-CN";
    if (lang === "zh-Hant" || lang === "zh-Hant-TW" || lang === "zh-Hant-HK") return "zh-TW";
    // Bare "zh" → zh-CN (mainland default)
    if (lang === "zh") return "zh-CN";
    // en-US, en-GB, etc.
    if (lang.startsWith("en")) return "en";
  }

  return defaultLocale;
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "0");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/favicon") ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|html|xml|txt|json|ico)$/.test(pathname)
  ) {
    return addSecurityHeaders(await updateSession(request));
  }

  // Already has a locale prefix → pass through
  const pathnameLocale = getPathnameLocale(pathname);
  if (pathnameLocale) {
    return addSecurityHeaders(await updateSession(request));
  }

  // Detect best locale from cookie or Accept-Language
  const locale = detectLocale(request);

  // Non-default locale → redirect to prefixed URL (e.g. /zh-CN/tools/merge-pdf)
  if (locale !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return addSecurityHeaders(NextResponse.redirect(url));
  }

  // English → rewrite to /en/... internally (URL stays clean at root)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);

  // Still run Supabase session update
  const sessionResponse = await updateSession(request);
  sessionResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      ...cookie,
    });
  });

  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html|xml|txt|json)$).*)",
  ],
};
