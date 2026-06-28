"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ToolLayout } from "@/components/ToolLayout";
import { WorkbenchCta } from "@/components/WorkbenchCta";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { deletePages } from "@/lib/pdf/delete-pages";
import { downloadPdf } from "@/lib/pdf/download";
import {
  storePdfWithPageCount,
  type StoredPdf,
} from "@/lib/pdf/stored-pdf";

export default function DeletePagesPage() {
  const { common: c, deletePages: t } = getToolsContent(useLocale());
  const [pdf, setPdf] = useState<StoredPdf | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

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
    setStatus("idle");
    setError(null);
  }

  async function handleDelete() {
    if (!pdf) {
      setError(c.errorSelectPdf);
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);

    try {
      const bytes = await deletePages(pdf.bytes, range);
      const name = pdf.name.replace(/\.pdf$/i, "") + "_deleted.pdf";
      downloadPdf(bytes, name);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorDelete);
      setStatus("error");
    }
  }

  return (
    <ToolLayout title={t.title} description={t.description}>
      <WorkbenchCta hint={t.workbenchHint} />

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

        <div className="mt-6">
          <PageRangeInput
            value={range}
            onChange={setRange}
            pageCount={pageCount}
            label={t.deleteLabel}
          />
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={!pdf || !range.trim() || status === "working"}
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
