import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
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
            bottom: 6,
            right: 7,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
          }}
        />
        {/* J letterform */}
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#F1F5F9",
            lineHeight: 1,
            letterSpacing: -1,
            marginTop: -2,
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
