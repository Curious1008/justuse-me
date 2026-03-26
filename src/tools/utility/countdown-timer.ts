import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

function parseDuration(input: string): number {
  // Returns total seconds
  const clean = input.trim().toLowerCase();

  // Pattern: combinations of Xh Xm Xs
  const pattern = /(?:(\d+(?:\.\d+)?)\s*h(?:ours?)?)?[\s,]*(?:(\d+(?:\.\d+)?)\s*m(?:in(?:utes?)?)?)?[\s,]*(?:(\d+(?:\.\d+)?)\s*s(?:ec(?:onds?)?)?)?/;
  const match = clean.match(pattern);

  if (match && (match[1] || match[2] || match[3])) {
    const h = parseFloat(match[1] ?? "0");
    const m = parseFloat(match[2] ?? "0");
    const s = parseFloat(match[3] ?? "0");
    return h * 3600 + m * 60 + s;
  }

  // Just a number — treat as seconds
  if (/^\d+$/.test(clean)) return parseInt(clean, 10);

  return NaN;
}

const countdownTimer: ToolPlugin = {
  id: "countdown-timer",
  category: "utility",
  name: "Countdown Timer",
  description: "Enter a duration and get the exact end time with a human-readable countdown.",
  keywords: [
    "countdown timer",
    "timer calculator",
    "end time calculator",
    "duration calculator",
    "time calculator",
  ],
  icon: "⏳",

  inputMode: "text",
  textPlaceholder: "Enter duration: 5m, 2h30m, 90s, etc.",
  textButtonLabel: "Calculate End Time",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a duration (e.g. 5m, 2h30m, 90s).");

    const totalSeconds = parseDuration(text);
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      throw new Error(
        `Could not parse "${text}" as a duration. Try "5m", "2h30m", "90s", or "1h 45m 30s".`
      );
    }

    const now = new Date();
    const end = new Date(now.getTime() + totalSeconds * 1000);

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const parts = [];
    if (h > 0) parts.push(`${h} hour${h !== 1 ? "s" : ""}`);
    if (m > 0) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
    if (s > 0) parts.push(`${s} second${s !== 1 ? "s" : ""}`);
    const humanDuration = parts.join(", ") || "0 seconds";

    const lines = [
      `Duration:     ${humanDuration} (${totalSeconds} seconds)`,
      "",
      "=== Timer Details ===",
      `Started at:   ${now.toLocaleTimeString()} (${now.toLocaleDateString()})`,
      `Ends at:      ${end.toLocaleTimeString()} (${end.toLocaleDateString()})`,
      `End (ISO):    ${end.toISOString()}`,
      `End (UTC):    ${end.toUTCString()}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "countdown-timer.txt",
      mimeType: "text/plain",
    };
  },
};

export default countdownTimer;
