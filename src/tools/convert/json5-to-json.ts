import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const json5ToJson: ToolPlugin = {
  id: "json5-to-json",
  category: "convert",
  name: "JSON5 to JSON",
  description: "Convert JSON5 files to standard JSON format.",
  keywords: ["json5", "json5 to json", "convert json5", "json5 converter"],
  icon: "{ }",

  acceptedTypes: [".json5", ".json", ".txt", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const text = await file.text();

    let parsed;
    try {
      const JSON5 = (await import("json5")).default;
      parsed = JSON5.parse(text);
    } catch {
      throw new Error("Invalid JSON5. Please check your file and try again.");
    }

    const json = JSON.stringify(parsed, null, 2);
    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: "converted.json",
      mimeType: "application/json",
    };
  },
};

export default json5ToJson;
