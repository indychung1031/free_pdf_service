"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ProgressBar } from "@/components/ProgressBar";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { downloadPdf, downloadPdfZip } from "@/lib/pdf/download";
import { splitPdf, type SplitMode } from "@/lib/pdf/split";
import {
  storePdfWithPageCount,
  type StoredPdf,
} from "@/lib/pdf/stored-pdf";

export default function SplitPage() {
  const { common: c, split: t } = getToolsContent(useLocale());
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
      setError(err instanceof Error ? err.message : c.errorReadPdf);
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
      setError(c.errorSelectPdf);
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
      setError(err instanceof Error ? err.message : t.errorSplit);
      setStatus("error");
    }
  }

  return (
    <ToolLayout title={t.title} description={t.description}>
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <FileDropzone
          multiple={false}
          label={c.selectPdf}
          onFiles={handleFileSelect}
        />

        {pdf && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              {c.selectedPrefix} {pdf.name}
            </p>
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
            {t.modeExtract}
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="split-mode"
              checked={mode === "each-page"}
              onChange={() => setMode("each-page")}
            />
            {t.modeEachPage}
          </label>
        </div>

        {mode === "extract" && (
          <div className="mt-6">
            <PageRangeInput
              value={range}
              onChange={setRange}
              pageCount={pageCount}
              label={t.extractLabel}
            />
          </div>
        )}

        {status === "working" && (
          <div className="mt-6">
            <ProgressBar
              current={progress.current}
              total={progress.total}
              label={t.splitting}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleSplit}
          disabled={!pdf || status === "working"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? c.processing : t.submit}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">{c.done}</p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
