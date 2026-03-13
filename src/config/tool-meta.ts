/**
 * Lightweight tool metadata for OG images and similar edge contexts.
 * Does NOT import any processing libraries.
 */

export interface ToolMeta {
  name: string;
  description: string;
  category: string;
}

const toolMeta: Record<string, ToolMeta> = {
  "merge-pdf": { name: "Merge PDF", description: "Combine multiple PDF files into one document.", category: "pdf" },
  "split-pdf": { name: "Split PDF", description: "Extract pages from a PDF or split into separate files.", category: "pdf" },
  "compress-pdf": { name: "Compress PDF", description: "Reduce PDF file size while maintaining readability.", category: "pdf" },
  "pdf-to-jpg": { name: "PDF to JPG", description: "Convert PDF pages to high-quality JPG images.", category: "pdf" },
  "jpg-to-pdf": { name: "JPG to PDF", description: "Turn images into a single PDF document.", category: "pdf" },
  "rotate-pdf": { name: "Rotate PDF", description: "Rotate all pages of a PDF by 90, 180, or 270 degrees.", category: "pdf" },
  "pdf-to-text": { name: "PDF to Text", description: "Extract text content from a PDF file.", category: "pdf" },
  "watermark-pdf": { name: "Watermark PDF", description: "Add a text watermark to every page of your PDF.", category: "pdf" },
  "page-numbers-pdf": { name: "Add Page Numbers", description: "Add page numbers to every page of your PDF.", category: "pdf" },
  "compress-image": { name: "Compress Image", description: "Reduce image file size without visible quality loss.", category: "image" },
  "resize-image": { name: "Resize Image", description: "Change image dimensions to any size.", category: "image" },
  "crop-image": { name: "Crop Image", description: "Crop images visually with drag-to-select.", category: "image" },
  "png-to-jpg": { name: "PNG to JPG", description: "Convert PNG images to JPG format.", category: "image" },
  "jpg-to-png": { name: "JPG to PNG", description: "Convert JPG images to lossless PNG format.", category: "image" },
  "heic-to-jpg": { name: "HEIC to JPG", description: "Convert iPhone HEIC photos to JPG.", category: "image" },
  "svg-to-png": { name: "SVG to PNG", description: "Convert SVG vector graphics to PNG images.", category: "image" },
  "ocr-image": { name: "Image to Text (OCR)", description: "Extract text from images using OCR.", category: "image" },
  "json-formatter": { name: "JSON Formatter", description: "Format and beautify JSON data.", category: "text" },
  "word-counter": { name: "Word Counter", description: "Count words, characters, and sentences.", category: "text" },
  "base64-codec": { name: "Base64 Encode/Decode", description: "Encode or decode Base64 strings.", category: "text" },
  "markdown-to-html": { name: "Markdown to HTML", description: "Convert Markdown to clean HTML.", category: "text" },
  "diff-checker": { name: "Diff Checker", description: "Compare two texts and highlight differences.", category: "text" },
  "js-minifier": { name: "JS Minifier", description: "Minify JavaScript code for production.", category: "text" },
  "css-minifier": { name: "CSS Minifier", description: "Minify CSS stylesheets for faster loading.", category: "text" },
  "csv-to-json": { name: "CSV to JSON", description: "Convert CSV data to JSON format.", category: "convert" },
  "json-to-csv": { name: "JSON to CSV", description: "Convert JSON arrays to CSV spreadsheet format.", category: "convert" },
  "yaml-json": { name: "YAML / JSON Converter", description: "Convert between YAML and JSON formats.", category: "convert" },
  "xml-formatter": { name: "XML Formatter", description: "Format and beautify XML data.", category: "convert" },
  "qr-code": { name: "QR Code Generator", description: "Generate QR codes from text or URLs.", category: "generator" },
  "color-converter": { name: "Color Converter", description: "Convert colors between HEX, RGB, and HSL.", category: "generator" },
};

export function getToolMeta(toolId: string): ToolMeta | null {
  return toolMeta[toolId] ?? null;
}
