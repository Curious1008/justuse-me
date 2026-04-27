import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/tools/registry";
import type { Category } from "@/tools/types";
import ToolCard from "@/components/category/ToolCard";
import CatIcon from "@/components/icons/CatIcon";
import PageTitle from "@/components/page/PageTitle";
import { getDictionary, locales, defaultLocale, pageAlternates, type Locale } from "@/lib/i18n";
import { generateCategoryBreadcrumbJsonLd } from "@/config/seo";

const CATEGORY_HUES: Record<Category, number> = {
  pdf: 15,
  image: 280,
  text: 230,
  convert: 170,
  generator: 45,
  calculator: 200,
  developer: 310,
  utility: 140,
};

interface Props {
  params: Promise<{ lang: string; category: string }>;
}

// Only allow known categories — prevents [category] from matching /news, /pricing, etc.
export const dynamicParams = false;

export async function generateStaticParams() {
  const cats = getCategories();
  return locales.flatMap((lang) => cats.map((c) => ({ lang, category: c })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);
  const cat = t.categoryPage[category as keyof typeof t.categoryPage];
  if (!cat) return {};

  const alternates = pageAlternates(locale, `/${category}`);

  return {
    title: t.meta.categoryMetaTitle.replace("{label}", cat.title),
    description: t.meta.categoryMetaDescription.replace("{desc}", cat.description),
    alternates,
    openGraph: {
      title: `${cat.title} — JustUse.me`,
      description: cat.description,
      url: alternates.canonical,
      type: "website",
      siteName: "JustUse.me",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { lang, category } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale;
  const t = await getDictionary(locale);
  const cat = t.categoryPage[category as keyof typeof t.categoryPage];

  if (!cat) notFound();

  const tools = getToolsByCategory(category as Category, locale);

  const breadcrumbJsonLd = generateCategoryBreadcrumbJsonLd(category, cat.title, locale);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: cat.title,
          url: locale === defaultLocale
            ? `https://www.justuse.me/${category}`
            : `https://www.justuse.me/${locale}/${category}`,
          description: cat.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: tools.map((tool, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: t.tools[tool.id]?.name || tool.name,
              url: locale === defaultLocale
                ? `https://www.justuse.me/tools/${tool.id}`
                : `https://www.justuse.me/${locale}/tools/${tool.id}`,
            })),
          },
        }) }}
      />
      <div className="flex items-start gap-4 mb-10">
        <div
          className="w-14 h-14 rounded-2xl inline-flex items-center justify-center shrink-0"
          style={{
            background: `oklch(95% 0.04 ${CATEGORY_HUES[category as Category] ?? 0})`,
            color: `oklch(45% 0.12 ${CATEGORY_HUES[category as Category] ?? 0})`,
          }}
        >
          <CatIcon category={category as Category} size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.6px] text-[var(--color-text-muted)] mb-1">
            Category · {tools.length} {tools.length === 1 ? "tool" : "tools"}
          </div>
          <PageTitle title={cat.title} lede={cat.description} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const toolT = t.tools[tool.id];
          return (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={toolT?.name || tool.name}
              description={toolT?.description || tool.description}
              icon={tool.icon}
              lang={locale}
            />
          );
        })}
      </div>
    </div>
  );
}
