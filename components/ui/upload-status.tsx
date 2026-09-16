"use client";

import * as React from "react";
import { Loader2, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadState = "idle" | "uploading" | "success" | "error";

export interface UploadStatusProps {
  state: UploadState;
  /** File name shown while uploading or on success. */
  fileName?: string;
  /** 0-100, shown while state === "uploading". */
  progress?: number;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Fallback loading/progress/error indicator for any file-upload flow
 * (configurator design file, hire-a-designer references, cart attachments).
 * Renders nothing while idle so it can be mounted unconditionally.
 */
export function UploadStatus({
  state,
  fileName,
  progress = 0,
  errorMessage,
  onRetry,
  className,
}: UploadStatusProps) {
  if (state === "idle") return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAF9] px-3 py-2.5 text-sm",
        className
      )}
      role="status"
    >
      {state === "uploading" && (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-neutral-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-neutral-700">{fileName ?? "Uploading file…"}</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-black transition-[width] duration-200"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
          <span className="shrink-0 text-xs tabular-nums text-neutral-500">
            {Math.round(progress)}%
          </span>
        </>
      )}

      {state === "success" && (
        <>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <p className="min-w-0 flex-1 truncate text-neutral-700">{fileName ?? "File uploaded"}</p>
        </>
      )}

      {state === "error" && (
        <>
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <p className="min-w-0 flex-1 truncate text-red-700">{errorMessage ?? "Upload failed"}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-neutral-700 hover:text-black"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>
          )}
        </>
      )}
    </div>
  );
}
