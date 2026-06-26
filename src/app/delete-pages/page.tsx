"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ToolLayout } from "@/components/ToolLayout";
import { WorkbenchCta } from "@/components/WorkbenchCta";
import { deletePages } from "@/lib/pdf/delete-pages";
import { downloadPdf } from "@/lib/pdf/download";
import { readPageCount } from "@/lib/pdf/load";

export default function DeletePagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelect(picked: File[]) {
    const next = picked[0] ?? null;
    setFile(next);
    setStatus("idle");
    setError(null);
    if (!next) {
      setPageCount(null);
      return;
    }
    try {
      setPageCount(await readPageCount(next));
    } catch {
      setPageCount(null);
    }
  }

  function handleClearWork() {
    setFile(null);
    setPageCount(null);
    setRange("");
    setStatus("idle");
    setError(null);
  }

  async function handleDelete() {
    if (!file) {
      setError("PDF 파일을 선택하세요.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const bytes = await deletePages(file, range);
      const name = file.name.replace(/\.pdf$/i, "") + "_deleted.pdf";
      downloadPdf(bytes, name);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "페이지 삭제 중 오류가 발생했습니다.",
      );
      setStatus("error");
    }
  }

  return (
    <ToolLayout
      title="페이지 삭제"
      description="지정한 페이지를 제거한 새 PDF를 만듭니다."
    >
      <WorkbenchCta hint="여러 PDF를 합친 뒤 페이지를 삭제·재배치하려면" />

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <FileDropzone
          multiple={false}
          label="PDF 파일 선택"
          onFiles={handleFileSelect}
        />

        {file && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">선택: {file.name}</p>
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working"}
            />
          </div>
        )}

        <div className="mt-6">
          <PageRangeInput
            value={range}
            onChange={setRange}
            pageCount={pageCount}
            label="삭제할 페이지"
          />
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={!file || !range.trim() || status === "working"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? "처리 중…" : "삭제 후 다운로드"}
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
