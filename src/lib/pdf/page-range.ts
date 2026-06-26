/** 1-based page spec (e.g. `1-3, 5, 8-12`) → unique 0-based indices, sorted ascending. */
export function parsePageRange(
  input: string,
  pageCount: number,
): number[] {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("페이지 범위를 입력하세요.");
  }
  if (pageCount < 1) {
    throw new Error("문서에 페이지가 없습니다.");
  }

  const indices = new Set<number>();
  const parts = trimmed.split(",").map((p) => p.trim());

  for (const part of parts) {
    if (!part) continue;

    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = Number(startStr);
      const end = Number(endStr);
      if (!Number.isInteger(start) || !Number.isInteger(end)) {
        throw new Error(`잘못된 범위: ${part}`);
      }
      if (start < 1 || end < 1 || start > end) {
        throw new Error(`잘못된 범위: ${part}`);
      }
      if (end > pageCount) {
        throw new Error(
          `범위 ${part}가 문서 페이지 수(${pageCount})를 초과합니다.`,
        );
      }
      for (let page = start; page <= end; page++) {
        indices.add(page - 1);
      }
    } else {
      const page = Number(part);
      if (!Number.isInteger(page) || page < 1) {
        throw new Error(`잘못된 페이지: ${part}`);
      }
      if (page > pageCount) {
        throw new Error(
          `페이지 ${page}가 문서 페이지 수(${pageCount})를 초과합니다.`,
        );
      }
      indices.add(page - 1);
    }
  }

  if (indices.size === 0) {
    throw new Error("유효한 페이지 범위가 없습니다.");
  }

  return [...indices].sort((a, b) => a - b);
}

export function previewPageCount(input: string, pageCount: number): number | null {
  if (!input.trim() || pageCount < 1) return null;
  try {
    return parsePageRange(input, pageCount).length;
  } catch {
    return null;
  }
}
