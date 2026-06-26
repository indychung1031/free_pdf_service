"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { FileListDnD, toListedFiles, type ListedFile } from "@/components/FileListDnD";
import { ProgressBar } from "@/components/ProgressBar";
import { ToolLayout } from "@/components/ToolLayout";
import { downloadPdf } from "@/lib/pdf/download";
import { mergePdfs } from "@/lib/pdf/merge";

export default function MergePage() {
  const [items, setItems] = useState<ListedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  async function handleMerge() {
    const files = items.map((i) => i.file);
    if (files.length < 2) {
      setError("병합하려면 PDF 파일을 2개 이상 선택하세요.");
      setStatus("error");
      return;
    }

    setStatus("working");
    setError(null);
    setProgress({ current: 0, total: files.length });

    try {
      const bytes = await mergePdfs(files, (current, total) =>
        setProgress({ current, total }),
      );
      downloadPdf(bytes, "merged.pdf");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "병합 중 오류가 발생했습니다.");
      setStatus("error");
    }
  }

  return (
    <ToolLayout
      title="PDF 병합"
      description="파일은 브라우저에서만 처리됩니다. 서버로 전송되지 않습니다."
    >
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <FileDropzone
          onFiles={(picked) =>
            setItems((prev) => [...prev, ...toListedFiles(picked)])
          }
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
              label="파일 병합 중…"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleMerge}
          disabled={items.length < 2 || status === "working"}
          className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {status === "working" ? "처리 중…" : "병합 후 다운로드"}
        </button>

        {status === "done" && (
          <p className="mt-3 text-center text-sm text-green-700">
            병합이 완료되었습니다.
          </p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        )}
      </section>
    </ToolLayout>
  );
}
