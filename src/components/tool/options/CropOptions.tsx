"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import type { ToolOptions } from "@/tools/types";

interface Props {
  options: ToolOptions;
  onChange: (opts: ToolOptions) => void;
  fileInfo?: Record<string, unknown>;
}

const ratios = [
  { label: "Free", value: 0 },
  { label: "1:1", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
];

export default function CropOptions({ options, onChange, fileInfo }: Props) {
  const origW = (fileInfo?.width as number) || 0;
  const origH = (fileInfo?.height as number) || 0;
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedRatio, setSelectedRatio] = useState(0);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });

  // Build a blob URL from the staged file passed via fileInfo
  const previewUrl = useMemo(() => {
    const file = fileInfo?.file as File | undefined;
    if (file) return URL.createObjectURL(file);
    return null;
  }, [fileInfo?.file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Convert displayed crop to original image pixel values
  const handleCropComplete = useCallback(
    (pixelCrop: PixelCrop) => {
      const img = imgRef.current;
      if (!img || !origW || !origH) return;

      // react-image-crop gives pixelCrop in displayed <img> coordinates.
      // Scale from displayed size → original image size.
      const scaleX = origW / img.width;
      const scaleY = origH / img.height;

      onChange({
        ...options,
        cropX: Math.round(pixelCrop.x * scaleX),
        cropY: Math.round(pixelCrop.y * scaleY),
        cropW: Math.max(1, Math.round(pixelCrop.width * scaleX)),
        cropH: Math.max(1, Math.round(pixelCrop.height * scaleY)),
      });
    },
    [origW, origH, options, onChange]
  );

  const handleRatioChange = (value: number) => {
    setSelectedRatio(value);
    if (value === 0) {
      // Free: keep current crop, just unlock ratio
      return;
    }
    // Set a centered crop with the chosen aspect ratio
    const img = imgRef.current;
    if (!img) return;

    const imgAspect = img.width / img.height;
    let widthPct = 80;
    let heightPct = 80;

    if (value > imgAspect) {
      // Crop is wider than image aspect
      widthPct = 80;
      heightPct = (widthPct / value) * (img.width / img.height);
      if (heightPct > 90) {
        heightPct = 90;
        widthPct = heightPct * value * (img.height / img.width);
      }
    } else {
      heightPct = 80;
      widthPct = heightPct * value * (img.height / img.width);
      if (widthPct > 90) {
        widthPct = 90;
        heightPct = (widthPct / value) * (img.width / img.height);
      }
    }

    const newCrop: Crop = {
      unit: "%",
      x: (100 - widthPct) / 2,
      y: (100 - heightPct) / 2,
      width: widthPct,
      height: heightPct,
    };
    setCrop(newCrop);
  };

  const outputW = (options.cropW as number) || origW;
  const outputH = (options.cropH as number) || origH;

  return (
    <div className="flex flex-col gap-4">
      {/* Aspect ratio presets */}
      <div className="flex items-center justify-center gap-2">
        {ratios.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => handleRatioChange(r.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
              selectedRatio === r.value
                ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)] font-medium"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Visual cropper */}
      {previewUrl && (
        <div className="w-full rounded-xl border border-[var(--color-border)] overflow-hidden bg-[#f5f5f5] flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={selectedRatio || undefined}
            minWidth={20}
            minHeight={20}
          >
            <img
              ref={imgRef}
              src={previewUrl}
              alt="Crop preview"
              style={{ maxWidth: "100%", maxHeight: "320px" }}
              onLoad={() => {
                // Initialize with 80% centered crop
                if (origW && origH) {
                  const w = Math.round(origW * 0.8);
                  const h = Math.round(origH * 0.8);
                  onChange({
                    ...options,
                    cropX: Math.round(origW * 0.1),
                    cropY: Math.round(origH * 0.1),
                    cropW: w,
                    cropH: h,
                  });
                }
              }}
            />
          </ReactCrop>
        </div>
      )}

      {/* Output info */}
      {origW > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Output: <span className="font-medium text-[var(--color-text-secondary)]">{outputW} x {outputH}</span> px
        </p>
      )}
    </div>
  );
}
