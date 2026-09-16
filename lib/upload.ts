// Client-only Cloudinary upload via an unsigned upload preset — no server
// code, no API secret ever touches the browser. Used anywhere a customer
// attaches a design file (configurator, hire-a-designer form, cart).

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

export interface UploadProgressEvent {
  loaded: number;
  total: number;
  /** 0-100, rounded. */
  percent: number;
}

export interface UploadResult {
  url: string;
  publicId: string;
  format?: string;
  resourceType: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface UploadOptions {
  onProgress?: (event: UploadProgressEvent) => void;
  /** Abort the upload in progress, e.g. from a "cancel" button. */
  signal?: AbortSignal;
}

function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new UploadError(
      "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET. Set them in .env.local (see .env.local.example)."
    );
  }

  return { cloudName, uploadPreset };
}

/**
 * Uploads a File to Cloudinary using an unsigned upload preset and resolves
 * with its public URL. Reports progress via `onProgress` and supports
 * cancellation via `signal`. Rejects with an UploadError on any failure.
 */
export function uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResult> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  return new Promise<UploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (event) => {
      if (!options.onProgress || !event.lengthComputable) return;
      options.onProgress({
        loaded: event.loaded,
        total: event.total,
        percent: Math.round((event.loaded / event.total) * 100),
      });
    };

    xhr.onload = () => {
      let data: Record<string, unknown> | undefined;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        reject(new UploadError("Cloudinary returned an unreadable response."));
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300 && data) {
        resolve({
          url: String(data.secure_url ?? data.url ?? ""),
          publicId: String(data.public_id ?? ""),
          format: typeof data.format === "string" ? data.format : undefined,
          resourceType: String(data.resource_type ?? "raw"),
          width: typeof data.width === "number" ? data.width : undefined,
          height: typeof data.height === "number" ? data.height : undefined,
          bytes: typeof data.bytes === "number" ? data.bytes : undefined,
        });
        return;
      }

      const errorObj = data?.error as { message?: string } | undefined;
      reject(new UploadError(errorObj?.message ?? `Upload failed with status ${xhr.status}.`));
    };

    xhr.onerror = () => reject(new UploadError("Network error while uploading file."));
    xhr.onabort = () => reject(new UploadError("Upload was cancelled."));

    if (options.signal) {
      if (options.signal.aborted) {
        xhr.abort();
      } else {
        options.signal.addEventListener("abort", () => xhr.abort(), { once: true });
      }
    }

    xhr.send(formData);
  });
}
