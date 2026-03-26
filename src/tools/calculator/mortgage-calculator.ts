import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const mortgageCalculator: ToolPlugin = {
  id: "mortgage-calculator",
  category: "calculator",
  name: "Mortgage Calculator",
  description: "Calculate monthly mortgage payments, total interest paid, and amortization summary.",
  keywords: ["mortgage", "home loan", "monthly payment", "amortization", "real estate", "housing"],
  icon: "🏠",

  inputMode: "text",
  textPlaceholder: "Enter: loan-amount rate% years\nExample: 300000 6.5 30",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter loan amount, interest rate, and loan term in years (e.g. 300000 6.5 30).");

    const parts = text.split(/\s+/);
    if (parts.length < 3) throw new Error("Please enter loan amount, rate, and years.");

    const principal = parseFloat(parts[0]);
    const annualRate = parseFloat(parts[1].replace("%", "")) / 100;
    const years = parseInt(parts[2], 10);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) throw new Error("Invalid numbers. Example: 300000 6.5 30");
    if (principal <= 0) throw new Error("Loan amount must be positive.");
    if (annualRate < 0) throw new Error("Interest rate cannot be negative.");
    if (years <= 0 || years > 50) throw new Error("Loan term must be between 1 and 50 years.");

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numPayments;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;

    const fmt = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const lines: string[] = [
      "=== Mortgage Result ===",
      `Loan Amount:     ${fmt(principal)}`,
      `Interest Rate:   ${(annualRate * 100).toFixed(2)}% per year`,
      `Loan Term:       ${years} year${years !== 1 ? "s" : ""} (${numPayments} payments)`,
      "",
      `Monthly Payment: ${fmt(monthlyPayment)}`,
      `Total Paid:      ${fmt(totalPaid)}`,
      `Total Interest:  ${fmt(totalInterest)}`,
      `Interest %:      ${((totalInterest / totalPaid) * 100).toFixed(1)}% of total payments`,
      "",
      "=== Amortization Summary (by year) ===",
      `${"Year".padEnd(6)} ${"Principal Paid".padStart(15)} ${"Interest Paid".padStart(14)} ${"Balance".padStart(14)}`,
      "-".repeat(51),
    ];

    let balance = principal;
    for (let y = 1; y <= Math.min(years, 30); y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        balance -= principalPayment;
        if (balance < 0) balance = 0;
      }
      lines.push(
        `${String(y).padEnd(6)} ${fmt(yearPrincipal).padStart(15)} ${fmt(yearInterest).padStart(14)} ${fmt(balance).padStart(14)}`
      );
    }
    if (years > 30) {
      lines.push(`... (${years - 30} more years)`);
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "mortgage-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default mortgageCalculator;
