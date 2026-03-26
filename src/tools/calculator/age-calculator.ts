import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const ageCalculator: ToolPlugin = {
  id: "age-calculator",
  category: "calculator",
  name: "Age Calculator",
  description: "Calculate exact age in years, months, and days from a birthdate, plus next birthday countdown.",
  keywords: ["age", "birthday", "birthdate", "age calculator", "years old"],
  icon: "🎂",

  inputMode: "text",
  textPlaceholder: "Enter birthdate: YYYY-MM-DD\nExample: 1990-05-15",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter a birthdate in YYYY-MM-DD format.");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD (e.g. 1990-05-15).");
    }

    const birthDate = new Date(text);
    if (isNaN(birthDate.getTime())) throw new Error("Invalid date. Please enter a valid date.");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (birthDate > today) throw new Error("Birthdate cannot be in the future.");

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days lived
    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const nextAge = years + (daysUntilBirthday === 0 ? 0 : 1);
    const isBirthdayToday = daysUntilBirthday === 0;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const lines: string[] = [
      "=== Age Result ===",
      `Age:             ${years} years, ${months} months, ${days} days`,
      "",
      "=== Lifetime Stats ===",
      `Total days:      ${totalDays.toLocaleString()}`,
      `Total weeks:     ${totalWeeks.toLocaleString()}`,
      `Total months:    ${totalMonths.toLocaleString()}`,
      "",
      "=== Birthday Info ===",
      `Birthdate:       ${monthNames[birthDate.getMonth()]} ${birthDate.getDate()}, ${birthDate.getFullYear()}`,
      isBirthdayToday
        ? "Next birthday:   Today! Happy Birthday!"
        : `Next birthday:   ${monthNames[nextBirthday.getMonth()]} ${nextBirthday.getDate()}, ${nextBirthday.getFullYear()} (in ${daysUntilBirthday} day${daysUntilBirthday !== 1 ? "s" : ""}, turning ${nextAge})`,
    ];

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "age-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default ageCalculator;
