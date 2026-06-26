"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ToolLayout } from "@/components/ToolLayout";
import { downloadPdf } from "@/lib/pdf/download";
import { insertPages } from "@/lib/pdf/insert";
import { readPageCount } from "@/lib/pdf/load";

export default function InsertPage() {
  const [baseFile, setBaseFile] = useState<File | null>(null);
  const [insertFile, setInsertFile] = useState<File | null>(null);
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
    setBaseFile(next);
    if (!next) {
      setBasePageCount(null);
      return;
    }
    try {
      setBasePageCount(await readPageCount(next));
    } catch {
      setBasePageCount(null);
    }
  }

  async function handleInsertFileSelect(picked: File[]) {
    const next = picked[0] ?? null;
    setInsertFile(next);
    if (!next) {
      setInsertPageCount(null);
      return;
    }
    try {
      setInsertPageCount(await readPageCount(next));
    } catch {
      setInsertPageCount(null);
    }
  }

  function handleClearWork() {
    setBaseFile(null);
    setInsertFile(null);
    setBasePageCount(null);
    setInsertPageCount(null);
    setInsertRange("");
    setInsertAt("1");
    setStatus("idle");
    setError(null);
  }

  const hasWork = Boolean(baseFile || insertFile);

  async function handleInsert() {
    if (!baseFile || !insertFile) {
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
        baseFile,
        insertFile,
        insertRange,
        at,
      );
      const name = baseFile.name.replace(/\.pdf$/i, "") + "_inserted.pdf";
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
      <section className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">1. 기본 PDF</p>
          <FileDropzone
            multiple={false}
            label="기본 PDF 선택"
            onFiles={handleBaseFileSelect}
          />
          {baseFile && (
            <p className="mt-2 text-sm text-zinc-600">
              {baseFile.name}
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
          {insertFile && (
            <p className="mt-2 text-sm text-zinc-600">
              {insertFile.name}
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
            !baseFile ||
            !insertFile ||
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
