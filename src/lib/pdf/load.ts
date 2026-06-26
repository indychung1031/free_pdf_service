import { PDFDocument } from "pdf-lib";
import { PDF_LOAD_OPTIONS, readPdfBytes } from "./read-bytes";

export async function loadPdfFromBytes(bytes: Uint8Array): Promise<PDFDocument> {
  return PDFDocument.load(bytes, PDF_LOAD_OPTIONS);
}

export async function loadPdfFromFile(file: File): Promise<PDFDocument> {
  const bytes = await readPdfBytes(file);
  return loadPdfFromBytes(bytes);
}

export async function readPageCount(file: File): Promise<number> {
  const pdf = await loadPdfFromFile(file);
  return pdf.getPageCount();
}

export async function readPageCountFromBytes(bytes: Uint8Array): Promise<number> {
  const pdf = await loadPdfFromBytes(bytes);
  return pdf.getPageCount();
}
