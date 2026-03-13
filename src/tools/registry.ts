import type { ToolPlugin, Category } from "./types";

// PDF tools
import mergePdf from "./pdf/merge-pdf";
import splitPdf from "./pdf/split-pdf";
import pdfToJpg from "./pdf/pdf-to-jpg";
import jpgToPdf from "./pdf/jpg-to-pdf";
import rotatePdf from "./pdf/rotate-pdf";
import pdfToText from "./pdf/pdf-to-text";
import watermarkPdf from "./pdf/watermark-pdf";
import compressPdf from "./pdf/compress-pdf";
import pageNumbersPdf from "./pdf/page-numbers-pdf";
// protect-pdf removed: pdf-lib doesn't support encryption; needs a backend solution

// Image tools
import compressImage from "./image/compress-image";
import resizeImage from "./image/resize-image";
import pngToJpg from "./image/png-to-jpg";
import jpgToPng from "./image/jpg-to-png";
import heicToJpg from "./image/heic-to-jpg";
import svgToPng from "./image/svg-to-png";
import cropImage from "./image/crop-image";
import ocrImage from "./image/ocr-image";

// Text tools
import jsonFormatter from "./text/json-formatter";
import wordCounter from "./text/word-counter";
import base64Codec from "./text/base64-codec";
import markdownToHtml from "./text/markdown-to-html";
import diffChecker from "./text/diff-checker";
import jsMinifier from "./text/js-minifier";
import cssMinifier from "./text/css-minifier";

// Convert tools
import csvToJson from "./text/csv-to-json";
import yamlJson from "./text/yaml-json";
import jsonToCsv from "./convert/json-to-csv";
import xmlFormatter from "./convert/xml-formatter";

// Generator tools
import qrCode from "./generator/qr-code";
import colorConverter from "./generator/color-converter";

const tools: ToolPlugin[] = [
  // PDF
  mergePdf,
  splitPdf,
  pdfToJpg,
  jpgToPdf,
  rotatePdf,
  pdfToText,
  watermarkPdf,
  compressPdf,
  pageNumbersPdf,
  // Image
  compressImage,
  resizeImage,
  pngToJpg,
  jpgToPng,
  heicToJpg,
  svgToPng,
  cropImage,
  ocrImage,
  // Text
  jsonFormatter,
  wordCounter,
  base64Codec,
  markdownToHtml,
  diffChecker,
  jsMinifier,
  cssMinifier,
  // Convert
  csvToJson,
  yamlJson,
  jsonToCsv,
  xmlFormatter,
  // Generator
  qrCode,
  colorConverter,
];

export function getAllTools(locale?: string): ToolPlugin[] {
  if (!locale) return tools;
  return tools.filter((t) => !t.hiddenLocales?.includes(locale));
}

export function getToolById(id: string): ToolPlugin | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolsByCategory(category: Category, locale?: string): ToolPlugin[] {
  return tools.filter(
    (t) => t.category === category && (!locale || !t.hiddenLocales?.includes(locale))
  );
}

export function getCategories(): Category[] {
  return [...new Set(tools.map((t) => t.category))];
}

export function searchTools(query: string): ToolPlugin[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}
