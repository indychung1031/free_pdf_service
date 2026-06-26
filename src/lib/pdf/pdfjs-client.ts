"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";

let workerConfigured = false;

async function getPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (!workerConfigured && typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
    workerConfigured = true;
  }
  return pdfjs;
}

const documentCache = new Map<string, Promise<PDFDocumentProxy>>();
const thumbnailCache = new Map<string, Promise<string>>();

async function loadDocument(
  data: ArrayBuffer,
  cacheKey: string,
): Promise<PDFDocumentProxy> {
  const existing = documentCache.get(cacheKey);
  if (existing) return existing;

  // 동시 호출 시 한 번만 로드하고, worker 전송으로 원본 buffer가 detach되지 않게 복사본 사용
  const loadPromise = (async () => {
    const { getDocument } = await getPdfjs();
    const bytes = new Uint8Array(data.slice(0));
    return getDocument({ data: bytes }).promise;
  })();

  documentCache.set(cacheKey, loadPromise);

  try {
    return await loadPromise;
  } catch (error) {
    documentCache.delete(cacheKey);
    throw error;
  }
}

export function clearPdfDocumentCache(cacheKey?: string): void {
  if (cacheKey) {
    documentCache.delete(cacheKey);
    for (const key of thumbnailCache.keys()) {
      if (key.startsWith(`${cacheKey}::`)) {
        thumbnailCache.delete(key);
      }
    }
    return;
  }
  documentCache.clear();
  thumbnailCache.clear();
}

export async function renderPageThumbnail(
  data: ArrayBuffer,
  cacheKey: string,
  pageIndex: number,
  maxWidth: number,
): Promise<string> {
  const thumbnailKey = `${cacheKey}::${pageIndex}::${maxWidth}`;
  const existing = thumbnailCache.get(thumbnailKey);
  if (existing) return existing;

  const task = (async () => {
  const pdf = await loadDocument(data, cacheKey);
  const page = await pdf.getPage(pageIndex + 1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = maxWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas를 초기화할 수 없습니다.");
  }

  await page.render({ canvas, canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/jpeg", 0.85);
  })();

  thumbnailCache.set(
    thumbnailKey,
    task.catch((error) => {
      thumbnailCache.delete(thumbnailKey);
      throw error;
    }),
  );
  return thumbnailCache.get(thumbnailKey)!;
}
