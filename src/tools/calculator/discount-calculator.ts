import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const discountCalculator: ToolPlugin = {
  id: "discount-calculator",
  category: "calculator",
  name: "Discount Calculator",
  description: "Calculate sale price and amount saved after applying a discount percentage.",
  keywords: ["discount", "sale price", "savings", "coupon", "percent off", "price reduction"],
  icon: "🏷️",

  inputMode: "text",
  textPlaceholder: "Enter: price discount%\nExample: 99.99 25",
  textButtonLabel: "Calculate",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();
    if (!text) throw new Error("Please enter original price and discount percentage (e.g. 99.99 25).");

    const parts = text.split(/\s+/);
    if (parts.length < 2) throw new Error("Please enter price and discount percentage.");

    const price = parseFloat(parts[0]);
    const discount = parseFloat(parts[1].replace("%", ""));

    if (isNaN(price) || isNaN(discount)) throw new Error("Invalid numbers. Example: 99.99 25");
    if (price < 0) throw new Error("Price cannot be negative.");
    if (discount < 0 || discount > 100) throw new Error("Discount must be between 0 and 100%.");

    const savings = price * discount / 100;
    const salePrice = price - savings;

    const fmt = (v: number) => `$${v.toFixed(2)}`;

    const lines: string[] = [
      "=== Discount Result ===",
      `Original Price:  ${fmt(price)}`,
      `Discount:        ${discount}% off`,
      `Amount Saved:    ${fmt(savings)}`,
      `Sale Price:      ${fmt(salePrice)}`,
      "",
      "=== Additional Discounts ===",
    ];

    [10, 15, 20, 25, 30, 40, 50].forEach((pct) => {
      const s = price * pct / 100;
      const sp = price - s;
      const marker = pct === discount ? " <-- your discount" : "";
      lines.push(`  ${String(pct).padStart(3)}% off:  Save ${fmt(s)}  →  ${fmt(sp)}${marker}`);
    });

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "discount-result.txt",
      mimeType: "text/plain",
    };
  },
};

export default discountCalculator;
