import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/tools/registry";
import type { Category } from "@/tools/types";
import ToolCard from "@/components/category/ToolCard";
import { getDictionary, locales, defaultLocale, localePath, type Locale } from "@/lib/i18n";

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

  const canonical = locale === defaultLocale
    ? `https://www.justuse.me/${category}`
    : `https://www.justuse.me/${locale}/${category}`;

  return {
    title: t.meta.categoryMetaTitle.replace("{label}", cat.title),
    description: t.meta.categoryMetaDescription.replace("{desc}", cat.description),
    alternates: { canonical },
    openGraph: {
      title: `${cat.title} — JustUse.me`,
      description: cat.description,
      url: canonical,
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

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-3">
          {cat.title}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {cat.description}
        </p>
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
