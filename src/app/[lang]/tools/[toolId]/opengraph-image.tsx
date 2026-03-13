import { ImageResponse } from "next/og";
import { getToolMeta } from "@/config/tool-meta";

export const runtime = "edge";
export const alt = "Tool preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = getToolMeta(toolId);

  if (!tool) {
    return new ImageResponse(
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#fafafa", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700 }}>
        JustUse.me
      </div>,
      { ...size }
    );
  }

  const categoryColors: Record<string, string> = {
    pdf: "#e11d48",
    image: "#2563eb",
    text: "#059669",
    convert: "#d97706",
    generator: "#7c3aed",
  };

  const accent = categoryColors[tool.category] || "#0d9488";

  return new ImageResponse(
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
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 20,
            color: accent,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {tool.category}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {tool.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#666",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          {tool.description}
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
    </div>,
    { ...size }
  );
}
