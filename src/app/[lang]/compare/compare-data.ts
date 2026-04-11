export interface CompetitorData {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNum: number;
  multiplier: string;
  toolCount: string;
  toolScope: string;
  watermark: boolean;
  serverUpload: boolean;
  signupRequired: boolean;
  freeLimit: string;
  strengths: string[];
  sections: { title: string; content: string }[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
}

export const justuseme = {
  name: "JustUse.me",
  price: "$2.59",
  priceNum: 2.59,
  toolCount: "129",
  toolScope: "PDF, Image, Text, Convert, Generator, Calculator, Developer, Utility",
  watermark: false,
  serverUpload: false,
  signupRequired: false,
  freeLimit: "Daily usage limits per tool",
};

export const competitors: Record<string, CompetitorData> = {
  smallpdf: {
    slug: "smallpdf",
    name: "Smallpdf",
    tagline: "Why pay $12/mo for 30 PDF tools when $2.59 gets you 122?",
    price: "$12/mo",
    priceNum: 12,
    multiplier: "4.6x",
    toolCount: "30+",
    toolScope: "PDF only",
    watermark: true,
    serverUpload: true,
    signupRequired: true,
    freeLimit: "Limited downloads, 2 tasks/day",
    strengths: [
      "Desktop app available",
      "E-signature integration (Sign.com)",
      "OCR and advanced PDF editing",
      "Team collaboration features",
    ],
    sections: [
      {
        title: "The Price Problem",
        content:
          "Smallpdf Pro costs $12 per month for access to their 30+ PDF tools. That's $144 per year for a single category of tools. JustUse.me offers 129 tools across eight categories — PDF, image, text, converters, generators, calculators, developer tools, and utilities — for $2.59 per month, or $31.08 per year. That's a 4.6x price difference. For most users who need to merge a PDF once a week or compress an image for email, the math doesn't add up in Smallpdf's favor.",
      },
      {
        title: "The Privacy Trade-Off",
        content:
          "Every file you process through Smallpdf gets uploaded to their servers. They state that files are deleted after processing, but the upload still happens — your data leaves your device and travels to a third-party server. JustUse.me processes everything directly in your browser using WebAssembly. Your files never leave your device. For anyone handling contracts, medical records, financial documents, or anything confidential, this is a significant difference.",
      },
      {
        title: "What Smallpdf Does Better",
        content:
          "Smallpdf has genuine advantages in specific areas. Their OCR engine handles scanned documents well. The Sign.com integration provides a complete e-signature workflow. Their desktop app works offline. If you need advanced PDF editing — adding form fields, redacting sensitive content, or editing embedded text — Smallpdf's editor is more capable. These are features that justify the premium for professionals who use them daily.",
      },
      {
        title: "When JustUse.me Is Enough",
        content:
          "Most people use 3–4 PDF tools: merge, split, compress, and convert. They don't need OCR or e-signatures. They definitely don't need to pay $12 per month for them. If your workflow is occasional document processing — combining assignment pages, shrinking a file for email, converting a PDF to images — JustUse.me covers that and gives you 100+ additional tools across other categories. No account needed, no watermarks on the free tier, and your files stay on your device.",
      },
      {
        title: "Making Your Decision",
        content:
          "Choose Smallpdf if you need advanced PDF editing, OCR, or e-signatures as part of a daily professional workflow. Choose JustUse.me if you need reliable, private, and affordable access to common document and file tools without the overhead of a $12 monthly subscription.",
      },
    ],
    faq: [
      {
        q: "Is Smallpdf free?",
        a: "Smallpdf has a free tier with limited access — 2 tasks per day and limited document downloads. The free version adds watermarks to some outputs. Full access requires the Pro plan at $12/month.",
      },
      {
        q: "Is Smallpdf safe to use?",
        a: "Smallpdf uses encryption for file transfers, but your files are uploaded to their servers for processing. They state files are deleted after one hour. If you need files to never leave your device, JustUse.me processes everything in your browser locally.",
      },
      {
        q: "What is the cheapest alternative to Smallpdf?",
        a: "JustUse.me is the most affordable alternative at $2.59/month for 129 tools — 4.6x cheaper than Smallpdf's $12/month. The free tier has no watermarks and covers most common tasks.",
      },
      {
        q: "Does Smallpdf add watermarks?",
        a: "Yes, Smallpdf's free tier adds watermarks to certain outputs like PDF editing. JustUse.me never adds watermarks on any tier, including the free version.",
      },
      {
        q: "Smallpdf vs JustUse.me — which is better?",
        a: "It depends on your needs. Smallpdf is better for advanced PDF editing, OCR, and e-signatures. JustUse.me is better for value ($2.59 vs $12/month), privacy (no file uploads), and breadth (129 tools across 8 categories vs 30+ PDF-only tools).",
      },
    ],
    relatedTools: [
      "merge-pdf",
      "split-pdf",
      "compress-pdf",
      "pdf-to-jpg",
      "jpg-to-pdf",
      "rotate-pdf",
    ],
  },

  ilovepdf: {
    slug: "ilovepdf",
    name: "iLovePDF",
    tagline: "All your PDF tools in one place — but do you need to pay $7/mo for them?",
    price: "$7/mo",
    priceNum: 7,
    multiplier: "5x",
    toolCount: "~25",
    toolScope: "PDF only",
    watermark: true,
    serverUpload: true,
    signupRequired: true,
    freeLimit: "Limited batch size, file size caps per tool",
    strengths: [
      "Desktop and mobile apps",
      "Large file support (up to 4GB on Premium)",
      "Batch processing at scale",
      "Workflow automation",
    ],
    sections: [
      {
        title: "Price and Value",
        content:
          "iLovePDF Premium costs approximately $7 per month. That gets you unlimited access to around 25 PDF tools with large file support up to 4GB. JustUse.me costs $2.59 per month for 129 tools across eight categories. If all you need is PDF processing, both services cover the basics. But for $5.71 less per month, JustUse.me gives you five times as many tools spanning image compression, text formatting, code tools, unit converters, and more.",
      },
      {
        title: "Privacy and Security",
        content:
          "iLovePDF processes files on their servers, with regional processing available in 7 locations on Premium. Files are uploaded, processed, and then deleted. JustUse.me never uploads your files — everything runs in your browser using WebAssembly and Canvas APIs. For sensitive documents like contracts, tax forms, or personal records, local processing eliminates the risk of data exposure during transfer.",
      },
      {
        title: "What iLovePDF Does Better",
        content:
          "iLovePDF excels at batch processing large volumes of PDFs. Their 4GB file size limit on Premium handles massive documents that browser-based tools can't match. They have desktop and mobile apps for offline use. Their workflow feature lets you chain multiple PDF operations. For high-volume professional PDF processing, iLovePDF's infrastructure is purpose-built.",
      },
      {
        title: "The Watermark Problem",
        content:
          "iLovePDF's free tier adds watermarks to outputs from certain tools. This means you can't use the free version for professional documents without paying. JustUse.me never adds watermarks — not on the free tier, not ever. What you process is what you get.",
      },
      {
        title: "Which One Should You Pick?",
        content:
          "Choose iLovePDF if you process large volumes of PDFs daily, need files larger than 30MB, or require desktop/mobile apps. Choose JustUse.me if you want affordable, private, watermark-free access to PDF tools plus 100 additional tools in other categories.",
      },
    ],
    faq: [
      {
        q: "Is iLovePDF free?",
        a: "iLovePDF has a free tier with limited batch sizes and file size caps that vary by tool (15–400MB). Some tools add watermarks on the free plan. Full access requires Premium at approximately $7/month.",
      },
      {
        q: "Is iLovePDF safe for confidential documents?",
        a: "iLovePDF encrypts file transfers and deletes files after processing. However, your documents are uploaded to their servers. For documents that should never leave your device, JustUse.me processes everything locally in your browser.",
      },
      {
        q: "What is a good free alternative to iLovePDF?",
        a: "JustUse.me offers free PDF tools with no watermarks and no file uploads. The free tier covers common tasks like merging, splitting, and compressing PDFs. The Pro plan at $2.59/month is 2.7x cheaper than iLovePDF Premium.",
      },
      {
        q: "Does iLovePDF add watermarks?",
        a: "Yes, iLovePDF's free tier adds watermarks to outputs from certain tools. You need Premium to remove them. JustUse.me never adds watermarks on any plan.",
      },
      {
        q: "iLovePDF vs JustUse.me — which is better?",
        a: "iLovePDF is better for high-volume batch processing and very large files (up to 4GB). JustUse.me is better for privacy (no uploads), price ($2.59 vs $7/month), variety (129 tools vs ~25), and watermark-free output on all plans.",
      },
    ],
    relatedTools: [
      "merge-pdf",
      "split-pdf",
      "compress-pdf",
      "pdf-to-jpg",
      "rotate-pdf",
      "watermark-pdf",
    ],
  },

  "adobe-acrobat": {
    slug: "adobe-acrobat",
    name: "Adobe Acrobat",
    tagline: "The industry standard — but is $19.99/mo worth it for basic PDF tasks?",
    price: "$19.99/mo",
    priceNum: 19.99,
    multiplier: "7.7x",
    toolCount: "20+",
    toolScope: "PDF only (advanced editing)",
    watermark: true,
    serverUpload: true,
    signupRequired: true,
    freeLimit: "Limited free online tools, watermarks on some",
    strengths: [
      "Industry-standard PDF editor",
      "Advanced form creation and filling",
      "Redaction and security features",
      "Deep integration with Adobe Creative Cloud",
      "Legal and compliance workflows",
    ],
    sections: [
      {
        title: "The $19.99 Question",
        content:
          "Adobe Acrobat Pro costs $19.99 per month — that's $239.88 per year. It's the most powerful PDF editor available, with features built for legal, enterprise, and creative professionals. But most people don't need a professional PDF editor. They need to merge two files, compress a document for email, or convert a PDF to images. Paying $20/month for that is like buying a commercial kitchen to make toast.",
      },
      {
        title: "What Adobe Offers That We Don't",
        content:
          "Adobe Acrobat is genuinely superior for advanced PDF work. It can edit embedded text and images in any PDF. It creates fillable forms with calculation fields. It has redaction tools for legal compliance. It integrates with Adobe Creative Cloud. If you're a lawyer preparing court filings, a designer working with print-ready PDFs, or an enterprise managing document workflows, Acrobat's capabilities are unmatched. JustUse.me doesn't try to compete with these professional features.",
      },
      {
        title: "What We Offer That Adobe Doesn't",
        content:
          "JustUse.me covers territory Adobe doesn't touch. Image compression and conversion. JSON and code formatting. QR code generation. Unit calculators. Password generators. Base64 encoding. 129 tools across 8 categories. Adobe Acrobat is a PDF specialist. JustUse.me is an everyday toolbox. And it does the common PDF tasks — merge, split, compress, convert — just as well as Adobe's free online tools.",
      },
      {
        title: "Privacy Comparison",
        content:
          "Adobe's online tools upload your files to Adobe's cloud for processing. Even the desktop app syncs with Adobe Document Cloud by default. JustUse.me processes every file locally in your browser. Nothing is uploaded, nothing is stored, nothing is synced. For sensitive documents, this is the most meaningful difference between the two services.",
      },
      {
        title: "The Bottom Line",
        content:
          "Adobe Acrobat is worth $19.99/month if you need advanced PDF editing, forms, redaction, or Creative Cloud integration as part of a daily professional workflow. For everyone else — students, freelancers, small businesses, anyone who processes documents occasionally — JustUse.me at $2.59/month (7.7x cheaper) covers the essentials and adds 100+ tools Adobe doesn't offer.",
      },
    ],
    faq: [
      {
        q: "Is Adobe Acrobat free?",
        a: "Adobe offers limited free online PDF tools (convert, compress, sign) with restrictions. The full Acrobat Pro editor costs $19.99/month. JustUse.me offers 129 tools with a free tier and Pro at $2.59/month.",
      },
      {
        q: "Is Adobe Acrobat worth the price?",
        a: "For professional PDF editing, forms, and redaction — yes. For basic tasks like merging, splitting, or compressing PDFs — no. JustUse.me handles common PDF tasks at 7.7x less cost ($2.59 vs $19.99/month) with no file uploads.",
      },
      {
        q: "What is the cheapest alternative to Adobe Acrobat?",
        a: "For basic PDF operations, JustUse.me at $2.59/month is the most affordable option — 7.7x cheaper than Acrobat Pro. It covers merge, split, compress, convert, rotate, and watermark without requiring a subscription.",
      },
      {
        q: "Does Adobe Acrobat upload my files?",
        a: "Adobe's online tools upload files to Adobe's cloud. The desktop app syncs with Adobe Document Cloud by default. JustUse.me processes everything locally in your browser — files never leave your device.",
      },
      {
        q: "Adobe Acrobat vs JustUse.me — which should I use?",
        a: "Use Adobe Acrobat if you need advanced PDF editing, fillable forms, or redaction for professional/legal work. Use JustUse.me if you need affordable, private access to common file tools across PDFs, images, text, and more.",
      },
    ],
    relatedTools: [
      "merge-pdf",
      "compress-pdf",
      "pdf-to-jpg",
      "split-pdf",
      "protect-pdf",
      "rotate-pdf",
    ],
  },

  tinypng: {
    slug: "tinypng",
    name: "TinyPNG",
    tagline: "Great at image compression — but $3.25/mo for one tool?",
    price: "$3.25/mo",
    priceNum: 3.25,
    multiplier: "1.3x",
    toolCount: "1",
    toolScope: "Image compression only",
    watermark: false,
    serverUpload: true,
    signupRequired: false,
    freeLimit: "20 images/session, 5MB max per file",
    strengths: [
      "Excellent compression quality",
      "Developer API for automation",
      "Supports AVIF, WebP, JXL formats",
      "Trusted brand in web development",
    ],
    sections: [
      {
        title: "One Tool vs Many",
        content:
          "TinyPNG does one thing: compress images. It does it well — their compression algorithm produces excellent results across JPEG, PNG, WebP, and AVIF formats. But their Web Pro plan costs $3.25 per month (billed annually) for unlimited compression with a 75MB file limit. JustUse.me costs $2.59 per month and includes image compression plus 128 other tools. You get image resizing, cropping, format conversion, HEIC support, background removal, and OCR — along with PDF tools, text tools, code formatters, and more.",
      },
      {
        title: "Compression Quality",
        content:
          "TinyPNG uses smart lossy compression that reduces file size while maintaining visual quality. JustUse.me uses browser-based compression with adjustable quality settings. For most use cases — blog images, email attachments, social media — both produce results that are visually indistinguishable. TinyPNG may have a slight edge in compression ratio for PNG files specifically, as their algorithm was originally built for that format.",
      },
      {
        title: "Format Support",
        content:
          "TinyPNG supports JPEG, PNG, WebP, AVIF, JPEG XL, and animated PNG. JustUse.me supports the same common formats plus HEIC-to-JPG conversion (useful for iPhone photos), image resizing, cropping, rotation, and format conversion between types. Where TinyPNG specializes in compression, JustUse.me covers the full image processing workflow.",
      },
      {
        title: "Privacy",
        content:
          "TinyPNG uploads your images to their servers for compression. They retain images for a maximum of 48 hours before permanent deletion. JustUse.me compresses images entirely in your browser — files never leave your device. If you're compressing screenshots containing sensitive information or client assets, local processing is the safer choice.",
      },
      {
        title: "When TinyPNG Makes Sense",
        content:
          "TinyPNG is the right choice if you need their developer API for automated image optimization in build pipelines or CI/CD workflows. Their API pricing is separate from the web tool. For manual image compression through a web interface, JustUse.me offers the same capability plus 128 additional tools at a lower price, with the added benefit of local processing.",
      },
    ],
    faq: [
      {
        q: "Is TinyPNG free?",
        a: "TinyPNG's free tier allows 20 images per session with a 5MB file size limit. Web Pro costs $3.25/month (annual) for unlimited compression up to 75MB. JustUse.me's free tier includes image compression with no watermarks.",
      },
      {
        q: "Does TinyPNG upload my images?",
        a: "Yes, TinyPNG uploads images to their servers for compression. They retain files for up to 48 hours before deletion. JustUse.me compresses images locally in your browser — nothing is uploaded.",
      },
      {
        q: "What is a free alternative to TinyPNG?",
        a: "JustUse.me offers free image compression in your browser with no uploads and no watermarks. The Pro plan at $2.59/month includes 129 tools — 2.2.7x cheaper than TinyPNG's Web Pro at $3.25/month.",
      },
      {
        q: "TinyPNG vs JustUse.me for image compression?",
        a: "TinyPNG may have a slight edge in PNG compression quality. JustUse.me offers comparable compression for most use cases, plus image resizing, cropping, format conversion, and 100+ other tools — all processed locally without file uploads.",
      },
      {
        q: "Is TinyPNG safe?",
        a: "TinyPNG uses HTTPS encryption and deletes files after 48 hours. However, your images are uploaded to their servers. If your images contain sensitive content, JustUse.me's browser-based processing keeps files on your device.",
      },
    ],
    relatedTools: [
      "compress-image",
      "resize-image",
      "crop-image",
      "heic-to-jpg",
      "png-to-jpg",
      "image-to-webp",
    ],
  },
};

export const competitorSlugs = Object.keys(competitors);

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}
