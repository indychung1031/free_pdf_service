"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ProgressBar } from "@/components/ProgressBar";
import { ToolLayout } from "@/components/ToolLayout";
import { downloadPdf, downloadPdfZip } from "@/lib/pdf/download";
import { splitPdf, type SplitMode } from "@/lib/pdf/split";
import {
  storePdfWithPageCount,
  type StoredPdf,
} from "@/lib/pdf/stored-pdf";

export default function SplitPage() {
  const [pdf, setPdf] = useState<StoredPdf | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<SplitMode>("extract");
  const [range, setRange] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  async function handleFileSelect(picked: File[]) {
    const next = picked[0] ?? null;
    setPdf(null);
    setPageCount(null);
    setStatus("idle");
    setError(null);
    if (!next) return;

    try {
      const stored = await storePdfWithPageCount(next);
      setPdf({ name: stored.name, bytes: stored.bytes });
      setPageCount(stored.pageCount);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "PDF 파일을 읽을 수 없습니다.",
      );
      setStatus("error");
    }
  }

  function handleClearWork() {
    setPdf(null);
    setPageCount(null);
    setRange("");
    setMode("extract");
    setStatus("idle");
    setError(null);
    setProgress({ current: 0, total: 0 });
  }

  async function handleSplit() {
    if (!pdf) {
      setError("PDF 파일을 선택하세요.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const results = await splitPdf(
        pdf.bytes,
        pdf.name,
        mode,
        mode === "extract" ? range : undefined,
        (current, total) => setProgress({ current, total }),
      );

      if (results.length === 1) {
        downloadPdf(results[0].bytes, results[0].name);
      } else {
        const baseName = pdf.name.replace(/\.pdf$/i, "");
        await downloadPdfZip(results, `${baseName}_pages.zip`);
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "분할 중 오류가 발생했습니다.");
      setStatus("error");
    }
  }

  return (
    <ToolLayout
      title="PDF 분할"
      description="페이지 범위 추출 또는 페이지마다 개별 파일로 분할합니다."
    >
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <FileDropzone
          multiple={false}
          label="PDF 파일 선택"
          onFiles={handleFileSelect}
        />

        {pdf && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">선택: {pdf.name}</p>
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working"}
            />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="split-mode"
              checked={mode === "extract"}
              onChange={() => setMode("extract")}
            />
            범위 추출 (지정 페이지만 하나의 PDF로)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="split-mode"
              checked={mode === "each-page"}
              onChange={() => setMode("each-page")}
            />
            페이지마다 분할 (ZIP으로 다운로드)
          </label>
        </div>

        {mode === "extract" && (
          <div className="mt-6">
            <PageRangeInput
              value={range}
              onChange={setRange}
              pageCount={pageCount}
              label="추출할 페이지"
            />
          </div>
        )}

        {status === "working" && (
          <div className="mt-6">
            <ProgressBar
              current={progress.current}
              total={progress.total}
              label="분할 처리 중…"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleSplit}
          disabled={!pdf || status === "working"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? "처리 중…" : "분할 후 다운로드"}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">완료되었습니다.</p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
