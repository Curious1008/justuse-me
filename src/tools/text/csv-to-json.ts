import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const csvToJson: ToolPlugin = {
  id: "csv-to-json",
  category: "convert",
  name: "CSV to JSON",
  description: "Convert CSV spreadsheet data to JSON format.",
  keywords: [
    "csv to json",
    "csv converter",
    "spreadsheet to json",
    "parse csv",
  ],
  icon: "📊",

  acceptedTypes: ["text/csv", ".csv", "application/vnd.ms-excel"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const Papa = (await import("papaparse")).default;
    const result = Papa.parse(text, { header: true });

    if (result.errors.length > 0) {
      throw new Error(
        `CSV parsing error: ${result.errors[0].message} (row ${result.errors[0].row})`
      );
    }

    const json = JSON.stringify(result.data, null, 2);

    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: "converted.json",
      mimeType: "application/json",
    };
  },
};

export default csvToJson;
