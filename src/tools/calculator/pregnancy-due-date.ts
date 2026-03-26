import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const pregnancyDueDate: ToolPlugin = {
  id: "pregnancy-due-date",
  category: "calculator",
  name: "Pregnancy Due Date Calculator",
  description: "Calculate pregnancy due date, current week, and trimester based on last menstrual period (LMP).",
  keywords: ["pregnancy", "due date", "lmp", "trimester", "weeks pregnant", "baby", "prenatal"],
  icon: "🤰",

  inputMode: "text",
  textPlaceholder: "Enter last period date: YYYY-MM-DD\nExample: 2026-01-15",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter your last menstrual period date in YYYY-MM-DD format.");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD (e.g. 2026-01-15).");
    }

    const lmpDate = new Date(text);
    if (isNaN(lmpDate.getTime())) throw new Error("Invalid date. Please enter a valid date.");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lmpDate.setHours(0, 0, 0, 0);

    // Due date = LMP + 280 days (Naegele's rule)
    const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);

    // Days since LMP
    const daysSinceLmp = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLmp < 0) throw new Error("Last period date cannot be in the future.");
    if (daysSinceLmp > 300) throw new Error("Date is too far in the past. Please check the date.");

    const weeksPregnant = Math.floor(daysSinceLmp / 7);
    const daysExtra = daysSinceLmp % 7;

    let trimester: string;
    let trimesterDesc: string;
    if (weeksPregnant < 13) {
      trimester = "First Trimester";
      trimesterDesc = "Weeks 1-12";
    } else if (weeksPregnant < 27) {
      trimester = "Second Trimester";
      trimesterDesc = "Weeks 13-26";
    } else if (weeksPregnant <= 40) {
      trimester = "Third Trimester";
      trimesterDesc = "Weeks 27-40";
    } else {
      trimester = "Past Due Date";
      trimesterDesc = "Week 40+";
    }

    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weeksUntilDue = Math.floor(Math.abs(daysUntilDue) / 7);
    const daysUntilDueExtra = Math.abs(daysUntilDue) % 7;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const formatDate = (d: Date) =>
      `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

    const lines: string[] = [
      "=== Pregnancy Due Date Result ===",
      `Last Period (LMP): ${formatDate(lmpDate)}`,
      `Due Date:          ${formatDate(dueDate)}`,
      "",
      "=== Current Status ===",
      `Currently:         ${weeksPregnant} week${weeksPregnant !== 1 ? "s" : ""} and ${daysExtra} day${daysExtra !== 1 ? "s" : ""} pregnant`,
      `Trimester:         ${trimester} (${trimesterDesc})`,
      daysUntilDue >= 0
        ? `Days until due:    ${daysUntilDue} days (${weeksUntilDue} weeks, ${daysUntilDueExtra} days)`
        : `Overdue by:        ${Math.abs(daysUntilDue)} days`,
      "",
      "=== Key Milestones ===",
      `End of 1st trimester: ${formatDate(new Date(lmpDate.getTime() + 12 * 7 * 24 * 60 * 60 * 1000))} (Week 12)`,
      `End of 2nd trimester: ${formatDate(new Date(lmpDate.getTime() + 26 * 7 * 24 * 60 * 60 * 1000))} (Week 26)`,
      `Full term (37 weeks): ${formatDate(new Date(lmpDate.getTime() + 37 * 7 * 24 * 60 * 60 * 1000))}`,
      `Due date (40 weeks):  ${formatDate(dueDate)}`,
      "",
      "Note: Due date is an estimate. Normal delivery is 37-42 weeks.",
      "Always consult your healthcare provider for medical advice.",
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "pregnancy-due-date.txt",
      mimeType: "text/plain",
    };
  },
};

export default pregnancyDueDate;
