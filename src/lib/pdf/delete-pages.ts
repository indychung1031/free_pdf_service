import { PDFDocument } from "pdf-lib";
import { loadPdfFromFile } from "./load";
import { parsePageRange } from "./page-range";

export async function deletePages(
  file: File,
  deleteRangeInput: string,
): Promise<Uint8Array> {
  const source = await loadPdfFromFile(file);
  const pageCount = source.getPageCount();
  const toDelete = new Set(parsePageRange(deleteRangeInput, pageCount));

  const keepIndices: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    if (!toDelete.has(i)) keepIndices.push(i);
  }

  if (keepIndices.length === 0) {
    throw new Error("삭제 후 남는 페이지가 없습니다.");
  }

  const out = await PDFDocument.create();
  const pages = await out.copyPages(source, keepIndices);
  pages.forEach((page) => out.addPage(page));
  return out.save();
}
