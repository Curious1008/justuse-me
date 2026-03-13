import type { ToolPlugin, ToolResult } from "../types";
import SplitOptions from "@/components/tool/options/SplitOptions";

/**
 * Parse a page range string like "1-3, 5, 8-10" into a sorted, deduplicated
 * array of zero-based page indices. Throws on invalid input.
 */
function parsePageRanges(input: string, pageCount: number): number[] {
  const indices = new Set<number>();

  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
        throw new Error(
          `Page range ${trimmed} is out of bounds (PDF has ${pageCount} pages).`
        );
      }
      if (start > end) {
        throw new Error(`Invalid range ${trimmed}: start is greater than end.`);
      }
      for (let i = start; i <= end; i++) {
        indices.add(i - 1); // zero-based
      }
    } else if (/^\d+$/.test(trimmed)) {
      const page = parseInt(trimmed, 10);
      if (page < 1 || page > pageCount) {
        throw new Error(
          `Page ${page} is out of bounds (PDF has ${pageCount} pages).`
        );
      }
      indices.add(page - 1);
    } else {
      throw new Error(
        `Invalid page specification: "${trimmed}". Use numbers and ranges like 1-3, 5, 8-10.`
      );
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}

const splitPdf: ToolPlugin = {
  id: "split-pdf",
  category: "pdf",
  name: "Split PDF",
  description: "Extract pages from a PDF into separate files.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "separate pdf",
    "split pdf online free",
  ],
  icon: "\u2702\uFE0F",

  acceptedTypes: ["application/pdf"],
  maxFiles: 1,
  maxFileSize: 30 * 1024 * 1024,

  runtime: "browser",
  processButtonLabel: "Extract",
  optionsUI: SplitOptions,

  async process(files, options): Promise<ToolResult> {
    const { PDFDocument } = await import("pdf-lib");
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();

    if (pageCount > 500) {
      throw new Error("PDF has too many pages (max 500). Please use a smaller file.");
    }

    const pagesInput = ((options?.pages as string) || "").trim();

    // If user specified pages, extract them
    if (pagesInput) {
      const indices = parsePageRanges(pagesInput, pageCount);

      if (indices.length === 0) {
        throw new Error("No pages selected.");
      }

      // Single contiguous selection or any selection → output as single PDF
      if (indices.length === 1 || isSingleGroup(indices)) {
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, indices);
        for (const page of copiedPages) {
          newPdf.addPage(page);
        }
        const pdfBytes = await newPdf.save();
        const label =
          indices.length === 1
            ? `page-${indices[0] + 1}`
            : `pages-${indices[0] + 1}-${indices[indices.length - 1] + 1}`;
        return {
          blob: new Blob([new Uint8Array(pdfBytes)], {
            type: "application/pdf",
          }),
          filename: `${label}.pdf`,
          mimeType: "application/pdf",
        };
      }

      // Multiple non-contiguous groups → ZIP with one PDF per group
      const groups = toGroups(indices);
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();

      for (const group of groups) {
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, group);
        for (const page of copiedPages) {
          newPdf.addPage(page);
        }
        const pdfBytes = await newPdf.save();
        const label =
          group.length === 1
            ? `page-${group[0] + 1}`
            : `pages-${group[0] + 1}-${group[group.length - 1] + 1}`;
        zip.file(`${label}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      return {
        blob: zipBlob,
        filename: "split-pages.zip",
        mimeType: "application/zip",
      };
    }

    // Default: split every page (original behavior)
    if (pageCount < 2) {
      throw new Error("This PDF only has one page — nothing to split.");
    }

    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);
      const pageBytes = await newPdf.save();
      zip.file(`page-${i + 1}.pdf`, pageBytes);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      blob: zipBlob,
      filename: "split-pages.zip",
      mimeType: "application/zip",
    };
  },
};

/** Check if all indices are contiguous (e.g. [2,3,4]) */
function isSingleGroup(indices: number[]): boolean {
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] !== indices[i - 1] + 1) return false;
  }
  return true;
}

/** Split sorted indices into groups of contiguous runs */
function toGroups(indices: number[]): number[][] {
  const groups: number[][] = [[indices[0]]];
  for (let i = 1; i < indices.length; i++) {
    const last = groups[groups.length - 1];
    if (indices[i] === last[last.length - 1] + 1) {
      last.push(indices[i]);
    } else {
      groups.push([indices[i]]);
    }
  }
  return groups;
}

export default splitPdf;
