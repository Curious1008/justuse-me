import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/tools/registry";
import type { Category } from "@/tools/types";
import ToolCard from "@/components/category/ToolCard";

const categoryLabels: Record<string, string> = {
  pdf: "PDF Tools",
  image: "Image Tools",
  text: "Text & Code Tools",
};

const categoryDescriptions: Record<string, string> = {
  pdf: "Merge, split, compress, and convert PDFs online for free.",
  image: "Compress, resize, and convert images instantly.",
  text: "Format JSON, count words, encode/decode Base64, and more.",
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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {categoryLabels[category]}
      </h1>
      <p className="text-gray-500 mb-10">{categoryDescriptions[category]}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
