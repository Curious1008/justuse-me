import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const debtPayoffCalculator: ToolPlugin = {
  id: "debt-payoff-calculator",
  category: "calculator",
  name: "Debt Payoff Calculator",
  description: "Calculate how long it takes to pay off debt and total interest paid based on balance, rate, and monthly payment.",
  keywords: ["debt payoff", "credit card", "debt free", "interest", "monthly payment", "debt calculator"],
  icon: "💰",

  inputMode: "text",
  textPlaceholder: "Enter: balance rate% monthly-payment\nExample: 5000 18 200",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter balance, annual rate, and monthly payment (e.g. 5000 18 200).");

    const parts = text.split(/\s+/);
    if (parts.length < 3) throw new Error("Please enter balance, rate, and monthly payment.");

    const balance = parseFloat(parts[0]);
    const annualRate = parseFloat(parts[1].replace("%", "")) / 100;
    const monthlyPayment = parseFloat(parts[2]);

    if (isNaN(balance) || isNaN(annualRate) || isNaN(monthlyPayment)) {
      throw new Error("Invalid numbers. Example: 5000 18 200");
    }
    if (balance <= 0) throw new Error("Balance must be positive.");
    if (annualRate < 0) throw new Error("Rate cannot be negative.");
    if (monthlyPayment <= 0) throw new Error("Monthly payment must be positive.");

    const monthlyRate = annualRate / 12;

    // Check if payment is at least greater than the first month's interest
    const firstInterest = balance * monthlyRate;
    if (monthlyPayment <= firstInterest) {
      throw new Error(
        `Monthly payment ($${monthlyPayment.toFixed(2)}) is less than or equal to the first month's interest ($${firstInterest.toFixed(2)}). Debt can never be paid off. Increase payment.`
      );
    }

    // Calculate months to pay off
    let months: number;
    if (monthlyRate === 0) {
      months = Math.ceil(balance / monthlyPayment);
    } else {
      months = Math.ceil(-Math.log(1 - (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate));
    }

    if (!isFinite(months) || months > 1200) {
      throw new Error("Payment is too low to pay off debt in a reasonable time. Please increase your monthly payment.");
    }

    const totalPaid = monthlyPayment * (months - 1) + (balance * Math.pow(1 + monthlyRate, months - 1) -
      monthlyPayment * (Math.pow(1 + monthlyRate, months - 1) - 1) / monthlyRate);
    const totalInterest = totalPaid - balance;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const fmt = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const lines: string[] = [
      "=== Debt Payoff Result ===",
      `Balance:         ${fmt(balance)}`,
      `Annual Rate:     ${(annualRate * 100).toFixed(2)}%`,
      `Monthly Rate:    ${(monthlyRate * 100).toFixed(3)}%`,
      `Monthly Payment: ${fmt(monthlyPayment)}`,
      "",
      `Payoff Time:     ${months} months`,
      years > 0
        ? `                 (${years} year${years !== 1 ? "s" : ""} and ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""})`
        : "",
      `Total Paid:      ${fmt(totalPaid)}`,
      `Total Interest:  ${fmt(totalInterest)}`,
      `Interest %:      ${((totalInterest / balance) * 100).toFixed(1)}% of original balance`,
      "",
      "=== Payment Comparison ===",
    ].filter((l) => l !== "");

    // Show what happens with different payment amounts
    const paymentOptions = [
      monthlyPayment * 0.75,
      monthlyPayment,
      monthlyPayment * 1.25,
      monthlyPayment * 1.5,
      monthlyPayment * 2,
    ].filter((p) => p > firstInterest);

    for (const payment of paymentOptions) {
      const m = Math.ceil(-Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate));
      if (!isFinite(m) || m > 1200) continue;
      const tp = payment * m;
      const ti = tp - balance;
      const marker = Math.abs(payment - monthlyPayment) < 0.01 ? " <-- your payment" : "";
      lines.push(`  ${fmt(payment)}/mo → ${m} months, Total Interest: ${fmt(ti)}${marker}`);
    }

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "debt-payoff-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default debtPayoffCalculator;
