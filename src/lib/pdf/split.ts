import { PDFDocument } from "pdf-lib";
import { loadPdfFromFile } from "./load";
import { parsePageRange } from "./page-range";

export type SplitMode = "extract" | "each-page";

export async function splitPdf(
  file: File,
  mode: SplitMode,
  rangeInput?: string,
  onProgress?: (current: number, total: number) => void,
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const source = await loadPdfFromFile(file);
  const pageCount = source.getPageCount();

  if (mode === "extract") {
    if (!rangeInput?.trim()) {
      throw new Error("추출할 페이지 범위를 입력하세요.");
    }
    const indices = parsePageRange(rangeInput, pageCount);
    onProgress?.(1, 1);
    const out = await PDFDocument.create();
    const pages = await out.copyPages(source, indices);
    pages.forEach((page) => out.addPage(page));
    const baseName = file.name.replace(/\.pdf$/i, "");
    return [{ name: `${baseName}_extract.pdf`, bytes: await out.save() }];
  }

  const results: { name: string; bytes: Uint8Array }[] = [];
  const baseName = file.name.replace(/\.pdf$/i, "");

  for (let i = 0; i < pageCount; i++) {
    onProgress?.(i + 1, pageCount);
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(source, [i]);
    out.addPage(page);
    results.push({
      name: `${baseName}_page_${i + 1}.pdf`,
      bytes: await out.save(),
    });
  }

  return results;
}
