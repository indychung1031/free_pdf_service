"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { WorkbenchPageGrid } from "@/components/WorkbenchPageGridDynamic";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { downloadPdf } from "@/lib/pdf/download";
import { clearPdfDocumentCache } from "@/lib/pdf/pdfjs-client";
import { readPdfBytes } from "@/lib/pdf/read-bytes";
import { exportWorkbenchPdf } from "@/lib/pdf/workbench-export";
import {
  createWorkbenchPages,
  createWorkbenchSource,
  mergePagesAt,
  type WorkbenchPage,
  type WorkbenchSource,
} from "@/lib/pdf/workbench-types";

export default function WorkbenchPage() {
  const locale = useLocale();
  const { common: c, workbench: w } = getToolsContent(locale);
  const [sources, setSources] = useState<WorkbenchSource[]>([]);
  const [pages, setPages] = useState<WorkbenchPage[]>([]);
  const [insertAfterPageId, setInsertAfterPageId] = useState<string | null>(
    null,
  );
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
      setPages((prev) => mergePagesAt(prev, newPages, insertAfterPageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : w.errorRead);
      setStatus("error");
    }
  }

  function handleClearWork() {
    clearPdfDocumentCache();
    setSources([]);
    setPages([]);
    setInsertAfterPageId(null);
    setZoom(2);
    setStatus("idle");
    setError(null);
  }

  async function handleExport() {
    if (pages.length === 0) {
      setError(w.errorNoPages);
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
      setError(err instanceof Error ? err.message : w.errorExport);
      setStatus("error");
    }
  }

  const sourceCount = sources.length;
  const pageCount = pages.length;

  return (
    <ToolLayout wide title={w.title} description={w.description}>
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <FileDropzone
          multiple
          label={w.addPdf}
          onFiles={handleAddFiles}
        />

        {sourceCount > 0 && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-sm text-zinc-600">
              {w.sourceSummary(sourceCount, pageCount)}
            </p>
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working"}
            />
          </div>
        )}

        {pageCount > 0 && (
          <>
            {pageCount >= 80 && (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                {w.memoryWarning(pageCount)}
                <strong>{w.memoryWarningTools}</strong>
                {w.memoryWarningSuffix}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
                {insertAfterPageId ? (
                  locale === "en" ? (
                    <>
                      {w.insertAfterSelected}
                      <button
                        type="button"
                        className="font-medium text-blue-700 underline hover:text-blue-900"
                        onClick={() => setInsertAfterPageId(null)}
                      >
                        {w.changeToEnd}
                      </button>
                    </>
                  ) : (
                    <>
                      {w.insertAfterSelected}
                      <strong>{w.insertAtEnd}</strong>에 다음 PDF가
                      삽입됩니다.{" "}
                      <button
                        type="button"
                        className="font-medium text-blue-700 underline hover:text-blue-900"
                        onClick={() => setInsertAfterPageId(null)}
                      >
                        {w.changeToEnd}
                      </button>
                    </>
                  )
                ) : locale === "en" ? (
                  w.insertAtEndHint
                ) : (
                  <>
                    PDF는 목록 <strong>끝</strong>
                    {w.insertAtEndHint}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex flex-wrap items-center gap-2 text-sm text-zinc-700">
                  {w.zoomLabel}
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-32"
                    aria-label={w.zoomLabel}
                  />
                  <span className="text-xs text-zinc-400">{w.zoomHint}</span>
                </label>
                <p className="text-xs text-zinc-500">{w.gridHint}</p>
              </div>
            </div>

            <div className="mt-4">
              <WorkbenchPageGrid
                pages={pages}
                sources={sources}
                zoom={zoom}
                insertAfterPageId={insertAfterPageId}
                onInsertAfterChange={setInsertAfterPageId}
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
          {status === "working" ? c.processing : w.submit}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">{w.done}</p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
