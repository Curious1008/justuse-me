import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const tipCalculator: ToolPlugin = {
  id: "tip-calculator",
  category: "calculator",
  name: "Tip Calculator",
  description: "Calculate tip amount, total bill, and per-person split based on bill amount and tip percentage.",
  keywords: ["tip", "gratuity", "restaurant", "bill split", "tip calculator", "dining"],
  icon: "🍽️",

  inputMode: "text",
  textPlaceholder: "Enter: bill tip% people\nExample: 85.50 18 4",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter bill amount, tip percentage, and number of people (e.g. 85.50 18 4).");

    const parts = text.split(/\s+/);
    if (parts.length < 2) throw new Error("Please enter at least bill amount and tip percentage.");

    const bill = parseFloat(parts[0]);
    const tipPct = parseFloat(parts[1].replace("%", ""));
    const people = parts.length >= 3 ? parseInt(parts[2], 10) : 1;

    if (isNaN(bill) || isNaN(tipPct)) throw new Error("Invalid numbers. Example: 85.50 18 4");
    if (bill < 0) throw new Error("Bill amount cannot be negative.");
    if (tipPct < 0) throw new Error("Tip percentage cannot be negative.");
    if (people < 1 || isNaN(people)) throw new Error("Number of people must be at least 1.");

    const tipAmount = bill * tipPct / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;
    const billPerPerson = bill / people;

    const fmt = (n: number) => `$${n.toFixed(2)}`;

    const lines: string[] = [
      "=== Tip Result ===",
      `Bill Amount:     ${fmt(bill)}`,
      `Tip (${tipPct}%):    ${fmt(tipAmount)}`,
      `Total:           ${fmt(total)}`,
      "",
    ];

    if (people > 1) {
      lines.push("=== Per Person ===");
      lines.push(`People:          ${people}`);
      lines.push(`Bill/person:     ${fmt(billPerPerson)}`);
      lines.push(`Tip/person:      ${fmt(tipPerPerson)}`);
      lines.push(`Total/person:    ${fmt(perPerson)}`);
      lines.push("");
    }

    lines.push("=== Common Tip Amounts ===");
    [15, 18, 20, 25].forEach((pct) => {
      const t = bill * pct / 100;
      const tot = bill + t;
      const pp = people > 1 ? `  (${fmt(tot / people)}/person)` : "";
      lines.push(`  ${pct}% tip:   ${fmt(t)}  Total: ${fmt(tot)}${pp}`);
    });

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "tip-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default tipCalculator;
