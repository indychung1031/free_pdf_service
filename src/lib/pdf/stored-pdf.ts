import { readPdfBytes } from "./read-bytes";
import { readPageCountFromBytes } from "./load";

/** iOS File handle 무효화 방지 — 선택 직후 bytes 보관 (§9.4.8) */
export type StoredPdf = { name: string; bytes: Uint8Array };

export async function storePdfFromFile(file: File): Promise<StoredPdf> {
  const bytes = await readPdfBytes(file);
  return { name: file.name, bytes };
}

export async function storePdfWithPageCount(
  file: File,
): Promise<StoredPdf & { pageCount: number }> {
  const stored = await storePdfFromFile(file);
  const pageCount = await readPageCountFromBytes(stored.bytes);
  return { ...stored, pageCount };
}
