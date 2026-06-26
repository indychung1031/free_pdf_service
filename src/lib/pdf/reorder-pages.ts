import { PDFDocument, degrees } from "pdf-lib";
import type { OrganizerPage } from "./organizer-types";

export async function exportOrganizedPdf(
  file: File,
  pages: OrganizerPage[],
): Promise<Uint8Array> {
  if (pages.length === 0) {
    throw new Error("보낼 페이지가 없습니다.");
  }

  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes);
  const output = await PDFDocument.create();

  for (const item of pages) {
    const [copied] = await output.copyPages(source, [item.sourcePageIndex]);
    if (item.rotation !== 0) {
      const current = copied.getRotation().angle;
      copied.setRotation(degrees((current + item.rotation) % 360));
    }
    output.addPage(copied);
  }

  return output.save();
}
