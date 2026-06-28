import type { Locale } from "@/lib/i18n/locale";

export type ToolsContent = {
  common: {
    privacyNote: string;
    selectPdf: string;
    selectPdfDrag: string;
    readingPdf: string;
    selectedPrefix: string;
    processing: string;
    done: string;
    clearWork: string;
    clearWorkTitle: string;
    clearWorkHint: string;
    errorReadPdf: string;
    errorSelectPdf: string;
    pagesSuffix: (n: number) => string;
    pageRangeLabel: string;
    pageRangePlaceholder: string;
    pageRangeTotal: (n: number) => string;
    pageRangePreview: (n: number) => string;
    pageRangeInvalid: string;
    pageRangeHint: string;
    dragReorder: string;
    remove: string;
    workbenchCtaLink: string;
  };
  merge: {
    title: string;
    description: string;
    dropLabel: string;
    merging: string;
    submit: string;
    errorMinFiles: string;
    errorMerge: string;
    done: string;
  };
  split: {
    title: string;
    description: string;
    modeExtract: string;
    modeEachPage: string;
    extractLabel: string;
    splitting: string;
    submit: string;
    errorSplit: string;
  };
  deletePages: {
    title: string;
    description: string;
    workbenchHint: string;
    deleteLabel: string;
    submit: string;
    errorDelete: string;
  };
  insert: {
    title: string;
    description: string;
    workbenchHint: string;
    basePdf: string;
    selectBase: string;
    insertPdf: string;
    selectInsert: string;
    insertRangeLabel: string;
    insertAtLabel: string;
    insertAtEnd: (n: number) => string;
    errorBothPdfs: string;
    errorInsertAt: string;
    submit: string;
    errorInsert: string;
  };
  workbench: {
    title: string;
    description: string;
    addPdf: string;
    sourceSummary: (files: number, pages: number) => string;
    memoryWarning: (pages: number) => string;
    memoryWarningTools: string;
    memoryWarningSuffix: string;
    insertAfterSelected: string;
    insertAtEnd: string;
    changeToEnd: string;
    insertAtEndHint: string;
    zoomLabel: string;
    zoomHint: string;
    gridHint: string;
    thumbnailsLoading: string;
    emptyGrid: string;
    submit: string;
    errorNoPages: string;
    errorExport: string;
    errorRead: string;
    done: string;
    dragReorder: string;
    insertTargetTitle: string;
    rotateTitle: string;
    deleteTitle: string;
    deleteButton: string;
  };
};

const KO: ToolsContent = {
  common: {
    privacyNote: "파일은 브라우저에서만 처리됩니다. 서버로 전송되지 않습니다.",
    selectPdf: "PDF 파일 선택",
    selectPdfDrag: "PDF 파일 선택 (드래그 또는 클릭)",
    readingPdf: "PDF 읽는 중…",
    selectedPrefix: "선택:",
    processing: "처리 중…",
    done: "완료되었습니다.",
    clearWork: "작업 파일 비우기",
    clearWorkTitle:
      "선택한 작업 파일만 화면에서 비웁니다. 기기에 저장된 원본 파일은 삭제되지 않습니다.",
    clearWorkHint: "목록만 초기화합니다. 원본 파일은 삭제되지 않습니다.",
    errorReadPdf: "PDF 파일을 읽을 수 없습니다.",
    errorSelectPdf: "PDF 파일을 선택하세요.",
    pagesSuffix: (n) => `${n}페이지`,
    pageRangeLabel: "페이지 범위",
    pageRangePlaceholder: "예: 1-3, 5, 8-12",
    pageRangeTotal: (n) => `(전체 ${n}페이지)`,
    pageRangePreview: (n) => `선택 예상: ${n}페이지`,
    pageRangeInvalid: "범위 형식을 확인하세요.",
    pageRangeHint: "쉼표로 구분 · 하이픈으로 범위 (1부터 시작)",
    dragReorder: "드래그하여 순서 변경",
    remove: "삭제",
    workbenchCtaLink: "PDF 작업실에서 한 번에",
  },
  merge: {
    title: "PDF 병합",
    description: "파일은 브라우저에서만 처리됩니다. 서버로 전송되지 않습니다.",
    dropLabel: "PDF 파일 선택 (드래그 또는 클릭)",
    merging: "파일 병합 중…",
    submit: "병합 후 다운로드",
    errorMinFiles: "병합하려면 PDF 파일을 2개 이상 선택하세요.",
    errorMerge: "병합 중 오류가 발생했습니다.",
    done: "병합이 완료되었습니다.",
  },
  split: {
    title: "PDF 분할",
    description: "페이지 범위 추출 또는 페이지마다 개별 파일로 분할합니다.",
    modeExtract: "범위 추출 (지정 페이지만 하나의 PDF로)",
    modeEachPage: "페이지마다 분할 (ZIP으로 다운로드)",
    extractLabel: "추출할 페이지",
    splitting: "분할 처리 중…",
    submit: "분할 후 다운로드",
    errorSplit: "분할 중 오류가 발생했습니다.",
  },
  deletePages: {
    title: "페이지 삭제",
    description: "지정한 페이지를 제거한 새 PDF를 만듭니다.",
    workbenchHint: "여러 PDF를 합친 뒤 페이지를 삭제·재배치하려면",
    deleteLabel: "삭제할 페이지",
    submit: "삭제 후 다운로드",
    errorDelete: "페이지 삭제 중 오류가 발생했습니다.",
  },
  insert: {
    title: "페이지 삽입",
    description: "다른 PDF의 페이지를 기본 문서의 원하는 위치에 넣습니다.",
    workbenchHint: "여러 PDF를 합치고 원하는 위치에 페이지를 넣으려면",
    basePdf: "1. 기본 PDF",
    selectBase: "기본 PDF 선택",
    insertPdf: "2. 삽입할 PDF",
    selectInsert: "삽입할 PDF 선택",
    insertRangeLabel: "삽입할 페이지 (삽입 PDF 기준)",
    insertAtLabel: "삽입 위치 (기본 PDF 기준, 해당 페이지 앞에 삽입)",
    insertAtEnd: (n) => `맨 뒤: ${n}`,
    errorBothPdfs: "기본 PDF와 삽입할 PDF를 모두 선택하세요.",
    errorInsertAt: "삽입 위치는 1 이상의 정수여야 합니다.",
    submit: "삽입 후 다운로드",
    errorInsert: "페이지 삽입 중 오류가 발생했습니다.",
  },
  workbench: {
    title: "PDF 작업실",
    description:
      "PDF 여러 개를 추가하고, 페이지를 합치고·빼고·순서를 바꾼 뒤 하나의 PDF로 저장합니다. 페이지를 클릭하면 그 뒤에 PDF를 삽입할 수 있습니다.",
    addPdf: "PDF 추가 (드래그 또는 클릭 · 여러 파일 가능)",
    sourceSummary: (files, pages) => `PDF ${files}개 · 페이지 ${pages}장`,
    memoryWarning: (pages) =>
      `페이지가 ${pages}장입니다. 기기 메모리가 부족하면 `,
    memoryWarningTools: "페이지 삭제·분할",
    memoryWarningSuffix: " 도구를 이용하거나 PDF를 나눠 작업하세요.",
    insertAfterSelected: "선택한 페이지 ",
    insertAtEnd: "뒤",
    changeToEnd: "끝에 추가로 변경",
    insertAtEndHint:
      "에 추가됩니다. 썸네일을 클릭하면 그 페이지 뒤에 삽입할 수 있습니다.",
    zoomLabel: "미리보기 확대/축소",
    zoomHint: "작게 ← → 크게",
    gridHint: "⠿ 드래그로 순서 변경 · 클릭으로 삽입 위치 · 호버 시 회전·삭제",
    thumbnailsLoading: "썸네일 준비 중…",
    emptyGrid: "PDF를 추가하면 페이지가 여기에 표시됩니다.",
    submit: "현재 순서로 PDF 다운로드",
    errorNoPages: "보낼 페이지가 없습니다.",
    errorExport: "보내기 중 오류가 발생했습니다.",
    errorRead: "PDF를 읽을 수 없습니다.",
    done: "다운로드가 완료되었습니다.",
    dragReorder: "드래그하여 순서 변경",
    insertTargetTitle: "클릭하면 다음 추가 PDF가 이 페이지 뒤에 삽입됩니다",
    rotateTitle: "90° 회전",
    deleteTitle: "삭제",
    deleteButton: "삭제",
  },
};

const EN: ToolsContent = {
  common: {
    privacyNote: "Processed entirely in your browser. Nothing is uploaded.",
    selectPdf: "Choose PDF file",
    selectPdfDrag: "Choose PDF (drag or click)",
    readingPdf: "Reading PDF…",
    selectedPrefix: "Selected:",
    processing: "Working…",
    done: "Done.",
    clearWork: "Clear workspace",
    clearWorkTitle:
      "Clears files from this screen only. Original files on your device are not deleted.",
    clearWorkHint: "Resets the list only. Your original files stay on your device.",
    errorReadPdf: "Could not read the PDF file.",
    errorSelectPdf: "Choose a PDF file.",
    pagesSuffix: (n) => `${n} pages`,
    pageRangeLabel: "Page range",
    pageRangePlaceholder: "e.g. 1-3, 5, 8-12",
    pageRangeTotal: (n) => `(of ${n} pages)`,
    pageRangePreview: (n) => `Expected selection: ${n} pages`,
    pageRangeInvalid: "Check the range format.",
    pageRangeHint: "Comma-separated · hyphen for ranges (1-based)",
    dragReorder: "Drag to reorder",
    remove: "Remove",
    workbenchCtaLink: "use PDF Workbench",
  },
  merge: {
    title: "Merge PDF",
    description: "Processed entirely in your browser. Nothing is uploaded.",
    dropLabel: "Choose PDF files (drag or click)",
    merging: "Merging files…",
    submit: "Merge and download",
    errorMinFiles: "Select at least 2 PDF files to merge.",
    errorMerge: "An error occurred while merging.",
    done: "Merge complete.",
  },
  split: {
    title: "Split PDF",
    description: "Extract a page range or split into one file per page.",
    modeExtract: "Extract range (selected pages into one PDF)",
    modeEachPage: "Split each page (download as ZIP)",
    extractLabel: "Pages to extract",
    splitting: "Splitting…",
    submit: "Split and download",
    errorSplit: "An error occurred while splitting.",
  },
  deletePages: {
    title: "Delete pages",
    description: "Remove selected pages and download a new PDF.",
    workbenchHint: "To merge PDFs first, then delete or reorder pages,",
    deleteLabel: "Pages to delete",
    submit: "Delete and download",
    errorDelete: "An error occurred while deleting pages.",
  },
  insert: {
    title: "Insert pages",
    description: "Insert pages from another PDF at any position in the base document.",
    workbenchHint: "To combine PDFs and insert pages at specific positions,",
    basePdf: "1. Base PDF",
    selectBase: "Choose base PDF",
    insertPdf: "2. PDF to insert from",
    selectInsert: "Choose PDF to insert from",
    insertRangeLabel: "Pages to insert (from insert PDF)",
    insertAtLabel: "Insert position (in base PDF, inserted before this page)",
    insertAtEnd: (n) => `End: ${n}`,
    errorBothPdfs: "Choose both the base PDF and the PDF to insert from.",
    errorInsertAt: "Insert position must be an integer of 1 or greater.",
    submit: "Insert and download",
    errorInsert: "An error occurred while inserting pages.",
  },
  workbench: {
    title: "PDF Workbench",
    description:
      "Add one or more PDFs, merge·remove·reorder pages, then save as a single PDF. Click a page to insert the next PDF after it.",
    addPdf: "Add PDF (drag or click · multiple files OK)",
    sourceSummary: (files, pages) => `${files} PDF(s) · ${pages} page(s)`,
    memoryWarning: (pages) =>
      `${pages} pages — if your device runs low on memory, try the `,
    memoryWarningTools: "Delete pages or Split",
    memoryWarningSuffix: " tools, or split your PDF into smaller jobs.",
    insertAfterSelected: "The next PDF will be inserted after the selected page. ",
    insertAtEnd: "end",
    changeToEnd: "Append at end instead",
    insertAtEndHint:
      "New PDFs are added at the end of the list. Click a thumbnail to insert after that page.",
    zoomLabel: "Preview zoom",
    zoomHint: "Smaller ← → Larger",
    gridHint: "⠿ drag to reorder · click to set insert point · hover for rotate/delete",
    thumbnailsLoading: "Loading thumbnails…",
    emptyGrid: "Add PDFs to see pages here.",
    submit: "Download PDF in current order",
    errorNoPages: "No pages to export.",
    errorExport: "An error occurred while exporting.",
    errorRead: "Could not read the PDF.",
    done: "Download complete.",
    dragReorder: "Drag to reorder",
    insertTargetTitle: "Click to insert the next PDF after this page",
    rotateTitle: "Rotate 90°",
    deleteTitle: "Delete",
    deleteButton: "Delete",
  },
};

export function getToolsContent(locale: Locale): ToolsContent {
  return locale === "en" ? EN : KO;
}
