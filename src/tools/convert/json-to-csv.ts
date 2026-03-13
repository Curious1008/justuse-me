import Papa from "papaparse";
import type { ToolPlugin, ToolResult } from "../types";

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
  maxFileSize: 50 * 1024 * 1024,

  runtime: "browser",

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

    const csv = Papa.unparse(parsed);

    return {
      blob: new Blob([csv], { type: "text/csv" }),
      filename: "converted.csv",
      mimeType: "text/csv",
    };
  },
};

export default jsonToCsv;
