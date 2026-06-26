"use client";

import { previewPageCount } from "@/lib/pdf/page-range";

type PageRangeInputProps = {
  value: string;
  onChange: (value: string) => void;
  pageCount: number | null;
  label?: string;
  placeholder?: string;
};

export function PageRangeInput({
  value,
  onChange,
  pageCount,
  label = "페이지 범위",
  placeholder = "예: 1-3, 5, 8-12",
}: PageRangeInputProps) {
  const preview =
    pageCount !== null ? previewPageCount(value, pageCount) : null;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700">
        {label}
        {pageCount !== null && (
          <span className="ml-2 font-normal text-zinc-500">
            (전체 {pageCount}페이지)
          </span>
        )}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2"
      />
      {value.trim() && pageCount !== null && (
        <p className="text-xs text-zinc-500">
          {preview !== null
            ? `선택 예상: ${preview}페이지`
            : "범위 형식을 확인하세요."}
        </p>
      )}
      <p className="text-xs text-zinc-400">
        쉼표로 구분 · 하이픈으로 범위 (1부터 시작)
      </p>
    </div>
  );
}
