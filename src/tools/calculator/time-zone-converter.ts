import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const timeZoneConverter: ToolPlugin = {
  id: "time-zone-converter",
  category: "calculator",
  name: "Time Zone Converter",
  description: "Convert time between different time zones worldwide.",
  keywords: ["time zone", "timezone", "convert time", "world clock", "UTC", "GMT", "time conversion"],
  icon: "🌍",

  inputMode: "text",
  textPlaceholder: "Enter: HH:MM from-timezone to-timezone\nExample: 14:30 UTC Asia/Shanghai",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter time and time zones (e.g. 14:30 UTC Asia/Shanghai).");

    const parts = text.split(/\s+/);
    if (parts.length < 3) throw new Error("Please enter: HH:MM from-timezone to-timezone");

    const timeStr = parts[0];
    const fromTZ = parts[1];
    const toTZ = parts[2];

    if (!/^\d{1,2}:\d{2}$/.test(timeStr)) {
      throw new Error("Invalid time format. Use HH:MM (e.g. 14:30).");
    }

    const [hoursStr, minutesStr] = timeStr.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (hours < 0 || hours > 23) throw new Error("Hours must be between 0 and 23.");
    if (minutes < 0 || minutes > 59) throw new Error("Minutes must be between 0 and 59.");

    // Normalize common abbreviations
    const normalizeTZ = (tz: string): string => {
      const aliases: Record<string, string> = {
        "UTC": "UTC",
        "GMT": "GMT",
        "EST": "America/New_York",
        "EDT": "America/New_York",
        "CST": "America/Chicago",
        "CDT": "America/Chicago",
        "MST": "America/Denver",
        "MDT": "America/Denver",
        "PST": "America/Los_Angeles",
        "PDT": "America/Los_Angeles",
        "JST": "Asia/Tokyo",
        "IST": "Asia/Kolkata",
        "CET": "Europe/Paris",
        "CEST": "Europe/Paris",
        "AEST": "Australia/Sydney",
      };
      return aliases[tz.toUpperCase()] ?? tz;
    };

    const fromTZNorm = normalizeTZ(fromTZ);
    const toTZNorm = normalizeTZ(toTZ);

    // Use today's date as reference for DST awareness
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    let fromDate: Date;
    try {
      // Create a date in the source timezone using Intl
      const isoStr = `${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
      // Parse as local time then adjust
      const tempDate = new Date(isoStr);

      // Get UTC offset for the source timezone at this moment
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: fromTZNorm,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      });

      // We need to find what UTC time corresponds to the given local time in fromTZ
      // Strategy: make a UTC date at the given time, find the offset, then adjust
      const utcDate = new Date(`${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`);
      const utcParts = formatter.formatToParts(utcDate);
      const utcMap: Record<string, string> = {};
      for (const p of utcParts) utcMap[p.type] = p.value;

      const tzHour = parseInt(utcMap.hour === "24" ? "0" : utcMap.hour, 10);
      const tzMin = parseInt(utcMap.minute, 10);
      const offsetMinutes = (hours * 60 + minutes) - (tzHour * 60 + tzMin);

      fromDate = new Date(utcDate.getTime() - offsetMinutes * 60 * 1000);
    } catch {
      throw new Error(`Invalid timezone: "${fromTZ}". Use IANA names like "America/New_York" or "Asia/Tokyo".`);
    }

    let toDateStr: string;
    try {
      const toFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: toTZNorm,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      });
      toDateStr = toFormatter.format(fromDate);
    } catch {
      throw new Error(`Invalid timezone: "${toTZ}". Use IANA names like "America/New_York" or "Asia/Tokyo".`);
    }

    const fromFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: fromTZNorm,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
    const fromDateStr = fromFormatter.format(fromDate);

    // Get UTC offset strings
    const getOffset = (tz: string, date: Date): string => {
      try {
        const f = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          timeZoneName: "shortOffset",
        });
        const parts = f.formatToParts(date);
        const tzPart = parts.find((p) => p.type === "timeZoneName");
        return tzPart ? tzPart.value : "";
      } catch {
        return "";
      }
    };

    const fromOffset = getOffset(fromTZNorm, fromDate);
    const toOffset = getOffset(toTZNorm, fromDate);

    const lines: string[] = [
      "=== Time Zone Conversion ===",
      `From: ${fromDateStr} (${fromTZ} / ${fromOffset})`,
      `To:   ${toDateStr} (${toTZ} / ${toOffset})`,
      "",
      "=== Common Time Zone Names ===",
      "  UTC, GMT",
      "  America/New_York (EST/EDT), America/Chicago (CST/CDT)",
      "  America/Denver (MST/MDT), America/Los_Angeles (PST/PDT)",
      "  Europe/London, Europe/Paris, Europe/Berlin",
      "  Asia/Tokyo (JST), Asia/Shanghai, Asia/Kolkata (IST)",
      "  Asia/Dubai, Asia/Singapore",
      "  Australia/Sydney, Pacific/Auckland",
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "timezone-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default timeZoneConverter;
