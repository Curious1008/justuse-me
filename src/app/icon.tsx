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
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path d="M16 16 L30 24 L16 32 Z" fill="#E11D48" />
          <rect x="30" y="16" width="4" height="16" rx="1.5" fill="#FAFAF8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
