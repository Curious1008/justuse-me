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
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 48 48">
          <path d="M16 16 L30 24 L16 32 Z" fill="#E11D48" />
          <rect x="30" y="16" width="4" height="16" rx="1.5" fill="#FAFAF8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
