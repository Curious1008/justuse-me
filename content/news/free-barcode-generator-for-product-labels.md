---
title: "Creating Barcodes for Product Labels: Formats, Specs, and Free Tools"
summary: "Learn which barcode format suits your product labels, what specs retailers require, and how to generate print-ready barcode images for free."
category: "use-case"
tools: ["barcode-generator"]
keywords: ["free barcode generator for product labels online", "free barcode generator for product labels online", "barcode generator", "product label barcode", "UPC barcode", "EAN barcode", "QR code generator", "inventory barcode", "retail barcode labels", "barcode image download"]
published_at: "2026-04-07"
---
## Which Barcode Format Do You Actually Need?

Choosing the wrong barcode format is one of the most common mistakes when creating product labels — and it can get your items rejected by retailers or cause scan failures at checkout. Here's a quick breakdown of the formats you'll encounter:

- **UPC-A** — The standard 12-digit barcode used on retail products sold in the US and Canada. Required by most major retailers (Walmart, Target, Amazon FBA shipments). You need a registered GS1 company prefix to use these legitimately in retail.
- **EAN-13** — The 13-digit international equivalent of UPC-A, used across Europe, Asia, and most other markets. If you sell globally, you'll need EAN-13.
- **Code 128** — A high-density barcode that can encode letters, numbers, and special characters. Ideal for internal inventory tracking, shipping labels, and warehouse management where you control the scanning system.
- **Code 39** — An older, less dense format still used in automotive and defense industries. Readable by almost every scanner but takes more physical space for the same data.
- **QR Code** — Stores far more data than 1D barcodes and can encode URLs, contact info, or product details. Common on packaging for consumer-facing information but not used at retail POS checkouts.
- **Data Matrix** — A 2D format used in pharmaceutical packaging and electronics. Can encode a lot of data in a very small footprint — useful when label space is tight.

For most small businesses creating product labels for retail, the choice comes down to UPC-A (US market) or EAN-13 (international market). For internal use — warehouse bins, asset tags, internal SKUs — Code 128 is the practical default because it doesn't require registered numbers.

## What Are the Print Size and Resolution Requirements?

A barcode that looks fine on screen can fail to scan if it prints at the wrong size or resolution. Standard specifications for retail barcodes:

- **Minimum resolution**: 300 DPI for print. Many label printers run at 203 or 300 DPI; images generated at 72 DPI will look pixelated and may not scan reliably.
- **UPC-A nominal size**: 37.29mm × 25.91mm (about 1.47" × 1.02"). GS1 allows magnification between 80% and 200% of this nominal size, so the absolute minimum is roughly 29.8mm wide.
- **Quiet zones**: The white space on either side of a barcode (called the quiet zone) must be maintained. For UPC-A, that's at least 2.97mm on each side. Crop it out and scanners will fail.
- **Color**: Black bars on a white background is the standard. Some color combinations work (dark blue on white, for example), but avoid red bars — most laser scanners can't distinguish red from white.

When downloading a generated barcode image, request the highest resolution available — typically PNG or SVG. SVG is the best option for labels because it's vector-based and scales to any size without quality loss.

## Do You Need a GS1 Number to Use UPC Barcodes?

For retail sales at major chains, yes. A UPC-A barcode encodes a company prefix assigned by GS1 (the international standards body) followed by a product reference number and a check digit. GS1 membership in the US costs $250 for the initial application plus annual fees starting at $50/year for companies with under $1M in revenue. This gets you a unique company prefix, which guarantees no other product in the world shares your barcode.

Some sellers buy "recycled" UPC numbers from third-party resellers (like Nationwide Barcode or Single UPCs) for a few dollars each. These are technically valid numbers, but Amazon and some major retailers have started requiring proof of GS1 registration. For Etsy, local markets, or your own e-commerce store, a third-party number is usually fine.

For internal barcodes (inventory, warehousing, internal SKUs), you don't need GS1 numbers at all. You can generate any Code 128 or Code 39 barcode with whatever numbering scheme fits your system.

## How Do Free Online Barcode Generators Work?

Most online barcode generators let you enter a number or string, pick a format, and download an image. Where they differ is in output quality, format options, and how your data is handled.

The [Barcode Generator](/tools/barcode-generator) at JustUse.me runs entirely in your browser — no data is sent to a server. This matters if you're generating barcodes for proprietary SKUs, serial numbers, or product codes you don't want stored on someone else's infrastructure. Tools like Barcode.tec-it.com and Free-Barcode-Generator.net are widely used but do process your input server-side.

For basic label use, here's a practical workflow:

1. Decide on your barcode type (Code 128 for internal, UPC-A for retail)
2. Enter your number — for Code 128, this can be any alphanumeric string you define (e.g., "PROD-00142")
3. Set the output size to at least 300 DPI or choose SVG for scalability
4. Download as PNG or SVG
5. Place the image in your label design software (Canva, Adobe Illustrator, Word, or a dedicated label tool like Avery Design & Print)

## What About Batch Barcode Generation?

If you need barcodes for hundreds of SKUs, generating them one at a time isn't practical. For batch generation:

- **ZXing Barcode Generator** (online, free) allows some batch options
- **Labeljoy** and **BarTender** are desktop label software with batch barcode capabilities, though they're paid tools ($99–$495/year range)
- **Python's `python-barcode` library** is free and scriptable — if you have a CSV of SKUs, a short script can output hundreds of barcode images automatically
- For QR codes specifically, **QR Code Monkey** and **GoQR.me** have CSV import for batch generation

For one-off or small-batch label creation (under 50 barcodes), a browser-based generator is the fastest option.

## Verifying Your Barcode Actually Scans

Before printing 500 labels, test your barcode. The fastest method: use the camera app on an iPhone (iOS 11+) or a QR/barcode scanner app like **Scandit** or **Cognex Mobile Barcode SDK** (both free). Point it at your printed barcode. If it doesn't read within two seconds under normal lighting, you have a problem — likely a resolution, quiet zone, or color contrast issue.

For retail submission, GS1 offers a verification service, and third-party labs like Axicon provide certified verification reports that some retailers require. This isn't necessary for most small sellers, but it's worth knowing the option exists.

A well-made barcode image takes minutes to create and costs nothing. The tricky part is understanding the specifications before you print — getting those right the first time avoids reprinting costs and retailer compliance headaches.