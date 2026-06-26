"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ToolLayout } from "@/components/ToolLayout";
import { WorkbenchCta } from "@/components/WorkbenchCta";
import { downloadPdf } from "@/lib/pdf/download";
import { insertPages } from "@/lib/pdf/insert";
import {
  storePdfWithPageCount,
  type StoredPdf,
} from "@/lib/pdf/stored-pdf";

export default function InsertPage() {
  const [basePdf, setBasePdf] = useState<StoredPdf | null>(null);
  const [insertPdf, setInsertPdf] = useState<StoredPdf | null>(null);
  const [basePageCount, setBasePageCount] = useState<number | null>(null);
  const [insertPageCount, setInsertPageCount] = useState<number | null>(null);
  const [insertRange, setInsertRange] = useState("");
  const [insertAt, setInsertAt] = useState("1");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleBaseFileSelect(picked: File[]) {
    const next = picked[0] ?? null;
    setBasePdf(null);
    setBasePageCount(null);
    if (!next) return;

    try {
      const stored = await storePdfWithPageCount(next);
      setBasePdf({ name: stored.name, bytes: stored.bytes });
      setBasePageCount(stored.pageCount);
    } catch {
      setBasePageCount(null);
    }
  }

  async function handleInsertFileSelect(picked: File[]) {
    const next = picked[0] ?? null;
    setInsertPdf(null);
    setInsertPageCount(null);
    if (!next) return;

    try {
      const stored = await storePdfWithPageCount(next);
      setInsertPdf({ name: stored.name, bytes: stored.bytes });
      setInsertPageCount(stored.pageCount);
    } catch {
      setInsertPageCount(null);
    }
  }

  function handleClearWork() {
    setBasePdf(null);
    setInsertPdf(null);
    setBasePageCount(null);
    setInsertPageCount(null);
    setInsertRange("");
    setInsertAt("1");
    setStatus("idle");
    setError(null);
  }

  const hasWork = Boolean(basePdf || insertPdf);

  async function handleInsert() {
    if (!basePdf || !insertPdf) {
      setError("기본 PDF와 삽입할 PDF를 모두 선택하세요.");
      setStatus("error");
      return;
    }

    const at = Number(insertAt);
    if (!Number.isInteger(at) || at < 1) {
      setError("삽입 위치는 1 이상의 정수여야 합니다.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const bytes = await insertPages(
        basePdf.bytes,
        insertPdf.bytes,
        insertRange,
        at,
      );
      const name = basePdf.name.replace(/\.pdf$/i, "") + "_inserted.pdf";
      downloadPdf(bytes, name);
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "페이지 삽입 중 오류가 발생했습니다.",
      );
      setStatus("error");
    }
  }

  return (
    <ToolLayout
      title="페이지 삽입"
      description="다른 PDF의 페이지를 기본 문서의 원하는 위치에 넣습니다."
    >
      <WorkbenchCta hint="여러 PDF를 합치고 원하는 위치에 페이지를 넣으려면" />

      <section className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">1. 기본 PDF</p>
          <FileDropzone
            multiple={false}
            label="기본 PDF 선택"
            onFiles={handleBaseFileSelect}
          />
          {basePdf && (
            <p className="mt-2 text-sm text-zinc-600">
              {basePdf.name}
              {basePageCount !== null && ` · ${basePageCount}페이지`}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">2. 삽입할 PDF</p>
          <FileDropzone
            multiple={false}
            label="삽입할 PDF 선택"
            onFiles={handleInsertFileSelect}
          />
          {insertPdf && (
            <p className="mt-2 text-sm text-zinc-600">
              {insertPdf.name}
              {insertPageCount !== null && ` · ${insertPageCount}페이지`}
            </p>
          )}
        </div>

        <PageRangeInput
          value={insertRange}
          onChange={setInsertRange}
          pageCount={insertPageCount}
          label="삽입할 페이지 (삽입 PDF 기준)"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            삽입 위치 (기본 PDF 기준, 해당 페이지 앞에 삽입)
            {basePageCount !== null && (
              <span className="ml-2 font-normal text-zinc-500">
                맨 뒤: {basePageCount + 1}
              </span>
            )}
          </label>
          <input
            type="number"
            min={1}
            value={insertAt}
            onChange={(e) => setInsertAt(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2"
          />
        </div>

        {hasWork && (
          <div className="flex justify-end">
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working"}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleInsert}
          disabled={
            !basePdf ||
            !insertPdf ||
            !insertRange.trim() ||
            status === "working"
          }
          className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? "처리 중…" : "삽입 후 다운로드"}
        </button>

        {status === "done" && (
          <p className="text-center text-sm text-green-700">완료되었습니다.</p>
        )}
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
