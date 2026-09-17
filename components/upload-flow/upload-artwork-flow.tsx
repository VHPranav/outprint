"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadCloud, FileText, X, AlertTriangle, Check, ArrowLeft } from "lucide-react";
import type { Product } from "@/data/products";
import { resolveDesignSize, readDesignSizeFromParams } from "@/lib/design-size";
import { uploadFile, UploadError } from "@/lib/upload";
import {
  checkImageResolution,
  readImageDimensions,
  RESOLUTION_ENHANCEMENT_PRICE,
  type ResolutionCheck,
} from "@/lib/resolution-check";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadStatus, type UploadState } from "@/components/ui/upload-status";

interface UploadArtworkFlowProps {
  product: Product;
}

const ACCEPTED_EXTENSIONS = [".ai", ".pdf", ".png", ".jpg", ".jpeg", ".svg"];
const RASTER_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const PREVIEWABLE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg"];
const MAX_FILE_SIZE_MB = 25;

function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot).toLowerCase();
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(file: File): string | null {
  const ext = getExtension(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return `Unsupported file type "${ext || "unknown"}". Please upload AI, PDF, PNG, JPG or SVG.`;
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File is too large (${formatFileSize(file.size)}). Max size is ${MAX_FILE_SIZE_MB}MB.`;
  }
  return null;
}

export function UploadArtworkFlow({ product }: UploadArtworkFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { width: widthIn, height: heightIn } = React.useMemo(() => {
    return (
      readDesignSizeFromParams(searchParams) ??
      resolveDesignSize(product, { sizeLabel: searchParams.get("sizeLabel") ?? undefined })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const [isDragOver, setIsDragOver] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null);
  const [resolution, setResolution] = React.useState<ResolutionCheck | null>(null);
  const [wantsEnhancement, setWantsEnhancement] = React.useState(false);
  const [uploadState, setUploadState] = React.useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadErrorMsg, setUploadErrorMsg] = React.useState<string | undefined>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleFiles(fileList: FileList | null) {
    const picked = fileList?.[0];
    if (!picked) return;

    // A new file always clears any status left over from a previous attempt
    // (a failed or successful upload), so the Confirm button reappears.
    setUploadState("idle");
    setUploadProgress(0);
    setUploadErrorMsg(undefined);

    const error = validateFile(picked);
    if (error) {
      setFileError(error);
      setFile(null);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
      setResolution(null);
      return;
    }

    setFileError(null);
    setWantsEnhancement(false);
    setResolution(null);
    setDimensions(null);
    setFile(picked);

    const ext = getExtension(picked.name);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return PREVIEWABLE_EXTENSIONS.includes(ext) ? URL.createObjectURL(picked) : null;
    });

    if (RASTER_EXTENSIONS.includes(ext)) {
      try {
        const { width, height } = await readImageDimensions(picked);
        setDimensions({ width, height });
        setResolution(checkImageResolution(width, height, widthIn, heightIn));
      } catch {
        // Dimension check is a bonus heuristic — a failure here shouldn't block upload.
      }
    }
  }

  function removeFile() {
    setFile(null);
    setFileError(null);
    setResolution(null);
    setDimensions(null);
    setWantsEnhancement(false);
    setUploadState("idle");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
  }

  async function handleConfirm() {
    if (!file) return;
    setUploadState("uploading");
    setUploadProgress(0);
    setUploadErrorMsg(undefined);

    try {
      const result = await uploadFile(file, {
        onProgress: (event) => setUploadProgress(event.percent),
      });
      setUploadState("success");
      const params = new URLSearchParams({ designUrl: result.url, designName: file.name });
      if (wantsEnhancement) params.set("enhancement", "1");
      router.push(`/product/${product.slug}?${params.toString()}`);
    } catch (error) {
      setUploadState("error");
      setUploadErrorMsg(error instanceof UploadError ? error.message : "Upload failed. Please try again.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <button
          type="button"
          onClick={() => router.push(`/product/${product.slug}`)}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {product.name}
        </button>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          Upload Your Artwork
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          PNG, JPG, SVG, PDF or AI files, up to {MAX_FILE_SIZE_MB}MB. We&apos;ll run a free digital proof before
          anything goes to press.
        </p>
      </div>

      {!file && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            void handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-16 text-center transition-colors",
            isDragOver ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5]"
          )}
        >
          <UploadCloud className="h-9 w-9 text-neutral-400" />
          <div>
            <p className="text-sm font-medium text-neutral-700">Drag & drop your file here</p>
            <p className="mt-1 text-xs text-neutral-400">or</p>
          </div>
          <Button variant="secondary" onClick={() => inputRef.current?.click()}>
            Choose file
          </Button>
        </div>
      )}

      {fileError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{fileError}</p>
        </div>
      )}

      {file && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 rounded-2xl border border-[#E5E5E5] p-4">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={file.name}
                className="h-20 w-20 shrink-0 rounded-xl border border-[#E5E5E5] object-cover"
              />
            ) : (
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#FAFAF9] text-neutral-400">
                <FileText className="h-7 w-7" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">{file.name}</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                {formatFileSize(file.size)}
                {dimensions && ` • ${dimensions.width} × ${dimensions.height}px`}
              </p>
            </div>
            {uploadState === "idle" && (
              <button
                type="button"
                onClick={removeFile}
                aria-label="Remove file"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {resolution?.isLowResolution && uploadState === "idle" && (
            <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-2.5 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  This image is {dimensions?.width}×{dimensions?.height}px, lower than the ~{resolution.requiredWidthPx}×
                  {resolution.requiredHeightPx}px we&apos;d recommend for your selected size — it may look soft or
                  pixelated when printed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWantsEnhancement((v) => !v)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                  wantsEnhancement ? "border-black bg-white" : "border-amber-200 bg-white/60 hover:border-neutral-300"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                    wantsEnhancement ? "border-black bg-black text-white" : "border-neutral-300"
                  )}
                >
                  {wantsEnhancement && <Check className="h-3 w-3" />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-neutral-900">Request Resolution Enhancement</span>
                  <span className="block text-xs text-neutral-500">
                    Our team will manually clean up and upscale your artwork before printing.
                  </span>
                </span>
                <span className="shrink-0 text-xs font-medium text-neutral-700">
                  +{formatCurrency(RESOLUTION_ENHANCEMENT_PRICE)}
                </span>
              </button>
            </div>
          )}

          {uploadState !== "idle" ? (
            <UploadStatus
              state={uploadState}
              fileName={file.name}
              progress={uploadProgress}
              errorMessage={uploadErrorMsg}
              onRetry={handleConfirm}
            />
          ) : (
            <Button size="lg" className="w-full" onClick={handleConfirm}>
              Confirm & Continue
            </Button>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".ai,.pdf,.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml,application/pdf"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
