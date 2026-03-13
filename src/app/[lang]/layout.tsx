import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);

  const langAlternates: Record<string, string> = {};
  for (const l of locales) {
    langAlternates[l] = l === defaultLocale ? "https://justuse.me" : `https://justuse.me/${l}`;
  }
  langAlternates["x-default"] = "https://justuse.me";

  return {
    title: {
      default: t.meta.siteTitle,
      template: "%s | JustUse.me",
    },
    description: t.meta.siteDescription,
    alternates: {
      canonical: locale === defaultLocale ? "https://justuse.me" : `https://justuse.me/${locale}`,
      languages: langAlternates,
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      url: locale === defaultLocale ? "https://justuse.me" : `https://justuse.me/${locale}`,
      siteName: "JustUse.me",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t.meta.ogTitle,
      description: t.meta.twitterDescription,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;

  return (
    <AuthProvider>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${locale}"` }} />
      <Header lang={locale} />
      <main className="flex-1">{children}</main>
      <Footer lang={locale} />
    </AuthProvider>
  );
}
