import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getToolById, getAllTools } from "@/tools/registry";
import { generateToolJsonLd, generateToolBreadcrumbJsonLd } from "@/config/seo";
import { getToolSEOContent } from "@/config/tool-seo-content";
import ToolIcon from "@/components/tool/ToolIcon";
import TrustChips from "@/components/tool/TrustChips";
import ToolPageClient from "./client";
import type { Category } from "@/tools/types";

const CATEGORY_HUES: Record<Category, number> = {
  pdf: 15, image: 280, text: 230, convert: 170,
  generator: 45, calculator: 200, developer: 310, utility: 140,
};
import { getDictionary, locales, defaultLocale, localePath, pageAlternates, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string; toolId: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return locales.flatMap((lang) =>
    tools
      .filter((t) => !t.hiddenLocales?.includes(lang))
      .map((t) => ({ lang, toolId: t.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, toolId } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const tool = getToolById(toolId);
  if (!tool) return {};

  const t = await getDictionary(locale);
  const toolT = t.tools[toolId];
  const seo = t.toolSeo[toolId];
  const name = toolT?.name || tool.name;
  const toolDesc = toolT?.description || tool.description;
  const maxSize = tool.maxFileSize ? (tool.maxFileSize >= 1024 * 1024 ? `${Math.round(tool.maxFileSize / 1024 / 1024)}MB` : `${Math.round(tool.maxFileSize / 1024)}KB`) : null;
  const filesNote = tool.maxFiles > 1 ? `up to ${tool.maxFiles} files` : null;
  const specs = [filesNote, maxSize ? `${maxSize} max` : null].filter(Boolean).join(", ");
  const tail =
    t.meta.toolMetaDescTails?.[tool.category as keyof typeof t.meta.toolMetaDescTails] ??
    t.meta.toolMetaDescSuffix;
  const description = `${toolDesc}${specs ? ` (${specs})` : ""}. ${tail}`;

  const alternates = pageAlternates(locale, `/tools/${toolId}`);

  return {
    title: t.meta.toolMetaTitle.replace("{name}", name),
    description,
    keywords: tool.keywords,
    alternates,
    openGraph: {
      title: t.meta.toolOgTitle.replace("{name}", name),
      description,
      url: alternates.canonical,
      type: "website",
      siteName: "JustUse.me",
    },
    twitter: {
      card: "summary",
      title: t.meta.toolMetaTitle.replace("{name}", name),
      description: toolT?.description || tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { lang, toolId } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const tool = getToolById(toolId);

  if (!tool || tool.hiddenLocales?.includes(locale)) notFound();

  const t = await getDictionary(locale);
  const toolT = t.tools[toolId];
  const seo = t.toolSeo[toolId];
  const jsonLd = generateToolJsonLd(tool, locale, seo?.faq, seo?.longDescription);
  const categoryLabel = t.categoryPage[tool.category as keyof typeof t.categoryPage]?.title || tool.category;
  const breadcrumbJsonLd = generateToolBreadcrumbJsonLd(tool, categoryLabel, locale);
  const allTools = getAllTools(locale);

  // Use English SEO content for related tools list (IDs are the same)
  const enSeo = getToolSEOContent(toolId);
  const relatedTools = enSeo?.related
    ?.map((id) => allTools.find((tt) => tt.id === id))
    .filter(Boolean) ?? [];

  const toolName = toolT?.name || tool.name;
  const toolDesc = toolT?.description || tool.description;
  const hue = CATEGORY_HUES[tool.category];
  const categoryTools = allTools.filter((tt) => tt.category === tool.category && tt.id !== tool.id).slice(0, 4);
  const specsLine = tool.inputMode === "text" ? t.tool.textInput : [
    tool.acceptedTypes.map(tp => tp.split('/')[1]?.toUpperCase()).filter(Boolean).join(', '),
    tool.maxFileSize && t.tool.max.replace("{size}", tool.maxFileSize >= 1024*1024 ? `${Math.round(tool.maxFileSize/1024/1024)}MB` : `${Math.round(tool.maxFileSize/1024)}KB`),
    tool.maxFiles > 1 && t.tool.upTo.replace("{n}", String(tool.maxFiles)),
  ].filter(Boolean).join(' · ');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* JSON-LD structured data */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero: left-aligned icon + eyebrow + title + trust chips; sidebar on desktop */}
      <div className="grid gap-6 md:grid-cols-[1fr_240px] items-start mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-10 h-10 rounded-[10px] inline-flex items-center justify-center"
              style={{ background: `oklch(95% 0.04 ${hue})`, color: `oklch(45% 0.12 ${hue})` }}
            >
              <ToolIcon toolId={tool.id} fallbackEmoji={tool.icon} size="sm" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-[0.5px] text-[var(--color-text-muted)]">
              <Link href={localePath(locale, `/${tool.category}`)} className="hover:text-[var(--color-text-secondary)]">
                {categoryLabel}
              </Link>
            </div>
          </div>
          <h1
            className="font-[family-name:var(--font-sora)] font-bold tracking-tight leading-[1.05] text-[var(--color-text)] mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 36px)", letterSpacing: "-1px" }}
          >
            {toolName}
          </h1>
          <p className="text-[15px] leading-[1.5] text-[var(--color-text-secondary)] max-w-xl mb-4">
            {toolDesc}
          </p>
          <TrustChips lang={locale} serverRuntime={tool.runtime === "server"} />
          {specsLine && (
            <p className="text-[11px] font-mono text-[var(--color-text-muted)] mt-3">{specsLine}</p>
          )}
        </div>

        {categoryTools.length > 0 && (
          <aside className="hidden md:block rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3.5">
            <div className="text-[11px] font-mono uppercase tracking-[0.4px] text-[var(--color-text-muted)] mb-2">
              {t.tool.relatedTools}
            </div>
            {categoryTools.map((tt) => (
              <Link
                key={tt.id}
                href={localePath(locale, `/tools/${tt.id}`)}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-[12.5px] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] transition-colors"
              >
                <span className="truncate">{t.tools[tt.id]?.name || tt.name}</span>
                <span className="text-[var(--color-text-muted)] shrink-0 ml-2">›</span>
              </Link>
            ))}
          </aside>
        )}
      </div>

      {/* Per-locale advisory (e.g. language-support limitations) */}
      {tool.localeWarnings?.[locale] && (
        <div className="mb-8 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zm-.75-12.75h1.5l8.25 14.25a.75.75 0 01-.65 1.125H3.65a.75.75 0 01-.65-1.125L11.25 4.5z" />
          </svg>
          <p className="leading-relaxed">{tool.localeWarnings[locale]}</p>
        </div>
      )}

      {/* Tool UI */}
      <ToolPageClient toolId={toolId} labels={{
        chooseDifferentFile: t.tool.chooseDifferentFile,
        processFallback: t.tool.processFallback,
        processAnother: t.tool.processAnother,
        tryAgain: t.tool.tryAgain,
        addMoreFiles: t.tool.addMoreFiles,
        dropFileHere: t.tool.dropFileHere,
        dropFilesHere: t.tool.dropFilesHere,
        browse: t.tool.browse,
        anyFile: t.tool.anyFile,
        dragToReorder: t.tool.dragToReorder,
        processNFiles: t.tool.processNFiles,
        downloaded: t.tool.downloaded,
        download: t.tool.download,
        processing: t.tool.processing,
        dailyLimitTitle: t.tool.dailyLimitTitle,
        dailyLimitDesc: t.tool.dailyLimitDesc,
        createFreeAccount: t.tool.createFreeAccount,
        seeProPlans: t.tool.seeProPlans,
        upgradeToPro: t.tool.upgradeToPro,
        maybeLater: t.tool.maybeLater,
        nFiles: t.tool.nFiles,
      }} />

      {/* ─── SEO Content (below the fold) ─── */}
      <div className="mt-24 space-y-12">

        {/* How it works */}
        {seo?.steps && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              {t.tool.howItWorks.replace("{name}", toolName)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {seo.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                  <span className="w-7 h-7 rounded-full bg-[var(--color-accent-glow)] text-[var(--color-accent)] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="pt-8 border-t border-[var(--color-border)]">
          <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
            {t.tool.about.replace("{name}", toolName)}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {seo?.longDescription ?? toolDesc}{" "}
            {t.tool.aboutSuffix}
            {tool.runtime === "browser" ? ` ${t.tool.aboutBrowser}` : ""}
          </p>
        </section>

        {/* FAQ */}
        {seo?.faq && seo.faq.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              {t.tool.faq.replace("{name}", toolName)}
            </h2>
            <div className="space-y-3">
              {seo.faq.map((item, i) => (
                <details key={i} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[var(--color-text)] select-none">
                    {item.q}
                    <svg className="w-4 h-4 text-[var(--color-text-muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <p className="px-4 pb-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Why JustUse.me */}
        {seo?.whyUs && (
          <section className="pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-3">
              {`Why JustUse.me for ${toolName}?`}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {seo.whyUs}
            </p>
          </section>
        )}

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              {t.tool.relatedTools}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedTools.map((rt) => rt && (
                <Link
                  key={rt.id}
                  href={localePath(locale, `/tools/${rt.id}`)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors text-center"
                >
                  <ToolIcon toolId={rt.id} fallbackEmoji={rt.icon} size="sm" />
                  <span className="text-xs font-medium text-[var(--color-text)]">{t.tools[rt.id]?.name || rt.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-[var(--color-text-muted)] pt-8 border-t border-[var(--color-border)]">
          {t.tool.lastUpdated}: April 2026
        </p>
      </div>
    </div>
  );
}
