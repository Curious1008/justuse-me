import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Teal accent dot */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 40,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
          }}
        />
        {/* J letterform */}
        <span
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#F1F5F9",
            lineHeight: 1,
            letterSpacing: -4,
            marginTop: -8,
            marginRight: 4,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
