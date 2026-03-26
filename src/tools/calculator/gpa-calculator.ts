import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const gpaCalculator: ToolPlugin = {
  id: "gpa-calculator",
  category: "calculator",
  name: "GPA Calculator",
  description: "Calculate GPA from letter grades and credit hours using the standard 4.0 scale.",
  keywords: ["gpa", "grade point average", "academic", "college", "university", "grades"],
  icon: "🎓",

  inputMode: "text",
  textPlaceholder: "Enter grade and credits (one per line):\nA 3\nB+ 4\nA- 3",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter grade and credit hours per line (e.g. A 3).");

    const rawLines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (rawLines.length === 0) throw new Error("No valid entries found.");

    interface Entry { grade: string; credits: number; points: number }
    const entries: Entry[] = [];

    for (const line of rawLines) {
      const parts = line.split(/\s+/);
      if (parts.length < 2) throw new Error(`Invalid line: "${line}". Expected: grade credits (e.g. A 3)`);
      const grade = parts[0].toUpperCase();
      const credits = parseFloat(parts[1]);
      if (!(grade in gradePoints)) {
        throw new Error(`Unknown grade "${grade}". Valid grades: A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F`);
      }
      if (isNaN(credits) || credits <= 0) throw new Error(`Invalid credits in line: "${line}"`);
      entries.push({ grade, credits, points: gradePoints[grade] });
    }

    const totalCredits = entries.reduce((sum, e) => sum + e.credits, 0);
    const totalQualityPoints = entries.reduce((sum, e) => sum + e.points * e.credits, 0);
    const gpa = totalQualityPoints / totalCredits;

    let standing: string;
    if (gpa >= 3.9) standing = "Summa Cum Laude (4.0)";
    else if (gpa >= 3.7) standing = "Magna Cum Laude";
    else if (gpa >= 3.5) standing = "Cum Laude";
    else if (gpa >= 3.0) standing = "Good Standing";
    else if (gpa >= 2.0) standing = "Satisfactory";
    else standing = "Academic Probation Risk";

    const lines: string[] = [
      "=== GPA Result ===",
      `GPA:             ${gpa.toFixed(3)}`,
      `Academic Status: ${standing}`,
      `Total Credits:   ${totalCredits}`,
      "",
      "=== Course Breakdown ===",
      `${"Grade".padEnd(8)} ${"Points".padEnd(8)} ${"Credits".padEnd(10)} ${"Quality Pts".padStart(12)}`,
      "-".repeat(40),
    ];

    for (const e of entries) {
      const qualityPts = e.points * e.credits;
      lines.push(
        `${e.grade.padEnd(8)} ${e.points.toFixed(1).padEnd(8)} ${e.credits.toFixed(1).padEnd(10)} ${qualityPts.toFixed(1).padStart(12)}`
      );
    }

    lines.push("-".repeat(40));
    lines.push(
      `${"Total".padEnd(8)} ${"".padEnd(8)} ${totalCredits.toFixed(1).padEnd(10)} ${totalQualityPoints.toFixed(1).padStart(12)}`
    );
    lines.push("");
    lines.push("=== Grade Point Scale ===");
    lines.push("  A+/A = 4.0   A- = 3.7");
    lines.push("  B+   = 3.3   B  = 3.0   B- = 2.7");
    lines.push("  C+   = 2.3   C  = 2.0   C- = 1.7");
    lines.push("  D+   = 1.3   D  = 1.0   D- = 0.7");
    lines.push("  F    = 0.0");

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "gpa-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default gpaCalculator;
