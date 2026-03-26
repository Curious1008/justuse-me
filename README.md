# JustUse.me

**122 free browser-based tools. No uploads, no sign-up, no watermarks.**

[www.justuse.me](https://www.justuse.me)

JustUse.me is a privacy-first online toolbox. Every tool processes files entirely in your browser using WebAssembly and Canvas APIs. Your files never leave your device.

## Why JustUse.me?

Most online file tools (Smallpdf, iLovePDF, TinyPNG) upload your files to their servers. JustUse.me doesn't. Everything runs client-side. No tracking, no server-side processing, no data collection.

- **True privacy** — files never touch a server
- **Zero friction** — no account, no email, no captcha
- **No watermarks** — even on the free tier
- **Fast** — no upload/download wait, a 10MB PDF merges in seconds
- **Multilingual** — English, Simplified Chinese, Traditional Chinese

## Tools (122)

| Category | Count | Examples |
|----------|-------|---------|
| **PDF** | 10 | Merge, Split, Compress, Convert, Rotate, Watermark, Protect |
| **Image** | 16 | Compress, Resize, Crop, HEIC/WebP/PNG/JPG Convert, OCR, Background Remove |
| **Text & Code** | 23 | JSON Formatter, Diff Checker, Case Converter, Readability Checker |
| **Convert** | 7 | CSV/JSON/YAML/XML/TOML/Markdown |
| **Generator** | 14 | QR Code, Password, UUID, Color Palette, Invoice, Fake Data |
| **Calculator** | 16 | BMI, Mortgage, Tip, Percentage, Compound Interest, GPA, Calorie |
| **Developer** | 15 | Regex Tester, Timestamp Converter, CSS Generators, Meta Tag, JSON Validator |
| **Utility** | 14 | Unit Converters, Pomodoro Timer, Stopwatch, World Clock, Encryption |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, SSG/ISR)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables (light/dark mode)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **PDF**: [pdf-lib](https://pdf-lib.js.org/), [pdf.js](https://mozilla.github.io/pdf.js/)
- **OCR**: [Tesseract.js](https://tesseract.projectnapoli.org/)
- **Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Deploy**: [Vercel](https://vercel.com/)
- **SEO**: Auto-generated articles via Cloudflare Workers + Claude API

## Architecture

```
src/
├── app/[lang]/          # i18n routes (en, zh-CN, zh-TW)
│   ├── tools/[toolId]/  # Tool pages (SSG)
│   ├── news/            # Auto-generated SEO articles (ISR)
│   └── [category]/      # Category listing pages
├── tools/               # Tool plugins (one file per tool)
│   ├── pdf/             # 10 PDF tools
│   ├── image/           # 16 image tools
│   ├── text/            # 23 text tools
│   ├── convert/         # 7 converter tools
│   ├── generator/       # 14 generator tools
│   ├── calculator/      # 16 calculator tools
│   ├── developer/       # 15 developer tools
│   ├── utility/         # 14 utility tools
│   ├── types.ts         # ToolPlugin interface
│   └── registry.ts      # Tool registry
├── components/          # Shared UI components
│   ├── tool/            # ToolShell, DropZone, TextInput, etc.
│   └── news/            # ArticleCard, ArticleContent
├── config/
│   ├── seo.ts           # JSON-LD generators
│   └── tool-seo-content.ts  # Per-tool SEO content
└── lib/                 # Supabase, i18n, usage tracking
```

### Plugin System

Every tool is a self-contained module implementing the `ToolPlugin` interface:

```typescript
const myTool: ToolPlugin = {
  id: "my-tool",
  category: "text",
  name: "My Tool",
  description: "Does something useful.",
  keywords: ["keyword1", "keyword2"],
  icon: "🔧",
  inputMode: "text",          // "file" | "text" | "form"
  runtime: "browser",         // everything runs client-side
  async process(files) {
    const input = await files[0].text();
    const output = doSomething(input);
    return {
      blob: new Blob([output], { type: "text/plain" }),
      filename: "result.txt",
      mimeType: "text/plain",
    };
  },
};
```

Adding a new tool = create a file, export the plugin, register in `registry.ts`. No changes to the shell app.

## Getting Started

```bash
git clone https://github.com/Curious1008/justuse-me.git
cd justuse-me
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID=
REVALIDATE_SECRET=
```

Auth and payments are optional — all tools work without them.

## Content Automation

A [Cloudflare Worker](https://workers.cloudflare.com/) runs daily to generate SEO articles:

1. Picks keywords from a KV queue (auto-replenished via Claude API)
2. Generates article via Claude Sonnet
3. Commits markdown to `content/news/` via GitHub API
4. Vercel auto-deploys, articles go live

## Contributing

PRs welcome. To add a new tool:

1. Create `src/tools/{category}/my-tool.ts` implementing `ToolPlugin`
2. Add to `src/tools/registry.ts`
3. Add SEO content to `src/config/tool-seo-content.ts`
4. Add i18n strings to `src/locales/en.ts` (and optionally zh-CN, zh-TW)

## License

MIT
