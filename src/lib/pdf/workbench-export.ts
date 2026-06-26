import { PDFDocument, degrees } from "pdf-lib";
import { PDF_LOAD_OPTIONS } from "./read-bytes";
import type { WorkbenchPage, WorkbenchSource } from "./workbench-types";

export async function exportWorkbenchPdf(
  sources: WorkbenchSource[],
  pages: WorkbenchPage[],
): Promise<Uint8Array> {
  if (pages.length === 0) {
    throw new Error("보낼 페이지가 없습니다.");
  }

  const sourceById = new Map(sources.map((s) => [s.id, s]));
  const docCache = new Map<string, PDFDocument>();
  const output = await PDFDocument.create();

  for (const item of pages) {
    const source = sourceById.get(item.sourceId);
    if (!source) {
      throw new Error("페이지 원본 PDF를 찾을 수 없습니다. PDF를 다시 추가하세요.");
    }

    let pdf = docCache.get(item.sourceId);
    if (!pdf) {
      pdf = await PDFDocument.load(source.bytes, PDF_LOAD_OPTIONS);
      docCache.set(item.sourceId, pdf);
    }

    const [copied] = await output.copyPages(pdf, [item.sourcePageIndex]);
    if (item.rotation !== 0) {
      const current = copied.getRotation().angle;
      copied.setRotation(degrees((current + item.rotation) % 360));
    }
    output.addPage(copied);
  }

  return output.save();
}
