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
import imageMetadataRemover from "./image/image-metadata-remover";
import imageColorPicker from "./image/image-color-picker";
import imageToBase64 from "./image/image-to-base64";
import imageFlipRotate from "./image/image-flip-rotate";
import webpToPng from "./image/webp-to-png";
import webpToJpg from "./image/webp-to-jpg";
import gifToPng from "./image/gif-to-png";

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
import passwordGenerator from "./generator/password-generator";
import randomNumberGenerator from "./generator/random-number-generator";
import colorPaletteGenerator from "./generator/color-palette-generator";
import randomNamePicker from "./generator/random-name-picker";
import invoiceGenerator from "./generator/invoice-generator";
import strongPasswordChecker from "./generator/strong-password-checker";
import fakeDataGenerator from "./generator/fake-data-generator";
import placeholderImageGenerator from "./generator/placeholder-image-generator";

// Utility tools
import temperatureConverter from "./utility/temperature-converter";
import lengthConverter from "./utility/length-converter";
import weightConverter from "./utility/weight-converter";
import speedConverter from "./utility/speed-converter";
import dataStorageConverter from "./utility/data-storage-converter";
import cookingConverter from "./utility/cooking-converter";
import numberBaseConverter from "./utility/number-base-converter";
import shoeConverter from "./utility/shoe-size-converter";
import stopwatch from "./utility/stopwatch";
import countdownTimer from "./utility/countdown-timer";
import pomodoroTimer from "./utility/pomodoro-timer";
import worldClock from "./utility/world-clock";
import textEncryptDecrypt from "./utility/text-encrypt-decrypt";
import urlChecker from "./utility/url-checker";

// Calculator tools
import percentageCalculator from "./calculator/percentage-calculator";
import bmiCalculator from "./calculator/bmi-calculator";
import ageCalculator from "./calculator/age-calculator";
import tipCalculator from "./calculator/tip-calculator";
import compoundInterestCalculator from "./calculator/compound-interest-calculator";
import mortgageCalculator from "./calculator/mortgage-calculator";
import loanCalculator from "./calculator/loan-calculator";
import gradeCalculator from "./calculator/grade-calculator";
import gpaCalculator from "./calculator/gpa-calculator";
import calorieCalculator from "./calculator/calorie-calculator";
import pregnancyDueDate from "./calculator/pregnancy-due-date";
import dateDifferenceCalculator from "./calculator/date-difference-calculator";
import timeZoneConverter from "./calculator/time-zone-converter";
import discountCalculator from "./calculator/discount-calculator";
import scientificCalculator from "./calculator/scientific-calculator";
import debtPayoffCalculator from "./calculator/debt-payoff-calculator";

// Developer tools
import regexTester from "./developer/regex-tester";
import timestampConverter from "./developer/timestamp-converter";
import jsonToTypescript from "./developer/json-to-typescript";
import htmlToJsx from "./developer/html-to-jsx";
import chmodCalculator from "./developer/chmod-calculator";
import metaTagGenerator from "./developer/meta-tag-generator";
import cssGradientGenerator from "./developer/css-gradient-generator";
import httpStatusCodes from "./developer/http-status-codes";
import cssBoxShadowGenerator from "./developer/css-box-shadow-generator";
import cssFlexboxGenerator from "./developer/css-flexbox-generator";
import faviconGenerator from "./developer/favicon-generator";
import jsonValidator from "./developer/json-validator";
import cssUnitConverter from "./developer/css-unit-converter";
import colorContrastChecker from "./developer/color-contrast-checker";
import svgOptimizer from "./developer/svg-optimizer";

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
  imageMetadataRemover,
  imageColorPicker,
  imageToBase64,
  imageFlipRotate,
  webpToPng,
  webpToJpg,
  gifToPng,
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
  passwordGenerator,
  randomNumberGenerator,
  colorPaletteGenerator,
  randomNamePicker,
  invoiceGenerator,
  strongPasswordChecker,
  fakeDataGenerator,
  placeholderImageGenerator,
  // Utility
  temperatureConverter,
  lengthConverter,
  weightConverter,
  speedConverter,
  dataStorageConverter,
  cookingConverter,
  numberBaseConverter,
  shoeConverter,
  stopwatch,
  countdownTimer,
  pomodoroTimer,
  worldClock,
  textEncryptDecrypt,
  urlChecker,
  // Calculator
  percentageCalculator,
  bmiCalculator,
  ageCalculator,
  tipCalculator,
  compoundInterestCalculator,
  mortgageCalculator,
  loanCalculator,
  gradeCalculator,
  gpaCalculator,
  calorieCalculator,
  pregnancyDueDate,
  dateDifferenceCalculator,
  timeZoneConverter,
  discountCalculator,
  scientificCalculator,
  debtPayoffCalculator,
  // Developer
  regexTester,
  timestampConverter,
  jsonToTypescript,
  htmlToJsx,
  chmodCalculator,
  metaTagGenerator,
  cssGradientGenerator,
  httpStatusCodes,
  cssBoxShadowGenerator,
  cssFlexboxGenerator,
  faviconGenerator,
  jsonValidator,
  cssUnitConverter,
  colorContrastChecker,
  svgOptimizer,
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
