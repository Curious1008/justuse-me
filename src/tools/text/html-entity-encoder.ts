import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": "\u00A0",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
  "&mdash;": "—",
  "&ndash;": "–",
  "&laquo;": "«",
  "&raquo;": "»",
};

const htmlEntityEncoder: ToolPlugin = {
  id: "html-entity-encoder",
  category: "text",
  name: "HTML Entity Encoder",
  description: "Encode and decode HTML special characters like &amp;, &lt;, and &gt;.",
  keywords: ["html encode", "html decode", "html entities", "escape html"],
  icon: "🏷️",
  inputMode: "text",
  textPlaceholder: "Line 1: encode or decode\nThen paste your HTML or text",
  textButtonLabel: "Process",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 5 * 1024 * 1024,
  runtime: "browser",
  previewUI: TextPreview,
  async process(files): Promise<ToolResult> {
    const raw = await files[0].text();
    const newlineIdx = raw.indexOf("\n");
    if (newlineIdx === -1) {
      throw new Error('Please provide "encode" or "decode" on the first line, then your text below.');
    }

    const mode = raw.slice(0, newlineIdx).trim().toLowerCase();
    const text = raw.slice(newlineIdx + 1);

    let result: string;
    if (mode === "encode") {
      result = text.replace(/[&<>"']/g, (ch) => ENCODE_MAP[ch] ?? ch);
    } else if (mode === "decode") {
      // Decode named entities and numeric entities
      result = text
        .replace(/&[a-z]+;/gi, (entity) => DECODE_MAP[entity] ?? entity)
        .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    } else {
      throw new Error(`Unknown mode "${mode}". Use "encode" or "decode".`);
    }

    return {
      blob: new Blob([result], { type: "text/plain" }),
      filename: `html-${mode}d.txt`,
      mimeType: "text/plain",
    };
  },
};

export default htmlEntityEncoder;
