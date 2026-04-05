import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const jsonToYaml: ToolPlugin = {
  id: "json-to-yaml",
  category: "convert",
  name: "JSON to YAML",
  description: "Convert JSON files to YAML format.",
  keywords: ["json to yaml", "json to yml", "convert json yaml", "json yaml converter"],
  icon: "📋",

  acceptedTypes: ["application/json", ".json", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    let parsed;
    try {
      parsed = JSON.parse(text.trim());
    } catch {
      throw new Error("Invalid JSON. Please check your file and try again.");
    }

    const yaml = await import("js-yaml");
    const yamlStr = yaml.dump(parsed, { indent: 2, lineWidth: 120 });

    const baseName = files[0].name.replace(/\.[^.]+$/, "");
    return {
      blob: new Blob([yamlStr], { type: "text/yaml" }),
      filename: `${baseName}.yaml`,
      mimeType: "text/yaml",
    };
  },
};

export default jsonToYaml;
