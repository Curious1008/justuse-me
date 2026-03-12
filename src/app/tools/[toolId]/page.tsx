import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolById, getAllTools } from "@/tools/registry";
import { generateToolMetadata } from "@/config/seo";
import ToolPageClient from "./client";

interface Props {
  params: Promise<{ toolId: string }>;
}

export async function generateStaticParams() {
  return getAllTools().map((t) => ({ toolId: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool) notFound();

  // Pass only serializable data to the server-rendered part.
  // The client component loads the full tool plugin with process function.
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="text-5xl mb-4 block">{tool.icon}</span>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{tool.name}</h1>
        <p className="text-gray-500">{tool.description}</p>
        {tool.runtime === "browser" && (
          <p className="text-xs text-green-600 mt-2">
            Your files never leave your device
          </p>
        )}
      </div>

      <ToolPageClient toolId={toolId} />

      <section className="mt-20 prose prose-gray prose-sm max-w-none">
        <h2>About {tool.name}</h2>
        <p>
          {tool.description} Powered by JustUse.me — free, ad-free, and
          private.
          {tool.runtime === "browser"
            ? " This tool runs entirely in your browser. Your files are never uploaded to any server."
            : ""}
        </p>
      </section>
    </div>
  );
}
