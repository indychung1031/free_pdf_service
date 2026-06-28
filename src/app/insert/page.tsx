"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { PageRangeInput } from "@/components/PageRangeInput";
import { ToolLayout } from "@/components/ToolLayout";
import { WorkbenchCta } from "@/components/WorkbenchCta";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { downloadPdf } from "@/lib/pdf/download";
import { insertPages } from "@/lib/pdf/insert";
import {
  storePdfWithPageCount,
  type StoredPdf,
} from "@/lib/pdf/stored-pdf";

export default function InsertPage() {
  const { common: c, insert: t } = getToolsContent(useLocale());
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
      setError(t.errorBothPdfs);
      setStatus("error");
      return;
    }

    const at = Number(insertAt);
    if (!Number.isInteger(at) || at < 1) {
      setError(t.errorInsertAt);
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
      setError(err instanceof Error ? err.message : t.errorInsert);
      setStatus("error");
    }
  }

  return (
    <ToolLayout title={t.title} description={t.description}>
      <WorkbenchCta hint={t.workbenchHint} />

      <section className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">{t.basePdf}</p>
          <FileDropzone
            multiple={false}
            label={t.selectBase}
            onFiles={handleBaseFileSelect}
          />
          {basePdf && (
            <p className="mt-2 text-sm text-zinc-600">
              {basePdf.name}
              {basePageCount !== null &&
                ` · ${c.pagesSuffix(basePageCount)}`}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">{t.insertPdf}</p>
          <FileDropzone
            multiple={false}
            label={t.selectInsert}
            onFiles={handleInsertFileSelect}
          />
          {insertPdf && (
            <p className="mt-2 text-sm text-zinc-600">
              {insertPdf.name}
              {insertPageCount !== null &&
                ` · ${c.pagesSuffix(insertPageCount)}`}
            </p>
          )}
        </div>

        <PageRangeInput
          value={insertRange}
          onChange={setInsertRange}
          pageCount={insertPageCount}
          label={t.insertRangeLabel}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            {t.insertAtLabel}
            {basePageCount !== null && (
              <span className="ml-2 font-normal text-zinc-500">
                {t.insertAtEnd(basePageCount + 1)}
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
          {status === "working" ? c.processing : t.submit}
        </button>

        {status === "done" && (
          <p className="text-center text-sm text-green-700">{c.done}</p>
        )}
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
