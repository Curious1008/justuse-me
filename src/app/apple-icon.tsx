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
          background: "#0D9488",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 116,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
