import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
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
            bottom: 9,
            right: 10,
            width: 9,
            height: 9,
            borderRadius: 5,
            background: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
          }}
        />
        {/* J letterform */}
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#F1F5F9",
            lineHeight: 1,
            letterSpacing: -1,
            marginTop: -3,
            marginRight: 1,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
