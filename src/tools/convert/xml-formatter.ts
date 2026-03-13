import { XMLParser, XMLBuilder } from "fast-xml-parser";
import type { ToolPlugin, ToolResult } from "../types";

const xmlFormatter: ToolPlugin = {
  id: "xml-formatter",
  category: "convert",
  name: "XML Formatter",
  description: "Format and beautify XML documents with proper indentation.",
  keywords: [
    "xml formatter",
    "xml beautifier",
    "format xml",
    "pretty print xml",
    "xml indent",
  ],
  icon: "📐",

  acceptedTypes: ["text/xml", "application/xml", ".xml"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      preserveOrder: true,
      commentPropName: "#comment",
      cdataPropName: "#cdata",
    });

    let parsed;
    try {
      parsed = parser.parse(text);
    } catch {
      throw new Error(
        "Invalid XML. Please check your file and try again."
      );
    }

    const builder = new XMLBuilder({
      ignoreAttributes: false,
      preserveOrder: true,
      commentPropName: "#comment",
      cdataPropName: "#cdata",
      format: true,
      indentBy: "  ",
    });

    const formatted = builder.build(parsed);

    return {
      blob: new Blob([formatted], { type: "application/xml" }),
      filename: "formatted.xml",
      mimeType: "application/xml",
    };
  },
};

export default xmlFormatter;
