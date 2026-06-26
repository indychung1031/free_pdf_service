import { PDFDocument } from "pdf-lib";

export async function loadPdfFromFile(file: File): Promise<PDFDocument> {
  const bytes = await file.arrayBuffer();
  return PDFDocument.load(bytes);
}

export async function readPageCount(file: File): Promise<number> {
  const pdf = await loadPdfFromFile(file);
  return pdf.getPageCount();
}
