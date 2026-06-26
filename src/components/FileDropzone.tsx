"use client";

import { useRef } from "react";

type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
};

export function FileDropzone({
  onFiles,
  multiple = true,
  label = "PDF 파일 선택 (드래그 또는 클릭)",
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function pickPdfFiles(fileList: FileList | null) {
    const pdfs = Array.from(fileList ?? []).filter(
      (f) => f.type === "application/pdf",
    );
    if (pdfs.length > 0) onFiles(pdfs);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          pickPdfFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("border-zinc-500", "bg-zinc-50");
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove("border-zinc-500", "bg-zinc-50");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-zinc-500", "bg-zinc-50");
          pickPdfFiles(e.dataTransfer.files);
        }}
        className="w-full cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 px-4 py-10 text-center text-sm text-zinc-600 transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        {label}
      </div>
    </>
  );
}
