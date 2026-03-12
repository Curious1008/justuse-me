import type { ToolPlugin, ToolResult } from "../types";

const base64Codec: ToolPlugin = {
  id: "base64-codec",
  category: "text",
  name: "Base64 Encode/Decode",
  description: "Encode files to Base64 or decode Base64 text back to files.",
  keywords: [
    "base64 encode",
    "base64 decode",
    "base64 converter",
    "base64 online",
  ],
  icon: "\u{1F510}",

  acceptedTypes: ["*/*"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const file = files[0];

    // If file extension is .base64 or .b64, decode it
    const isDecodeByName = /\.(base64|b64)$/i.test(file.name);

    if (isDecodeByName) {
      const text = await file.text();
      try {
        const binary = atob(text.trim());
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return {
          blob: new Blob([bytes]),
          filename: file.name.replace(/\.(base64|b64)$/i, ""),
          mimeType: "application/octet-stream",
        };
      } catch {
        throw new Error("Invalid Base64 content.");
      }
    }

    // Otherwise, encode to Base64
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return {
      blob: new Blob([base64], { type: "text/plain" }),
      filename: `${file.name}.base64`,
      mimeType: "text/plain",
    };
  },
};

export default base64Codec;
