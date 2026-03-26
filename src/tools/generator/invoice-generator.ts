import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

interface LineItem {
  name: string;
  qty: number;
  price: number;
}

function parseInvoice(text: string): {
  from: string;
  to: string;
  date: string;
  invoiceNo: string;
  items: LineItem[];
} {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let from = "Your Company";
  let to = "Client";
  let date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  let invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
  const items: LineItem[] = [];
  let inItems = false;

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.startsWith("from:")) { from = line.slice(5).trim(); continue; }
    if (lower.startsWith("to:")) { to = line.slice(3).trim(); continue; }
    if (lower.startsWith("date:")) { date = line.slice(5).trim(); continue; }
    if (lower.startsWith("invoice") && lower.includes("#")) {
      invoiceNo = line.split("#")[1]?.trim() ?? invoiceNo; continue;
    }
    if (lower === "items:") { inItems = true; continue; }
    if (inItems && line.includes("|")) {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 3) {
        const name = parts[0];
        const qty = parseFloat(parts[1]) || 1;
        const price = parseFloat(parts[2].replace(/[^0-9.]/g, "")) || 0;
        items.push({ name, qty, price });
      }
    }
  }

  return { from, to, date, invoiceNo, items };
}

const invoiceGenerator: ToolPlugin = {
  id: "invoice-generator",
  category: "generator",
  name: "Invoice Generator",
  description: "Generate a clean formatted text invoice with automatic total calculation.",
  keywords: [
    "invoice generator",
    "invoice maker",
    "billing",
    "receipt",
    "invoice template",
  ],
  icon: "\u{1F4CB}",

  inputMode: "text",
  textPlaceholder:
    "From: Your Company\nTo: Client Name\nItems:\nItem 1 | 2 | $50\nItem 2 | 1 | $100",
  textButtonLabel: "Generate Invoice",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const { from, to, date, invoiceNo, items } = parseInvoice(text);

    const colW = [30, 8, 12, 12];
    const sep = "=".repeat(colW.reduce((a, b) => a + b, 0) + 3 * 3);
    const line = "-".repeat(sep.length);

    const pad = (str: string, w: number, right = false) =>
      right ? str.padStart(w) : str.padEnd(w);

    const row = (a: string, b: string, c: string, d: string) =>
      `${pad(a, colW[0])}   ${pad(b, colW[1], true)}   ${pad(c, colW[2], true)}   ${pad(d, colW[3], true)}`;

    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const fmt = (n: number) => `$${n.toFixed(2)}`;

    const out: string[] = [
      sep,
      "INVOICE".padStart(Math.floor(sep.length / 2) + 3),
      sep,
      "",
      `Invoice #:  ${invoiceNo}`,
      `Date:       ${date}`,
      "",
      `From:  ${from}`,
      `To:    ${to}`,
      "",
      sep,
      row("Description", "Qty", "Unit Price", "Amount"),
      sep,
    ];

    if (items.length === 0) {
      out.push(row("(no items entered)", "", "", ""));
    } else {
      for (const it of items) {
        out.push(row(it.name, String(it.qty), fmt(it.price), fmt(it.qty * it.price)));
      }
    }

    out.push(
      sep,
      row("", "", "Subtotal:", fmt(subtotal)),
      row("", "", "Tax (10%):", fmt(tax)),
      line,
      row("", "", "TOTAL:", fmt(total)),
      sep,
      "",
      "Thank you for your business!",
    );

    return {
      blob: new Blob([out.join("\n")], { type: "text/plain" }),
      filename: "invoice.txt",
      mimeType: "text/plain",
    };
  },
};

export default invoiceGenerator;
