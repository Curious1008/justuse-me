import * as yaml from "js-yaml";
import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const yamlJson: ToolPlugin = {
  id: "yaml-json",
  category: "convert",
  name: "YAML ↔ JSON",
  description: "Convert between YAML and JSON formats.",
  keywords: [
    "yaml to json",
    "json to yaml",
    "yaml converter",
    "yml to json",
  ],
  icon: "🔀",

  acceptedTypes: [
    "application/json",
    ".json",
    ".yaml",
    ".yml",
    "text/yaml",
    "text/plain",
  ],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const text = await file.text();
    const trimmed = text.trim();

    const isJson =
      file.name.endsWith(".json") ||
      trimmed.startsWith("{") ||
      trimmed.startsWith("[");

    if (isJson) {
      let parsed;
      try {
        parsed = JSON.parse(trimmed);
      } catch {
        throw new Error("Invalid JSON. Please check your file and try again.");
      }
      const yamlStr = yaml.dump(parsed, { indent: 2 });
      return {
        blob: new Blob([yamlStr], { type: "text/yaml" }),
        filename: "converted.yaml",
        mimeType: "text/yaml",
      };
    }

    let parsed;
    try {
      parsed = yaml.load(trimmed);
    } catch {
      throw new Error("Invalid YAML. Please check your file and try again.");
    }
    const json = JSON.stringify(parsed, null, 2);
    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: "converted.json",
      mimeType: "application/json",
    };
  },
};

export default yamlJson;
