import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const timestampConverter: ToolPlugin = {
  id: "timestamp-converter",
  category: "developer",
  name: "Timestamp Converter",
  description: "Convert Unix timestamps to human-readable dates and vice versa, in multiple formats.",
  keywords: [
    "timestamp",
    "unix timestamp",
    "epoch",
    "date converter",
    "unix time",
    "datetime",
  ],
  icon: "⏱",

  inputMode: "text",
  textPlaceholder: "Enter a Unix timestamp (e.g. 1711929600) or date string (e.g. 2026-03-26)",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const raw = (await files[0].text()).trim();

    if (!raw) {
      throw new Error("Please enter a timestamp or date string.");
    }

    let date: Date;
    let inputType: string;

    // Check if purely numeric (Unix timestamp)
    if (/^\d+$/.test(raw)) {
      const num = parseInt(raw, 10);
      // Heuristic: if more than 10 digits treat as milliseconds
      if (raw.length > 10) {
        date = new Date(num);
        inputType = `Unix timestamp (milliseconds): ${num}`;
      } else {
        date = new Date(num * 1000);
        inputType = `Unix timestamp (seconds): ${num}`;
      }
    } else {
      date = new Date(raw);
      inputType = `Date string: "${raw}"`;
    }

    if (isNaN(date.getTime())) {
      throw new Error(`Could not parse "${raw}" as a timestamp or date. Try a Unix timestamp number or ISO date string like 2026-03-26.`);
    }

    const unixSeconds = Math.floor(date.getTime() / 1000);
    const unixMs = date.getTime();

    const lines: string[] = [];
    lines.push(`Input: ${inputType}`);
    lines.push("");
    lines.push("=== Unix Timestamps ===");
    lines.push(`Seconds:      ${unixSeconds}`);
    lines.push(`Milliseconds: ${unixMs}`);
    lines.push("");
    lines.push("=== Human-Readable Formats ===");
    lines.push(`ISO 8601:     ${date.toISOString()}`);
    lines.push(`UTC:          ${date.toUTCString()}`);
    lines.push(`Local:        ${date.toLocaleString()}`);
    lines.push(`Date only:    ${date.toISOString().split("T")[0]}`);
    lines.push(`Time only:    ${date.toISOString().split("T")[1].replace("Z", "")} UTC`);
    lines.push("");
    lines.push("=== Components (UTC) ===");
    lines.push(`Year:         ${date.getUTCFullYear()}`);
    lines.push(`Month:        ${date.getUTCMonth() + 1} (${date.toLocaleString("en", { month: "long", timeZone: "UTC" })})`);
    lines.push(`Day:          ${date.getUTCDate()}`);
    lines.push(`Hour:         ${date.getUTCHours()}`);
    lines.push(`Minute:       ${date.getUTCMinutes()}`);
    lines.push(`Second:       ${date.getUTCSeconds()}`);
    lines.push(`Day of week:  ${date.toLocaleString("en", { weekday: "long", timeZone: "UTC" })}`);

    const result = lines.join("\n");
    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "timestamp-conversion.txt",
      mimeType: "text/plain",
    };
  },
};

export default timestampConverter;
