import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const dataStorageConverter: ToolPlugin = {
  id: "data-storage-converter",
  category: "utility",
  name: "Data Storage Converter",
  description: "Convert data sizes between bytes, KB, MB, GB, TB, and PB.",
  keywords: [
    "data converter",
    "file size converter",
    "GB to MB",
    "bytes to megabytes",
    "storage converter",
  ],
  icon: "💾",

  inputMode: "text",
  textPlaceholder: "Enter: value unit\nExample: 1.5 GB",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a data size value and unit (e.g. 1.5 GB).");

    // Bytes per unit (binary, powers of 1024)
    const toBytes: Record<string, number> = {
      b: 1,
      byte: 1,
      bytes: 1,
      kb: 1024,
      kilobyte: 1024,
      kilobytes: 1024,
      kib: 1024,
      mb: 1024 ** 2,
      megabyte: 1024 ** 2,
      megabytes: 1024 ** 2,
      mib: 1024 ** 2,
      gb: 1024 ** 3,
      gigabyte: 1024 ** 3,
      gigabytes: 1024 ** 3,
      gib: 1024 ** 3,
      tb: 1024 ** 4,
      terabyte: 1024 ** 4,
      terabytes: 1024 ** 4,
      tib: 1024 ** 4,
      pb: 1024 ** 5,
      petabyte: 1024 ** 5,
      petabytes: 1024 ** 5,
      pib: 1024 ** 5,
    };

    const match = text.match(/^(-?\d+(?:\.\d+)?)\s*(\S+)$/i);
    if (!match) {
      throw new Error(`Could not parse "${text}". Use format: value unit — e.g. "1.5 GB", "500 MB".`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    if (!(unit in toBytes)) {
      throw new Error(`Unknown unit "${match[2]}". Supported: B, KB, MB, GB, TB, PB.`);
    }

    const bytes = value * toBytes[unit];
    const fmt = (n: number) => {
      if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
      return parseFloat(n.toPrecision(8)).toString();
    };

    const lines = [
      `Input: ${value} ${match[2]}`,
      "",
      "=== Conversion Results ===",
      `Bytes (B):       ${fmt(bytes)}`,
      `Kilobytes (KB):  ${fmt(bytes / toBytes.kb)}`,
      `Megabytes (MB):  ${fmt(bytes / toBytes.mb)}`,
      `Gigabytes (GB):  ${fmt(bytes / toBytes.gb)}`,
      `Terabytes (TB):  ${fmt(bytes / toBytes.tb)}`,
      `Petabytes (PB):  ${fmt(bytes / toBytes.pb)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "data-storage-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default dataStorageConverter;
