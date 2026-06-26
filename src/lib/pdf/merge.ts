import { PDFDocument } from "pdf-lib";
import { PDF_LOAD_OPTIONS } from "./read-bytes";

export type PdfSource = { name: string; bytes: Uint8Array };

export async function mergePdfs(
  sources: PdfSource[],
  onProgress?: (current: number, total: number) => void,
): Promise<Uint8Array> {
  if (sources.length === 0) {
    throw new Error("병합할 PDF 파일을 하나 이상 선택하세요.");
  }

  const mergedPdf = await PDFDocument.create();
  const total = sources.length;

  for (let i = 0; i < sources.length; i++) {
    onProgress?.(i + 1, total);
    const { name, bytes } = sources[i];
    let pdf: PDFDocument;
    try {
      pdf = await PDFDocument.load(bytes, PDF_LOAD_OPTIONS);
    } catch {
      throw new Error(
        `"${name}" 파일을 PDF로 열 수 없습니다. 다른 앱에서 «PDF로 내보내기» 후 다시 시도해 보세요.`,
      );
    }
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}
