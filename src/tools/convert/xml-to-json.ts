import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const xmlToJson: ToolPlugin = {
  id: "xml-to-json",
  category: "convert",
  name: "XML to JSON",
  description: "Convert XML files to JSON format.",
  keywords: ["xml to json", "convert xml json", "xml json converter", "xml parser", "xml to object"],
  icon: "🔄",

  acceptedTypes: ["text/xml", "application/xml", ".xml", "text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const { XMLParser } = await import("fast-xml-parser");
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
    });

    let parsed;
    try {
      parsed = parser.parse(text);
    } catch {
      throw new Error("Invalid XML. Please check your file and try again.");
    }

    const json = JSON.stringify(parsed, null, 2);
    const baseName = files[0].name.replace(/\.[^.]+$/, "");

    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: `${baseName}.json`,
      mimeType: "application/json",
    };
  },
};

export default xmlToJson;
