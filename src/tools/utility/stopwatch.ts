import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const stopwatch: ToolPlugin = {
  id: "stopwatch",
  category: "utility",
  name: "Stopwatch / Timestamp",
  description: "Get the current precise timestamp or calculate elapsed time between two timestamps.",
  keywords: [
    "stopwatch",
    "timestamp",
    "elapsed time",
    "time calculator",
    "current time",
  ],
  icon: "⏱️",

  inputMode: "text",
  textPlaceholder: "Enter 'now' for current timestamp\nOr enter a timestamp to calculate elapsed time",
  textButtonLabel: "Go",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    const now = new Date();
    const nowMs = now.getTime();

    if (!text || text.toLowerCase() === "now") {
      const lines = [
        "=== Current Timestamp ===",
        `ISO 8601:     ${now.toISOString()}`,
        `Local time:   ${now.toLocaleString()}`,
        `UTC time:     ${now.toUTCString()}`,
        `Unix (sec):   ${Math.floor(nowMs / 1000)}`,
        `Unix (ms):    ${nowMs}`,
        "",
        "To calculate elapsed time, enter a previous timestamp and run again.",
      ];
      return {
        blob: new Blob([lines.join("\n")], { type: "text/plain" }),
        filename: "timestamp.txt",
        mimeType: "text/plain",
      };
    }

    // Try to parse as a timestamp
    let then: Date | null = null;

    // Unix seconds or ms
    if (/^\d+$/.test(text)) {
      const num = parseInt(text, 10);
      then = text.length > 10 ? new Date(num) : new Date(num * 1000);
    } else {
      const parsed = new Date(text);
      if (!isNaN(parsed.getTime())) then = parsed;
    }

    if (!then) {
      throw new Error(
        `Could not parse "${text}" as a timestamp. Enter "now" for current time, or a Unix timestamp / ISO date string.`
      );
    }

    const elapsedMs = nowMs - then.getTime();
    const sign = elapsedMs >= 0 ? "" : "-";
    const absMs = Math.abs(elapsedMs);

    const totalSeconds = Math.floor(absMs / 1000);
    const ms = absMs % 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    const pad = (n: number, w = 2) => String(n).padStart(w, "0");
    const humanDuration = [
      days > 0 ? `${days}d` : "",
      `${pad(hours)}h`,
      `${pad(minutes)}m`,
      `${pad(seconds)}s`,
      `${pad(ms, 3)}ms`,
    ]
      .filter(Boolean)
      .join(" ");

    const lines = [
      `From:     ${then.toISOString()} (${then.toLocaleString()})`,
      `To now:   ${now.toISOString()} (${now.toLocaleString()})`,
      "",
      "=== Elapsed Time ===",
      `Duration:         ${sign}${humanDuration}`,
      `Total seconds:    ${sign}${totalSeconds}.${pad(ms, 3)}`,
      `Total minutes:    ${sign}${(absMs / 60000).toFixed(3)}`,
      `Total hours:      ${sign}${(absMs / 3600000).toFixed(4)}`,
      `Total days:       ${sign}${(absMs / 86400000).toFixed(4)}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "elapsed-time.txt",
      mimeType: "text/plain",
    };
  },
};

export default stopwatch;
