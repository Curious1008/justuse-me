import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getToolById, getAllTools } from "@/tools/registry";
import { generateToolMetadata, generateToolJsonLd } from "@/config/seo";
import { getToolSEOContent } from "@/config/tool-seo-content";
import ToolIcon from "@/components/tool/ToolIcon";
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

  const seo = getToolSEOContent(toolId);
  const jsonLd = generateToolJsonLd(tool);
  const allTools = getAllTools();
  const relatedTools = seo?.related
    ?.map((id) => allTools.find((t) => t.id === id))
    .filter(Boolean) ?? [];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* JSON-LD structured data */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
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

      {/* Tool UI */}
      <ToolPageClient toolId={toolId} />

      {/* ─── SEO Content (below the fold) ─── */}
      <div className="mt-24 space-y-12">

        {/* How it works */}
        {seo?.steps && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-3 gap-4">
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
            About {tool.name}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {seo?.longDescription ?? tool.description}{" "}
            Powered by JustUse.me — free, ad-free, and private.
            {tool.runtime === "browser"
              ? " This tool runs entirely in your browser. Your files are never uploaded to any server."
              : ""}
          </p>
        </section>

        {/* FAQ */}
        {seo?.faq && seo.faq.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {seo.faq.map((item, i) => (
                <details key={i} className="group rounded-xl border border-[var(--color-border)] bg-white">
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

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] mb-4">
              Related tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedTools.map((t) => t && (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)] transition-colors text-center"
                >
                  <ToolIcon toolId={t.id} fallbackEmoji={t.icon} size="sm" />
                  <span className="text-xs font-medium text-[var(--color-text)]">{t.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
