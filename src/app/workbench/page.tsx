"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { downloadPdf } from "@/lib/pdf/download";
import { clearPdfDocumentCache } from "@/lib/pdf/pdfjs-client";
import { readPdfBytes } from "@/lib/pdf/read-bytes";
import { exportWorkbenchPdf } from "@/lib/pdf/workbench-export";
import {
  createWorkbenchPages,
  createWorkbenchSource,
  type WorkbenchPage,
  type WorkbenchSource,
} from "@/lib/pdf/workbench-types";

const WorkbenchPageGrid = dynamic(
  () =>
    import("@/components/WorkbenchPageGrid").then(
      (mod) => mod.WorkbenchPageGrid,
    ),
  {
    ssr: false,
    loading: () => (
      <p className="py-8 text-center text-sm text-zinc-500">썸네일 준비 중…</p>
    ),
  },
);

export default function WorkbenchPage() {
  const [sources, setSources] = useState<WorkbenchSource[]>([]);
  const [pages, setPages] = useState<WorkbenchPage[]>([]);
  const [zoom, setZoom] = useState(2);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleAddFiles(picked: File[]) {
    if (picked.length === 0) return;

    setStatus("idle");
    setError(null);

    try {
      const newSources: WorkbenchSource[] = [];
      const newPages: WorkbenchPage[] = [];

      for (const file of picked) {
        const bytes = await readPdfBytes(file);
        const { source, pageCount } = await createWorkbenchSource(file, bytes);
        newSources.push(source);
        newPages.push(...createWorkbenchPages(source.id, pageCount));
      }

      clearPdfDocumentCache();
      setSources((prev) => [...prev, ...newSources]);
      setPages((prev) => [...prev, ...newPages]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "PDF를 읽을 수 없습니다.",
      );
      setStatus("error");
    }
  }

  function handleClearWork() {
    clearPdfDocumentCache();
    setSources([]);
    setPages([]);
    setZoom(2);
    setStatus("idle");
    setError(null);
  }

  async function handleExport() {
    if (pages.length === 0) {
      setError("보낼 페이지가 없습니다.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const bytes = await exportWorkbenchPdf(sources, pages);
      const baseName =
        sources.length === 1
          ? sources[0].fileName.replace(/\.pdf$/i, "")
          : "workbench";
      downloadPdf(bytes, `${baseName}_edited.pdf`);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "보내기 중 오류가 발생했습니다.",
      );
      setStatus("error");
    }
  }

  const sourceCount = sources.length;
  const pageCount = pages.length;

  return (
    <ToolLayout
      wide
      title="PDF 작업실"
      description="PDF 여러 개를 추가하고, 페이지를 합치고·빼고·순서를 바꾼 뒤 하나의 PDF로 저장합니다."
    >
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <FileDropzone
          multiple
          label="PDF 추가 (드래그 또는 클릭 · 여러 파일 가능)"
          onFiles={handleAddFiles}
        />

        {sourceCount > 0 && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-sm text-zinc-600">
              PDF {sourceCount}개 · 페이지 {pageCount}장
            </p>
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working"}
            />
          </div>
        )}

        {pageCount > 0 && (
          <>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex flex-wrap items-center gap-2 text-sm text-zinc-700">
                미리보기 확대/축소
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-32"
                  aria-label="미리보기 확대/축소"
                />
                <span className="text-xs text-zinc-400">작게 ← → 크게</span>
              </label>
              <p className="text-xs text-zinc-500">
                ⠿ 드래그로 순서 변경 · 호버 시 회전·삭제
              </p>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
              <WorkbenchPageGrid
                pages={pages}
                sources={sources}
                zoom={zoom}
                onChange={setPages}
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleExport}
          disabled={pageCount === 0 || status === "working"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? "처리 중…" : "현재 순서로 PDF 다운로드"}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">
            다운로드가 완료되었습니다.
          </p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
