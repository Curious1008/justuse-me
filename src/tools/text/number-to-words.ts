import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const ones = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function sayBelow1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) {
    const rem = n % 10;
    return tens[Math.floor(n / 10)] + (rem ? "-" + ones[rem] : "");
  }
  const rem = n % 100;
  return ones[Math.floor(n / 100)] + " hundred" + (rem ? " " + sayBelow1000(rem) : "");
}

function integerToWords(num: number): string {
  if (num === 0) return "zero";

  const negative = num < 0;
  let n = Math.abs(Math.floor(num));

  const scales = ["", " thousand", " million", " billion", " trillion", " quadrillion"];
  const parts: string[] = [];
  let i = 0;

  while (n > 0) {
    const chunk = n % 1000;
    if (chunk !== 0) {
      parts.unshift(sayBelow1000(chunk) + scales[i]);
    }
    n = Math.floor(n / 1000);
    i++;
    if (i >= scales.length && n > 0) {
      throw new Error("Number is too large to convert.");
    }
  }

  const result = parts.join(" ");
  return negative ? "negative " + result : result;
}

function numberToWords(input: string): string {
  input = input.trim();
  if (!/^-?\d+(\.\d+)?$/.test(input)) {
    throw new Error(`"${input}" is not a valid number.`);
  }

  const dotIdx = input.indexOf(".");
  if (dotIdx === -1) {
    return integerToWords(parseInt(input, 10));
  }

  const intPart = input.slice(0, dotIdx);
  const fracPart = input.slice(dotIdx + 1);

  const intWords = integerToWords(parseInt(intPart, 10));
  // Read decimal digits individually
  const fracWords = [...fracPart].map((d) => ones[parseInt(d)] || "zero").join(" ");
  return intWords + " point " + fracWords;
}

const numberToWordsTool: ToolPlugin = {
  id: "number-to-words",
  category: "text",
  name: "Number to Words",
  description: "Convert numbers to English words (e.g. 1234 → \"one thousand two hundred thirty-four\").",
  keywords: ["number to words", "number spelling", "convert number", "english words"],
  icon: "🔢",
  inputMode: "text",
  textPlaceholder: "Enter a number (e.g. 1234)",
  textButtonLabel: "Convert",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const text = await files[0].text();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    if (lines.length === 0) {
      throw new Error("Please enter at least one number.");
    }

    const results: string[] = [];
    for (const line of lines) {
      try {
        results.push(`${line} → ${numberToWords(line)}`);
      } catch (e) {
        results.push(`${line} → ERROR: ${(e as Error).message}`);
      }
    }

    const result = results.join("\n");

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: "number-to-words.txt",
      mimeType: "text/plain",
    };
  },
};

export default numberToWordsTool;
