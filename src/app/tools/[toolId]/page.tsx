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

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)] tracking-tight text-[var(--color-text)] mb-2">
          {tool.name}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {tool.description}
        </p>
        {tool.runtime === "browser" && !tool.inputMode && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <p className="text-xs text-[var(--color-accent)]">
              Processed locally — files never leave your device
            </p>
          </div>
        )}
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          {tool.inputMode === "text" ? "Text input" : (
            <>
              {tool.acceptedTypes.map(t => t.split('/')[1]?.toUpperCase()).filter(Boolean).join(', ')}
              {tool.maxFileSize && ` · Max ${tool.maxFileSize >= 1024*1024 ? `${Math.round(tool.maxFileSize/1024/1024)}MB` : `${Math.round(tool.maxFileSize/1024)}KB`}`}
              {tool.maxFiles > 1 && ` · Up to ${tool.maxFiles} files`}
            </>
          )}
        </p>
      </div>

      <ToolPageClient toolId={toolId} />

      <section className="mt-24 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-3">
          About this tool
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
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
