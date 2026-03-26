import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const gradeCalculator: ToolPlugin = {
  id: "grade-calculator",
  category: "calculator",
  name: "Grade Calculator",
  description: "Calculate weighted average grade from scores and their weights.",
  keywords: ["grade", "weighted average", "score", "gpa", "academic", "marks"],
  icon: "📝",

  inputMode: "text",
  textPlaceholder: "Enter scores and weights (one per line):\n90 30%\n85 30%\n78 40%",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter scores and weights, one per line (e.g. 90 30%).");

    const rawLines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (rawLines.length === 0) throw new Error("No valid entries found.");

    interface Entry { score: number; weight: number; label: string }
    const entries: Entry[] = [];

    for (const line of rawLines) {
      const parts = line.split(/\s+/);
      if (parts.length < 2) throw new Error(`Invalid line: "${line}". Expected: score weight (e.g. 90 30%)`);
      const score = parseFloat(parts[0]);
      const weight = parseFloat(parts[1].replace("%", ""));
      if (isNaN(score) || isNaN(weight)) throw new Error(`Invalid numbers in line: "${line}"`);
      if (score < 0 || score > 100) throw new Error(`Score must be between 0 and 100: "${line}"`);
      if (weight <= 0) throw new Error(`Weight must be positive: "${line}"`);
      entries.push({ score, weight, label: line });
    }

    const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
    const weightedSum = entries.reduce((sum, e) => sum + e.score * e.weight, 0);
    const weightedAverage = weightedSum / totalWeight;

    let letterGrade: string;
    if (weightedAverage >= 90) letterGrade = "A";
    else if (weightedAverage >= 80) letterGrade = "B";
    else if (weightedAverage >= 70) letterGrade = "C";
    else if (weightedAverage >= 60) letterGrade = "D";
    else letterGrade = "F";

    const isWeightsNormalized = Math.abs(totalWeight - 100) < 0.01;

    const lines: string[] = [
      "=== Grade Result ===",
      `Weighted Average: ${weightedAverage.toFixed(2)}%`,
      `Letter Grade:     ${letterGrade}`,
      "",
      "=== Score Breakdown ===",
      `${"Score".padEnd(8)} ${"Weight".padEnd(10)} ${"Contribution".padStart(14)}`,
      "-".repeat(34),
    ];

    for (const e of entries) {
      const normalizedWeight = (e.weight / totalWeight) * 100;
      const contribution = e.score * (e.weight / totalWeight);
      lines.push(
        `${String(e.score).padEnd(8)} ${(e.weight.toFixed(1) + "%").padEnd(10)} ${contribution.toFixed(2).padStart(14)}`
      );
    }

    lines.push("-".repeat(34));
    lines.push(`${"Total".padEnd(8)} ${(totalWeight.toFixed(1) + "%").padEnd(10)} ${weightedAverage.toFixed(2).padStart(14)}`);

    if (!isWeightsNormalized) {
      lines.push("");
      lines.push(`Note: Weights sum to ${totalWeight.toFixed(1)}% (not 100%). Result is normalized.`);
    }

    lines.push("");
    lines.push("=== Grade Scale ===");
    lines.push("  90-100  A");
    lines.push("  80-89   B");
    lines.push("  70-79   C");
    lines.push("  60-69   D");
    lines.push("  < 60    F");

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "grade-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default gradeCalculator;
