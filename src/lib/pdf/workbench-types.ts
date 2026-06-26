import { PDFDocument } from "pdf-lib";
import { PDF_LOAD_OPTIONS } from "./read-bytes";

export type WorkbenchSource = {
  id: string;
  fileName: string;
  bytes: Uint8Array;
  cacheKey: string;
};

export type WorkbenchPage = {
  id: string;
  sourceId: string;
  sourcePageIndex: number;
  rotation: 0 | 90 | 180 | 270;
};

export function rotateClockwise(
  current: WorkbenchPage["rotation"],
): WorkbenchPage["rotation"] {
  return ((current + 90) % 360) as WorkbenchPage["rotation"];
}

export function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

export function makeSourceCacheKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export async function createWorkbenchSource(
  file: File,
  bytes: Uint8Array,
): Promise<{ source: WorkbenchSource; pageCount: number }> {
  const pdf = await PDFDocument.load(bytes, PDF_LOAD_OPTIONS);
  const id = crypto.randomUUID();
  return {
    source: {
      id,
      fileName: file.name,
      bytes,
      cacheKey: makeSourceCacheKey(file),
    },
    pageCount: pdf.getPageCount(),
  };
}

export function createWorkbenchPages(
  sourceId: string,
  pageCount: number,
): WorkbenchPage[] {
  return Array.from({ length: pageCount }, (_, index) => ({
    id: crypto.randomUUID(),
    sourceId,
    sourcePageIndex: index,
    rotation: 0,
  }));
}
