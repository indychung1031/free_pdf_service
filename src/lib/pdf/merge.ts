import { PDFDocument } from "pdf-lib";

export async function mergePdfs(
  files: File[],
  onProgress?: (current: number, total: number) => void,
): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("병합할 PDF 파일을 하나 이상 선택하세요.");
  }

  const mergedPdf = await PDFDocument.create();
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    onProgress?.(i + 1, total);
    const bytes = await files[i].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}
