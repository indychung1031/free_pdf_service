import { loadPdfFromBytes } from "./load";
import { parsePageRange } from "./page-range";

/**
 * @param insertAt 1-based position in the base document where new pages are inserted (before this page; use pageCount+1 for append)
 */
export async function insertPages(
  baseBytes: Uint8Array,
  insertBytes: Uint8Array,
  insertRangeInput: string,
  insertAt: number,
): Promise<Uint8Array> {
  const base = await loadPdfFromBytes(baseBytes);
  const insertSource = await loadPdfFromBytes(insertBytes);
  const baseCount = base.getPageCount();
  const insertCount = insertSource.getPageCount();

  if (insertAt < 1 || insertAt > baseCount + 1) {
    throw new Error(
      `삽입 위치는 1~${baseCount + 1} 사이여야 합니다. (맨 뒤: ${baseCount + 1})`,
    );
  }

  const insertIndices = parsePageRange(insertRangeInput, insertCount);
  const insertPagesCopied = await base.copyPages(insertSource, insertIndices);

  const atIndex = insertAt - 1;
  for (let i = insertPagesCopied.length - 1; i >= 0; i--) {
    base.insertPage(atIndex, insertPagesCopied[i]);
  }

  return base.save();
}
