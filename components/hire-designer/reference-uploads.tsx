"use client";

import * as React from "react";
import { UploadCloud, FileText, X, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { uploadFile, UploadError } from "@/lib/upload";
import { cn } from "@/lib/utils";

export interface ReferenceFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  progress: number;
  url?: string;
  errorMessage?: string;
}

interface ReferenceUploadsProps {
  files: ReferenceFile[];
  onChange: (files: ReferenceFile[] | ((prev: ReferenceFile[]) => ReferenceFile[])) => void;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 15;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ReferenceUploads({ files, onChange }: ReferenceUploadsProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const abortControllers = React.useRef<Map<string, AbortController>>(new Map());

  function startUpload(entry: ReferenceFile) {
    const controller = new AbortController();
    abortControllers.current.set(entry.id, controller);

    uploadFile(entry.file, {
      signal: controller.signal,
      onProgress: (event) =>
        onChange((prev) => prev.map((f) => (f.id === entry.id ? { ...f, progress: event.percent } : f))),
    })
      .then((result) => {
        onChange((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, status: "success", url: result.url } : f))
        );
      })
      .catch((error) => {
        onChange((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? {
                  ...f,
                  status: "error",
                  errorMessage: error instanceof UploadError ? error.message : "Upload failed.",
                }
              : f
          )
        );
      })
      .finally(() => {
        abortControllers.current.delete(entry.id);
      });
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const room = MAX_FILES - files.length;
    const picked = Array.from(fileList).slice(0, Math.max(0, room));

    const newEntries: ReferenceFile[] = picked
      .filter((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
      .map((file) => ({ id: crypto.randomUUID(), file, status: "uploading", progress: 0 }));

    onChange((prev) => [...prev, ...newEntries]);
    newEntries.forEach(startUpload);
  }

  function removeFile(id: string) {
    abortControllers.current.get(id)?.abort();
    onChange((prev) => prev.filter((f) => f.id !== id));
  }

  function retryFile(id: string) {
    const entry = files.find((f) => f.id === id);
    if (!entry) return;
    onChange((prev) => prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 0 } : f)));
    startUpload(entry);
  }

  return (
    <div>
      {files.length < MAX_FILES && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
            isDragOver ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5]"
          )}
        >
          <UploadCloud className="h-6 w-6 text-neutral-400" />
          <p className="text-xs text-neutral-500">
            Drag & drop references or a logo, or{" "}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="font-medium text-neutral-900 underline underline-offset-2"
            >
              browse
            </button>
          </p>
          <p className="text-[11px] text-neutral-400">
            Up to {MAX_FILES} files, {MAX_FILE_SIZE_MB}MB each — optional
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-lg border border-[#E5E5E5] bg-white p-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAFAF9] text-neutral-400">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-neutral-800">{entry.file.name}</p>
                {entry.status === "uploading" && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200">
                      <div
                        className="h-full rounded-full bg-black transition-[width] duration-200"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-400">{entry.progress}%</span>
                  </div>
                )}
                {entry.status === "success" && (
                  <p className="text-[11px] text-neutral-400">{formatFileSize(entry.file.size)} • Uploaded</p>
                )}
                {entry.status === "error" && (
                  <p className="flex items-center gap-1 text-[11px] text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {entry.errorMessage ?? "Upload failed"}
                  </p>
                )}
              </div>
              {entry.status === "uploading" && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-neutral-400" />}
              {entry.status === "error" && (
                <button
                  type="button"
                  onClick={() => retryFile(entry.id)}
                  aria-label="Retry upload"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => removeFile(entry.id)}
                aria-label="Remove file"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
