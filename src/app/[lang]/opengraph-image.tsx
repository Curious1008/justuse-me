import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JustUse.me — Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Get things done,
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            background: "linear-gradient(90deg, #0d9488, #2dd4bf)",
            backgroundClip: "text",
            color: "#0d9488",
          }}
        >
          effortlessly.
        </div>
        <div style={{ fontSize: 28, color: "#666", marginTop: "8px" }}>
          45+ free tools for PDFs, images, and text. No ads, no sign-up.
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
              background: "#0d9488",
            }}
          />
          <span style={{ fontSize: 32, fontWeight: 600, color: "#111" }}>
            justuse.me
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px", fontSize: 20, color: "#999" }}>
          <span>PDF</span>
          <span>Image</span>
          <span>Text</span>
          <span>Convert</span>
          <span>Generate</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
