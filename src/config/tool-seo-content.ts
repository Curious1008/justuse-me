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
  /** Competitor comparison / why choose JustUse.me */
  whyUs?: string;
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
      { q: "Do I need to create an account to merge PDFs?", a: "No account or sign-up is needed. Open the tool, drop your files, and download — no registration required." },
      { q: "Will there be a watermark on the merged PDF?", a: "Never. JustUse.me adds no watermarks, branding, or hidden content to your files. What you see is exactly what you get." },
    ],
    related: ["split-pdf", "compress-pdf", "rotate-pdf", "jpg-to-pdf"],
    whyUs: "Unlike Smallpdf or iLovePDF, JustUse.me merges your PDFs entirely inside your browser — your files are never sent to any server. There are no watermarks added to your output, no account required, and no usage limits for everyday merges.",
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
      { q: "Is my PDF uploaded to a server when I compress it?", a: "No. Compression runs entirely in your browser. Your PDF data never leaves your device, which is important for confidential or sensitive documents." },
      { q: "Can I compress a PDF to under 1 MB for email?", a: "In most cases, yes. Use the lower quality settings on the slider to achieve the smallest possible file size. Image-heavy PDFs can often reach under 1 MB." },
    ],
    related: ["merge-pdf", "split-pdf", "compress-image", "pdf-to-jpg"],
    whyUs: "Tools like Smallpdf and iLovePDF upload your document to their servers to process it. JustUse.me compresses PDFs directly in your browser, so your file never leaves your device. No account, no watermark, and no risk of your private documents being stored on someone else's server.",
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
      { q: "Is my PDF safe to convert online?", a: "Yes. JustUse.me converts your PDF entirely in your browser — no file is ever uploaded to a server. Your document stays private on your device throughout the entire process." },
      { q: "Can I convert a multi-page PDF to separate JPG images?", a: "Yes. Every page in your PDF is converted to its own JPG image, and all images are bundled into a ZIP file for easy download." },
    ],
    related: ["jpg-to-pdf", "pdf-to-text", "split-pdf", "png-to-jpg"],
    whyUs: "Services like Zamzar and CloudConvert require you to upload your PDF to their servers, where it may be stored or processed by third parties. JustUse.me converts your PDF to JPG entirely in your browser — no upload, no account, and no risk to the privacy of your documents.",
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
      { q: "Do I need to create an account to compress images?", a: "No. JustUse.me requires no account, no email, and no sign-up. Upload your image and download the result — that's it." },
      { q: "Can I compress images for a website without losing quality?", a: "Yes. Use the high quality setting (80-90%) for web images. You'll see significant file size reduction with no perceptible visual difference to visitors." },
    ],
    related: ["resize-image", "png-to-jpg", "crop-image", "compress-pdf"],
    whyUs: "Unlike TinyPNG or Squoosh, JustUse.me compresses your images entirely in your browser without requiring any account or login. There are no daily limits to worry about and no data sent to external servers — your photos stay private from start to finish.",
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
      { q: "Can I resize an image to specific pixel dimensions for social media?", a: "Yes. Enter exact pixel values for width and height. Common sizes: 1080x1080 (Instagram square), 1200x630 (Open Graph), 1280x720 (YouTube thumbnail)." },
      { q: "Do I need Photoshop or Canva to resize an image?", a: "No. JustUse.me resizes images directly in your browser with no software to install, no account to create, and no subscription fee." },
    ],
    related: ["crop-image", "compress-image", "png-to-jpg", "jpg-to-png"],
    whyUs: "Canva and Photoshop are powerful but overkill for a simple resize — they require accounts, subscriptions, or installs. JustUse.me resizes images instantly in your browser with no sign-up, no watermark, and no complexity. Just upload, set your dimensions, and download.",
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
      { q: "Are my iPhone photos uploaded to the internet during conversion?", a: "No. JustUse.me converts HEIC files entirely inside your browser. Your personal photos never leave your device, which is especially important for private or sensitive images." },
      { q: "Can I convert HEIC to JPG on Windows or Android?", a: "Yes. JustUse.me works in any modern browser on any device, including Windows PCs and Android phones, with no software to install." },
    ],
    related: ["png-to-jpg", "compress-image", "resize-image", "crop-image"],
    whyUs: "Apps like iMazing charge for HEIC conversion, and many online converters upload your personal iPhone photos to their servers. JustUse.me converts HEIC files entirely in your browser — your photos stay on your device, no account is needed, and it's completely free.",
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
      "Paste text, see live word, character, sentence, and paragraph counts. Most obvious use: hitting an essay's 500-word minimum, or staying under a tweet's 280-character limit without counting on your fingers. Less obvious: checking meta description length before shipping a page, or figuring out if a chunk of copy will fit in a layout.\n\nCharacter counts come with and without spaces because that's the thing that always varies by context — a tweet counts spaces, a LinkedIn headline often doesn't, some SMS systems count surrogate pairs weirdly. The reading-time estimate uses a ~200 WPM baseline, which is close enough for 'about a four-minute read' kinds of estimates.",
    steps: [
      "Paste or type your text",
      "Counts update as you go",
      "Copy the numbers or keep editing",
    ],
    faq: [
      { q: "What counts as a word, exactly?", a: "Any run of non-whitespace characters between spaces, tabs, or line breaks. Hyphenated terms like 'state-of-the-art' count as one word. Numbers count. A single quote between letters (don't) doesn't split the word. Standards vary across tools, but this matches what word processors like Google Docs and Word do." },
      { q: "Does it give character count with and without spaces?", a: "Yes, both. Social media platforms usually count spaces; many publishing style guides don't. Having both visible at once saves you from getting the wrong number and pasting over-limit copy into a tweet or a product description." },
      { q: "How accurate is the reading-time estimate?", a: "It's based on about 200 words per minute, which is the average for native adult readers of English on screen. It'll be off for dense technical text (slower) or light copy (faster), but it's fine as a rough signal — 'this is a two-minute read' vs 'this is a fifteen-minute read'." },
      { q: "Does it handle Chinese, Japanese, or other languages without spaces?", a: "For character counts, yes — a Chinese or Japanese character counts as one character. Word counts are trickier because those languages don't use spaces to separate words; the tool falls back to counting character runs, which gives a reasonable proxy but isn't a real tokenizer." },
      { q: "Is my text uploaded?", a: "No. All counting happens in your browser — essays, drafts, confidential copy, whatever you paste stays on your device." },
    ],
    related: ["markdown-to-html", "diff-checker", "json-formatter", "base64-codec"],
    whyUs: "Free word counters are a dime a dozen, but most are ad-clogged or push you to download an 'essay writer'. This one loads instantly, counts live as you type, and doesn't bother you. If you're a student, writer, or SEO person who just needs the number, that's enough.",
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

  // ─── CALCULATORS ───
  "percentage-calculator": {
    longDescription:
      "Calculate percentages instantly — find what percent one number is of another, work out percentage increases or decreases, or get the value of a percentage of a number. No formula memorization needed.",
    steps: [
      "Choose the type of percentage calculation you need",
      "Enter the numbers into the fields",
      "Get the result immediately",
    ],
    faq: [
      { q: "How do I calculate what percentage X is of Y?", a: "Divide X by Y, then multiply by 100. For example, 25 is 50% of 50 because 25 ÷ 50 × 100 = 50." },
      { q: "How do I calculate a percentage increase?", a: "Subtract the original from the new value, divide by the original, then multiply by 100. For example, going from 80 to 100 is a 25% increase." },
      { q: "What is 15% of 200?", a: "15% of 200 is 30. Multiply 200 by 0.15 to get the answer." },
    ],
    related: ["discount-calculator", "tip-calculator", "grade-calculator", "loan-calculator"],
  },
  "bmi-calculator": {
    longDescription:
      "Calculate your Body Mass Index (BMI) using your height and weight. See whether your BMI falls in the underweight, normal, overweight, or obese range according to standard health guidelines. Supports both metric and imperial units.",
    steps: [
      "Enter your height and weight (metric or imperial)",
      "Your BMI is calculated instantly",
      "See which category your BMI falls into",
    ],
    faq: [
      { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is considered healthy for most adults. Under 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese." },
      { q: "Is BMI accurate for athletes?", a: "BMI has limitations for muscular individuals since muscle is denser than fat. Athletes may have a high BMI without excess body fat." },
      { q: "How is BMI calculated?", a: "BMI = weight in kg ÷ (height in meters)². In imperial units: BMI = (weight in lbs × 703) ÷ (height in inches)²." },
    ],
    related: ["calorie-calculator", "age-calculator", "pregnancy-due-date", "scientific-calculator"],
  },
  "age-calculator": {
    longDescription:
      "Find your exact age in years, months, and days from your date of birth. Also shows how many days until your next birthday. Useful for filling out forms, calculating eligibility, or just satisfying curiosity.",
    steps: [
      "Enter your date of birth",
      "Your exact age in years, months, and days is shown",
      "See how many days until your next birthday",
    ],
    faq: [
      { q: "How old am I exactly?", a: "Enter your birth date and the calculator shows your exact age in years, months, and days as of today." },
      { q: "Can I calculate the age between two specific dates?", a: "Yes. Change the 'as of' date to any date you want and the calculator will compute the age between those two dates." },
      { q: "What day of the week was I born on?", a: "Enter your birth date and the tool will also show the day of the week you were born." },
    ],
    related: ["date-difference-calculator", "pregnancy-due-date", "countdown-timer", "world-clock"],
  },
  "tip-calculator": {
    longDescription:
      "Calculate the right tip amount and split the bill evenly between friends. Enter the bill total, choose a tip percentage, and set how many people are splitting — get the tip per person and total per person instantly.",
    steps: [
      "Enter the total bill amount",
      "Set the tip percentage (or use a preset)",
      "Enter the number of people splitting the bill",
    ],
    faq: [
      { q: "How much should I tip at a restaurant?", a: "Standard restaurant tips in the US are 15–20% for good service. 18–20% is considered generous, while 25%+ is for exceptional service." },
      { q: "How do I split a bill with different amounts?", a: "This calculator splits the tip and total evenly. For different amounts per person, use the per-person total as your base." },
      { q: "Is tipping expected in other countries?", a: "Tipping customs vary widely. In Japan and some European countries, tipping is not expected or even considered rude. In the US and Canada, it's standard practice." },
    ],
    related: ["percentage-calculator", "discount-calculator", "loan-calculator", "compound-interest-calculator"],
  },
  "compound-interest-calculator": {
    longDescription:
      "See how your money grows over time with compound interest. Enter the principal, annual interest rate, compounding frequency, and time period to project the future value of an investment or savings account.",
    steps: [
      "Enter your starting principal amount",
      "Set the annual interest rate and compounding frequency",
      "Enter the number of years and see the projected growth",
    ],
    faq: [
      { q: "What is compound interest?", a: "Compound interest means you earn interest on both your original principal and on the interest already earned. Over time, this creates exponential growth." },
      { q: "How often should interest compound for maximum growth?", a: "More frequent compounding (daily or monthly) yields slightly more than annual compounding, but the difference decreases as compounding becomes more frequent." },
      { q: "What is the Rule of 72?", a: "Divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 6%, your money doubles in about 12 years (72 ÷ 6 = 12)." },
    ],
    related: ["mortgage-calculator", "loan-calculator", "debt-payoff-calculator", "percentage-calculator"],
  },
  "mortgage-calculator": {
    longDescription:
      "Estimate your monthly mortgage payment based on loan amount, interest rate, and term. See a breakdown of principal vs. interest and total cost over the life of the loan. Helps you plan before speaking with a lender.",
    steps: [
      "Enter the home price and down payment amount",
      "Set the loan term and annual interest rate",
      "See your estimated monthly payment and total interest paid",
    ],
    faq: [
      { q: "How is a mortgage payment calculated?", a: "Monthly payment = P × [r(1+r)^n] ÷ [(1+r)^n – 1], where P is the loan amount, r is the monthly interest rate, and n is the number of payments." },
      { q: "Does the mortgage calculator include taxes and insurance?", a: "This calculator covers principal and interest (P&I). Property taxes, homeowner's insurance, and PMI add to your actual monthly payment." },
      { q: "How much house can I afford?", a: "A common guideline is that your monthly housing costs (PITI) should not exceed 28% of your gross monthly income." },
    ],
    related: ["loan-calculator", "compound-interest-calculator", "debt-payoff-calculator", "percentage-calculator"],
  },
  "loan-calculator": {
    longDescription:
      "Calculate monthly payments, total interest, and total cost for any loan — car loans, personal loans, student loans. Enter the loan amount, interest rate, and term to see a full repayment breakdown.",
    steps: [
      "Enter the loan amount and annual interest rate",
      "Set the loan term in months or years",
      "See the monthly payment, total interest, and total repayment",
    ],
    faq: [
      { q: "What is the monthly payment on a $20,000 loan?", a: "It depends on the interest rate and term. At 7% for 5 years, the monthly payment would be about $396. Use the calculator to enter your exact details." },
      { q: "How do I reduce my loan interest?", a: "Pay more than the minimum each month, choose a shorter term, or refinance at a lower rate. Even small extra payments significantly reduce total interest." },
      { q: "What is APR vs interest rate?", a: "APR (Annual Percentage Rate) includes both the interest rate and lender fees, giving a more complete picture of the loan's true cost." },
    ],
    related: ["mortgage-calculator", "compound-interest-calculator", "debt-payoff-calculator", "percentage-calculator"],
  },
  "grade-calculator": {
    longDescription:
      "Calculate your final grade based on individual assignment and test scores with custom weights. See what grade you need on remaining assignments to hit your target score. Supports percentage and letter grade modes.",
    steps: [
      "Enter each assignment, test, or category with its score and weight",
      "See your current weighted average instantly",
      "Find out what score you need on future work to reach your target grade",
    ],
    faq: [
      { q: "How do I calculate a weighted grade average?", a: "Multiply each score by its weight, add up the results, then divide by the total weight. For example, a test worth 40% with a score of 85 contributes 34 points to your average." },
      { q: "What grade do I need on my final exam?", a: "Enter all your current grades and weights, then set your target final grade. The calculator will tell you the minimum score needed on the remaining work." },
      { q: "How is GPA calculated from letter grades?", a: "A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0. GPA is the weighted average of grade points across all courses." },
    ],
    related: ["gpa-calculator", "percentage-calculator", "scientific-calculator", "word-counter"],
  },
  "gpa-calculator": {
    longDescription:
      "Calculate your GPA from your course grades and credit hours. Add all your courses to see your semester GPA, cumulative GPA, and how individual courses affect your overall standing.",
    steps: [
      "Add each course with its letter grade and credit hours",
      "Your semester and cumulative GPA updates in real time",
      "See how changing a grade would affect your overall GPA",
    ],
    faq: [
      { q: "What GPA is needed for honors?", a: "Most schools require a 3.5 GPA for Dean's List and 3.7–3.9 for summa cum laude. Check your school's specific requirements." },
      { q: "How do I raise my GPA?", a: "Focus on high-credit courses since they have more weight. Raising a C to a B in a 4-credit course raises your GPA more than doing the same in a 1-credit course." },
      { q: "What is a 3.0 GPA equivalent to?", a: "A 3.0 GPA is equivalent to a B average. It falls in the range typically required for graduate school admission and most professional programs." },
    ],
    related: ["grade-calculator", "percentage-calculator", "scientific-calculator", "word-counter"],
  },
  "calorie-calculator": {
    longDescription:
      "Estimate your daily calorie needs based on your age, height, weight, gender, and activity level using the Mifflin-St Jeor equation. See how many calories to maintain, lose, or gain weight.",
    steps: [
      "Enter your age, height, weight, and gender",
      "Select your activity level from sedentary to very active",
      "See your maintenance calories and adjusted targets for weight loss or gain",
    ],
    faq: [
      { q: "How many calories should I eat to lose weight?", a: "A deficit of 500 calories per day leads to approximately 1 pound of weight loss per week. The calculator shows your maintenance calories so you can subtract from there." },
      { q: "What is TDEE?", a: "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns each day, accounting for your basal metabolic rate and activity level." },
      { q: "How accurate is the calorie calculator?", a: "Calorie calculators give a solid estimate, but individual variation exists. Track your weight over 2–3 weeks and adjust intake if you're not seeing expected results." },
    ],
    related: ["bmi-calculator", "age-calculator", "percentage-calculator", "scientific-calculator"],
  },
  "pregnancy-due-date": {
    longDescription:
      "Estimate your pregnancy due date based on your last menstrual period (LMP) or conception date. See your current gestational age in weeks and days, and get a week-by-week timeline of your pregnancy milestones.",
    steps: [
      "Enter the first day of your last menstrual period",
      "See your estimated due date (EDD)",
      "View key milestones and current gestational age",
    ],
    faq: [
      { q: "How is a due date calculated?", a: "The standard method (Naegele's Rule) adds 280 days (40 weeks) to the first day of your last menstrual period." },
      { q: "How accurate is the due date?", a: "Only about 5% of babies are born on their exact due date. Most births happen within 2 weeks before or after the estimated date." },
      { q: "When should I take a pregnancy test?", a: "Most home pregnancy tests are accurate from the first day of a missed period. Testing a few days earlier may give a false negative." },
    ],
    related: ["age-calculator", "date-difference-calculator", "countdown-timer", "calorie-calculator"],
  },
  "date-difference-calculator": {
    longDescription:
      "Calculate the number of days, weeks, months, or years between any two dates. Perfect for counting down to an event, calculating how long ago something happened, or figuring out deadlines.",
    steps: [
      "Enter the start date",
      "Enter the end date",
      "See the difference in days, weeks, months, and years",
    ],
    faq: [
      { q: "How many days between two dates?", a: "Enter both dates and the calculator shows the exact number of days between them, including or excluding the end date." },
      { q: "How do I calculate business days between dates?", a: "The calculator can optionally exclude weekends to show the number of working days between two dates." },
      { q: "Can I include or exclude the end date in the count?", a: "Yes. Toggle whether the end date itself counts as part of the duration." },
    ],
    related: ["age-calculator", "countdown-timer", "pregnancy-due-date", "world-clock"],
  },
  "time-zone-converter": {
    longDescription:
      "Convert a time from one time zone to another — or see what time it is right now in multiple cities around the world. Essential for scheduling meetings across countries and managing remote teams.",
    steps: [
      "Enter a time and select the source time zone",
      "Select the target time zone",
      "See the converted time instantly",
    ],
    faq: [
      { q: "What time is it in New York right now?", a: "Use the time zone converter and select America/New_York to see the current local time in New York." },
      { q: "How do I schedule a meeting across time zones?", a: "Enter your local meeting time and zone, then check the corresponding time for each participant's time zone to find an overlap that works for everyone." },
      { q: "What is UTC?", a: "UTC (Coordinated Universal Time) is the world's primary time standard. All time zones are defined as offsets from UTC (e.g., EST is UTC−5, CET is UTC+1)." },
    ],
    related: ["world-clock", "date-difference-calculator", "countdown-timer", "stopwatch"],
  },
  "discount-calculator": {
    longDescription:
      "Calculate the final price after a discount, or find out the discount percentage given an original and sale price. Useful for shopping, sales events, and checking if a deal is actually good.",
    steps: [
      "Enter the original price",
      "Enter the discount percentage or sale price",
      "See the final price and the amount you save",
    ],
    faq: [
      { q: "How do I calculate 20% off a price?", a: "Multiply the original price by 0.20 to find the discount amount, then subtract from the original. Or simply multiply by 0.80 for the final price." },
      { q: "What is the original price if I know the sale price and discount?", a: "Divide the sale price by (1 – discount%). For example, a $80 item at 20% off had an original price of $80 ÷ 0.80 = $100." },
      { q: "How do I calculate successive discounts?", a: "Apply discounts one at a time. A 20% then 10% discount is not 30% off — it's 28% off (you pay 80% then 90% of that)." },
    ],
    related: ["percentage-calculator", "tip-calculator", "loan-calculator", "compound-interest-calculator"],
  },
  "scientific-calculator": {
    longDescription:
      "A full-featured scientific calculator in your browser. Supports trigonometry (sin, cos, tan), logarithms, exponents, factorials, constants (π, e), and standard arithmetic. No app download needed.",
    steps: [
      "Click the buttons or type your expression using the keyboard",
      "Use function keys for trig, log, square root, and more",
      "Press Enter or = to calculate",
    ],
    faq: [
      { q: "Does it support parentheses and order of operations?", a: "Yes. The calculator respects standard mathematical order of operations (PEMDAS/BODMAS) and supports nested parentheses." },
      { q: "Can I use it for trigonometry?", a: "Yes. sin, cos, tan, arcsin, arccos, and arctan are all available. Toggle between degree and radian mode as needed." },
      { q: "What is the difference between log and ln?", a: "log is base-10 logarithm (common log). ln is the natural logarithm (base e ≈ 2.718)." },
    ],
    related: ["percentage-calculator", "grade-calculator", "gpa-calculator", "compound-interest-calculator"],
  },
  "debt-payoff-calculator": {
    longDescription:
      "See how long it will take to pay off your debt and how much interest you'll pay in total. Compare the avalanche method (highest rate first) and snowball method (lowest balance first) to find the fastest payoff strategy.",
    steps: [
      "Enter your debts — balance, interest rate, and minimum payment for each",
      "Choose a payoff strategy or set an extra monthly payment",
      "See the payoff timeline and total interest for each approach",
    ],
    faq: [
      { q: "What is the debt avalanche method?", a: "Pay off debts in order of highest to lowest interest rate. This minimizes the total interest you pay over time." },
      { q: "What is the debt snowball method?", a: "Pay off the smallest balance first to build momentum, then roll that payment into the next debt. Psychologically motivating even if it costs slightly more interest." },
      { q: "How much faster do I pay off debt with extra payments?", a: "Extra payments directly reduce your principal, which cuts interest dramatically. Even $50/month extra can shorten a 5-year debt by over a year." },
    ],
    related: ["loan-calculator", "mortgage-calculator", "compound-interest-calculator", "percentage-calculator"],
  },

  // ─── UTILITY TOOLS ───
  "temperature-converter": {
    longDescription:
      "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly. Type in any value and all three units update at the same time — no need to remember formulas.",
    steps: [
      "Type a temperature value into any field",
      "See the converted values in Celsius, Fahrenheit, and Kelvin",
      "Copy the result you need",
    ],
    faq: [
      { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply the Celsius value by 9/5, then add 32. For example, 100°C × 9/5 + 32 = 212°F." },
      { q: "What is 37°C in Fahrenheit?", a: "37°C equals 98.6°F — normal human body temperature." },
      { q: "What is absolute zero in Celsius?", a: "Absolute zero is −273.15°C (0 Kelvin), the theoretical lowest possible temperature." },
    ],
    related: ["length-converter", "weight-converter", "speed-converter", "cooking-converter"],
  },
  "length-converter": {
    longDescription:
      "Convert between meters, feet, inches, centimeters, miles, kilometers, and more. Covers both metric and imperial units. Instant conversion as you type — useful for travel, construction, and everyday measurements.",
    steps: [
      "Enter a length value in any unit",
      "All other units update instantly",
      "Copy the converted measurement you need",
    ],
    faq: [
      { q: "How many centimeters in an inch?", a: "1 inch = 2.54 centimeters exactly." },
      { q: "How do I convert feet to meters?", a: "Multiply feet by 0.3048. For example, 6 feet = 6 × 0.3048 = 1.83 meters." },
      { q: "How many miles in a kilometer?", a: "1 kilometer = 0.6214 miles. Or roughly: 1 mile ≈ 1.609 kilometers." },
    ],
    related: ["weight-converter", "temperature-converter", "speed-converter", "shoe-size-converter"],
  },
  "weight-converter": {
    longDescription:
      "Convert between kilograms, pounds, ounces, grams, and stone. Useful for cooking, shipping, travel weight limits, or understanding international weight measurements.",
    steps: [
      "Enter a weight value in any unit",
      "All other units update instantly",
      "Copy the converted weight you need",
    ],
    faq: [
      { q: "How many pounds in a kilogram?", a: "1 kilogram = 2.2046 pounds. To convert kg to lbs, multiply by 2.2046." },
      { q: "How do I convert ounces to grams?", a: "Multiply ounces by 28.3495. For example, 8 oz = 226.8 grams." },
      { q: "What is a stone in pounds?", a: "1 stone = 14 pounds. Stone is a unit used mainly in the UK and Ireland for body weight." },
    ],
    related: ["length-converter", "temperature-converter", "cooking-converter", "bmi-calculator"],
  },
  "speed-converter": {
    longDescription:
      "Convert between miles per hour, kilometers per hour, meters per second, knots, and more. Useful for travel, physics problems, running pace, and understanding speed limits abroad.",
    steps: [
      "Enter a speed value in any unit",
      "All other units update instantly",
      "Copy the result you need",
    ],
    faq: [
      { q: "How do I convert mph to km/h?", a: "Multiply mph by 1.60934. For example, 60 mph = 96.56 km/h." },
      { q: "What is a knot in mph?", a: "1 knot = 1.15078 mph. Knots are nautical miles per hour, used in aviation and sailing." },
      { q: "How fast is the speed of light in km/h?", a: "The speed of light is approximately 1,079,252,848 km/h (about 186,000 miles per second)." },
    ],
    related: ["length-converter", "temperature-converter", "weight-converter", "scientific-calculator"],
  },
  "data-storage-converter": {
    longDescription:
      "Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. Clarifies the difference between decimal (SI) and binary (IEC) units — important for understanding storage specs and file sizes.",
    steps: [
      "Enter a data size value in any unit",
      "See conversions across all common units instantly",
      "Copy the value you need",
    ],
    faq: [
      { q: "What is the difference between GB and GiB?", a: "GB (gigabyte) uses powers of 10: 1 GB = 1,000,000,000 bytes. GiB (gibibyte) uses powers of 2: 1 GiB = 1,073,741,824 bytes. Hard drive makers use GB; operating systems often show GiB." },
      { q: "How many megabytes in a gigabyte?", a: "1 GB = 1,000 MB (decimal). In binary, 1 GiB = 1,024 MiB." },
      { q: "How many GB is 1 TB?", a: "1 terabyte = 1,000 gigabytes (decimal), or 1 TiB = 1,024 GiB (binary)." },
    ],
    related: ["number-base-converter", "length-converter", "weight-converter", "speed-converter"],
  },
  "cooking-converter": {
    longDescription:
      "Convert between cups, tablespoons, teaspoons, milliliters, fluid ounces, and other cooking measurements. Switch between volume and weight units for ingredients — essential for scaling recipes or using international cookbooks.",
    steps: [
      "Enter a measurement value in any cooking unit",
      "See the equivalent in all other units",
      "Copy the measurement for your recipe",
    ],
    faq: [
      { q: "How many tablespoons are in a cup?", a: "There are 16 tablespoons in 1 US cup." },
      { q: "How many teaspoons in a tablespoon?", a: "3 teaspoons = 1 tablespoon." },
      { q: "How do I convert cups to milliliters?", a: "1 US cup = 236.6 milliliters. Multiply cups by 236.6 to convert." },
    ],
    related: ["weight-converter", "temperature-converter", "length-converter", "calorie-calculator"],
  },
  "number-base-converter": {
    longDescription:
      "Convert numbers between decimal (base 10), binary (base 2), octal (base 8), and hexadecimal (base 16). Indispensable for programmers, computer science students, and anyone working with low-level data.",
    steps: [
      "Enter a number in any base",
      "See the equivalent in all other bases instantly",
      "Copy the result for your code or calculations",
    ],
    faq: [
      { q: "How do I convert decimal to binary?", a: "Repeatedly divide the decimal number by 2, recording the remainders. Read the remainders from bottom to top for the binary result. For example, 13 in decimal = 1101 in binary." },
      { q: "What is hexadecimal used for?", a: "Hexadecimal is widely used in programming, HTML color codes, memory addresses, and encoding because it compactly represents binary data (4 bits = 1 hex digit)." },
      { q: "What is 255 in hexadecimal?", a: "255 in decimal = FF in hexadecimal = 11111111 in binary." },
    ],
    related: ["data-storage-converter", "scientific-calculator", "json-formatter", "base64-codec"],
  },
  "shoe-size-converter": {
    longDescription:
      "Convert shoe sizes between US, UK, EU, and CM sizing systems for men, women, and children. No more guessing when shopping international brands — find your correct size before you buy.",
    steps: [
      "Select your gender (men, women, or kids)",
      "Enter your shoe size in your local system",
      "See the equivalent sizes in US, UK, EU, and centimeters",
    ],
    faq: [
      { q: "What is my US shoe size in EU?", a: "For men, add 33 to your US size as a rough guide (US 10 ≈ EU 43). For women, add 31 (US 8 ≈ EU 39). Use the converter for exact values." },
      { q: "How do I measure my foot size at home?", a: "Trace your foot on paper, measure from heel to longest toe, and compare to a brand's size chart in centimeters or inches." },
      { q: "Are UK and US shoe sizes the same?", a: "No. Men's UK sizes are typically 0.5 smaller than US (US 10 = UK 9.5). Women's UK sizes are 2 smaller than US (US 8 = UK 6)." },
    ],
    related: ["length-converter", "weight-converter", "temperature-converter", "cooking-converter"],
  },
  "stopwatch": {
    longDescription:
      "A simple, accurate stopwatch with lap support. Time workouts, cooking, experiments, or any activity that needs precise elapsed time. Works entirely in your browser — no app required.",
    steps: [
      "Click Start to begin timing",
      "Press Lap to record split times without stopping",
      "Press Stop then Reset to start over",
    ],
    faq: [
      { q: "Can I record lap times?", a: "Yes. Press the Lap button while the stopwatch is running to record a split time. All laps are listed and stay visible until you reset." },
      { q: "Is the stopwatch accurate?", a: "The stopwatch uses the browser's high-resolution timer and is accurate to the millisecond for typical use." },
      { q: "Does the stopwatch keep running if I switch tabs?", a: "Yes. The stopwatch continues running in the background even if you navigate to another tab or window." },
    ],
    related: ["countdown-timer", "pomodoro-timer", "world-clock", "date-difference-calculator"],
  },
  "countdown-timer": {
    longDescription:
      "Set a countdown timer for any duration — from seconds to hours. Plays an alert when time is up. Perfect for cooking, presentations, study sessions, or any timed activity.",
    steps: [
      "Enter the hours, minutes, and seconds for your countdown",
      "Click Start and the timer counts down",
      "An alert sounds when the time reaches zero",
    ],
    faq: [
      { q: "Can I set a timer for a specific event or date?", a: "For countdown-to-a-date, use the Date Difference Calculator or a dedicated countdown app. This timer counts down from a set duration." },
      { q: "Does the timer work if I switch tabs?", a: "Yes. The timer continues in the background and the alert will still fire when time is up." },
      { q: "Can I pause and resume the countdown?", a: "Yes. Pause the timer at any point and resume exactly where you left off." },
    ],
    related: ["stopwatch", "pomodoro-timer", "world-clock", "date-difference-calculator"],
  },
  "pomodoro-timer": {
    longDescription:
      "A focused Pomodoro timer that alternates between 25-minute work sessions and 5-minute breaks. After every four Pomodoros, take a longer 15-minute break. Based on the Pomodoro Technique for sustained productivity.",
    steps: [
      "Click Start to begin a 25-minute work session",
      "Take a 5-minute break when the timer ends",
      "After 4 sessions, take a longer 15-minute break",
    ],
    faq: [
      { q: "What is the Pomodoro Technique?", a: "The Pomodoro Technique is a time management method where you work in focused 25-minute intervals separated by short breaks. It was developed by Francesco Cirillo in the 1980s." },
      { q: "Can I customize the work and break lengths?", a: "Yes. Adjust the session duration, short break, and long break times to match your preferred work rhythm." },
      { q: "Why does the Pomodoro Technique work?", a: "Timed intervals create urgency and focus, while regular breaks prevent mental fatigue. The clear work/rest boundary also makes it easier to start tasks." },
    ],
    related: ["stopwatch", "countdown-timer", "world-clock", "date-difference-calculator"],
  },
  "world-clock": {
    longDescription:
      "See the current time in multiple cities around the world simultaneously. Add as many time zones as you need and keep them visible at a glance — great for remote teams, travelers, and international calls.",
    steps: [
      "Browse or search for cities to add to your clock",
      "See the current local time in each city",
      "Compare times side by side for scheduling",
    ],
    faq: [
      { q: "What time is it in Tokyo right now?", a: "Add Tokyo to the world clock to see the current Japan Standard Time (JST, UTC+9) alongside your local time." },
      { q: "How do I find the best meeting time across time zones?", a: "Add all participants' cities to the world clock and look for an overlap during standard business hours in each location." },
      { q: "Does the world clock update in real time?", a: "Yes. The times update every second and automatically adjust for daylight saving time changes." },
    ],
    related: ["time-zone-converter", "countdown-timer", "stopwatch", "date-difference-calculator"],
  },
  "text-encrypt-decrypt": {
    longDescription:
      "Encrypt a message with a password so only someone with the password can read it. Uses AES-256 encryption, the same standard used by banks and governments. Decrypt instantly by entering the same password.",
    steps: [
      "Type or paste the text you want to encrypt",
      "Enter a strong password",
      "Copy the encrypted ciphertext — share it safely anywhere",
    ],
    faq: [
      { q: "How secure is the encryption?", a: "The tool uses AES-256-GCM, a standard approved by NIST and used in banking, military, and government applications. Without the password, the encrypted text is computationally infeasible to crack." },
      { q: "What happens if I forget the password?", a: "There is no recovery option. If you lose the password, the encrypted message cannot be decrypted — that's what makes the encryption secure." },
      { q: "Is my text sent to a server?", a: "No. Encryption and decryption happen entirely in your browser using the Web Crypto API. Your text and password never leave your device." },
    ],
    related: ["base64-codec", "qr-code", "json-formatter", "url-checker"],
  },
  "url-checker": {
    longDescription:
      "Paste a URL, find out if it's actually alive, and see exactly what response it returns. Handy before you share a link publicly, for auditing a list of URLs in a doc, or for figuring out why that one endpoint keeps failing — without opening dev tools.\n\nYou get the HTTP status code, response time, and the final URL after any redirects. Useful when 'the site is down' actually means 'there's a 301 chain going to an HTTPS version', or when a 404 is hiding behind a generic-looking error page.",
    steps: [
      "Paste the URL you want to check",
      "Click Check",
      "See the status code, response time, and final URL",
    ],
    faq: [
      { q: "How can I tell if a website is down?", a: "Paste the URL and the checker tries to reach it. A 2xx response means it's up. A timeout or connection error means it's unreachable from the checking server — which is usually 'down', but occasionally it just means the site is blocking that region or the check traffic." },
      { q: "What do the HTTP status codes actually mean?", a: "200 is the normal 'worked'. 301 and 308 are permanent redirects, 302 and 307 are temporary. 404 means the page isn't there. 403 means it's there but you're not allowed. 500/502/503 are server problems. Seeing the number beats guessing from a generic browser error page." },
      { q: "Can I use this to check if a link is safe?", a: "Not really. The checker only tells you whether the URL is reachable and what it returns. For phishing and malware detection, cross-check with Google Safe Browsing or VirusTotal — a 200 response doesn't mean the page is honest." },
      { q: "Does it follow redirects?", a: "Yes. You'll see both the original status and the final URL after the redirect chain resolves. That's how you catch things like 'the old link silently forwards to a sketchy domain' without actually clicking through." },
      { q: "Why does a URL that works in my browser fail here?", a: "Usually one of three things: the site blocks non-browser user agents, it requires specific cookies or geo, or it's only reachable over a VPN. A failed check isn't proof the URL is broken — just that it doesn't respond to a plain request." },
    ],
    related: ["text-encrypt-decrypt", "qr-code", "base64-codec", "json-formatter"],
    whyUs: "Most link checkers make you sign up, or bury the answer under an 'SEO audit' upsell. This one just returns the status code and final URL — no dashboard, no email, no pretending a 301 is a scary SEO problem you need to pay to fix.",
  },

  // ─── TEXT TOOLS ───
  "case-converter": {
    longDescription:
      "Reformat text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. For copywriters, it's for fixing the email you wrote with caps lock on. For developers, it's for converting between naming conventions when you're moving data between APIs that picked different sides of the camel-vs-snake war.\n\nPunctuation, numbers, and spacing are left alone — only the letter casing changes. Which means you can paste a whole paragraph with quotes, em-dashes, and numbers in it, and get back the same content with just the capitalization rewritten.",
    steps: [
      "Paste your text",
      "Click the case you want",
      "Copy the result",
    ],
    faq: [
      { q: "What case formats are supported?", a: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. The developer-flavored ones (camel, snake, kebab, constant) strip spaces and punctuation so 'User Account ID' becomes userAccountId, user_account_id, user-account-id, or USER_ACCOUNT_ID depending on what you pick." },
      { q: "Can I paste in multiple paragraphs?", a: "Yes. There's no practical size limit — paste an essay, a chapter, or a code dump and the whole thing converts in one go. Line breaks and paragraph spacing are preserved." },
      { q: "Does it preserve punctuation and numbers?", a: "For prose-style modes (upper, lower, title, sentence), yes — only letters change. For identifier modes (camel, snake, etc.), spaces and punctuation are stripped because that's the whole point of those formats. Numbers stay put in both." },
      { q: "How is Title Case different from Sentence case?", a: "Title Case capitalizes the first letter of most words, the way a book title looks: 'The Hitchhiker's Guide to the Galaxy'. Sentence case only capitalizes the first letter of each sentence and proper nouns — like normal writing. Pick Title for headings; pick Sentence for body copy." },
      { q: "Is my text sent anywhere?", a: "No. The whole conversion runs in your browser. If you're rewriting internal copy, customer emails, or anything you'd prefer not to upload, it's fine to paste here — nothing leaves the page." },
    ],
    related: ["remove-whitespace", "find-and-replace", "string-reverse", "word-counter"],
    whyUs: "Case conversion is one of those things every dev eventually writes as a throwaway function — but when you just need to flip a chunk of text once, opening a new editor is overkill. This tool does it in the browser, covers all the common formats, and doesn't make you watch an ad to use it.",
  },
  "remove-duplicate-lines": {
    longDescription:
      "Drop repeated lines from a block of text. Classic use cases: cleaning up an email list before a send, deduping a keyword research dump, trimming CSV rows where the same record appears five times, or pruning noisy log output down to unique events.\n\nYou can choose to keep the first or last occurrence — which matters more than it sounds, because if the same email address shows up with an older signup date on top and the newer one below, you probably want 'keep last'. Case-sensitivity and whitespace handling are both toggleable, so 'apple', 'Apple', and ' apple ' can be treated as duplicates or as three distinct lines.",
    steps: [
      "Paste your list",
      "Choose: keep first or last, case sensitive or not",
      "Copy the deduped output",
    ],
    faq: [
      { q: "Is the comparison case-sensitive by default?", a: "Yes — 'Apple' and 'apple' stay as two separate lines unless you flip the case-insensitive toggle. That's the safer default, since for things like email addresses it's usually what you want, and you can always loosen it when you don't." },
      { q: "Does it trim whitespace before comparing?", a: "Optionally. With the trim option on, ' apple' (with a leading space) matches 'apple'. Without it, they're different lines. Turn it on when you're deduping a messy paste; leave it off if spacing matters to you." },
      { q: "Does it preserve the original order?", a: "Yes. Keeping first occurrence preserves the order you see in your input; keeping last preserves the order of last-seen items. Neither mode sorts — if you want sorting, run the sort tool after." },
      { q: "What about blank lines?", a: "Blank lines are treated the same as any other — multiple blanks get collapsed down to one. If you'd rather strip all blank lines entirely, the whitespace tool does that." },
      { q: "Is there a size limit?", a: "Thousands of lines are fine. Since it runs in your browser, truly huge files (hundreds of thousands of lines) can start to feel slow, depending on your device. For log files in that range, a command-line `sort -u` is faster." },
    ],
    related: ["sort-lines", "find-and-replace", "remove-whitespace", "word-counter"],
    whyUs: "Dedupe a list in your terminal and you're three commands deep. Dedupe it in Excel and you're fighting the UI. This tool just takes a paste, removes duplicates, and hands back the result — client-side, so your email list, keyword research, or log excerpts don't end up on someone else's server.",
  },
  "sort-lines": {
    longDescription:
      "Sort a block of text line by line — alphabetically, numerically, reverse, or shuffled. Good for cleaning up keyword lists, CSV columns, email exports, or any time you'd rather not open a spreadsheet just to reorder 50 lines.\n\nThe gotcha most web sorters get wrong: if your lines start with numbers, a plain alphabetical sort puts '10' before '2'. This one has a numeric mode that actually reads them as numbers. It also preserves blank lines or strips them, your call.",
    steps: [
      "Paste your lines into the input",
      "Pick the sort order — A–Z, Z–A, numeric, or random",
      "Copy the result",
    ],
    faq: [
      { q: "Can I sort numerically instead of alphabetically?", a: "Yes, and you probably want to for anything with numbers. Alphabetical sort treats '10' as less than '2' because it compares character by character. Numeric mode reads each line as a number and orders them properly — 1, 2, 10, 11 instead of 1, 10, 11, 2." },
      { q: "Does it handle case-insensitive sorting?", a: "Yes. Flip the case-insensitive toggle and 'apple' and 'Apple' are treated as the same string for ordering purposes. Useful when you don't want capital letters clustering at the top of the list." },
      { q: "Can I shuffle lines randomly?", a: "Yes. The random option uses a proper shuffle (not 'sort by random key', which is biased), so each line is equally likely to end up anywhere. Handy for picking a random sample from a list, or randomizing quiz questions." },
      { q: "What happens to blank lines and duplicates?", a: "Blank lines either bubble to the top (if you leave them) or get stripped — there's a toggle. Duplicates stay by default; use the dedupe tool first, or the sort tool alongside it, if you want them gone." },
      { q: "Is my text sent anywhere?", a: "No. Sorting runs in your browser, so pasted data — whether it's a list of customer emails, a CSV column, or anything sensitive — never leaves your device. No server is involved." },
    ],
    related: ["remove-duplicate-lines", "find-and-replace", "remove-whitespace", "word-counter"],
    whyUs: "Sorting lines shouldn't require opening Excel, firing up a terminal, or signing up for anything. Paste, click, copy — done. And unlike the ad-heavy 'text tools' sites, your list isn't a data point for someone else's analytics pipeline.",
  },
  "string-reverse": {
    longDescription:
      "Flip text character by character, or reverse the word order. Useful for palindrome checks, puzzle inputs, a quick creative twist for a post, or just sanity-checking how your code handles weird strings.\n\nOne thing most quick reversers get wrong: emoji and Chinese characters. They call JavaScript's string reverse on raw bytes, and your 👨‍👩‍👧 turns into garbage. This one splits on graphemes instead, so multi-byte characters come out clean. And since everything runs in your browser, nothing gets uploaded — paste in private notes without worrying.",
    steps: [
      "Paste or type the text you want to reverse",
      "Pick character reverse or word reverse",
      "Copy the result",
    ],
    faq: [
      { q: "What's the difference between character and word reverse?", a: "Character reverse flips every letter, so 'hello' becomes 'olleh'. Word reverse keeps each word intact but flips the order, so 'hello world' becomes 'world hello'. Doing a palindrome check? Use character. Rearranging a sentence? Use word." },
      { q: "Does it handle emoji and Chinese properly?", a: "Yes. A lot of online reversers just call JavaScript's built-in reverse on a string, which splits multi-byte characters in half — your 👨‍👩‍👧 turns into broken glyphs and Chinese characters can come out wrong. This one does grapheme-level splitting, so everything survives the round trip." },
      { q: "Can I reverse multiple lines at once?", a: "Yes. Each line reverses on its own, and the line breaks stay where you put them. Handy for flipping a list, CSV rows, or log lines without merging everything into one blob." },
      { q: "Does my text get uploaded anywhere?", a: "No. It all happens in your browser — your text never leaves the page. Safe to use with private messages, work notes, or anything you'd rather not send to a random website." },
      { q: "Is there a size limit?", a: "No hard cap. Since the work runs locally, it's really bounded by your device. A few thousand characters is instant; even a long essay finishes without you noticing." },
    ],
    related: ["case-converter", "find-and-replace", "base64-codec", "word-counter"],
    whyUs: "Most 'reverse text' sites are a five-line script wrapped in ads and trackers. This one runs entirely in your browser, handles emoji and Chinese without mangling them, and doesn't ship your text off to anyone. No sign-up, no ads, no 'upgrade for longer strings'.",
  },
  "readability-checker": {
    longDescription:
      "Analyze your text's readability score using the Flesch-Kincaid scale and other metrics. Find out how easy your content is to read and get data to improve clarity for your target audience.",
    steps: [
      "Paste your text into the checker",
      "Review the readability score and grade level",
      "Identify long sentences or complex words to simplify",
    ],
    faq: [
      { q: "What readability score is considered good?", a: "A Flesch Reading Ease score of 60–70 is considered standard for general audiences. Scores above 70 are easy to read; below 30 are very difficult." },
      { q: "What metrics are shown?", a: "Flesch Reading Ease, Flesch-Kincaid Grade Level, average sentence length, and average syllables per word." },
      { q: "Is it useful for SEO?", a: "Yes. Search engines favor readable content, and readability directly impacts bounce rate and time on page." },
    ],
    related: ["word-counter", "find-and-replace", "remove-whitespace", "markdown-to-html"],
  },
  "remove-whitespace": {
    longDescription:
      "Strip extra spaces, tabs, and blank lines from text. Clean up copy-pasted content, normalize whitespace between words, or remove leading and trailing spaces from each line.",
    steps: [
      "Paste your text with unwanted whitespace",
      "Choose what to remove: extra spaces, blank lines, or all leading/trailing whitespace",
      "Copy the cleaned result",
    ],
    faq: [
      { q: "Can I remove only leading and trailing spaces from each line?", a: "Yes. The trim lines option removes whitespace at the start and end of each line without affecting spacing within sentences." },
      { q: "Does it collapse multiple spaces into one?", a: "Yes. The normalize spaces option reduces multiple consecutive spaces down to a single space." },
      { q: "Will it remove intentional line breaks?", a: "Only if you choose the remove blank lines option. Regular line breaks within paragraphs are preserved." },
    ],
    related: ["find-and-replace", "case-converter", "remove-duplicate-lines", "word-counter"],
  },
  "find-and-replace": {
    longDescription:
      "Search for text and swap it out for something else. The thing every editor has built in, but handy when you don't have an editor open — you want to fix a typo that appears 40 times in a pasted email, mass-rename a variable before copying code into a doc, or run a regex substitution without firing up sed.\n\nPlain text is the default. Flip on regex mode and you can use patterns like `\\d+` or `(\\w+)@example\\.com`, with capture groups available in the replacement via `$1`, `$2`, and so on. Case sensitivity is a toggle, and you can preview matches before committing to a replace-all.",
    steps: [
      "Paste your text",
      "Enter what to find and what to replace it with",
      "Click Replace — or toggle regex mode first for patterns",
    ],
    faq: [
      { q: "Does it support regular expressions?", a: "Yes. Flip the regex toggle and the find field becomes a pattern. Standard JavaScript regex — backreferences with `$1`/`$2`, character classes, lookahead and lookbehind, all there. Flags are inferred from your toggles (case-sensitive, global) so you don't need to write them out." },
      { q: "Is it case-sensitive by default?", a: "Yes. 'Email' and 'email' are different. Toggle the case-insensitive option when you want them treated as the same, which is usually what you want for natural-language text but almost never what you want for code." },
      { q: "Can I replace matches one at a time instead of all at once?", a: "Yes. The default is replace-all, but a step-through mode lets you walk through matches individually and decide yes/no for each. Useful when you're doing a risky substitution and want to eyeball the context." },
      { q: "What if I want to replace across multiple lines?", a: "Plain-text replace works across lines automatically. For regex, the `s` flag (which lets `.` match newlines) is available as a toggle — since by default `.` stops at a newline in most regex implementations." },
      { q: "Is my text uploaded?", a: "No. Find-and-replace runs in your browser. Emails, code snippets, configs with secrets, whatever you paste stays local." },
    ],
    related: ["remove-whitespace", "remove-duplicate-lines", "regex-tester", "word-counter"],
    whyUs: "For a one-off replace, opening your IDE or running sed is overkill — and notepad doesn't do regex. This tool fills the gap: plain-text and regex substitution in the browser, no setup, with capture groups that actually work.",
  },
  "url-encoder-decoder": {
    longDescription:
      "Encode special characters in URLs or decode percent-encoded strings back to readable text. Essential for working with query parameters, API requests, and web scraping.",
    steps: [
      "Choose Encode or Decode mode",
      "Paste your URL or text",
      "Copy the encoded or decoded result",
    ],
    faq: [
      { q: "What is URL encoding?", a: "URL encoding replaces special characters with a percent sign followed by two hex digits (e.g. space becomes %20). It ensures URLs are transmitted correctly." },
      { q: "When do I need to encode a URL?", a: "Whenever you include special characters like spaces, &, =, or # in query parameters, you need to encode them so they don't break the URL structure." },
      { q: "Does it encode the entire URL or just parts?", a: "You can encode individual query parameter values or full URL strings. Encoding a full URL preserves the slashes and protocol." },
    ],
    related: ["html-entity-encoder", "base64-codec", "find-and-replace", "json-formatter"],
  },
  "html-entity-encoder": {
    longDescription:
      "Encode HTML special characters to their entity equivalents or decode HTML entities back to readable text. Prevents XSS vulnerabilities and ensures safe display of user-generated content.",
    steps: [
      "Choose Encode or Decode mode",
      "Paste your HTML or plain text",
      "Copy the safe encoded or decoded output",
    ],
    faq: [
      { q: "What characters are encoded?", a: "Special HTML characters including <, >, &, \", and ' are replaced with &lt;, &gt;, &amp;, &quot;, and &#39;." },
      { q: "Why do I need HTML entity encoding?", a: "To safely display user-submitted text in HTML without it being interpreted as markup. It is a key defense against cross-site scripting (XSS) attacks." },
      { q: "Does it handle named entities like &nbsp;?", a: "Yes. Decoding recognizes all standard HTML named entities and converts them to their Unicode characters." },
    ],
    related: ["url-encoder-decoder", "base64-codec", "markdown-to-html", "find-and-replace"],
  },
  "number-to-words": {
    longDescription:
      "Convert numbers to their written English word form. Useful for writing checks, legal documents, invoices, or any context where numbers must be spelled out.",
    steps: [
      "Enter the number you want to convert",
      "The written word form appears instantly",
      "Copy the result into your document",
    ],
    faq: [
      { q: "What is the largest number it can convert?", a: "Numbers up to trillions are supported, covering the range needed for most financial and legal documents." },
      { q: "Does it support decimal numbers?", a: "Yes. Decimals are written out — for example, 4.75 becomes 'four and seventy-five hundredths'." },
      { q: "Is currency formatting supported?", a: "Yes. Toggle currency mode to output formats like 'four hundred fifty-two dollars and thirty cents'." },
    ],
    related: ["word-counter", "find-and-replace", "case-converter", "remove-whitespace"],
  },

  // ─── DEVELOPER TOOLS ───
  "regex-tester": {
    longDescription:
      "Write a regex, paste a test string, and watch the matches light up as you type. The kind of tool you reach for when you're debugging a pattern and don't want to keep running `node -e` in a terminal — or when you just need to double-check that your email validation actually matches a plus-sign alias.\n\nCapture groups and named groups are broken out per match, so you can see exactly what each parenthesized chunk picked up. Flags work the way you'd expect (g, i, m, s, u), and the pattern is JavaScript flavor — which is what you probably want if you're testing something that'll end up in a browser, Node, or most scripting contexts.",
    steps: [
      "Type your regex pattern and flags",
      "Paste the text you want to match against",
      "See highlighted matches and capture group values update live",
    ],
    faq: [
      { q: "Which regex flavor is this?", a: "JavaScript (ECMAScript) regex. That means lookbehind works, backreferences look like \\1, and flags are g/i/m/s/u/y. If you're writing regex for Python, Perl, or PCRE, the syntax is close but not identical — named groups and some escape sequences differ." },
      { q: "Can I see what each capture group matched?", a: "Yes. Every match lists its numbered groups and any named groups with their exact values. Especially useful when you're building something like a URL parser and want to confirm that 'path' captured what you think it did." },
      { q: "Does it explain the regex in plain English?", a: "Not automatically — it shows you what matches, which in practice is what you need to debug a pattern. For a written breakdown of a complex regex, sites like regex101 offer verbose explanations. This tool is deliberately lighter and faster." },
      { q: "Why does my pattern work here but fail in my code?", a: "Usually one of three things: your code is using a different regex flavor (Python re, Java Pattern), you're forgetting to escape backslashes when the regex lives inside a string literal, or a flag is missing. Copy the pattern exactly and make sure the flags line up." },
      { q: "Is my text sent anywhere?", a: "No. The regex runs in your browser against your text — nothing leaves the page. Useful when you're testing patterns against production log excerpts or customer data you shouldn't be uploading." },
    ],
    related: ["find-and-replace", "json-formatter", "js-minifier", "diff-checker"],
    whyUs: "Most regex playgrounds are great but heavy — cheat sheets, explanations, ads, save-and-share accounts. This one shows matches live, tells you what the groups captured, and doesn't ask you to log in. Quick debug, done.",
  },
  "timestamp-converter": {
    longDescription:
      "Convert Unix timestamps to human-readable dates and times, or convert dates back to Unix timestamps. Essential for debugging APIs, log files, and database records that store epoch time.",
    steps: [
      "Enter a Unix timestamp or a date/time string",
      "Choose your target timezone",
      "See all format conversions instantly",
    ],
    faq: [
      { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 UTC. It is the most common way to store time in databases and APIs." },
      { q: "Does it support millisecond timestamps?", a: "Yes. Both second-precision and millisecond-precision Unix timestamps are automatically detected and converted." },
      { q: "Can I convert to different timezones?", a: "Yes. Select any timezone and see the local date and time corresponding to the timestamp." },
    ],
    related: ["json-formatter", "regex-tester", "base64-codec", "url-encoder-decoder"],
  },
  "json-to-typescript": {
    longDescription:
      "Generate TypeScript interfaces from JSON data automatically. Paste any JSON object and get a correctly typed TypeScript interface in seconds — no more writing types by hand.",
    steps: [
      "Paste your JSON data",
      "TypeScript interfaces are generated instantly",
      "Copy the interfaces into your TypeScript project",
    ],
    faq: [
      { q: "Does it handle nested objects?", a: "Yes. Nested objects generate nested interfaces, and arrays are typed correctly as T[]." },
      { q: "What happens with null values?", a: "Null values are typed as the detected type unioned with null (e.g. string | null)." },
      { q: "Can I use this for API response types?", a: "Yes. Paste the JSON response from any API and get TypeScript types ready to use in your frontend or backend code." },
    ],
    related: ["json-formatter", "json-validator", "json-to-csv", "yaml-json"],
  },
  "html-to-jsx": {
    longDescription:
      "Convert HTML markup to JSX syntax for React components. Automatically converts class to className, inline styles to object notation, and self-closes void elements. Save time when porting HTML templates to React.",
    steps: [
      "Paste your HTML code",
      "JSX is generated with all necessary conversions",
      "Copy the JSX into your React component",
    ],
    faq: [
      { q: "What conversions are made automatically?", a: "class becomes className, for becomes htmlFor, inline style strings become style objects, and void tags like <br> become <br />." },
      { q: "Does it handle HTML comments?", a: "HTML comments are converted to JSX comment syntax {/* comment */}." },
      { q: "Can I convert entire HTML pages?", a: "Yes, though for full pages you will likely want to extract the body content and wrap it in a component." },
    ],
    related: ["css-minifier", "js-minifier", "markdown-to-html", "json-formatter"],
  },
  "chmod-calculator": {
    longDescription:
      "Calculate Unix file permission values visually. Toggle read, write, and execute checkboxes for owner, group, and others, and get the numeric chmod value and symbolic notation instantly.",
    steps: [
      "Check the permissions you want for owner, group, and others",
      "See the numeric value (e.g. 755) and symbolic notation (rwxr-xr-x)",
      "Copy the chmod command ready to run in your terminal",
    ],
    faq: [
      { q: "What does chmod 755 mean?", a: "7 (rwx) for owner, 5 (r-x) for group, 5 (r-x) for others. The owner can read, write, and execute; everyone else can only read and execute." },
      { q: "What is the difference between 644 and 755?", a: "644 is typical for files (owner can write, others read-only). 755 is typical for directories and executables (owner can write, others can execute/traverse)." },
      { q: "Can I enter a numeric value and see the checkboxes?", a: "Yes. Enter any octal permission number and the checkboxes update to show the corresponding permissions." },
    ],
    related: ["json-formatter", "regex-tester", "base64-codec", "timestamp-converter"],
  },
  "meta-tag-generator": {
    longDescription:
      "Generate HTML meta tags for SEO, Open Graph, and Twitter Cards. Fill in your page title, description, and URL and get the complete set of tags to paste into your <head>.",
    steps: [
      "Enter your page title, description, and URL",
      "Add optional Open Graph image and Twitter card settings",
      "Copy the generated meta tags into your HTML head",
    ],
    faq: [
      { q: "Which meta tags are generated?", a: "Standard SEO tags (title, description, robots), Open Graph tags (og:title, og:description, og:image, og:url), and Twitter Card tags." },
      { q: "How long should my meta description be?", a: "Keep it between 150–160 characters. Longer descriptions get cut off in search results." },
      { q: "Do meta tags directly affect Google rankings?", a: "The meta description does not directly affect rankings but influences click-through rate. The title tag does have SEO impact." },
    ],
    related: ["json-formatter", "html-entity-encoder", "url-encoder-decoder", "markdown-to-html"],
  },
  "css-gradient-generator": {
    longDescription:
      "Create CSS linear and radial gradients visually. Pick colors, adjust stops, set angle and direction, and copy the ready-to-use CSS gradient code for your project.",
    steps: [
      "Choose gradient type: linear or radial",
      "Add color stops and drag to adjust their positions",
      "Copy the generated CSS gradient code",
    ],
    faq: [
      { q: "Does it generate vendor-prefixed CSS?", a: "Yes. The output includes -webkit- prefixes for compatibility with older browsers alongside the standard property." },
      { q: "Can I create transparent gradients?", a: "Yes. Each color stop supports an alpha channel, so you can fade from a solid color to transparent." },
      { q: "How many color stops can I add?", a: "You can add as many color stops as you need. Most practical gradients use 2–5 stops." },
    ],
    related: ["css-box-shadow-generator", "color-converter", "css-unit-converter", "color-contrast-checker"],
  },
  "http-status-codes": {
    longDescription:
      "Look up HTTP status codes and their meanings. Find out what 404, 500, 301, or any other HTTP response code means, with descriptions and common causes for each.",
    steps: [
      "Search for a status code number or keyword",
      "See the code name, category, and full description",
      "Learn common causes and when to use each code",
    ],
    faq: [
      { q: "What do the HTTP status code ranges mean?", a: "1xx: informational, 2xx: success, 3xx: redirects, 4xx: client errors, 5xx: server errors." },
      { q: "What is the difference between 301 and 302?", a: "301 is a permanent redirect — browsers and search engines update their cache. 302 is temporary — they keep the original URL in cache." },
      { q: "What does a 429 status code mean?", a: "Too Many Requests. The client has sent too many requests in a given time and has been rate-limited." },
    ],
    related: ["json-formatter", "regex-tester", "url-encoder-decoder", "base64-codec"],
  },
  "css-box-shadow-generator": {
    longDescription:
      "Generate CSS box-shadow code visually. Adjust offset, blur, spread, color, and opacity with live preview — no guessing values. Copy the ready-to-use CSS property.",
    steps: [
      "Adjust the sliders for horizontal offset, vertical offset, blur, and spread",
      "Pick the shadow color and opacity",
      "Copy the generated box-shadow CSS",
    ],
    faq: [
      { q: "Can I add multiple shadows?", a: "Yes. Multiple box shadows can be layered for depth effects — add as many shadow layers as needed." },
      { q: "Does it support inset shadows?", a: "Yes. Toggle the inset option to create inner shadows that appear inside the element rather than outside." },
      { q: "Can I make a card elevation shadow like Material Design?", a: "Yes. Use low blur with small offset for tight shadows, or high blur with larger spread for soft floating card effects." },
    ],
    related: ["css-gradient-generator", "css-flexbox-generator", "color-converter", "css-unit-converter"],
  },
  "css-flexbox-generator": {
    longDescription:
      "Generate CSS flexbox layouts visually. Toggle container and item properties and see the layout update in real time. Copy the CSS for your flex container and items.",
    steps: [
      "Set the flex container properties: direction, wrap, justify-content, align-items",
      "Adjust individual flex item properties as needed",
      "Copy the generated flexbox CSS",
    ],
    faq: [
      { q: "What is the difference between justify-content and align-items?", a: "justify-content aligns items along the main axis (row direction by default). align-items aligns along the cross axis (perpendicular to the main axis)." },
      { q: "When should I use flexbox vs CSS grid?", a: "Use flexbox for one-dimensional layouts (a row or a column). Use CSS grid for two-dimensional layouts with rows and columns." },
      { q: "Does it generate shorthand flex properties?", a: "Yes. The output uses shorthand flex properties where applicable, keeping the CSS clean and concise." },
    ],
    related: ["css-box-shadow-generator", "css-gradient-generator", "css-unit-converter", "css-minifier"],
  },
  "favicon-generator": {
    longDescription:
      "Create a favicon from any image or text. Generate all the sizes needed for browsers, iOS home screens, and Android — and download a ready-to-use favicon.ico file.",
    steps: [
      "Upload an image or enter a letter for a text-based favicon",
      "Preview how it looks at 16x16, 32x32, and 64x64 pixels",
      "Download the favicon.ico or PNG files",
    ],
    faq: [
      { q: "What size should a favicon be?", a: "Modern browsers use 32x32 or 16x16. For best cross-platform support, generate all common sizes: 16, 32, 48, 64, 128, and 256 pixels." },
      { q: "What image formats can I upload?", a: "JPG, PNG, SVG, and WebP are all supported as source images." },
      { q: "Do I need a square image?", a: "Yes. Favicons are displayed as squares, so a square source image gives the best result. Non-square images will be cropped or letterboxed." },
    ],
    related: ["svg-to-png", "compress-image", "resize-image", "png-to-jpg"],
  },
  "json-validator": {
    longDescription:
      "Paste JSON, find out if it's valid, and get the exact line and column where it breaks. Most useful when an API is returning something your client can't parse and the error message is the unhelpful classic: 'Unexpected token at position 1247'.\n\nIt catches the stuff that trips people up daily — trailing commas, single quotes where there should be doubles, unquoted keys, stray control characters pasted in from Word. If the JSON is valid, you get a green check and a parsed summary. If not, you get a pointer to the character that killed it.",
    steps: [
      "Paste your JSON",
      "See immediately whether it's valid, or where the error is",
      "Fix the flagged character and re-run",
    ],
    faq: [
      { q: "What's the most common JSON error?", a: "Trailing commas after the last item in an array or object. JavaScript lets you get away with it; strict JSON does not. A close second is single quotes — JSON requires double quotes around keys and string values, no exceptions. If your file was hand-edited, one of these two is almost always the culprit." },
      { q: "Can it validate a JSON Schema?", a: "No — this tool only checks syntax. That's the 'is this even parseable' step. If you need to validate that your JSON matches a specific shape (required fields, correct types, nested structure), you need a JSON Schema validator, which is a separate tool." },
      { q: "Is there a size limit?", a: "Files up to around 1 MB are fine. Bigger than that and your browser starts feeling it — since validation is done locally, performance depends on your machine. For massive files, validate representative chunks instead of the whole blob." },
      { q: "Why does my JSON parse in one tool but not another?", a: "Some tools are lenient and silently accept things like trailing commas, comments, or unquoted keys (sometimes called JSON5). Standard JSON is stricter. If the source is a config file or a copy-pasted snippet, it may have gone through a lenient parser first — clean it up before trusting it elsewhere." },
      { q: "Is my data uploaded?", a: "No. Validation runs in your browser. Whether your JSON is an API response with user data or a secret config file, nothing gets sent to our servers — safe to paste sensitive payloads." },
    ],
    related: ["json-formatter", "json-to-typescript", "yaml-json", "json-to-csv"],
    whyUs: "Most JSON validators either block until they finish loading three analytics scripts, or try to upsell you on 'JSON Pro'. This one just parses locally and tells you what's wrong — useful when you're debugging a webhook payload at 2am and don't want to sign up for anything.",
  },
  "css-unit-converter": {
    longDescription:
      "Convert between CSS units: px, rem, em, vw, vh, %, and more. Enter a value in one unit and see conversions for all others at once — great for responsive design work.",
    steps: [
      "Enter the value you want to convert",
      "Select the source unit",
      "See conversions for all CSS units instantly",
    ],
    faq: [
      { q: "How are rem conversions calculated?", a: "rem conversions assume a 16px root font size by default (the browser default). You can change this to match your project's root font size." },
      { q: "What is the difference between em and rem?", a: "em is relative to the parent element's font size; rem is relative to the root element's font size. rem is more predictable for layouts." },
      { q: "Can I use this for viewport units?", a: "Yes. Enter a viewport width or height to calculate vw and vh equivalents for any pixel value." },
    ],
    related: ["css-flexbox-generator", "css-box-shadow-generator", "css-gradient-generator", "color-converter"],
  },
  "color-contrast-checker": {
    longDescription:
      "Check if your text and background color combination meets WCAG accessibility contrast requirements. Get AA and AAA pass/fail results for normal and large text, and find accessible alternatives.",
    steps: [
      "Enter your foreground (text) and background colors",
      "See the contrast ratio and WCAG AA/AAA results",
      "Adjust colors until you pass the required level",
    ],
    faq: [
      { q: "What contrast ratio is required for WCAG AA?", a: "4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold). WCAG AAA requires 7:1 for normal text and 4.5:1 for large text." },
      { q: "What is WCAG?", a: "Web Content Accessibility Guidelines — the international standard for making web content accessible to people with visual impairments, including color blindness." },
      { q: "Can I enter colors as HEX, RGB, or HSL?", a: "Yes. All common color formats are accepted for both foreground and background colors." },
    ],
    related: ["color-converter", "css-gradient-generator", "css-box-shadow-generator", "color-palette-generator"],
  },
  "svg-optimizer": {
    longDescription:
      "Optimize and minify SVG files by removing unnecessary metadata, comments, and redundant attributes. Reduce SVG file size for faster web pages without changing how the graphic looks.",
    steps: [
      "Upload your SVG file or paste the SVG code",
      "The optimizer removes unnecessary data automatically",
      "Download or copy the optimized SVG",
    ],
    faq: [
      { q: "How much can SVG optimization reduce file size?", a: "Typically 20–60% depending on how the SVG was exported. SVGs from design tools like Illustrator and Figma often include a lot of removable metadata." },
      { q: "Will optimization change how my SVG looks?", a: "No. Only non-visual data (comments, editor metadata, redundant attributes) is removed. The visual output stays identical." },
      { q: "What does an SVG optimizer remove?", a: "Editor metadata, comments, hidden elements, default attribute values, and other redundant data that design tools add but browsers do not need." },
    ],
    related: ["svg-to-png", "compress-image", "css-minifier", "js-minifier"],
  },

  // ─── GENERATOR TOOLS ───
  "password-generator": {
    longDescription:
      "Make a random password with the length and character mix you need. Pick uppercase, lowercase, numbers, symbols, or any combination — skip the characters that certain sites still don't accept, set a minimum length that matches the policy, and copy the result.\n\nUnder the hood, randomness comes from the browser's cryptographic RNG (the same primitive used for TLS keys), not Math.random. That matters: a 'random' password generated from a weak source is a guessable password. Nothing gets sent to any server, and no passwords are logged, stored, or reused — each click produces a fresh one that only you see.",
    steps: [
      "Pick the length (16+ is a good default)",
      "Toggle uppercase, lowercase, numbers, and symbols",
      "Click Generate, then copy",
    ],
    faq: [
      { q: "How long should my password actually be?", a: "For most accounts, 16 characters is a fine baseline. For anything important — your email, password manager master password, banking — go 20+. Length matters more than symbol mix: a 20-character password with just letters and numbers is harder to crack than a 10-character one with every symbol on the keyboard." },
      { q: "Is the password generated locally on my device?", a: "Yes. It's produced in your browser using crypto.getRandomValues, which is the same cryptographic RNG browsers use for secure connections. Nothing gets sent to a server, nothing gets logged, and no two generations produce the same output — what appears on your screen exists only there." },
      { q: "Should I include symbols?", a: "If the site accepts them, yes — they widen the character set and make brute-forcing slower. But if you're forced to choose between 'shorter with symbols' and 'longer without', pick longer every time. A password manager handles the copy-paste either way." },
      { q: "Is it safer than the password suggestions my browser makes?", a: "Roughly equivalent. Safari, Chrome, and 1Password all use the same kind of cryptographic RNG. The main reason to use a standalone generator is when you need to follow a specific policy (exact length, no ambiguous characters, certain symbols excluded) that the built-in suggester can't match." },
      { q: "Can I trust that the password isn't saved somewhere?", a: "Yes — there's no backend to save it to. The generator is a static page that runs JavaScript in your browser. You can even open the network tab in dev tools and confirm nothing leaves the page after the initial load." },
    ],
    related: ["strong-password-checker", "random-number-generator", "fake-data-generator", "base64-codec"],
    whyUs: "A lot of password generators look sketchy — and for a security tool, that's the one thing you really don't want. This one is plain HTML and JS, runs entirely client-side, and the source is inspectable. No telemetry, no 'security report' upsell, no ads. Just a generator that hands you a fresh string and gets out of the way.",
  },
  "random-number-generator": {
    longDescription:
      "Generate random numbers within a custom range. Choose minimum and maximum values, set how many numbers to generate, and optionally ensure no duplicates. Useful for sampling, testing, games, and simulations.",
    steps: [
      "Set the minimum and maximum values",
      "Choose how many numbers to generate",
      "Click Generate and copy the results",
    ],
    faq: [
      { q: "Are the numbers truly random?", a: "They are cryptographically random — generated using the browser's secure random API, which is suitable for security purposes, not just statistical simulations." },
      { q: "Can I generate numbers without duplicates?", a: "Yes. Toggle the no-duplicates option and each number in the set will be unique." },
      { q: "Can I generate decimal numbers?", a: "Yes. Set the number of decimal places and the generator will produce floating-point numbers in your range." },
    ],
    related: ["password-generator", "random-name-picker", "fake-data-generator", "qr-code"],
  },
  "color-palette-generator": {
    longDescription:
      "Generate harmonious color palettes from a base color. Get complementary, triadic, analogous, and monochromatic color schemes with HEX codes ready to use in your design or code.",
    steps: [
      "Pick or enter a base color",
      "Choose a harmony type: complementary, triadic, analogous, or monochromatic",
      "Copy the HEX codes for your palette",
    ],
    faq: [
      { q: "What is a complementary color scheme?", a: "Complementary colors sit opposite each other on the color wheel, creating strong contrast — great for calls to action and highlights." },
      { q: "What is the difference between analogous and monochromatic?", a: "Analogous uses colors adjacent on the color wheel for a harmonious feel. Monochromatic uses tints and shades of a single hue for a cohesive look." },
      { q: "Can I export the palette?", a: "Yes. Copy individual HEX codes or download the palette as an image for reference in your design tool." },
    ],
    related: ["color-converter", "color-contrast-checker", "css-gradient-generator", "qr-code"],
  },
  "random-name-picker": {
    longDescription:
      "Pick a random name from a list for giveaways, classroom activities, team assignments, or any situation where you need an impartial selection. Paste your list and spin.",
    steps: [
      "Paste or type a list of names (one per line)",
      "Click Pick to randomly select a name",
      "The winner is displayed — click again to pick another",
    ],
    faq: [
      { q: "Is the selection truly random?", a: "Yes. The picker uses the browser's cryptographically secure random API to ensure a fair, unbiased selection every time." },
      { q: "Can I remove names after they have been picked?", a: "Yes. Toggle remove-after-pick to automatically remove the selected name so it will not be chosen again." },
      { q: "Is there a limit to how many names I can add?", a: "No practical limit — lists with hundreds or thousands of names work without any slowdown." },
    ],
    related: ["random-number-generator", "password-generator", "fake-data-generator", "qr-code"],
  },
  "invoice-generator": {
    longDescription:
      "Create professional invoices in minutes. Add your business details, line items, tax, and notes — then download a clean PDF invoice ready to send to clients. No account or subscription needed.",
    steps: [
      "Fill in your business name, client details, and invoice number",
      "Add line items with descriptions, quantities, and prices",
      "Download the invoice as a PDF",
    ],
    faq: [
      { q: "Can I add tax to the invoice?", a: "Yes. Enter a tax rate percentage and the total is calculated automatically with tax broken out separately." },
      { q: "Is my invoice data stored anywhere?", a: "No. Everything stays in your browser. No data is sent to any server, and the invoice is generated entirely on your device." },
      { q: "Can I reuse the invoice template?", a: "The fields remain filled until you clear them or close the page, so you can adjust and re-download for repeat clients." },
    ],
    related: ["number-to-words", "word-counter", "pdf-to-text", "qr-code"],
  },
  "strong-password-checker": {
    longDescription:
      "Check how strong your password is. Get an instant score, entropy estimate, and specific feedback on what makes your password weak and how to improve it.",
    steps: [
      "Type or paste your password",
      "See the strength score and entropy in real time",
      "Follow the suggestions to make it stronger",
    ],
    faq: [
      { q: "Is my password sent to any server?", a: "No. The strength check runs entirely in your browser. Your password is never transmitted anywhere." },
      { q: "What makes a password strong?", a: "Length is the most important factor, followed by using a mix of uppercase, lowercase, numbers, and symbols. Avoiding dictionary words also matters." },
      { q: "What is password entropy?", a: "Entropy measures how unpredictable a password is, expressed in bits. A higher entropy means the password is harder to guess or crack by brute force." },
    ],
    related: ["password-generator", "random-number-generator", "base64-codec", "fake-data-generator"],
  },
  "fake-data-generator": {
    longDescription:
      "Generate realistic fake data for testing and development. Create names, emails, addresses, phone numbers, dates, and more — in bulk, ready to paste into your database or test suite.",
    steps: [
      "Select the data types you need",
      "Choose how many records to generate",
      "Copy the output as JSON, CSV, or plain text",
    ],
    faq: [
      { q: "What types of fake data can be generated?", a: "Names, email addresses, phone numbers, physical addresses, dates, UUIDs, company names, credit card numbers (for testing only), and more." },
      { q: "Can I generate fake data in bulk?", a: "Yes. Generate up to 1,000 records at once in JSON or CSV format for easy import into databases or test fixtures." },
      { q: "Is this useful for GDPR-compliant testing?", a: "Yes. Using fake data instead of real user data in development and testing environments is a best practice for data privacy compliance." },
    ],
    related: ["random-number-generator", "password-generator", "json-formatter", "csv-to-json"],
  },
  "placeholder-image-generator": {
    longDescription:
      "Generate placeholder images for wireframes, mockups, and development. Specify width, height, background color, and text — and get a ready-to-use image URL or downloadable PNG.",
    steps: [
      "Set the image dimensions, background color, and optional label text",
      "Preview the placeholder image",
      "Download the PNG or copy the image URL",
    ],
    faq: [
      { q: "What is a placeholder image used for?", a: "Placeholder images fill space in wireframes, design mockups, and development builds where real images are not available yet." },
      { q: "Can I customize the text on the placeholder?", a: "Yes. Add any label — the dimensions, a description, or custom text. Leave it blank for a plain color block." },
      { q: "What output formats are available?", a: "Download as a PNG image or use the generated URL in your HTML src attribute directly." },
    ],
    related: ["resize-image", "compress-image", "svg-to-png", "favicon-generator"],
  },

  // ─── IMAGE TOOLS (additional) ───
  "image-metadata-remover": {
    longDescription:
      "Strip EXIF and metadata from photos before sharing online. Remove GPS location, camera model, timestamp, and other hidden data that could compromise your privacy. Works entirely in your browser.",
    steps: [
      "Upload your image (JPG, PNG, or WebP)",
      "All EXIF metadata is stripped automatically",
      "Download the clean image with no hidden data",
    ],
    faq: [
      { q: "What metadata is removed?", a: "GPS location, camera make and model, date and time taken, exposure settings, software used, and all other EXIF tags are removed." },
      { q: "Why should I remove photo metadata?", a: "Photos taken on smartphones embed GPS coordinates that reveal exactly where you were. Removing metadata protects your location privacy when sharing images online." },
      { q: "Does removing metadata change the image quality?", a: "No. Only the hidden data is removed. The visible image pixels are completely unchanged." },
    ],
    related: ["compress-image", "resize-image", "image-color-picker", "image-to-base64"],
  },
  "image-color-picker": {
    longDescription:
      "Pick any color from an image and get the HEX, RGB, and HSL values. Upload a photo, logo, or screenshot and click on any pixel to extract the exact color code.",
    steps: [
      "Upload your image",
      "Click on any pixel to pick its color",
      "Copy the HEX, RGB, or HSL value",
    ],
    faq: [
      { q: "Can I pick multiple colors from the same image?", a: "Yes. Click anywhere on the image to update the picked color. You can copy each value individually before clicking elsewhere." },
      { q: "How precise is the color picker?", a: "Pixel-precise. The exact color value of the clicked pixel is returned, not an approximation." },
      { q: "Can I use this to extract brand colors from a logo?", a: "Yes. Upload the logo image and click on each color element to get the exact HEX codes for that brand's color palette." },
    ],
    related: ["color-converter", "color-palette-generator", "color-contrast-checker", "image-metadata-remover"],
  },
  "image-to-base64": {
    longDescription:
      "Convert images to Base64 encoded strings for embedding directly in HTML, CSS, or JSON. Useful for data URIs, embedding icons in code, or passing images through APIs without separate file uploads.",
    steps: [
      "Upload your image (JPG, PNG, SVG, or WebP)",
      "The Base64 string is generated instantly",
      "Copy the string or the full data URI",
    ],
    faq: [
      { q: "What is a Base64 image data URI?", a: "A data URI embeds the image directly as a Base64 string in your HTML or CSS, like: img src data:image/png;base64,... No separate image file is needed." },
      { q: "When should I use Base64 images?", a: "For small icons, inline email images, or when you want to reduce HTTP requests. Avoid it for large images as Base64 is about 33% larger than the binary file." },
      { q: "What image formats are supported?", a: "JPG, PNG, SVG, GIF, and WebP are all supported." },
    ],
    related: ["base64-codec", "image-metadata-remover", "svg-to-png", "compress-image"],
  },
  "image-flip-rotate": {
    longDescription:
      "Flip images horizontally or vertically, or rotate by any angle. Fix mirrored selfies, correct scanned document orientation, or create reflection effects — all in your browser.",
    steps: [
      "Upload your image",
      "Click Flip Horizontal, Flip Vertical, or set a rotation angle",
      "Download the adjusted image",
    ],
    faq: [
      { q: "Can I rotate by any angle, not just 90 degrees?", a: "Yes. Enter any angle from 0 to 360 degrees for precise rotation. The canvas expands to fit the rotated image without cropping." },
      { q: "What is the difference between flip and rotate?", a: "Flip mirrors the image (left-right or top-bottom). Rotate turns it around a center point by a given angle." },
      { q: "Does flipping change the image quality?", a: "No. Flipping is a lossless geometric transformation — the pixels are rearranged, not re-encoded." },
    ],
    related: ["rotate-pdf", "crop-image", "resize-image", "image-metadata-remover"],
  },
  "webp-to-png": {
    longDescription:
      "Convert WebP images to PNG format. WebP is used by modern websites and Chrome screenshots but is not universally supported — convert to PNG for compatibility with all apps and platforms.",
    steps: [
      "Upload your WebP image",
      "The image is converted to PNG in your browser",
      "Download the PNG file",
    ],
    faq: [
      { q: "Why convert WebP to PNG?", a: "Some apps, operating systems, and older software do not support WebP. PNG is universally compatible with every image viewer, editor, and platform." },
      { q: "Is transparency preserved?", a: "Yes. WebP images with transparent backgrounds are converted to PNG with full transparency intact." },
      { q: "Will there be any quality loss?", a: "No. PNG uses lossless compression, so the conversion from WebP preserves all visual detail without additional quality loss." },
    ],
    related: ["webp-to-jpg", "png-to-jpg", "jpg-to-png", "compress-image"],
  },
  "webp-to-jpg": {
    longDescription:
      "Convert WebP images to JPG format for maximum compatibility. JPG is smaller than PNG and works everywhere — ideal when you need WebP images in apps that do not support the format.",
    steps: [
      "Upload your WebP image",
      "The image is converted to JPG instantly",
      "Download the JPG file",
    ],
    faq: [
      { q: "Why would I convert WebP to JPG instead of PNG?", a: "JPG files are smaller than PNG and work everywhere. Choose JPG for photos where you do not need transparency, to save storage and bandwidth." },
      { q: "What happens to transparent areas?", a: "Transparent areas are filled with a white background since JPG does not support transparency." },
      { q: "Is the conversion done in my browser?", a: "Yes. No files are uploaded to any server. The conversion happens entirely in your browser." },
    ],
    related: ["webp-to-png", "png-to-jpg", "compress-image", "heic-to-jpg"],
  },
  "gif-to-png": {
    longDescription:
      "Convert GIF images to PNG format. Extract a static frame from an animated GIF or convert a static GIF to a higher-quality PNG with better color support.",
    steps: [
      "Upload your GIF file",
      "Choose which frame to extract (for animated GIFs)",
      "Download the PNG image",
    ],
    faq: [
      { q: "Does it convert animated GIFs?", a: "For animated GIFs, the first frame is extracted and saved as a PNG. All frames can be exported as individual PNGs." },
      { q: "Why convert GIF to PNG?", a: "PNG supports millions of colors vs GIF's 256-color limit, and handles transparency more cleanly. PNG is better for logos and graphics stored as GIF." },
      { q: "Is transparency preserved?", a: "Yes. GIF transparency (the single transparent color index) is converted to full PNG alpha channel transparency." },
    ],
    related: ["webp-to-png", "png-to-jpg", "compress-image", "svg-to-png"],
  },
};

export function getToolSEOContent(toolId: string): ToolSEOContent | null {
  return content[toolId] ?? null;
}
