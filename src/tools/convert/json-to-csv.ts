import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const jsonToCsv: ToolPlugin = {
  id: "json-to-csv",
  category: "convert",
  name: "JSON to CSV",
  description: "Convert JSON arrays to CSV spreadsheet format.",
  keywords: [
    "json to csv",
    "json converter",
    "json to spreadsheet",
    "export csv",
  ],
  icon: "📊",

  acceptedTypes: ["application/json", ".json"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON. Please check your file and try again.");
    }

    if (!Array.isArray(parsed)) {
      throw new Error(
        "JSON must be an array of objects. Got " +
          typeof parsed +
          " instead."
      );
    }

    if (parsed.length === 0) {
      throw new Error("JSON array is empty. Nothing to convert.");
    }

    const Papa = (await import("papaparse")).default;
    const csv = Papa.unparse(parsed);

    return {
      blob: new Blob([csv], { type: "text/csv" }),
      filename: "converted.csv",
      mimeType: "text/csv",
    };
  },
};

export default jsonToCsv;
