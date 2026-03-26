import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const loanCalculator: ToolPlugin = {
  id: "loan-calculator",
  category: "calculator",
  name: "Loan Calculator",
  description: "Calculate monthly loan payments and total interest for any personal or auto loan.",
  keywords: ["loan", "monthly payment", "interest", "personal loan", "auto loan", "finance"],
  icon: "💳",

  inputMode: "text",
  textPlaceholder: "Enter: loan-amount rate% months\nExample: 20000 8 48",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter loan amount, annual rate, and months (e.g. 20000 8 48).");

    const parts = text.split(/\s+/);
    if (parts.length < 3) throw new Error("Please enter loan amount, rate, and months.");

    const principal = parseFloat(parts[0]);
    const annualRate = parseFloat(parts[1].replace("%", "")) / 100;
    const months = parseInt(parts[2], 10);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(months)) throw new Error("Invalid numbers. Example: 20000 8 48");
    if (principal <= 0) throw new Error("Loan amount must be positive.");
    if (annualRate < 0) throw new Error("Interest rate cannot be negative.");
    if (months <= 0 || months > 600) throw new Error("Loan term must be between 1 and 600 months.");

    const monthlyRate = annualRate / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    const fmt = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const lines: string[] = [
      "=== Loan Result ===",
      `Loan Amount:     ${fmt(principal)}`,
      `Annual Rate:     ${(annualRate * 100).toFixed(2)}%`,
      `Term:            ${months} months (${(months / 12).toFixed(1)} years)`,
      "",
      `Monthly Payment: ${fmt(monthlyPayment)}`,
      `Total Paid:      ${fmt(totalPaid)}`,
      `Total Interest:  ${fmt(totalInterest)}`,
      `Interest %:      ${((totalInterest / principal) * 100).toFixed(1)}% of loan amount`,
      "",
      "=== Payment Breakdown ===",
      `First payment:`,
      `  Principal:     ${fmt(monthlyPayment - (principal * monthlyRate))}`,
      `  Interest:      ${fmt(principal * monthlyRate)}`,
      "",
      `Last payment:`,
    ];

    // Calculate last payment breakdown
    let balance = principal;
    for (let m = 0; m < months - 1; m++) {
      const interest = balance * monthlyRate;
      balance -= (monthlyPayment - interest);
    }
    const lastInterest = balance * monthlyRate;
    const lastPrincipal = balance;
    lines.push(`  Principal:     ${fmt(lastPrincipal)}`);
    lines.push(`  Interest:      ${fmt(lastInterest)}`);

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "loan-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default loanCalculator;
