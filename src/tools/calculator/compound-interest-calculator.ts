import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const compoundInterestCalculator: ToolPlugin = {
  id: "compound-interest-calculator",
  category: "calculator",
  name: "Compound Interest Calculator",
  description: "Calculate compound interest growth with future value, total interest, and year-by-year breakdown.",
  keywords: ["compound interest", "investment", "savings", "interest", "future value", "finance"],
  icon: "📈",

  inputMode: "text",
  textPlaceholder: "Enter: principal rate% years [compounds-per-year]\nExample: 10000 5 10 12",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter principal, rate, years, and optionally compounds per year (e.g. 10000 5 10 12).");

    const parts = text.split(/\s+/);
    if (parts.length < 3) throw new Error("Please enter at least principal, rate, and years.");

    const principal = parseFloat(parts[0]);
    const rate = parseFloat(parts[1].replace("%", "")) / 100;
    const years = parseInt(parts[2], 10);
    const n = parts.length >= 4 ? parseInt(parts[3], 10) : 1; // compounding frequency

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) throw new Error("Invalid numbers.");
    if (principal <= 0) throw new Error("Principal must be positive.");
    if (rate < 0) throw new Error("Rate cannot be negative.");
    if (years <= 0 || years > 100) throw new Error("Years must be between 1 and 100.");
    if (n <= 0) throw new Error("Compounds per year must be positive.");

    const frequencyLabel: Record<number, string> = {
      1: "Annually",
      2: "Semi-annually",
      4: "Quarterly",
      12: "Monthly",
      52: "Weekly",
      365: "Daily",
    };
    const freqName = frequencyLabel[n] || `${n}x per year`;

    const futureValue = principal * Math.pow(1 + rate / n, n * years);
    const totalInterest = futureValue - principal;

    const fmt = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const lines: string[] = [
      "=== Compound Interest Result ===",
      `Principal:       ${fmt(principal)}`,
      `Rate:            ${(rate * 100).toFixed(2)}% per year`,
      `Duration:        ${years} year${years !== 1 ? "s" : ""}`,
      `Compounding:     ${freqName} (${n}x/year)`,
      "",
      `Future Value:    ${fmt(futureValue)}`,
      `Total Interest:  ${fmt(totalInterest)}`,
      `Total Return:    ${((totalInterest / principal) * 100).toFixed(2)}%`,
      "",
      "=== Year-by-Year Breakdown ===",
      `${"Year".padEnd(6)} ${"Balance".padStart(14)} ${"Interest Earned".padStart(16)}`,
      "-".repeat(38),
    ];

    for (let y = 1; y <= Math.min(years, 30); y++) {
      const balance = principal * Math.pow(1 + rate / n, n * y);
      const prevBalance = principal * Math.pow(1 + rate / n, n * (y - 1));
      const interest = balance - prevBalance;
      lines.push(`${String(y).padEnd(6)} ${fmt(balance).padStart(14)} ${fmt(interest).padStart(16)}`);
    }
    if (years > 30) {
      lines.push(`... (${years - 30} more years)`);
      lines.push(`${String(years).padEnd(6)} ${fmt(futureValue).padStart(14)} ${"(final)".padStart(16)}`);
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "compound-interest-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default compoundInterestCalculator;
