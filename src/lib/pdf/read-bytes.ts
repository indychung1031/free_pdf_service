/** pdf-lib 공통 로드 옵션 (암호 PDF 일부 허용) */
export const PDF_LOAD_OPTIONS = { ignoreEncryption: true } as const;

/** iOS는 MIME이 비어 있거나 octet-stream 인 경우가 많음 */
export function isPdfFile(file: File): boolean {
  const type = file.type.toLowerCase();
  if (type === "application/pdf" || type === "application/x-pdf") return true;
  if (!type || type === "application/octet-stream") {
    return file.name.toLowerCase().endsWith(".pdf");
  }
  return false;
}

function assertPdfHeader(bytes: Uint8Array, name: string): void {
  if (bytes.length < 5) {
    throw new Error(`"${name}" 파일이 비어 있거나 읽을 수 없습니다.`);
  }
  const sig = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4]);
  if (sig !== "%PDF-") {
    throw new Error(
      `"${name}"은(는) 유효한 PDF가 아닙니다. iCloud·Google Drive 파일은 «파일 앱에 저장» 후 다시 선택해 보세요.`,
    );
  }
}

/** 선택 직후 호출 — iOS에서 input 초기화 후 File.handle가 무효화되는 문제 방지 */
export async function readPdfBytes(file: File): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  assertPdfHeader(bytes, file.name);
  return bytes;
}
