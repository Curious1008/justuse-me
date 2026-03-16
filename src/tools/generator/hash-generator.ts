import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const hashGenerator: ToolPlugin = {
  id: "hash-generator",
  category: "generator",
  name: "Hash Generator",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files.",
  keywords: [
    "hash generator",
    "md5",
    "sha256",
    "sha512",
    "sha1",
    "checksum",
    "hash calculator",
  ],
  icon: "\u{1F510}",

  acceptedTypes: ["*/*"],
  maxFiles: 1,
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);

    const { md5, sha1, sha256, sha512 } = await import("hash-wasm");

    const [md5Hash, sha1Hash, sha256Hash, sha512Hash] = await Promise.all([
      md5(data),
      sha1(data),
      sha256(data),
      sha512(data),
    ]);

    const output = [
      `File: ${file.name}`,
      `Size: ${file.size} bytes`,
      "",
      `MD5:    ${md5Hash}`,
      `SHA-1:  ${sha1Hash}`,
      `SHA-256: ${sha256Hash}`,
      `SHA-512: ${sha512Hash}`,
    ].join("\n");

    return {
      blob: new Blob([output], { type: "text/plain" }),
      filename: "hashes.txt",
      mimeType: "text/plain",
    };
  },
};

export default hashGenerator;
