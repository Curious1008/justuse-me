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

// Image tools
import compressImage from "./image/compress-image";
import resizeImage from "./image/resize-image";
import pngToJpg from "./image/png-to-jpg";
import jpgToPng from "./image/jpg-to-png";
import heicToJpg from "./image/heic-to-jpg";
import svgToPng from "./image/svg-to-png";
import cropImage from "./image/crop-image";
import ocrImage from "./image/ocr-image";
import exifViewer from "./image/exif-viewer";

// Text tools
import jsonFormatter from "./text/json-formatter";
import wordCounter from "./text/word-counter";
import base64Codec from "./text/base64-codec";
import markdownToHtml from "./text/markdown-to-html";
import diffChecker from "./text/diff-checker";
import jsMinifier from "./text/js-minifier";
import cssMinifier from "./text/css-minifier";
import sqlFormatter from "./text/sql-formatter";
import htmlBeautifier from "./text/html-beautifier";
import jwtDecoder from "./text/jwt-decoder";
import cronExplainer from "./text/cron-explainer";
import slugGenerator from "./text/slug-generator";
import handlebarsPreview from "./text/handlebars-preview";
import caseConverter from "./text/case-converter";
import removeDuplicateLines from "./text/remove-duplicate-lines";
import sortLines from "./text/sort-lines";
import stringReverse from "./text/string-reverse";
import readabilityChecker from "./text/readability-checker";
import removeWhitespace from "./text/remove-whitespace";
import findAndReplace from "./text/find-and-replace";
import urlEncoderDecoder from "./text/url-encoder-decoder";
import htmlEntityEncoder from "./text/html-entity-encoder";
import numberToWords from "./text/number-to-words";

// Convert tools
import csvToJson from "./text/csv-to-json";
import yamlJson from "./text/yaml-json";
import jsonToCsv from "./convert/json-to-csv";
import xmlFormatter from "./convert/xml-formatter";
import htmlToMarkdown from "./convert/html-to-markdown";
import json5ToJson from "./convert/json5-to-json";
import tomlToJson from "./convert/toml-to-json";
import jsonToMarkdownTable from "./convert/json-to-markdown-table";
import typescriptToJs from "./convert/typescript-to-js";

// Generator tools
import qrCode from "./generator/qr-code";
import colorConverter from "./generator/color-converter";
import uuidGenerator from "./generator/uuid-generator";
import loremIpsum from "./generator/lorem-ipsum";
import hashGenerator from "./generator/hash-generator";
import barcodeGenerator from "./generator/barcode-generator";

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
  exifViewer,
  // Text
  jsonFormatter,
  wordCounter,
  base64Codec,
  markdownToHtml,
  diffChecker,
  jsMinifier,
  cssMinifier,
  sqlFormatter,
  htmlBeautifier,
  jwtDecoder,
  cronExplainer,
  slugGenerator,
  handlebarsPreview,
  caseConverter,
  removeDuplicateLines,
  sortLines,
  stringReverse,
  readabilityChecker,
  removeWhitespace,
  findAndReplace,
  urlEncoderDecoder,
  htmlEntityEncoder,
  numberToWords,
  // Convert
  csvToJson,
  yamlJson,
  jsonToCsv,
  xmlFormatter,
  htmlToMarkdown,
  json5ToJson,
  tomlToJson,
  jsonToMarkdownTable,
  typescriptToJs,
  // Generator
  qrCode,
  colorConverter,
  uuidGenerator,
  loremIpsum,
  hashGenerator,
  barcodeGenerator,
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
