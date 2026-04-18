import type { ToolPlugin, ToolResult, ToolOptions } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

/**
 * Preprocess image for English OCR:
 * 1. Scale up small images to ~300 DPI equivalent
 * 2. Convert to grayscale
 * 3. Otsu global binarization (best for clean text on uniform backgrounds)
 */
async function preprocessImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  // Scale up small images — Tesseract works best at ~300 DPI
  const minDim = Math.min(width, height);
  const scale = minDim < 1000 ? Math.min(3, 1500 / minDim) : 1;
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  const len = w * h;

  // Convert to grayscale
  const gray = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const p = i * 4;
    gray[i] = Math.round(0.299 * d[p] + 0.587 * d[p + 1] + 0.114 * d[p + 2]);
  }

  // Otsu's threshold: find optimal global threshold by maximizing inter-class variance
  const histogram = new Uint32Array(256);
  for (let i = 0; i < len; i++) histogram[gray[i]]++;

  let bestThreshold = 128;
  let bestVariance = 0;
  let sumAll = 0;
  for (let i = 0; i < 256; i++) sumAll += i * histogram[i];

  let wB = 0, sumB = 0;
  for (let t = 0; t < 256; t++) {
    wB += histogram[t];
    if (wB === 0) continue;
    const wF = len - wB;
    if (wF === 0) break;
    sumB += t * histogram[t];
    const mB = sumB / wB;
    const mF = (sumAll - sumB) / wF;
    const variance = wB * wF * (mB - mF) * (mB - mF);
    if (variance > bestVariance) {
      bestVariance = variance;
      bestThreshold = t;
    }
  }

  // Apply binarization
  for (let i = 0; i < len; i++) {
    const v = gray[i] > bestThreshold ? 255 : 0;
    const p = i * 4;
    d[p] = d[p + 1] = d[p + 2] = v;
    d[p + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        canvas.width = 0;
        canvas.height = 0;
        blob ? resolve(blob) : reject(new Error("Image preprocessing failed"));
      },
      "image/png"
    );
  });
}

const ocrImage: ToolPlugin = {
  id: "ocr-image",
  category: "image",
  name: "Image to Text (OCR)",
  description: "Extract text from images using optical character recognition.",
  keywords: ["ocr", "image to text", "extract text", "text recognition", "scan text", "read image"],
  icon: "\uD83D\uDD0D",

  inputMode: "file",
  acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/bmp", "image/tiff"],
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,
  localeWarnings: {
    "zh-CN": "此工具目前仅支持英文识别，中文识别效果较差，建议使用英文图片。",
    "zh-TW": "此工具目前僅支援英文識別，中文識別效果較差，建議使用英文圖片。",
  },

  async process(files): Promise<ToolResult> {
    const file = files[0];

    const processedBlob = await preprocessImage(file);

    const Tesseract = await import("tesseract.js");
    const { data } = await Tesseract.recognize(processedBlob, "eng");

    const text = data.text.trim();

    if (!text) {
      throw new Error("No text found in the image. Try a clearer image.");
    }

    return {
      blob: new Blob([text], { type: "text/plain" }),
      filename: `ocr-${file.name.replace(/\.[^.]+$/, "")}.txt`,
      mimeType: "text/plain",
    };
  },
};

export default ocrImage;
