import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const CITIES: { name: string; tz: string }[] = [
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Berlin", tz: "Europe/Berlin" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Mumbai", tz: "Asia/Kolkata" },
  { name: "Shanghai", tz: "Asia/Shanghai" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
];

const worldClock: ToolPlugin = {
  id: "world-clock",
  category: "utility",
  name: "World Clock",
  description: "See the current time in major cities around the world, with optional custom time input.",
  keywords: [
    "world clock",
    "time zones",
    "international time",
    "timezone converter",
    "global time",
  ],
  icon: "🌍",

  inputMode: "text",
  textPlaceholder: "Enter time in HH:MM format (default: current time)\nOptional timezone: HH:MM UTC",
  textButtonLabel: "Show World Time",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let baseDate: Date;
    let inputNote: string;

    if (!text) {
      baseDate = new Date();
      inputNote = "Current time";
    } else {
      // Parse HH:MM or HH:MM UTC
      const match = text.match(/^(\d{1,2}):(\d{2})(?:\s*(UTC|local))?$/i);
      if (!match) {
        throw new Error(
          `Could not parse "${text}". Use HH:MM (e.g. "14:30") or leave empty for current time.`
        );
      }
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const isUTC = match[3]?.toUpperCase() === "UTC";

      if (hours > 23 || minutes > 59) {
        throw new Error("Invalid time. Hours must be 0-23 and minutes 0-59.");
      }

      const now = new Date();
      if (isUTC) {
        baseDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hours, minutes, 0));
        inputNote = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} UTC`;
      } else {
        baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
        inputNote = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} local`;
      }
    }

    const fmtCity = (tz: string): string => {
      try {
        return baseDate.toLocaleString("en-US", {
          timeZone: tz,
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } catch {
        return "N/A";
      }
    };

    const lines: string[] = [
      `World Clock — ${inputNote}`,
      "",
      "=== Times Around the World ===",
    ];

    const maxCity = Math.max(...CITIES.map((c) => c.name.length));
    for (const city of CITIES) {
      const padded = city.name.padEnd(maxCity + 2);
      lines.push(`${padded}${fmtCity(city.tz)}`);
    }

    lines.push("");
    lines.push(`Reference: ${baseDate.toISOString()} (UTC)`);

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "world-clock.txt",
      mimeType: "text/plain",
    };
  },
};

export default worldClock;
