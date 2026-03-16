import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const tomlToJson: ToolPlugin = {
  id: "toml-to-json",
  category: "convert",
  name: "TOML to JSON",
  description: "Convert TOML configuration files to JSON format.",
  keywords: ["toml to json", "toml converter", "convert toml", "toml parser"],
  icon: "⚙️",

  acceptedTypes: [".toml", ".txt", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const text = await file.text();

    let parsed;
    try {
      const TOML = await import("smol-toml");
      parsed = TOML.parse(text);
    } catch {
      throw new Error("Invalid TOML. Please check your file and try again.");
    }

    const json = JSON.stringify(parsed, null, 2);
    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: "converted.json",
      mimeType: "application/json",
    };
  },
};

export default tomlToJson;
