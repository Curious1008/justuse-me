import type { Metadata } from "next";
import { locales, defaultLocale, pageAlternates, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  return { alternates: pageAlternates(locale, "/privacy") };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
