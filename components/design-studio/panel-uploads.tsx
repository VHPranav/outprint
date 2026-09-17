"use client";

import * as React from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelUploadsProps {
  onAdd: (file: File) => Promise<void>;
}

export function PanelUploads({ onAdd }: PanelUploadsProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setIsProcessing(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        await onAdd(file);
      }
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500">
        Drop images onto the canvas or your device. Nothing uploads until you save your design.
      </p>
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
          "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          isDragOver ? "border-black bg-[#FAFAF9]" : "border-[#E5E5E5]"
        )}
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        ) : (
          <UploadCloud className="h-6 w-6 text-neutral-400" />
        )}
        <p className="text-xs text-neutral-500">Drag & drop, or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
          className="rounded-full border border-[#E5E5E5] px-3.5 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:border-black disabled:opacity-50"
        >
          Choose file
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
