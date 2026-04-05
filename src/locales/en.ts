const en = {
  // ─── Navigation ───
  nav: {
    pricing: "Pricing",
    news: "News",
    compare: "Compare",
    contact: "Contact",
    signIn: "Sign In",
    signOut: "Sign Out",
    freePlan: "Free Plan",
    proPlan: "Pro Plan",
    upgradeToPro: "Upgrade to Pro",
    manageSubscription: "Manage Subscription",
  },

  // ─── Homepage ───
  hero: {
    title: "Get things done,",
    titleAccent: "effortlessly.",
    subtitle: "Everyday file tools, ready when you are.",
  },

  // ─── Homepage SEO ───
  home: {
    whatIs: "What is JustUse.me?",
    whatIsDesc: "JustUse.me is a free, privacy-first online toolbox with 122 browser-based tools for everyday file tasks. Every tool runs entirely in your browser using WebAssembly and Canvas APIs — your files are never uploaded to any server. No account required, no watermarks, no hidden fees.",
    whyChoose: "Why choose JustUse.me over other online tools?",
    whyChooseDesc: "Most online file tools like Smallpdf, iLovePDF, and TinyPNG upload your files to their servers for processing. JustUse.me is different: all processing happens client-side in your browser. This means faster results (no upload/download wait), true privacy (files never leave your device), and zero risk of data leaks.",
    toolCategories: "Tool Categories",
    pdfDesc: "Merge, split, compress, rotate, watermark, and convert PDFs. Handle up to 20 files at once with no quality loss.",
    imageDesc: "Compress, resize, crop, and convert images between PNG, JPG, WebP, HEIC, SVG, and GIF formats. Includes OCR text extraction.",
    textDesc: "Format JSON, check diffs, minify JavaScript and CSS, decode JWTs, explain cron expressions, and 15+ more text utilities.",
    convertDesc: "Convert between CSV, JSON, YAML, XML, TOML, Markdown, and TypeScript formats instantly.",
    generatorDesc: "Generate QR codes, UUIDs, passwords, color palettes, barcodes, invoices, and placeholder data.",
    calculatorDesc: "Calculate BMI, mortgage payments, compound interest, GPA, calories, and more with simple, focused calculators.",
    developerDesc: "Test regex, convert timestamps, generate meta tags, CSS gradients, box shadows, and favicons.",
    utilityDesc: "Convert units, run timers, check URLs, encrypt text, and compare world clocks.",
    privacyPromise: "Your Privacy, Our Promise",
    privacyPromiseDesc: "Every tool on JustUse.me processes files entirely in your browser. We use no server-side file processing, no tracking cookies, and no third-party analytics beyond basic page views. Your documents, images, and data stay on your device from start to finish.",
  },

  // ─── Search ───
  search: {
    placeholder: 'Try "merge PDF" or "compress image"',
    noResults: "No tools found for",
    viewAll: "View all {category} tools",
  },

  // ─── Category bubbles ───
  categories: {
    pdf: "PDF",
    image: "Image",
    text: "Text & Code",
    convert: "Convert",
    generator: "Generator",
    calculator: "Calculator",
    developer: "Developer",
    utility: "Utility",
  },

  // ─── Category pages ───
  categoryPage: {
    pdf: { title: "PDF Tools", description: "Merge, split, compress, and convert PDFs online for free." },
    image: { title: "Image Tools", description: "Compress, resize, and convert images instantly." },
    text: { title: "Text & Code Tools", description: "Format JSON, count words, encode/decode Base64, and more." },
    convert: { title: "Converter Tools", description: "Convert between CSV, JSON, YAML, XML, and other formats." },
    generator: { title: "Generator Tools", description: "Generate QR codes, color palettes, and more." },
    calculator: { title: "Calculator Tools", description: "Percentage, BMI, mortgage, loan, and other calculators." },
    developer: { title: "Developer Tools", description: "Regex tester, URL encoder, CSS generators, and more." },
    utility: { title: "Utility Tools", description: "Stopwatch, timer, unit converters, and everyday tools." },
  },

  // ─── Tool page ───
  tool: {
    processedLocally: "Processed locally — files never leave your device",
    textInput: "Text input",
    max: "Max {size}",
    upTo: "Up to {n} files",
    howItWorks: "How it works",
    about: "About {name}",
    aboutSuffix: "Powered by JustUse.me — free, ad-free, and private.",
    aboutBrowser: "This tool runs entirely in your browser. Your files are never uploaded to any server.",
    faq: "Frequently asked questions",
    relatedTools: "Related tools",
    notFound: "Tool not found.",
    // ─── Interaction UI (client components) ───
    chooseDifferentFile: "Choose different file",
    processFallback: "Process",
    processAnother: "Process another file",
    tryAgain: "Try again",
    addMoreFiles: "Add more files, or",
    dropFileHere: "Drop a file here, or",
    dropFilesHere: "Drop files here, or",
    browse: "browse",
    anyFile: "Any file",
    dragToReorder: "Drag to reorder",
    processNFiles: "Process {n} files",
    downloaded: "Downloaded!",
    download: "Download",
    processing: "Processing...",
    dailyLimitTitle: "Daily limit reached",
    dailyLimitDesc: "You've used {used}/{limit} free uses today. Come back tomorrow, or upgrade for unlimited access.",
    createFreeAccount: "Create a free account",
    seeProPlans: "See Pro plans",
    upgradeToPro: "Upgrade to Pro",
    maybeLater: "Maybe later",
    nFiles: "{n} files",
  },

  // ─── Footer ───
  footer: {
    copyright: "\u00a9 {year} JustUse.me — Paymomentum LLC",
    privacyNotice: "Your privacy matters to us",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Service",
  },

  // ─── Pricing ───
  pricing: {
    title: "Simple pricing",
    subtitle: "No hidden fees. Cancel anytime.",
    success: "Welcome to Pro! Your subscription is now active.",
    canceled: "Checkout was canceled. No charges were made.",
    free: "Free",
    pro: "Pro",
    popular: "Popular",
    perMonth: "/month",
    freeFeatures: ["3 uses per day", "All tools available", "No watermarks", "Browser-side privacy"],
    proFeatures: ["Unlimited uses", "All tools available", "No watermarks", "Browser-side privacy", "Priority support"],
    getStarted: "Get Started",
    upgradeToPro: "Upgrade to Pro",
    redirecting: "Redirecting...",
    manageSubscription: "Manage Subscription",
  },

  // ─── Contact ───
  contact: {
    title: "Contact us",
    subtitle: "Have a question or feedback? We'd love to hear from you.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Your message",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent! We'll get back to you soon.",
    sendAnother: "Send another message",
  },

  // ─── Login ───
  login: {
    title: "Welcome back",
    subtitle: "Sign in to track your usage and unlock Pro features.",
    google: "Continue with Google",
    error: "Sign in failed. Please try again.",
    termsPrefix: "By signing in, you agree to our",
    and: "and",
  },

  // ─── Metadata / SEO ───
  meta: {
    siteTitle: "JustUse.me — Free Online PDF, Image & Text Tools",
    siteDescription: "Free online tools to merge PDFs, compress images, format JSON, and 100+ more. No ads, no sign-up, no watermarks. Files never leave your browser.",
    ogTitle: "JustUse.me — Free Online Tools",
    ogDescription: "122 free online tools for PDFs, images, and text. No ads, no sign-up, privacy-first — files never leave your browser.",
    twitterDescription: "122 free tools. No ads, no sign-up. Files stay in your browser.",
    categoryMetaTitle: "Free {label} Online — No Ads, No Sign-up | JustUse.me",
    categoryMetaDescription: "{desc} Free, private, and works in your browser. No watermarks, no file uploads.",
    toolMetaTitle: "{name} Online Free",
    toolMetaSuffix: "Free, no ads, no sign-up. Your files stay on your device.",
    toolMetaDescSuffix: "Runs in your browser — files are never uploaded. Free, no sign-up required.",
    toolOgTitle: "{name} — Free Online Tool | JustUse.me",
  },

  // ─── Tool names & descriptions (keyed by tool ID) ───
  tools: {
    "merge-pdf": { name: "Merge PDF", description: "Combine multiple PDF files into one document." },
    "split-pdf": { name: "Split PDF", description: "Extract pages from a PDF or split into separate files." },
    "compress-pdf": { name: "Compress PDF", description: "Reduce PDF file size while maintaining readability." },
    "pdf-to-jpg": { name: "PDF to JPG", description: "Convert PDF pages to high-quality JPG images." },
    "jpg-to-pdf": { name: "JPG to PDF", description: "Turn images into a single PDF document." },
    "rotate-pdf": { name: "Rotate PDF", description: "Rotate all pages of a PDF by 90, 180, or 270 degrees." },
    "pdf-to-text": { name: "PDF to Text", description: "Extract text content from a PDF file." },
    "watermark-pdf": { name: "Watermark PDF", description: "Add a text watermark to every page of your PDF." },
    "page-numbers-pdf": { name: "Add Page Numbers", description: "Add page numbers to every page of your PDF." },
    "compress-image": { name: "Compress Image", description: "Reduce image file size without visible quality loss." },
    "resize-image": { name: "Resize Image", description: "Change image dimensions to any size." },
    "crop-image": { name: "Crop Image", description: "Crop images visually with drag-to-select." },
    "png-to-jpg": { name: "PNG to JPG", description: "Convert PNG images to JPG format." },
    "jpg-to-png": { name: "JPG to PNG", description: "Convert JPG images to lossless PNG format." },
    "heic-to-jpg": { name: "HEIC to JPG", description: "Convert iPhone HEIC photos to JPG." },
    "svg-to-png": { name: "SVG to PNG", description: "Convert SVG vector graphics to PNG images." },
    "ocr-image": { name: "Image to Text (OCR)", description: "Extract text from images using OCR." },
    "json-formatter": { name: "JSON Formatter", description: "Format and beautify JSON data." },
    "word-counter": { name: "Word Counter", description: "Count words, characters, and sentences." },
    "base64-codec": { name: "Base64 Encode/Decode", description: "Encode or decode Base64 strings." },
    "markdown-to-html": { name: "Markdown to HTML", description: "Convert Markdown to clean HTML." },
    "diff-checker": { name: "Diff Checker", description: "Compare two texts and highlight differences." },
    "js-minifier": { name: "JS Minifier", description: "Minify JavaScript code for production." },
    "css-minifier": { name: "CSS Minifier", description: "Minify CSS stylesheets for faster loading." },
    "csv-to-json": { name: "CSV to JSON", description: "Convert CSV data to JSON format." },
    "json-to-csv": { name: "JSON to CSV", description: "Convert JSON arrays to CSV spreadsheet format." },
    "yaml-json": { name: "YAML / JSON Converter", description: "Convert between YAML and JSON formats." },
    "xml-formatter": { name: "XML Formatter", description: "Format and beautify XML data." },
    "qr-code": { name: "QR Code Generator", description: "Generate QR codes from text or URLs." },
    "color-converter": { name: "Color Converter", description: "Convert colors between HEX, RGB, and HSL." },
    "sql-formatter": { name: "SQL Formatter", description: "Format and beautify SQL queries with proper indentation." },
    "html-beautifier": { name: "HTML Beautifier", description: "Format and indent messy HTML code." },
    "jwt-decoder": { name: "JWT Decoder", description: "Decode and inspect JSON Web Token payloads." },
    "cron-explainer": { name: "Cron Explainer", description: "Translate cron expressions into plain English." },
    "slug-generator": { name: "Slug Generator", description: "Convert text into URL-friendly slugs." },
    "handlebars-preview": { name: "Handlebars Preview", description: "Render Handlebars templates with live data." },
    "html-to-markdown": { name: "HTML to Markdown", description: "Convert HTML content to Markdown format." },
    "json5-to-json": { name: "JSON5 to JSON", description: "Convert JSON5 (with comments/trailing commas) to strict JSON." },
    "toml-to-json": { name: "TOML to JSON", description: "Convert TOML configuration to JSON format." },
    "json-to-markdown-table": { name: "JSON to Markdown Table", description: "Convert JSON arrays into readable Markdown tables." },
    "typescript-to-js": { name: "TypeScript to JS", description: "Strip types from TypeScript to produce plain JavaScript." },
    "uuid-generator": { name: "UUID Generator", description: "Generate random UUIDs (v4) instantly." },
    "lorem-ipsum": { name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs and mockups." },
    "hash-generator": { name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from files." },
    "barcode-generator": { name: "Barcode Generator", description: "Generate barcodes from text in various formats." },
    "exif-viewer": { name: "EXIF Viewer", description: "View EXIF metadata from photos (camera, GPS, date)." },
    // Image (new)
    "image-metadata-remover": { name: "Image Metadata Remover", description: "Strip EXIF and metadata from images by redrawing to a clean canvas." },
    "image-color-picker": { name: "Image Color Picker", description: "Sample and extract the top 8 most common colors from an image as hex values." },
    "image-to-base64": { name: "Image to Base64", description: "Convert an uploaded image to a Base64 data URL string." },
    "image-flip-rotate": { name: "Image Flip & Rotate", description: "Flip or rotate an image horizontally, vertically, or by 90/180/270 degrees." },
    "webp-to-png": { name: "WebP to PNG", description: "Convert WebP images to PNG format." },
    "webp-to-jpg": { name: "WebP to JPG", description: "Convert WebP images to JPG format." },
    "gif-to-png": { name: "GIF to PNG", description: "Extract the first frame of a GIF animation and save it as a PNG image." },
    // Text (new)
    "case-converter": { name: "Case Converter", description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, or kebab-case." },
    "remove-duplicate-lines": { name: "Remove Duplicate Lines", description: "Remove repeated lines from text, keeping only unique entries." },
    "sort-lines": { name: "Sort Lines", description: "Sort lines of text alphabetically from A to Z." },
    "string-reverse": { name: "String Reverse", description: "Reverse a string or each line of text independently." },
    "readability-checker": { name: "Readability Checker", description: "Score text with Flesch Reading Ease and Flesch-Kincaid Grade Level." },
    "remove-whitespace": { name: "Remove Whitespace", description: "Strip extra spaces, tabs, and blank lines from text." },
    "find-and-replace": { name: "Find and Replace", description: "Bulk find and replace text using a simple separator format." },
    "url-encoder-decoder": { name: "URL Encoder / Decoder", description: "Encode and decode URL percent-encoded strings." },
    "html-entity-encoder": { name: "HTML Entity Encoder", description: "Encode and decode HTML special characters like &amp;, &lt;, and &gt;." },
    "number-to-words": { name: "Number to Words", description: "Convert numbers to English words (e.g. 1234 → \"one thousand two hundred thirty-four\")." },
    // Generator (new)
    "password-generator": { name: "Password Generator", description: "Generate strong random passwords with uppercase, lowercase, numbers, and symbols." },
    "random-number-generator": { name: "Random Number Generator", description: "Generate random numbers within a specified range." },
    "color-palette-generator": { name: "Color Palette Generator", description: "Generate harmonious color palettes based on color theory from any hex color." },
    "random-name-picker": { name: "Random Name Picker", description: "Randomly pick a winner from a list of names." },
    "invoice-generator": { name: "Invoice Generator", description: "Generate a clean formatted text invoice with automatic total calculation." },
    "strong-password-checker": { name: "Password Strength Checker", description: "Check password strength with score, crack time estimate, and detailed feedback." },
    "fake-data-generator": { name: "Fake Data Generator", description: "Generate realistic fake names, emails, phone numbers, and addresses as JSON." },
    "placeholder-image-generator": { name: "Placeholder Image Generator", description: "Generate placeholder images with custom size, background color, and text using Canvas." },
    // Calculator
    "percentage-calculator": { name: "Percentage Calculator", description: "Calculate percentages, find what percent one number is of another, or compute values from percentages." },
    "bmi-calculator": { name: "BMI Calculator", description: "Calculate Body Mass Index (BMI) from height and weight, with health category classification." },
    "age-calculator": { name: "Age Calculator", description: "Calculate exact age in years, months, and days from a birthdate, plus next birthday countdown." },
    "tip-calculator": { name: "Tip Calculator", description: "Calculate tip amount, total bill, and per-person split based on bill amount and tip percentage." },
    "compound-interest-calculator": { name: "Compound Interest Calculator", description: "Calculate compound interest growth with future value, total interest, and year-by-year breakdown." },
    "mortgage-calculator": { name: "Mortgage Calculator", description: "Calculate monthly mortgage payments, total interest paid, and amortization summary." },
    "loan-calculator": { name: "Loan Calculator", description: "Calculate monthly loan payments and total interest for any personal or auto loan." },
    "grade-calculator": { name: "Grade Calculator", description: "Calculate weighted average grade from scores and their weights." },
    "gpa-calculator": { name: "GPA Calculator", description: "Calculate GPA from letter grades and credit hours using the standard 4.0 scale." },
    "calorie-calculator": { name: "Calorie Calculator", description: "Calculate daily calorie needs based on age, gender, height, weight, and activity level." },
    "pregnancy-due-date": { name: "Pregnancy Due Date Calculator", description: "Calculate pregnancy due date, current week, and trimester based on last menstrual period." },
    "date-difference-calculator": { name: "Date Difference Calculator", description: "Calculate the difference between two dates in days, weeks, months, and years." },
    "time-zone-converter": { name: "Time Zone Converter", description: "Convert time between different time zones worldwide." },
    "discount-calculator": { name: "Discount Calculator", description: "Calculate sale price and amount saved after applying a discount percentage." },
    "scientific-calculator": { name: "Scientific Calculator", description: "Evaluate mathematical expressions with support for trigonometry, logarithms, square roots, and more." },
    "debt-payoff-calculator": { name: "Debt Payoff Calculator", description: "Calculate how long it takes to pay off debt and total interest paid based on balance, rate, and monthly payment." },
    // Developer
    "regex-tester": { name: "Regex Tester", description: "Test regular expressions and find all matches with positions in your text." },
    "timestamp-converter": { name: "Timestamp Converter", description: "Convert Unix timestamps to human-readable dates and vice versa, in multiple formats." },
    "json-to-typescript": { name: "JSON to TypeScript", description: "Convert a JSON object into TypeScript interface definitions, handling nested objects and arrays." },
    "html-to-jsx": { name: "HTML to JSX", description: "Convert HTML markup to JSX-compatible React syntax (className, htmlFor, self-closing tags, style objects)." },
    "chmod-calculator": { name: "chmod Calculator", description: "Convert between numeric (755) and symbolic (rwxr-xr-x) Unix file permission formats with full explanation." },
    "meta-tag-generator": { name: "Meta Tag Generator", description: "Generate complete HTML head meta tags including SEO, Open Graph, and Twitter Card tags." },
    "css-gradient-generator": { name: "CSS Gradient Generator", description: "Generate CSS linear-gradient code from two colors and an optional direction or angle." },
    "http-status-codes": { name: "HTTP Status Codes", description: "Look up HTTP status codes by number or keyword, with descriptions and common use cases." },
    "css-box-shadow-generator": { name: "CSS Box Shadow Generator", description: "Generate CSS box-shadow code from offset, blur, spread, and color parameters." },
    "css-flexbox-generator": { name: "CSS Flexbox Generator", description: "Generate complete CSS flexbox code from direction, justify, align, wrap, and gap parameters." },
    "favicon-generator": { name: "Favicon Generator", description: "Resize any image to a 32×32 PNG favicon ready for web use." },
    "json-validator": { name: "JSON Validator", description: "Validate JSON and get a formatted, pretty-printed version or a detailed error with line number." },
    "css-unit-converter": { name: "CSS Unit Converter", description: "Convert CSS values between px, rem, em, pt, and vw units." },
    "color-contrast-checker": { name: "Color Contrast Checker", description: "Check WCAG AA/AAA contrast ratio between foreground and background colors." },
    "svg-optimizer": { name: "SVG Optimizer", description: "Remove comments, metadata, empty groups, and unnecessary attributes to reduce SVG file size." },
    // Utility
    "temperature-converter": { name: "Temperature Converter", description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly." },
    "length-converter": { name: "Length Converter", description: "Convert lengths between metric and imperial units: mm, cm, m, km, in, ft, yd, mi." },
    "weight-converter": { name: "Weight Converter", description: "Convert weights between mg, g, kg, oz, lb, and stone." },
    "speed-converter": { name: "Speed Converter", description: "Convert speeds between kph, mph, m/s, ft/s, and knots." },
    "data-storage-converter": { name: "Data Storage Converter", description: "Convert data sizes between bytes, KB, MB, GB, TB, and PB." },
    "cooking-converter": { name: "Cooking Converter", description: "Convert cooking measurements between tsp, tbsp, cups, ml, liters, and fl oz." },
    "number-base-converter": { name: "Number Base Converter", description: "Convert numbers between decimal, hexadecimal, binary, and octal bases." },
    "shoe-size-converter": { name: "Shoe Size Converter", description: "Convert shoe sizes between US, EU, UK, and JP (Japanese cm) sizing standards." },
    "stopwatch": { name: "Stopwatch / Timestamp", description: "Get the current precise timestamp or calculate elapsed time between two timestamps." },
    "countdown-timer": { name: "Countdown Timer", description: "Enter a duration and get the exact end time with a human-readable countdown." },
    "pomodoro-timer": { name: "Pomodoro Timer", description: "Generate a full Pomodoro schedule with work and break periods starting from now." },
    "world-clock": { name: "World Clock", description: "See the current time in major cities around the world, with optional custom time input." },
    "text-encrypt-decrypt": { name: "Text Encrypt / Decrypt", description: "Encrypt or decrypt text using AES-256-GCM with a passphrase. Runs entirely in your browser." },
    "url-checker": { name: "URL Checker", description: "Analyze a URL for structure, query parameters, and suspicious patterns like phishing indicators." },
  } as Record<string, { name: string; description: string }>,

  // ─── Tool SEO content (keyed by tool ID) ───
  toolSeo: {
    "merge-pdf": {
      longDescription: "Combine multiple PDF files into one document in seconds. No watermarks, no file size limits, no sign-up required. Your files are merged directly in your browser — nothing gets uploaded to any server.",
      steps: ["Drop or select the PDF files you want to combine", "Drag to reorder pages the way you need them", "Click Merge and download your combined PDF"],
      faq: [
        { q: "Is it safe to merge PDFs online?", a: "Yes. JustUse.me processes files entirely in your browser using JavaScript. Your PDFs are never uploaded to any server, so they stay completely private." },
        { q: "Can I merge more than two PDFs at once?", a: "Absolutely. You can combine up to 20 PDF files in a single merge. Just drop them all in and reorder as needed." },
        { q: "Will merging reduce the quality of my PDFs?", a: "No. The merge process combines files without re-encoding, so your text, images, and formatting stay exactly the same." },
        { q: "Do I need to create an account to merge PDFs?", a: "No account or sign-up is needed. Open the tool, drop your files, and download — no registration required." },
        { q: "Will there be a watermark on the merged PDF?", a: "Never. JustUse.me adds no watermarks, branding, or hidden content to your files. What you see is exactly what you get." },
      ],
      whyUs: "Unlike Smallpdf or iLovePDF, JustUse.me merges your PDFs entirely inside your browser — your files are never sent to any server. There are no watermarks added to your output, no account required, and no usage limits for everyday merges.",
    },
    "split-pdf": {
      longDescription: "Extract specific pages from a PDF or split it into separate files. Perfect for pulling out a chapter, a single page, or breaking a large document into smaller parts. Works offline in your browser.",
      steps: ["Upload the PDF you want to split", "Enter the page numbers or ranges to extract (e.g. 1-3, 5, 8-12)", "Click Split and download the result"],
      faq: [
        { q: "Can I extract just one page from a PDF?", a: "Yes. Enter a single page number like \"3\" and you'll get a PDF containing only that page." },
        { q: "Does splitting a PDF reduce quality?", a: "No. Pages are extracted as-is without any re-compression or quality loss." },
      ],
    },
    "compress-pdf": {
      longDescription: "Reduce PDF file size for email attachments, uploads, or faster sharing. Adjust the compression level to balance between file size and visual quality. Great for scanned documents and image-heavy PDFs.",
      steps: ["Upload your PDF file", "Adjust the quality slider — lower means smaller file", "Click Compress and download the lighter PDF"],
      faq: [
        { q: "How much can I reduce the PDF size?", a: "Typically 50-80% for image-heavy PDFs. Text-only PDFs may see less reduction since they're already compact." },
        { q: "Will the text still be selectable after compression?", a: "The compression converts pages to optimized images, so text won't be selectable in the output. Best for documents you need to share or archive, not edit." },
        { q: "Is my PDF uploaded to a server when I compress it?", a: "No. Compression runs entirely in your browser. Your PDF data never leaves your device, which is important for confidential or sensitive documents." },
        { q: "Can I compress a PDF to under 1 MB for email?", a: "In most cases, yes. Use the lower quality settings on the slider to achieve the smallest possible file size. Image-heavy PDFs can often reach under 1 MB." },
      ],
      whyUs: "Tools like Smallpdf and iLovePDF upload your document to their servers to process it. JustUse.me compresses PDFs directly in your browser, so your file never leaves your device. No account, no watermark, and no risk of your private documents being stored on someone else's server.",
    },
    "pdf-to-jpg": {
      longDescription: "Convert each page of a PDF into a high-quality JPG image. Useful for sharing pages on social media, embedding in presentations, or extracting visuals from documents.",
      steps: ["Upload your PDF file", "Each page is converted to a JPG image", "Download all images as a ZIP file"],
      faq: [
        { q: "What resolution are the output images?", a: "Images are rendered at 2x resolution for sharp, high-quality results suitable for printing or presentations." },
        { q: "Can I convert a specific page instead of all pages?", a: "Currently all pages are converted. To get specific pages, use Split PDF first, then convert the result." },
        { q: "Is my PDF safe to convert online?", a: "Yes. JustUse.me converts your PDF entirely in your browser — no file is ever uploaded to a server. Your document stays private on your device throughout the entire process." },
        { q: "Can I convert a multi-page PDF to separate JPG images?", a: "Yes. Every page in your PDF is converted to its own JPG image, and all images are bundled into a ZIP file for easy download." },
      ],
      whyUs: "Services like Zamzar and CloudConvert require you to upload your PDF to their servers, where it may be stored or processed by third parties. JustUse.me converts your PDF to JPG entirely in your browser — no upload, no account, and no risk to the privacy of your documents.",
    },
    "jpg-to-pdf": {
      longDescription: "Turn one or more images into a single PDF document. Ideal for creating photo albums, combining scanned documents, or packaging multiple images for sharing. Supports JPG, PNG, and WebP formats.",
      steps: ["Drop your images (JPG, PNG, or WebP)", "Reorder them by dragging if needed", "Click Convert and download your PDF"],
      faq: [
        { q: "Can I combine multiple images into one PDF?", a: "Yes. Drop up to 20 images and they'll be arranged as pages in a single PDF document." },
        { q: "Will my images lose quality?", a: "No. Images are embedded at their original resolution without additional compression." },
      ],
    },
    "rotate-pdf": {
      longDescription: "Rotate all pages of a PDF by 90, 180, or 270 degrees. Fix sideways scans, upside-down documents, or landscape pages that need to be portrait.",
      steps: ["Upload the PDF you need to rotate", "Choose the rotation angle (90, 180, or 270 degrees)", "Click Rotate and download the corrected PDF"],
      faq: [
        { q: "Can I rotate individual pages?", a: "Currently all pages are rotated by the same angle. For selective rotation, split the PDF first, rotate the pages you need, then merge back." },
        { q: "Does rotation affect the PDF quality?", a: "No. The rotation is lossless — it changes the page orientation without re-encoding any content." },
      ],
    },
    "pdf-to-text": {
      longDescription: "Extract all text content from a PDF file. Works with text-based PDFs (not scanned images). Great for copying content, searching through documents, or converting to plain text format.",
      steps: ["Upload your PDF file", "Text is extracted from all pages automatically", "Preview and download the text file"],
      faq: [
        { q: "Does this work with scanned PDFs?", a: "This tool extracts embedded text only. For scanned documents or images, use our Image to Text (OCR) tool instead." },
        { q: "Is the formatting preserved?", a: "Basic text content and line breaks are preserved, but complex formatting (tables, columns) may not translate perfectly to plain text." },
      ],
    },
    "watermark-pdf": {
      longDescription: "Add a text watermark across every page of your PDF. Protect confidential documents, mark drafts, or brand your files with custom text.",
      steps: ["Upload your PDF", "Type your watermark text (e.g. CONFIDENTIAL, DRAFT)", "Click Add Watermark and download the result"],
      faq: [
        { q: "Can I customize the watermark appearance?", a: "You can set any text you want. The watermark is displayed as a semi-transparent diagonal overlay on each page." },
        { q: "Can the watermark be removed?", a: "The watermark is embedded into the PDF. It cannot be easily removed, making it suitable for document protection." },
      ],
    },
    "page-numbers-pdf": {
      longDescription: "Add page numbers to every page of your PDF document. Choose from 6 positions (top/bottom, left/center/right) and set a custom starting number.",
      steps: ["Upload your PDF", "Pick where the page numbers should appear", "Set the starting number, then click Add Numbers"],
      faq: [
        { q: "Can I start numbering from a page other than 1?", a: "Yes. Set any starting number — useful if your document is part of a larger work." },
        { q: "What font and size are the page numbers?", a: "Page numbers use Helvetica at 10pt in a subtle gray color that doesn't distract from the content." },
      ],
    },
    "compress-image": {
      longDescription: "Reduce image file size without visible quality loss. Perfect for speeding up websites, fitting email attachment limits, or saving storage space. Supports JPG, PNG, and WebP.",
      steps: ["Upload your image (JPG, PNG, or WebP)", "Adjust the quality slider to your preference", "Click Compress and download the smaller file"],
      faq: [
        { q: "How much smaller will my image be?", a: "Typically 40-70% smaller at high quality settings. At medium quality, you can achieve 70-90% reduction with minimal visible difference." },
        { q: "Does compression remove EXIF data?", a: "Yes. EXIF metadata (camera info, GPS location) is stripped during compression, which also helps with privacy." },
        { q: "Do I need to create an account to compress images?", a: "No. JustUse.me requires no account, no email, and no sign-up. Upload your image and download the result — that's it." },
        { q: "Can I compress images for a website without losing quality?", a: "Yes. Use the high quality setting (80-90%) for web images. You'll see significant file size reduction with no perceptible visual difference to visitors." },
      ],
      whyUs: "Unlike TinyPNG or Squoosh, JustUse.me compresses your images entirely in your browser without requiring any account or login. There are no daily limits to worry about and no data sent to external servers — your photos stay private from start to finish.",
    },
    "resize-image": {
      longDescription: "Change image dimensions to any size. Use preset sizes (50%, 75%, 1080p, 720p) or enter custom width and height. Aspect ratio lock keeps your images from stretching.",
      steps: ["Upload your image", "Pick a preset or enter custom dimensions", "Click Resize and download the resized image"],
      faq: [
        { q: "Can I resize without stretching the image?", a: "Yes. The aspect ratio is locked by default. Unlock it if you want to stretch to exact dimensions." },
        { q: "Does resizing reduce quality?", a: "Making images smaller is lossless. Enlarging may reduce sharpness since pixels need to be interpolated." },
        { q: "Can I resize an image to specific pixel dimensions for social media?", a: "Yes. Enter exact pixel values for width and height. Common sizes: 1080x1080 (Instagram square), 1200x630 (Open Graph), 1280x720 (YouTube thumbnail)." },
        { q: "Do I need Photoshop or Canva to resize an image?", a: "No. JustUse.me resizes images directly in your browser with no software to install, no account to create, and no subscription fee." },
      ],
      whyUs: "Canva and Photoshop are powerful but overkill for a simple resize — they require accounts, subscriptions, or installs. JustUse.me resizes images instantly in your browser with no sign-up, no watermark, and no complexity. Just upload, set your dimensions, and download.",
    },
    "crop-image": {
      longDescription: "Crop images visually with a drag-to-select interface. Use preset aspect ratios (1:1, 16:9, 4:3, 3:2) for social media, thumbnails, or presentations.",
      steps: ["Upload your image", "Drag the crop handles or pick an aspect ratio preset", "Click Crop and download the trimmed image"],
      faq: [
        { q: "Can I crop to a specific aspect ratio?", a: "Yes. Choose from Free, 1:1 (square), 16:9 (widescreen), 4:3, or 3:2. The crop area adjusts automatically." },
        { q: "Is the crop lossless?", a: "The cropped region is saved at high quality (92% for JPG). PNG crops are completely lossless." },
      ],
    },
    "png-to-jpg": {
      longDescription: "Convert PNG images to JPG format for smaller file sizes. PNG files with transparency get a white background. Ideal for web uploads, email attachments, or when JPG is required.",
      steps: ["Upload your PNG image", "The image is converted instantly in your browser", "Download the JPG result"],
      faq: [
        { q: "What happens to transparency?", a: "Transparent areas are filled with a white background, since JPG doesn't support transparency." },
        { q: "How much smaller will the JPG be?", a: "Typically 50-80% smaller than the original PNG, especially for photos." },
      ],
    },
    "jpg-to-png": {
      longDescription: "Convert JPG images to PNG format for lossless quality or when you need transparency support. PNG is the preferred format for logos, icons, screenshots, and graphics with sharp edges.",
      steps: ["Upload your JPG image", "Conversion happens instantly in your browser", "Download the PNG file"],
      faq: [
        { q: "Will the image quality improve?", a: "Converting to PNG won't recover quality lost during JPG compression, but it prevents any further quality degradation from re-saving." },
        { q: "Will the file be larger?", a: "Usually yes. PNG uses lossless compression, which produces larger files than JPG for photos." },
      ],
    },
    "heic-to-jpg": {
      longDescription: "Convert iPhone HEIC photos to universally compatible JPG format. HEIC files from iPhones and iPads can't be opened everywhere — convert them to JPG so you can share, upload, or edit on any device.",
      steps: ["Upload your HEIC file from iPhone/iPad", "The file is converted instantly in your browser", "Download the JPG version"],
      faq: [
        { q: "What is HEIC format?", a: "HEIC (High Efficiency Image Container) is the default photo format on iPhones since iOS 11. It offers better compression than JPG but isn't universally supported." },
        { q: "Will I lose quality converting HEIC to JPG?", a: "There's minimal quality loss. The conversion uses high-quality encoding to preserve as much detail as possible." },
        { q: "Are my iPhone photos uploaded to the internet during conversion?", a: "No. JustUse.me converts HEIC files entirely inside your browser. Your personal photos never leave your device, which is especially important for private or sensitive images." },
        { q: "Can I convert HEIC to JPG on Windows or Android?", a: "Yes. JustUse.me works in any modern browser on any device, including Windows PCs and Android phones, with no software to install." },
      ],
      whyUs: "Apps like iMazing charge for HEIC conversion, and many online converters upload your personal iPhone photos to their servers. JustUse.me converts HEIC files entirely in your browser — your photos stay on your device, no account is needed, and it's completely free.",
    },
    "svg-to-png": {
      longDescription: "Convert SVG vector graphics to PNG raster images. Needed when a website, app, or document doesn't support SVG, or when you need a fixed-resolution image from a vector source.",
      steps: ["Upload your SVG file", "The vector is rendered to a PNG image", "Download the PNG result"],
      faq: [
        { q: "What resolution is the output?", a: "The SVG is rendered at its defined size. The output matches the viewBox dimensions of the SVG." },
        { q: "Is transparency preserved?", a: "Yes. Transparent areas in the SVG remain transparent in the output PNG." },
      ],
    },
    "ocr-image": {
      longDescription: "Extract text from images using optical character recognition (OCR). Supports English and Chinese text. Works on screenshots, photos of documents, receipts, signs, and any image containing text.",
      steps: ["Upload an image containing text", "OCR processes the image (may take a few seconds)", "Preview and download the extracted text"],
      faq: [
        { q: "What languages are supported?", a: "English and Chinese (Simplified) are supported. The OCR engine automatically detects both languages in the same image." },
        { q: "Is the image uploaded to a server?", a: "No. OCR runs entirely in your browser using Tesseract.js. Your images stay on your device." },
      ],
    },
    "json-formatter": {
      longDescription: "Format and beautify messy JSON data with proper indentation. Paste minified or ugly JSON and get clean, readable output. Validates your JSON and highlights errors if the syntax is invalid.",
      steps: ["Paste or type your JSON data", "The JSON is formatted and validated instantly", "Copy or download the formatted result"],
      faq: [
        { q: "Does it validate JSON syntax?", a: "Yes. If your JSON has syntax errors, the tool will show you what's wrong so you can fix it." },
        { q: "Can I format large JSON files?", a: "Yes. Text input up to 500 KB is supported." },
      ],
    },
    "word-counter": {
      longDescription: "Count words, characters, sentences, and paragraphs in any text. Essential for writers, students, and content creators who need to hit word count targets for essays, articles, or social media posts.",
      steps: ["Paste or type your text", "Word, character, and sentence counts update in real time", "Copy the counts or keep editing"],
      faq: [
        { q: "Does it count characters with and without spaces?", a: "Yes. Both character counts (with and without spaces) are displayed." },
        { q: "What counts as a word?", a: "Any sequence of non-whitespace characters separated by spaces or line breaks counts as one word." },
      ],
    },
    "base64-codec": {
      longDescription: "Encode text to Base64 or decode Base64 strings back to plain text. Commonly used for data URIs, API authentication tokens, email encoding, and embedding data in URLs or JSON.",
      steps: ["Choose Encode or Decode mode", "Paste your text or Base64 string", "Get the result instantly"],
      faq: [
        { q: "What is Base64 encoding?", a: "Base64 converts binary data or text into ASCII characters. It's used to safely transmit data through systems that only support text, like email or URLs." },
        { q: "Is Base64 encryption?", a: "No. Base64 is encoding, not encryption. Anyone can decode a Base64 string. It's for data formatting, not security." },
      ],
    },
    "markdown-to-html": {
      longDescription: "Convert Markdown text to clean HTML. Preview the rendered output and download the HTML file. Perfect for blog posts, documentation, README files, and any Markdown-to-web workflow.",
      steps: ["Paste your Markdown text", "See the rendered HTML preview in real time", "Download the HTML file"],
      faq: [
        { q: "Which Markdown features are supported?", a: "Standard Markdown including headings, bold, italic, links, images, code blocks, lists, blockquotes, and tables." },
        { q: "Is the HTML output clean?", a: "Yes. The output is semantic HTML without unnecessary wrappers or inline styles." },
      ],
    },
    "diff-checker": {
      longDescription: "Compare two pieces of text side by side and see the differences highlighted. Find changes between code versions, document edits, or configuration files.",
      steps: ["Paste the original text on the left", "Paste the modified text on the right", "Differences are highlighted automatically"],
      faq: [
        { q: "Can I compare code files?", a: "Yes. The diff checker works with any text content including source code, configs, and documentation." },
        { q: "How are changes highlighted?", a: "Added lines are shown in green, removed lines in red, and unchanged lines in the default color." },
      ],
    },
    "js-minifier": {
      longDescription: "Minify JavaScript code by removing whitespace, comments, and unnecessary characters. Reduce JS file size for faster page loads.",
      steps: ["Paste your JavaScript code", "The code is minified instantly", "Copy or download the minified output"],
      faq: [
        { q: "Does minification break my code?", a: "No. Minification only removes whitespace and comments. The code logic stays exactly the same." },
        { q: "How much smaller will my JS be?", a: "Typically 20-40% smaller. Files with lots of comments and formatting see the biggest reduction." },
      ],
    },
    "css-minifier": {
      longDescription: "Minify CSS stylesheets by removing whitespace, comments, and redundant characters. Smaller CSS files mean faster page loads and better Core Web Vitals scores.",
      steps: ["Paste your CSS code", "The stylesheet is minified instantly", "Copy or download the minified CSS"],
      faq: [
        { q: "Does CSS minification affect rendering?", a: "No. The minified CSS renders identically to the original. Only whitespace and comments are removed." },
        { q: "Should I minify CSS for production?", a: "Yes. Minification is a standard production optimization. Every major website serves minified CSS." },
      ],
    },
    "csv-to-json": {
      longDescription: "Convert CSV spreadsheet data to JSON format. Useful for importing data into web apps, APIs, or databases. The first row is used as property names for each JSON object.",
      steps: ["Upload your CSV file", "Data is parsed and converted to JSON", "Preview and download the JSON output"],
      faq: [
        { q: "How are column headers handled?", a: "The first row of your CSV becomes the property names in each JSON object." },
        { q: "What delimiter is used?", a: "Standard comma-separated values. The parser also handles quoted fields containing commas." },
      ],
    },
    "json-to-csv": {
      longDescription: "Convert JSON arrays to CSV spreadsheet format. Export data from APIs or databases into a format that Excel, Google Sheets, and other spreadsheet tools can open directly.",
      steps: ["Upload your JSON file (must be an array of objects)", "The data is converted to CSV format", "Download the CSV file"],
      faq: [
        { q: "What JSON structure is required?", a: "The input should be an array of objects with consistent keys." },
        { q: "Can I open the result in Excel?", a: "Yes. CSV files open directly in Excel, Google Sheets, Numbers, and other spreadsheet applications." },
      ],
    },
    "yaml-json": {
      longDescription: "Convert between YAML and JSON formats. Switch config files, API responses, or data between the two most popular data serialization formats.",
      steps: ["Paste your YAML or JSON data", "Choose the conversion direction", "Copy or download the converted output"],
      faq: [
        { q: "When should I use YAML vs JSON?", a: "YAML is more human-readable and great for config files. JSON is better for APIs and data exchange since it's more strict and widely supported." },
        { q: "Are comments preserved?", a: "YAML comments are lost during conversion since JSON doesn't support comments." },
      ],
    },
    "xml-formatter": {
      longDescription: "Format and beautify XML data with proper indentation. Paste messy or minified XML and get clean, readable output. Great for API responses, config files, and SOAP messages.",
      steps: ["Paste your XML data", "The XML is formatted with proper indentation", "Copy or download the formatted result"],
      faq: [
        { q: "Does it validate the XML?", a: "Basic structure validation is performed. Malformed XML will produce an error message." },
        { q: "Is CDATA preserved?", a: "Yes. CDATA sections, comments, and processing instructions are preserved in the output." },
      ],
    },
    "qr-code": {
      longDescription: "Generate QR codes from any text or URL. Create scannable codes for links, Wi-Fi passwords, contact info, or any text content. Download as a high-quality PNG image.",
      steps: ["Enter the text or URL you want to encode", "A QR code is generated instantly", "Download the QR code as a PNG image"],
      faq: [
        { q: "How much data can a QR code hold?", a: "QR codes can hold up to about 3,000 characters of text. For most URLs and short messages, this is more than enough." },
        { q: "Can I customize the QR code appearance?", a: "The current version generates standard black-and-white QR codes optimized for maximum scan reliability." },
      ],
    },
    "color-converter": {
      longDescription: "Convert colors between HEX, RGB, and HSL formats. Essential for designers and developers who need to switch color values between different formats for CSS, design tools, or brand guidelines.",
      steps: ["Enter a color value in HEX, RGB, or HSL", "See the color preview and all format conversions", "Copy the value you need"],
      faq: [
        { q: "What color formats are supported?", a: "HEX (e.g. #FF5733), RGB (e.g. rgb(255,87,51)), and HSL (e.g. hsl(11,100%,60%))." },
        { q: "Can I pick a color visually?", a: "Enter any supported format and the tool shows a live preview swatch of the color." },
      ],
    },
    "sql-formatter": {
      longDescription: "Format messy SQL queries with proper indentation and keyword capitalization. Supports standard SQL, PostgreSQL, MySQL, and more. Makes complex queries readable and easier to debug.",
      steps: ["Paste your SQL query", "The query is formatted instantly with proper indentation", "Copy or download the formatted SQL"],
      faq: [
        { q: "Which SQL dialects are supported?", a: "Standard SQL, PostgreSQL, MySQL, MariaDB, SQLite, BigQuery, and more." },
        { q: "Does it change the query logic?", a: "No. Formatting only affects whitespace and keyword casing. The query logic stays identical." },
      ],
    },
    "html-beautifier": {
      longDescription: "Format and indent messy or minified HTML code. Makes HTML readable with proper indentation and line breaks. Great for debugging templates, inspecting page source, or cleaning up generated HTML.",
      steps: ["Paste your HTML code", "The HTML is beautified with proper indentation", "Copy or download the formatted HTML"],
      faq: [
        { q: "Does it fix broken HTML?", a: "No. The beautifier formats valid HTML. It won't repair missing tags or fix structural issues." },
        { q: "Are inline styles and scripts formatted too?", a: "Yes. Embedded CSS and JavaScript within the HTML are also indented properly." },
      ],
    },
    "jwt-decoder": {
      longDescription: "Decode JSON Web Tokens (JWT) to inspect their header and payload. See claims like issuer, expiration, and custom data without needing a secret key. Essential for debugging authentication flows.",
      steps: ["Paste your JWT string", "The header and payload are decoded instantly", "Review the claims and expiration data"],
      faq: [
        { q: "Is it safe to paste my JWT here?", a: "Yes. Decoding happens entirely in your browser. Your token is never sent to any server." },
        { q: "Can this verify the JWT signature?", a: "This tool decodes and displays the token contents. Signature verification requires the secret key, which is not needed for inspection." },
      ],
    },
    "cron-explainer": {
      longDescription: "Translate cron expressions into human-readable descriptions. Understand complex cron schedules instantly. Supports standard 5-field cron syntax used in Unix, Linux, and most job schedulers.",
      steps: ["Enter a cron expression (e.g. */5 * * * *)", "See the plain English explanation instantly", "Copy the description for documentation"],
      faq: [
        { q: "What cron format is supported?", a: "Standard 5-field cron expressions: minute, hour, day of month, month, day of week." },
        { q: "Can I use special characters?", a: "Yes. Supports *, /, -, and comma notation (e.g. 1,15 or */5)." },
      ],
    },
    "slug-generator": {
      longDescription: "Convert any text into a URL-friendly slug. Removes special characters, replaces spaces with hyphens, and lowercases everything. Perfect for blog post URLs, file names, and SEO-friendly paths.",
      steps: ["Enter or paste your text", "A clean URL slug is generated instantly", "Copy the slug for your project"],
      faq: [
        { q: "How are special characters handled?", a: "Accented characters are transliterated (e.g. e becomes e), and other special characters are removed." },
        { q: "Can I use this for filenames?", a: "Yes. Slugs make great filenames since they only contain lowercase letters, numbers, and hyphens." },
      ],
    },
    "handlebars-preview": {
      longDescription: "Render Handlebars templates with live JSON data. Write your template, provide sample data, and see the rendered output instantly. Great for testing email templates, dynamic content, and template logic.",
      steps: ["Write your Handlebars template at the top", "Add a ---DATA--- separator, then paste your JSON data below", "See the rendered output instantly"],
      faq: [
        { q: "What Handlebars features are supported?", a: "All standard Handlebars features: variables, conditionals (if/else), loops (each), partials, and helpers." },
        { q: "How do I provide the data?", a: "Paste your template, add ---DATA--- on a new line, then paste your JSON data below." },
      ],
    },
    "html-to-markdown": {
      longDescription: "Convert HTML content to clean Markdown format. Perfect for migrating blog posts, converting documentation, or extracting content from web pages into Markdown for static site generators.",
      steps: ["Upload an HTML file", "The HTML is converted to Markdown instantly", "Preview and download the Markdown output"],
      faq: [
        { q: "Which HTML elements are supported?", a: "Headings, paragraphs, links, images, lists, tables, code blocks, bold, italic, and more." },
        { q: "Is the output clean?", a: "Yes. The converter produces clean Markdown without unnecessary escaping or extra whitespace." },
      ],
    },
    "json5-to-json": {
      longDescription: "Convert JSON5 to strict JSON format. JSON5 allows comments, trailing commas, unquoted keys, and single-quoted strings. This tool strips all JSON5 extensions to produce valid JSON.",
      steps: ["Upload a JSON5 file", "The file is parsed and converted to strict JSON", "Download the valid JSON output"],
      faq: [
        { q: "What is JSON5?", a: "JSON5 is a superset of JSON that allows comments, trailing commas, unquoted keys, and other relaxed syntax. It's commonly used in configuration files." },
        { q: "Are comments preserved?", a: "No. Comments are stripped since standard JSON doesn't support them." },
      ],
    },
    "toml-to-json": {
      longDescription: "Convert TOML configuration files to JSON format. TOML is widely used in Rust (Cargo.toml), Python (pyproject.toml), and other tools. Convert to JSON for use in JavaScript projects or APIs.",
      steps: ["Upload your TOML file", "The file is parsed and converted to JSON", "Download the JSON output"],
      faq: [
        { q: "What is TOML?", a: "TOML (Tom's Obvious Minimal Language) is a configuration file format designed to be easy to read. Used by Cargo, Hugo, and many other tools." },
        { q: "Are nested tables supported?", a: "Yes. All TOML features including nested tables, arrays of tables, and inline tables are supported." },
      ],
    },
    "json-to-markdown-table": {
      longDescription: "Convert JSON arrays into readable Markdown tables. Perfect for creating documentation, README files, or reports from structured data. Each object becomes a row, and keys become column headers.",
      steps: ["Upload a JSON file containing an array of objects", "The data is converted to a Markdown table", "Copy or download the Markdown table"],
      faq: [
        { q: "What JSON structure is required?", a: "An array of objects with consistent keys. Each object becomes a table row." },
        { q: "How are nested values handled?", a: "Nested objects and arrays are serialized as JSON strings within table cells." },
      ],
    },
    "typescript-to-js": {
      longDescription: "Strip TypeScript type annotations to produce plain JavaScript. Removes interfaces, type aliases, generics, and other TypeScript-specific syntax while preserving the runtime logic.",
      steps: ["Upload your TypeScript file", "Types are stripped and JavaScript is generated", "Download the plain JavaScript output"],
      faq: [
        { q: "Does this compile TypeScript features?", a: "It strips types only. Modern JS features like optional chaining and nullish coalescing are preserved as-is." },
        { q: "Are enums converted?", a: "TypeScript enums are transpiled to their JavaScript equivalent." },
      ],
    },
    "uuid-generator": {
      longDescription: "Generate random UUIDs (Universally Unique Identifiers) version 4. UUIDs are used as database primary keys, API request IDs, session tokens, and anywhere you need a globally unique identifier.",
      steps: ["Enter how many UUIDs to generate (1-100)", "UUIDs are generated instantly", "Copy the UUIDs for your project"],
      faq: [
        { q: "Are these UUIDs truly unique?", a: "UUID v4 uses cryptographically random values. The probability of collision is astronomically low — about 1 in 2^122." },
        { q: "What format is used?", a: "Standard UUID v4 format: 8-4-4-4-12 hexadecimal characters (e.g. 550e8400-e29b-41d4-a716-446655440000)." },
      ],
    },
    "lorem-ipsum": {
      longDescription: "Generate Lorem Ipsum placeholder text for designs, mockups, and prototypes. Choose the number of paragraphs you need. The classic dummy text used by designers and typesetters since the 1500s.",
      steps: ["Enter the number of paragraphs to generate", "Lorem Ipsum text is generated instantly", "Copy the text for your design"],
      faq: [
        { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is placeholder text derived from a work by Cicero (45 BC). It's been the printing industry's standard dummy text for centuries." },
        { q: "Can I customize the output?", a: "You can specify the number of paragraphs to generate." },
      ],
    },
    "hash-generator": {
      longDescription: "Generate cryptographic hashes from any file. Supports MD5, SHA-1, SHA-256, and SHA-512. Use hashes to verify file integrity, detect duplicates, or create checksums for distribution.",
      steps: ["Upload any file", "All hash values are computed instantly", "Copy the hash you need"],
      faq: [
        { q: "Which hash algorithms are available?", a: "MD5, SHA-1, SHA-256, and SHA-512. All are computed simultaneously." },
        { q: "Is hashing done locally?", a: "Yes. All hashing runs in your browser using WebAssembly. Your files are never uploaded." },
      ],
    },
    "barcode-generator": {
      longDescription: "Generate barcodes from text in multiple formats. Supports CODE128, EAN-13, UPC-A, CODE39, ITF-14, and more. Download as a high-quality PNG image for printing or digital use.",
      steps: ["Enter the text or number to encode", "Choose the barcode format", "Download the barcode as a PNG image"],
      faq: [
        { q: "Which barcode formats are supported?", a: "CODE128, EAN-13, EAN-8, UPC-A, CODE39, ITF-14, MSI, Pharmacode, and Codabar." },
        { q: "Can I scan the generated barcodes?", a: "Yes. All generated barcodes are standards-compliant and scannable by any barcode reader." },
      ],
    },
    "exif-viewer": {
      longDescription: "View EXIF metadata embedded in photos. See camera model, lens, ISO, shutter speed, aperture, GPS coordinates, date taken, and more. Supports JPG and TIFF images.",
      steps: ["Upload a photo (JPG or TIFF)", "All EXIF metadata is displayed instantly", "Review camera settings, GPS data, and more"],
      faq: [
        { q: "What information can I see?", a: "Camera make/model, lens, ISO, shutter speed, aperture, focal length, GPS coordinates, date/time, and more." },
        { q: "Is my photo uploaded?", a: "No. EXIF data is read entirely in your browser. Your photo never leaves your device." },
      ],
    },
  } as Record<string, { longDescription: string; steps: string[]; faq: { q: string; a: string }[]; whyUs?: string }>,

  // ─── News & Guides ───
  news: {
    title: "News & Guides",
    description: "Tips, tutorials, and insights about file tools and productivity.",
    readMore: "Read more",
    publishedOn: "Published on",
    relatedTools: "Related Tools",
    relatedArticles: "Related Articles",
    allCategories: "All",
    tutorial: "Tutorial",
    comparison: "Comparison",
    "use-case": "Use Case",
    trend: "Trend",
    noArticles: "No articles yet. Check back soon!",
  },

  // ─── About ───
  about: {
    title: "About JustUse.me",
    description: "JustUse.me is built and maintained by Paymomentum LLC. We believe everyday file tools should be free, private, and fast.",
    mission: "Our Mission",
    missionDesc: "We built JustUse.me because we were frustrated with online tools that upload your files to unknown servers, plaster watermarks on your output, and force you to create accounts for simple tasks. Every tool on JustUse.me processes files entirely in your browser — your data never leaves your device.",
    howItWorks: "How It Works",
    howItWorksDesc: "JustUse.me uses modern browser technologies like WebAssembly, Canvas API, and Web Workers to process files locally. When you merge a PDF or compress an image, the computation happens on your machine. No server round-trips, no upload delays, no privacy risks.",
    team: "Built By",
    teamDesc: "JustUse.me is a product of Paymomentum LLC. We are a small team focused on building simple, privacy-respecting tools for everyday use.",
    contact: "Get in Touch",
    contactDesc: "Have a question, suggestion, or found a bug? We would love to hear from you.",
    contactLink: "Contact Us",
  },
};

export default en;
