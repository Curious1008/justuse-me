import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import Base64Options from "@/components/tool/options/Base64Options";

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

  optionsBefore: true,
  optionsUI: Base64Options,

  async process(files, options?: ToolOptions): Promise<ToolResult> {
    const file = files[0];
    const mode = (options?.mode as string) || "encode";

    if (mode === "decode") {
      const text = await file.text();
      try {
        const binary = atob(text.trim());
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return {
          blob: new Blob([bytes]),
          filename: file.name.replace(/\.(base64|b64|txt)$/i, "") || "decoded",
          mimeType: "application/octet-stream",
        };
      } catch {
        throw new Error("Invalid Base64 content. Make sure the file contains valid Base64 text.");
      }
    }

    // Encode to Base64 using chunked approach to avoid O(n^2) string concat
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192;
    const parts: string[] = [];
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      let binary = "";
      for (let j = 0; j < chunk.length; j++) {
        binary += String.fromCharCode(chunk[j]);
      }
      parts.push(btoa(binary));
    }
    const base64 = parts.join("");

    return {
      blob: new Blob([base64], { type: "text/plain" }),
      filename: `${file.name}.base64`,
      mimeType: "text/plain",
    };
  },
};

export default base64Codec;
