import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const uuidGenerator: ToolPlugin = {
  id: "uuid-generator",
  category: "generator",
  name: "UUID Generator",
  description: "Generate random UUID v4 identifiers.",
  keywords: [
    "uuid generator",
    "guid generator",
    "random uuid",
    "unique id",
  ],
  icon: "\u{1F511}",

  inputMode: "text",
  textPlaceholder: "Enter number of UUIDs to generate (1-100)...",
  textButtonLabel: "Generate",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let count = parseInt(text, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 100) count = 100;

    const { v4 } = await import("uuid");
    const uuids = Array.from({ length: count }, () => v4()).join("\n");

    return {
      blob: new Blob([uuids], { type: "text/plain" }),
      filename: "uuids.txt",
      mimeType: "text/plain",
    };
  },
};

export default uuidGenerator;
