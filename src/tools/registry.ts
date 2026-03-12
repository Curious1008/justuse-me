import type { ToolPlugin, Category } from "./types";

// PDF tools
import mergePdf from "./pdf/merge-pdf";
import splitPdf from "./pdf/split-pdf";
import pdfToJpg from "./pdf/pdf-to-jpg";
import jpgToPdf from "./pdf/jpg-to-pdf";

// Image tools
import compressImage from "./image/compress-image";
import resizeImage from "./image/resize-image";

// Text tools
import jsonFormatter from "./text/json-formatter";
import wordCounter from "./text/word-counter";
import base64Codec from "./text/base64-codec";

const tools: ToolPlugin[] = [
  mergePdf,
  splitPdf,
  pdfToJpg,
  jpgToPdf,
  compressImage,
  resizeImage,
  jsonFormatter,
  wordCounter,
  base64Codec,
];

export function getAllTools(): ToolPlugin[] {
  return tools;
}

export function getToolById(id: string): ToolPlugin | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolsByCategory(category: Category): ToolPlugin[] {
  return tools.filter((t) => t.category === category);
}

export function getCategories(): Category[] {
  return [...new Set(tools.map((t) => t.category))];
}
