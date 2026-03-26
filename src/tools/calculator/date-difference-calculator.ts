import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const dateDifferenceCalculator: ToolPlugin = {
  id: "date-difference-calculator",
  category: "calculator",
  name: "Date Difference Calculator",
  description: "Calculate the difference between two dates in days, weeks, months, and years.",
  keywords: ["date difference", "days between dates", "date calculator", "time between", "calendar"],
  icon: "📅",

  inputMode: "text",
  textPlaceholder: "Enter two dates: YYYY-MM-DD YYYY-MM-DD\nExample: 2026-01-01 2026-12-31",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter two dates in YYYY-MM-DD format separated by space.");

    const parts = text.split(/\s+/);
    if (parts.length < 2) throw new Error("Please enter two dates separated by space (e.g. 2026-01-01 2026-12-31).");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(parts[0]) || !/^\d{4}-\d{2}-\d{2}$/.test(parts[1])) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD.");
    }

    const date1 = new Date(parts[0]);
    const date2 = new Date(parts[1]);

    if (isNaN(date1.getTime())) throw new Error(`Invalid date: ${parts[0]}`);
    if (isNaN(date2.getTime())) throw new Error(`Invalid date: ${parts[1]}`);

    const earlier = date1 <= date2 ? date1 : date2;
    const later = date1 <= date2 ? date2 : date1;

    const totalMs = later.getTime() - earlier.getTime();
    const totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate months and years difference
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const formatDate = (d: Date) =>
      `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const lines: string[] = [
      "=== Date Difference Result ===",
      `From: ${formatDate(earlier)} (${dayOfWeekNames[earlier.getDay()]})`,
      `To:   ${formatDate(later)} (${dayOfWeekNames[later.getDay()]})`,
      "",
      "=== Difference ===",
      `Years, months, days: ${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`,
      `Total days:          ${totalDays.toLocaleString()}`,
      `Total weeks:         ${totalWeeks.toLocaleString()} weeks and ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`,
      `Total hours:         ${totalHours.toLocaleString()}`,
      `Total minutes:       ${totalMinutes.toLocaleString()}`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "date-difference-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default dateDifferenceCalculator;
