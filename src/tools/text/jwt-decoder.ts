import type { ToolPlugin, ToolResult } from "../types";
import JwtPreview from "@/components/tool/previews/JwtPreview";

const jwtDecoder: ToolPlugin = {
  id: "jwt-decoder",
  category: "text",
  name: "JWT Decoder",
  description: "Decode and inspect JSON Web Token (JWT) contents.",
  keywords: [
    "jwt decoder",
    "decode jwt",
    "jwt parser",
    "json web token",
    "jwt inspector",
  ],
  icon: "\u{1F513}",

  inputMode: "text",
  textPlaceholder: "Paste your JWT token here...",
  textButtonLabel: "Decode",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",

  previewUI: JwtPreview,

  async process(files): Promise<ToolResult> {
    const token = (await files[0].text()).trim();

    if (!token) {
      throw new Error("Please provide a JWT token to decode.");
    }

    try {
      // Decode header manually
      const parts = token.split(".");
      const headerJson = atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"));
      const header = JSON.parse(headerJson);

      // Decode payload using jwt-decode
      const { jwtDecode } = await import("jwt-decode");
      const payload = jwtDecode(token) as Record<string, unknown>;

      const output = [
        "=== HEADER ===",
        JSON.stringify(header, null, 2),
        "",
        "=== PAYLOAD ===",
        JSON.stringify(payload, null, 2),
      ];

      // Add human-readable timestamps for common time fields
      const timeFields = ["exp", "iat", "nbf", "auth_time"];
      const timestamps: string[] = [];
      for (const field of timeFields) {
        if (typeof payload[field] === "number") {
          const date = new Date((payload[field] as number) * 1000);
          timestamps.push(`  ${field}: ${date.toISOString()} (${date.toLocaleString()})`);
        }
      }
      if (timestamps.length > 0) {
        output.push("", "=== TIMESTAMPS (human-readable) ===", ...timestamps);
      }

      // Show expiration status
      if (typeof payload.exp === "number") {
        const now = Math.floor(Date.now() / 1000);
        const isExpired = (payload.exp as number) < now;
        output.push("", isExpired ? "** TOKEN IS EXPIRED **" : "Token is still valid");
      }

      const result = output.join("\n");

      return {
        blob: new Blob([result], { type: "text/plain" }),
        filename: "jwt-decoded.json",
        mimeType: "text/plain",
      };
    } catch {
      throw new Error("Invalid JWT token");
    }
  },
};

export default jwtDecoder;
