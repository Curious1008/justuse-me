import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/tools/registry";
import type { Category } from "@/tools/types";
import ToolCard from "@/components/category/ToolCard";

const categoryLabels: Record<string, string> = {
  pdf: "PDF Tools",
  image: "Image Tools",
  text: "Text & Code Tools",
  convert: "Converter Tools",
  generator: "Generator Tools",
};

const categoryDescriptions: Record<string, string> = {
  pdf: "Merge, split, compress, and convert PDFs online for free.",
  image: "Compress, resize, and convert images instantly.",
  text: "Format JSON, count words, encode/decode Base64, and more.",
  convert: "Convert between CSV, JSON, YAML, XML, and other formats.",
  generator: "Generate QR codes, color palettes, and more.",
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${categoryLabels[category] || "Tools"} — JustUse.me`,
    description: categoryDescriptions[category] || "Free online tools.",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!categoryLabels[category]) notFound();

  const tools = getToolsByCategory(category as Category);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-3">
          {categoryLabels[category]}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {categoryDescriptions[category]}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
          />
        ))}
      </div>
    </div>
  );
}
