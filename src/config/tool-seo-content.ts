/**
 * Per-tool SEO content: pain-point descriptions, how-to steps, FAQs, related tools.
 * Written from user perspective targeting long-tail keywords competitors rank for.
 */

export interface ToolSEOContent {
  /** Expanded description targeting search intent (2-3 sentences) */
  longDescription: string;
  /** 3 short how-to steps */
  steps: string[];
  /** FAQ pairs — drives rich snippets + GEO citations */
  faq: { q: string; a: string }[];
  /** Related tool IDs for internal linking */
  related: string[];
}

const content: Record<string, ToolSEOContent> = {
  // ─── PDF ───
  "merge-pdf": {
    longDescription:
      "Combine multiple PDF files into one document in seconds. No watermarks, no file size limits, no sign-up required. Your files are merged directly in your browser — nothing gets uploaded to any server.",
    steps: [
      "Drop or select the PDF files you want to combine",
      "Drag to reorder pages the way you need them",
      "Click Merge and download your combined PDF",
    ],
    faq: [
      { q: "Is it safe to merge PDFs online?", a: "Yes. JustUse.me processes files entirely in your browser using JavaScript. Your PDFs are never uploaded to any server, so they stay completely private." },
      { q: "Can I merge more than two PDFs at once?", a: "Absolutely. You can combine up to 20 PDF files in a single merge. Just drop them all in and reorder as needed." },
      { q: "Will merging reduce the quality of my PDFs?", a: "No. The merge process combines files without re-encoding, so your text, images, and formatting stay exactly the same." },
    ],
    related: ["split-pdf", "compress-pdf", "rotate-pdf", "jpg-to-pdf"],
  },
  "split-pdf": {
    longDescription:
      "Extract specific pages from a PDF or split it into separate files. Perfect for pulling out a chapter, a single page, or breaking a large document into smaller parts. Works offline in your browser.",
    steps: [
      "Upload the PDF you want to split",
      "Enter the page numbers or ranges to extract (e.g. 1-3, 5, 8-12)",
      "Click Split and download the result",
    ],
    faq: [
      { q: "Can I extract just one page from a PDF?", a: "Yes. Enter a single page number like \"3\" and you'll get a PDF containing only that page." },
      { q: "Does splitting a PDF reduce quality?", a: "No. Pages are extracted as-is without any re-compression or quality loss." },
      { q: "Is there a page limit?", a: "You can split PDFs up to 200 pages. For larger files, split in batches." },
    ],
    related: ["merge-pdf", "pdf-to-jpg", "pdf-to-text", "rotate-pdf"],
  },
  "compress-pdf": {
    longDescription:
      "Reduce PDF file size for email attachments, uploads, or faster sharing. Adjust the compression level to balance between file size and visual quality. Great for scanned documents and image-heavy PDFs.",
    steps: [
      "Upload your PDF file",
      "Adjust the quality slider — lower means smaller file",
      "Click Compress and download the lighter PDF",
    ],
    faq: [
      { q: "How much can I reduce the PDF size?", a: "Typically 50-80% for image-heavy PDFs. Text-only PDFs may see less reduction since they're already compact." },
      { q: "Will the text still be selectable after compression?", a: "The compression converts pages to optimized images, so text won't be selectable in the output. Best for documents you need to share or archive, not edit." },
      { q: "What's the maximum file size I can compress?", a: "Up to 30 MB per file, with a maximum of 100 pages." },
    ],
    related: ["merge-pdf", "split-pdf", "compress-image", "pdf-to-jpg"],
  },
  "pdf-to-jpg": {
    longDescription:
      "Convert each page of a PDF into a high-quality JPG image. Useful for sharing pages on social media, embedding in presentations, or extracting visuals from documents. Each page becomes a separate image file.",
    steps: [
      "Upload your PDF file",
      "Each page is converted to a JPG image",
      "Download all images as a ZIP file",
    ],
    faq: [
      { q: "What resolution are the output images?", a: "Images are rendered at 2x resolution for sharp, high-quality results suitable for printing or presentations." },
      { q: "Can I convert a specific page instead of all pages?", a: "Currently all pages are converted. To get specific pages, use Split PDF first, then convert the result." },
      { q: "Are the images compressed?", a: "Images use high-quality JPEG encoding (92% quality) for a good balance of clarity and file size." },
    ],
    related: ["jpg-to-pdf", "pdf-to-text", "split-pdf", "png-to-jpg"],
  },
  "jpg-to-pdf": {
    longDescription:
      "Turn one or more images into a single PDF document. Ideal for creating photo albums, combining scanned documents, or packaging multiple images for sharing. Supports JPG, PNG, and WebP formats.",
    steps: [
      "Drop your images (JPG, PNG, or WebP)",
      "Reorder them by dragging if needed",
      "Click Convert and download your PDF",
    ],
    faq: [
      { q: "Can I combine multiple images into one PDF?", a: "Yes. Drop up to 20 images and they'll be arranged as pages in a single PDF document." },
      { q: "Will my images lose quality?", a: "No. Images are embedded at their original resolution without additional compression." },
      { q: "What image formats are supported?", a: "JPG, JPEG, PNG, and WebP files are all supported." },
    ],
    related: ["pdf-to-jpg", "merge-pdf", "compress-image", "png-to-jpg"],
  },
  "rotate-pdf": {
    longDescription:
      "Rotate all pages of a PDF by 90, 180, or 270 degrees. Fix sideways scans, upside-down documents, or landscape pages that need to be portrait. Quick one-click rotation.",
    steps: [
      "Upload the PDF you need to rotate",
      "Choose the rotation angle (90, 180, or 270 degrees)",
      "Click Rotate and download the corrected PDF",
    ],
    faq: [
      { q: "Can I rotate individual pages?", a: "Currently all pages are rotated by the same angle. For selective rotation, split the PDF first, rotate the pages you need, then merge back." },
      { q: "Does rotation affect the PDF quality?", a: "No. The rotation is lossless — it changes the page orientation without re-encoding any content." },
    ],
    related: ["merge-pdf", "split-pdf", "compress-pdf", "watermark-pdf"],
  },
  "pdf-to-text": {
    longDescription:
      "Extract all text content from a PDF file. Works with text-based PDFs (not scanned images). Great for copying content, searching through documents, or converting to a plain text format.",
    steps: [
      "Upload your PDF file",
      "Text is extracted from all pages automatically",
      "Preview and download the text file",
    ],
    faq: [
      { q: "Does this work with scanned PDFs?", a: "This tool extracts embedded text only. For scanned documents or images, use our Image to Text (OCR) tool instead." },
      { q: "Is the formatting preserved?", a: "Basic text content and line breaks are preserved, but complex formatting (tables, columns) may not translate perfectly to plain text." },
    ],
    related: ["ocr-image", "split-pdf", "pdf-to-jpg", "word-counter"],
  },
  "watermark-pdf": {
    longDescription:
      "Add a text watermark across every page of your PDF. Protect confidential documents, mark drafts, or brand your files with custom text. The watermark is placed diagonally across each page.",
    steps: [
      "Upload your PDF",
      "Type your watermark text (e.g. CONFIDENTIAL, DRAFT)",
      "Click Add Watermark and download the result",
    ],
    faq: [
      { q: "Can I customize the watermark appearance?", a: "You can set any text you want. The watermark is displayed as a semi-transparent diagonal overlay on each page." },
      { q: "Can the watermark be removed?", a: "The watermark is embedded into the PDF. It cannot be easily removed, making it suitable for document protection." },
    ],
    related: ["rotate-pdf", "merge-pdf", "compress-pdf", "page-numbers-pdf"],
  },
  "page-numbers-pdf": {
    longDescription:
      "Add page numbers to every page of your PDF document. Choose from 6 positions (top/bottom, left/center/right) and set a custom starting number. Perfect for reports, manuscripts, and multi-page documents.",
    steps: [
      "Upload your PDF",
      "Pick where the page numbers should appear",
      "Set the starting number, then click Add Numbers",
    ],
    faq: [
      { q: "Can I start numbering from a page other than 1?", a: "Yes. Set any starting number — useful if your document is part of a larger work." },
      { q: "What font and size are the page numbers?", a: "Page numbers use Helvetica at 10pt in a subtle gray color that doesn't distract from the content." },
    ],
    related: ["watermark-pdf", "merge-pdf", "compress-pdf", "rotate-pdf"],
  },

  // ─── IMAGE ───
  "compress-image": {
    longDescription:
      "Reduce image file size without visible quality loss. Perfect for speeding up websites, fitting email attachment limits, or saving storage space. Supports JPG, PNG, and WebP.",
    steps: [
      "Upload your image (JPG, PNG, or WebP)",
      "Adjust the quality slider to your preference",
      "Click Compress and download the smaller file",
    ],
    faq: [
      { q: "How much smaller will my image be?", a: "Typically 40-70% smaller at high quality settings. At medium quality, you can achieve 70-90% reduction with minimal visible difference." },
      { q: "Is there a size limit?", a: "Files up to 20 MB are supported." },
      { q: "Does compression remove EXIF data?", a: "Yes. EXIF metadata (camera info, GPS location) is stripped during compression, which also helps with privacy." },
    ],
    related: ["resize-image", "png-to-jpg", "crop-image", "compress-pdf"],
  },
  "resize-image": {
    longDescription:
      "Change image dimensions to any size. Use preset sizes (50%, 75%, 1080p, 720p) or enter custom width and height. Aspect ratio lock keeps your images from stretching.",
    steps: [
      "Upload your image",
      "Pick a preset or enter custom dimensions",
      "Click Resize and download the resized image",
    ],
    faq: [
      { q: "Can I resize without stretching the image?", a: "Yes. The aspect ratio is locked by default. Unlock it if you want to stretch to exact dimensions." },
      { q: "What's the maximum output size?", a: "Up to 8000 x 8000 pixels." },
      { q: "Does resizing reduce quality?", a: "Making images smaller is lossless. Enlarging may reduce sharpness since pixels need to be interpolated." },
    ],
    related: ["crop-image", "compress-image", "png-to-jpg", "jpg-to-png"],
  },
  "crop-image": {
    longDescription:
      "Crop images visually with a drag-to-select interface. Use preset aspect ratios (1:1, 16:9, 4:3, 3:2) for social media, thumbnails, or presentations. See exactly what you're keeping before you cut.",
    steps: [
      "Upload your image",
      "Drag the crop handles or pick an aspect ratio preset",
      "Click Crop and download the trimmed image",
    ],
    faq: [
      { q: "Can I crop to a specific aspect ratio?", a: "Yes. Choose from Free, 1:1 (square), 16:9 (widescreen), 4:3, or 3:2. The crop area adjusts automatically." },
      { q: "What formats are supported?", a: "JPG, PNG, and WebP images up to 20 MB." },
      { q: "Is the crop lossless?", a: "The cropped region is saved at high quality (92% for JPG). PNG crops are completely lossless." },
    ],
    related: ["resize-image", "compress-image", "png-to-jpg", "jpg-to-png"],
  },
  "png-to-jpg": {
    longDescription:
      "Convert PNG images to JPG format for smaller file sizes. PNG files with transparency get a white background. Ideal for web uploads, email attachments, or when JPG is required.",
    steps: [
      "Upload your PNG image",
      "The image is converted instantly in your browser",
      "Download the JPG result",
    ],
    faq: [
      { q: "What happens to transparency?", a: "Transparent areas are filled with a white background, since JPG doesn't support transparency." },
      { q: "How much smaller will the JPG be?", a: "Typically 50-80% smaller than the original PNG, especially for photos." },
    ],
    related: ["jpg-to-png", "compress-image", "heic-to-jpg", "svg-to-png"],
  },
  "jpg-to-png": {
    longDescription:
      "Convert JPG images to PNG format for lossless quality or when you need transparency support. PNG is the preferred format for logos, icons, screenshots, and graphics with sharp edges.",
    steps: [
      "Upload your JPG image",
      "Conversion happens instantly in your browser",
      "Download the PNG file",
    ],
    faq: [
      { q: "Will the image quality improve?", a: "Converting to PNG won't recover quality lost during JPG compression, but it prevents any further quality degradation from re-saving." },
      { q: "Will the file be larger?", a: "Usually yes. PNG uses lossless compression, which produces larger files than JPG for photos." },
    ],
    related: ["png-to-jpg", "svg-to-png", "compress-image", "resize-image"],
  },
  "heic-to-jpg": {
    longDescription:
      "Convert iPhone HEIC photos to universally compatible JPG format. HEIC files from iPhones and iPads can't be opened everywhere — convert them to JPG so you can share, upload, or edit on any device.",
    steps: [
      "Upload your HEIC file from iPhone/iPad",
      "The file is converted instantly in your browser",
      "Download the JPG version",
    ],
    faq: [
      { q: "What is HEIC format?", a: "HEIC (High Efficiency Image Container) is the default photo format on iPhones since iOS 11. It offers better compression than JPG but isn't universally supported." },
      { q: "Will I lose quality converting HEIC to JPG?", a: "There's minimal quality loss. The conversion uses high-quality encoding to preserve as much detail as possible." },
    ],
    related: ["png-to-jpg", "compress-image", "resize-image", "crop-image"],
  },
  "svg-to-png": {
    longDescription:
      "Convert SVG vector graphics to PNG raster images. Needed when a website, app, or document doesn't support SVG, or when you need a fixed-resolution image from a vector source.",
    steps: [
      "Upload your SVG file",
      "The vector is rendered to a PNG image",
      "Download the PNG result",
    ],
    faq: [
      { q: "What resolution is the output?", a: "The SVG is rendered at its defined size. The output matches the viewBox dimensions of the SVG." },
      { q: "Is transparency preserved?", a: "Yes. Transparent areas in the SVG remain transparent in the output PNG." },
    ],
    related: ["png-to-jpg", "compress-image", "resize-image", "jpg-to-png"],
  },
  "ocr-image": {
    longDescription:
      "Extract text from images using optical character recognition (OCR). Supports English and Chinese text. Works on screenshots, photos of documents, receipts, signs, and any image containing text.",
    steps: [
      "Upload an image containing text",
      "OCR processes the image (may take a few seconds)",
      "Preview and download the extracted text",
    ],
    faq: [
      { q: "What languages are supported?", a: "English and Chinese (Simplified) are supported. The OCR engine automatically detects both languages in the same image." },
      { q: "Does it work on handwritten text?", a: "It works best on printed or typed text. Handwritten text may have lower accuracy depending on legibility." },
      { q: "Is the image uploaded to a server?", a: "No. OCR runs entirely in your browser using Tesseract.js. Your images stay on your device." },
    ],
    related: ["pdf-to-text", "compress-image", "crop-image", "resize-image"],
  },

  // ─── TEXT & CODE ───
  "json-formatter": {
    longDescription:
      "Format and beautify messy JSON data with proper indentation. Paste minified or ugly JSON and get clean, readable output. Validates your JSON and highlights errors if the syntax is invalid.",
    steps: [
      "Paste or type your JSON data",
      "The JSON is formatted and validated instantly",
      "Copy or download the formatted result",
    ],
    faq: [
      { q: "Does it validate JSON syntax?", a: "Yes. If your JSON has syntax errors, the tool will show you what's wrong so you can fix it." },
      { q: "Can I format large JSON files?", a: "Yes. Text input up to 500 KB is supported." },
    ],
    related: ["csv-to-json", "yaml-json", "js-minifier", "xml-formatter"],
  },
  "word-counter": {
    longDescription:
      "Count words, characters, sentences, and paragraphs in any text. Essential for writers, students, and content creators who need to hit word count targets for essays, articles, or social media posts.",
    steps: [
      "Paste or type your text",
      "Word, character, and sentence counts update in real time",
      "Copy the counts or keep editing",
    ],
    faq: [
      { q: "Does it count characters with and without spaces?", a: "Yes. Both character counts (with and without spaces) are displayed." },
      { q: "What counts as a word?", a: "Any sequence of non-whitespace characters separated by spaces or line breaks counts as one word." },
    ],
    related: ["markdown-to-html", "diff-checker", "json-formatter", "base64-codec"],
  },
  "base64-codec": {
    longDescription:
      "Encode text to Base64 or decode Base64 strings back to plain text. Commonly used for data URIs, API authentication tokens, email encoding, and embedding data in URLs or JSON.",
    steps: [
      "Choose Encode or Decode mode",
      "Paste your text or Base64 string",
      "Get the result instantly",
    ],
    faq: [
      { q: "What is Base64 encoding?", a: "Base64 converts binary data or text into ASCII characters. It's used to safely transmit data through systems that only support text, like email or URLs." },
      { q: "Is Base64 encryption?", a: "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string. It's for data formatting, not security." },
    ],
    related: ["json-formatter", "js-minifier", "markdown-to-html", "word-counter"],
  },
  "markdown-to-html": {
    longDescription:
      "Convert Markdown text to clean HTML. Preview the rendered output and download the HTML file. Perfect for blog posts, documentation, README files, and any Markdown-to-web workflow.",
    steps: [
      "Paste your Markdown text",
      "See the rendered HTML preview in real time",
      "Download the HTML file",
    ],
    faq: [
      { q: "Which Markdown features are supported?", a: "Standard Markdown including headings, bold, italic, links, images, code blocks, lists, blockquotes, and tables." },
      { q: "Is the HTML output clean?", a: "Yes. The output is semantic HTML without unnecessary wrappers or inline styles." },
    ],
    related: ["json-formatter", "word-counter", "diff-checker", "css-minifier"],
  },
  "diff-checker": {
    longDescription:
      "Compare two pieces of text side by side and see the differences highlighted. Find changes between code versions, document edits, or configuration files. Additions, deletions, and modifications are color-coded.",
    steps: [
      "Paste the original text on the left",
      "Paste the modified text on the right",
      "Differences are highlighted automatically",
    ],
    faq: [
      { q: "Can I compare code files?", a: "Yes. The diff checker works with any text content including source code, configs, and documentation." },
      { q: "How are changes highlighted?", a: "Added lines are shown in green, removed lines in red, and unchanged lines in the default color." },
    ],
    related: ["json-formatter", "word-counter", "js-minifier", "css-minifier"],
  },
  "js-minifier": {
    longDescription:
      "Minify JavaScript code by removing whitespace, comments, and unnecessary characters. Reduce JS file size for faster page loads. Essential for web performance optimization.",
    steps: [
      "Paste your JavaScript code",
      "The code is minified instantly",
      "Copy or download the minified output",
    ],
    faq: [
      { q: "Does minification break my code?", a: "No. Minification only removes whitespace and comments. The code logic stays exactly the same." },
      { q: "How much smaller will my JS be?", a: "Typically 20-40% smaller. Files with lots of comments and formatting see the biggest reduction." },
    ],
    related: ["css-minifier", "json-formatter", "diff-checker", "base64-codec"],
  },
  "css-minifier": {
    longDescription:
      "Minify CSS stylesheets by removing whitespace, comments, and redundant characters. Smaller CSS files mean faster page loads and better Core Web Vitals scores.",
    steps: [
      "Paste your CSS code",
      "The stylesheet is minified instantly",
      "Copy or download the minified CSS",
    ],
    faq: [
      { q: "Does CSS minification affect rendering?", a: "No. The minified CSS renders identically to the original. Only whitespace and comments are removed." },
      { q: "Should I minify CSS for production?", a: "Yes. Minification is a standard production optimization. Every major website serves minified CSS." },
    ],
    related: ["js-minifier", "json-formatter", "diff-checker", "markdown-to-html"],
  },

  // ─── CONVERT ───
  "csv-to-json": {
    longDescription:
      "Convert CSV spreadsheet data to JSON format. Useful for importing data into web apps, APIs, or databases. The first row is used as property names for each JSON object.",
    steps: [
      "Upload your CSV file",
      "Data is parsed and converted to JSON",
      "Preview and download the JSON output",
    ],
    faq: [
      { q: "How are column headers handled?", a: "The first row of your CSV becomes the property names in each JSON object." },
      { q: "What delimiter is used?", a: "Standard comma-separated values. The parser also handles quoted fields containing commas." },
    ],
    related: ["json-to-csv", "json-formatter", "yaml-json", "xml-formatter"],
  },
  "json-to-csv": {
    longDescription:
      "Convert JSON arrays to CSV spreadsheet format. Export data from APIs or databases into a format that Excel, Google Sheets, and other spreadsheet tools can open directly.",
    steps: [
      "Upload your JSON file (must be an array of objects)",
      "The data is converted to CSV format",
      "Download the CSV file",
    ],
    faq: [
      { q: "What JSON structure is required?", a: "The input should be an array of objects with consistent keys, e.g. [{\"name\":\"Alice\"},{\"name\":\"Bob\"}]." },
      { q: "Can I open the result in Excel?", a: "Yes. CSV files open directly in Excel, Google Sheets, Numbers, and other spreadsheet applications." },
    ],
    related: ["csv-to-json", "json-formatter", "yaml-json", "xml-formatter"],
  },
  "yaml-json": {
    longDescription:
      "Convert between YAML and JSON formats. Switch config files, API responses, or data between the two most popular data serialization formats. Bi-directional: YAML to JSON or JSON to YAML.",
    steps: [
      "Paste your YAML or JSON data",
      "Choose the conversion direction",
      "Copy or download the converted output",
    ],
    faq: [
      { q: "When should I use YAML vs JSON?", a: "YAML is more human-readable and great for config files. JSON is better for APIs and data exchange since it's more strict and widely supported." },
      { q: "Are comments preserved?", a: "YAML comments are lost during conversion since JSON doesn't support comments." },
    ],
    related: ["json-formatter", "csv-to-json", "xml-formatter", "json-to-csv"],
  },
  "xml-formatter": {
    longDescription:
      "Format and beautify XML data with proper indentation. Paste messy or minified XML and get clean, readable output. Great for API responses, config files, and SOAP messages.",
    steps: [
      "Paste your XML data",
      "The XML is formatted with proper indentation",
      "Copy or download the formatted result",
    ],
    faq: [
      { q: "Does it validate the XML?", a: "Basic structure validation is performed. Malformed XML will produce an error message." },
      { q: "Is CDATA preserved?", a: "Yes. CDATA sections, comments, and processing instructions are preserved in the output." },
    ],
    related: ["json-formatter", "yaml-json", "csv-to-json", "js-minifier"],
  },

  // ─── GENERATOR ───
  "qr-code": {
    longDescription:
      "Generate QR codes from any text or URL. Create scannable codes for links, Wi-Fi passwords, contact info, or any text content. Download as a high-quality PNG image ready to print or share.",
    steps: [
      "Enter the text or URL you want to encode",
      "A QR code is generated instantly",
      "Download the QR code as a PNG image",
    ],
    faq: [
      { q: "How much data can a QR code hold?", a: "QR codes can hold up to about 3,000 characters of text. For most URLs and short messages, this is more than enough." },
      { q: "Can I customize the QR code appearance?", a: "The current version generates standard black-and-white QR codes optimized for maximum scan reliability." },
      { q: "What resolution is the output?", a: "QR codes are generated at high resolution suitable for both screen display and print use." },
    ],
    related: ["color-converter", "base64-codec", "json-formatter", "word-counter"],
  },
  "color-converter": {
    longDescription:
      "Convert colors between HEX, RGB, and HSL formats. Essential for designers and developers who need to switch color values between different formats for CSS, design tools, or brand guidelines.",
    steps: [
      "Enter a color value in HEX, RGB, or HSL",
      "See the color preview and all format conversions",
      "Copy the value you need",
    ],
    faq: [
      { q: "What color formats are supported?", a: "HEX (e.g. #FF5733), RGB (e.g. rgb(255,87,51)), and HSL (e.g. hsl(11,100%,60%))." },
      { q: "Can I pick a color visually?", a: "Enter any supported format and the tool shows a live preview swatch of the color." },
    ],
    related: ["qr-code", "css-minifier", "json-formatter", "base64-codec"],
  },
};

export function getToolSEOContent(toolId: string): ToolSEOContent | null {
  return content[toolId] ?? null;
}
