import type { ToolPlugin, ToolResult } from "../types";

const icoConverter: ToolPlugin = {
  id: "ico-converter",
  category: "image",
  name: "PNG to ICO",
  description: "Convert images to ICO favicon format.",
  keywords: ["png to ico", "favicon generator", "ico converter", "favicon maker", "convert to ico", "icon file"],
  icon: "🔷",

  acceptedTypes: ["image/png", "image/jpeg", "image/webp"],
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,

  runtime: "browser",

  async process(files): Promise<ToolResult> {
    const file = files[0];
    const bitmap = await createImageBitmap(file);

    // Resize to standard favicon sizes and create ICO
    const sizes = [16, 32, 48];
    const images: { size: number; data: Uint8Array }[] = [];

    for (const size of sizes) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);

      // Convert RGBA to BGRA (ICO format)
      const bgra = new Uint8Array(imageData.data.length);
      for (let i = 0; i < imageData.data.length; i += 4) {
        bgra[i] = imageData.data[i + 2];     // B
        bgra[i + 1] = imageData.data[i + 1]; // G
        bgra[i + 2] = imageData.data[i];     // R
        bgra[i + 3] = imageData.data[i + 3]; // A
      }
      images.push({ size, data: bgra });
      canvas.width = 0;
      canvas.height = 0;
    }
    bitmap.close();

    // Build ICO file
    const headerSize = 6;
    const dirEntrySize = 16;
    const numImages = images.length;
    let dataOffset = headerSize + dirEntrySize * numImages;

    const bmpHeaders: Uint8Array[] = [];
    for (const img of images) {
      // BMP info header (40 bytes)
      const bmpHeader = new ArrayBuffer(40);
      const bv = new DataView(bmpHeader);
      bv.setUint32(0, 40, true); // header size
      bv.setInt32(4, img.size, true); // width
      bv.setInt32(8, img.size * 2, true); // height (doubled for ICO)
      bv.setUint16(12, 1, true); // planes
      bv.setUint16(14, 32, true); // bits per pixel
      bv.setUint32(20, img.data.length, true); // image size
      bmpHeaders.push(new Uint8Array(bmpHeader));
    }

    // Calculate total file size
    let totalSize = headerSize + dirEntrySize * numImages;
    for (let i = 0; i < numImages; i++) {
      totalSize += 40 + images[i].data.length;
    }

    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);

    // ICO header
    view.setUint16(0, 0, true); // reserved
    view.setUint16(2, 1, true); // type: ICO
    view.setUint16(4, numImages, true);

    // Directory entries
    let offset = dataOffset;
    for (let i = 0; i < numImages; i++) {
      const pos = 6 + i * 16;
      const s = images[i].size;
      view.setUint8(pos, s < 256 ? s : 0);
      view.setUint8(pos + 1, s < 256 ? s : 0);
      view.setUint8(pos + 2, 0); // color palette
      view.setUint8(pos + 3, 0); // reserved
      view.setUint16(pos + 4, 1, true); // planes
      view.setUint16(pos + 6, 32, true); // bits
      view.setUint32(pos + 8, 40 + images[i].data.length, true); // size
      view.setUint32(pos + 12, offset, true); // offset
      offset += 40 + images[i].data.length;
    }

    // Image data (BMP header + pixel data, bottom-up)
    let writePos = dataOffset;
    for (let i = 0; i < numImages; i++) {
      const arr = new Uint8Array(buffer);
      arr.set(bmpHeaders[i], writePos);
      writePos += 40;

      // Write pixel data bottom-up
      const s = images[i].size;
      const rowBytes = s * 4;
      for (let row = s - 1; row >= 0; row--) {
        const srcOffset = row * rowBytes;
        arr.set(images[i].data.slice(srcOffset, srcOffset + rowBytes), writePos);
        writePos += rowBytes;
      }
    }

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return {
      blob: new Blob([buffer], { type: "image/x-icon" }),
      filename: `${baseName}.ico`,
      mimeType: "image/x-icon",
    };
  },
};

export default icoConverter;
