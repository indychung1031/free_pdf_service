"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { downloadPdf } from "@/lib/pdf/download";
import { readPageCount } from "@/lib/pdf/load";
import { clearPdfDocumentCache } from "@/lib/pdf/pdfjs-client";
import {
  createOrganizerPages,
  type OrganizerPage,
} from "@/lib/pdf/organizer-types";
import { exportOrganizedPdf } from "@/lib/pdf/reorder-pages";

const PageThumbnailGrid = dynamic(
  () =>
    import("@/components/PageThumbnailGrid").then((mod) => mod.PageThumbnailGrid),
  {
    ssr: false,
    loading: () => (
      <p className="py-8 text-center text-sm text-zinc-500">썸네일 준비 중…</p>
    ),
  },
);

export default function OrganizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [cacheKey, setCacheKey] = useState("");
  const [pages, setPages] = useState<OrganizerPage[]>([]);
  const [zoom, setZoom] = useState(2);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleFile(picked: File[]) {
    const next = picked[0];
    if (!next) return;

    setStatus("idle");
    setError(null);

    try {
      const count = await readPageCount(next);
      const buffer = await next.arrayBuffer();
      const key = `${next.name}-${next.size}-${next.lastModified}`;

      clearPdfDocumentCache();
      setFile(next);
      setPdfData(buffer);
      setCacheKey(key);
      setPages(createOrganizerPages(count));
    } catch {
      setError("PDF를 읽을 수 없습니다.");
      setStatus("error");
    }
  }

  async function handleExport() {
    if (!file || pages.length === 0) {
      setError("보낼 페이지가 없습니다.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const bytes = await exportOrganizedPdf(file, pages);
      const name = file.name.replace(/\.pdf$/i, "") + "_organized.pdf";
      downloadPdf(bytes, name);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "보내기 중 오류가 발생했습니다.",
      );
      setStatus("error");
    }
  }

  return (
    <ToolLayout
      title="페이지 Organizer"
      description="썸네일을 드래그해 순서를 바꾸고, 회전·삭제 후 새 PDF로 저장합니다."
    >
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <FileDropzone
          multiple={false}
          label="PDF 파일 선택 (드래그 또는 클릭)"
          onFiles={handleFile}
        />

        {file && (
          <p className="mt-4 text-sm text-zinc-600">
            {file.name} · {pages.length}페이지 표시 중
          </p>
        )}

        {pdfData && pages.length > 0 && (
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
              <PageThumbnailGrid
                pages={pages}
                pdfData={pdfData}
                cacheKey={cacheKey}
                zoom={zoom}
                onChange={setPages}
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleExport}
          disabled={!file || pages.length === 0 || status === "working"}
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
