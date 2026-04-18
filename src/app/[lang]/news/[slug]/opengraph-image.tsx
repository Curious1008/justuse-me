import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryColors: Record<string, string> = {
  tutorial: "#0d9488",
  comparison: "#7c3aed",
  "use-case": "#2563eb",
  trend: "#d97706",
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#fafafa",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          JustUse.me
        </div>
      ),
      { ...size }
    );
  }

  const accent = categoryColors[article.category] || "#0d9488";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#fafafa",
          padding: "60px 80px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 20,
              color: accent,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {article.category}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#111",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#666",
              lineHeight: 1.4,
              maxWidth: "900px",
              marginTop: "8px",
            }}
          >
            {article.summary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: accent,
              }}
            />
            <span style={{ fontSize: 28, fontWeight: 600, color: "#111" }}>
              justuse.me
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px", fontSize: 20, color: "#999" }}>
            <span>Free</span>
            <span>No ads</span>
            <span>Private</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
