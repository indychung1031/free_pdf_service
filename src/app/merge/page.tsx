"use client";

import { useState } from "react";
import { ClearWorkButton } from "@/components/ClearWorkButton";
import { FileDropzone } from "@/components/FileDropzone";
import {
  FileListDnD,
  toListedPdfFiles,
  type ListedFile,
} from "@/components/FileListDnD";
import { ProgressBar } from "@/components/ProgressBar";
import { ToolLayout } from "@/components/ToolLayout";
import { getToolsContent } from "@/lib/i18n/content/tools";
import { useLocale } from "@/lib/i18n/use-locale";
import { downloadPdf } from "@/lib/pdf/download";
import { mergePdfs } from "@/lib/pdf/merge";

export default function MergePage() {
  const { common: c, merge: t } = getToolsContent(useLocale());
  const [items, setItems] = useState<ListedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [picking, setPicking] = useState(false);

  async function handleAddFiles(picked: File[]) {
    setPicking(true);
    setError(null);
    try {
      const listed = await toListedPdfFiles(picked);
      setItems((prev) => [...prev, ...listed]);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : c.errorReadPdf);
      setStatus("error");
    } finally {
      setPicking(false);
    }
  }

  function handleClearWork() {
    setItems([]);
    setStatus("idle");
    setError(null);
    setProgress({ current: 0, total: 0 });
  }

  const hasWork = items.length > 0;

  async function handleMerge() {
    if (items.length < 2) {
      setError(t.errorMinFiles);
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);
    setProgress({ current: 0, total: items.length });

    try {
      const bytes = await mergePdfs(items, (current, total) =>
        setProgress({ current, total }),
      );
      downloadPdf(bytes, "merged.pdf");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMerge);
      setStatus("error");
    }
  }

  return (
    <ToolLayout title={t.title} description={t.description}>
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <FileDropzone
          onFiles={handleAddFiles}
          label={picking ? c.readingPdf : t.dropLabel}
        />

        <div className="mt-6">
          <FileListDnD
            items={items}
            onReorder={setItems}
            onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
          />
        </div>

        {status === "working" && (
          <div className="mt-6">
            <ProgressBar
              current={progress.current}
              total={progress.total}
              label={t.merging}
            />
          </div>
        )}

        {hasWork && (
          <div className="mt-6">
            <ClearWorkButton
              onClear={handleClearWork}
              disabled={status === "working" || picking}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleMerge}
          disabled={items.length < 2 || status === "working" || picking}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? c.processing : t.submit}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">{t.done}</p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
